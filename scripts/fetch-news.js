import 'dotenv/config';
import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';

const FEEDS = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/'
  },
  {
  name: 'The Verge',
  url: 'https://www.theverge.com/rss/index.xml'
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/'
  },
  {
    name: 'AI News',
    url: 'https://www.artificialintelligence-news.com/feed/'
  },
  {
    name: 'MIT Technology Review AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/'
  }
];

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID'
];

for (const envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    console.error(`❌ Variável de ambiente em falta: ${envVar}`);
    process.exit(1);
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

const parser = new Parser({
  timeout: 15000,
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: true }],
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator']
    ]
  }
});

function stripHtml(value = '') {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function shorten(value = '', maxLength = 260) {
  const clean = stripHtml(value);

  if (clean.length <= maxLength) return clean;

  return `${clean.slice(0, maxLength).trim()}…`;
}

function getImageUrl(item) {
  const enclosureUrl = item.enclosure?.url;
  if (enclosureUrl && item.enclosure?.type?.startsWith?.('image/')) return enclosureUrl;

  const mediaContent = Array.isArray(item.mediaContent) ? item.mediaContent : [];
  const mediaImage = mediaContent.find((media) => media?.$?.url || media?.url);
  if (mediaImage?.$?.url) return mediaImage.$.url;
  if (mediaImage?.url) return mediaImage.url;

  const mediaThumbnail = Array.isArray(item.mediaThumbnail) ? item.mediaThumbnail : [];
  if (mediaThumbnail[0]?.$?.url) return mediaThumbnail[0].$.url;
  if (mediaThumbnail[0]?.url) return mediaThumbnail[0].url;

  const html = item.contentEncoded || item.content || item.summary || '';
  const imageMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imageMatch?.[1] || null;
}

function normalizeUrl(rawUrl) {
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl.trim());

    for (const param of [...url.searchParams.keys()]) {
      if (param.toLowerCase().startsWith('utm_') || ['fbclid', 'gclid', 'mc_cid', 'mc_eid'].includes(param.toLowerCase())) {
        url.searchParams.delete(param);
      }
    }

    url.hash = '';
    return url.toString();
  } catch {
    return rawUrl.trim();
  }
}

function normalizeArticle(item, feed) {
  const url = normalizeUrl(item.link || item.guid);
  const title = stripHtml(item.title || '');
  const description = shorten(item.contentSnippet || item.summary || item.content || item.contentEncoded || '');
  const publishedAt = item.isoDate || item.pubDate || null;

  if (!url || !title) return null;

  return {
    title,
    description,
    url,
    image_url: getImageUrl(item),
    source: feed.name,
    published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
    sent_to_telegram: false
  };
}

function escapeTelegramHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendTelegramMessage(article) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID em falta.');
  }

  const formattedDate = article.published_at
    ? new Intl.DateTimeFormat('pt-PT', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Europe/Lisbon'
      }).format(new Date(article.published_at))
    : 'Data desconhecida';

  const text = [
    '🧠 <b>Nova notícia sobre AI</b>',
    '',
    escapeTelegramHtml(article.title),
    '',
    `Fonte: ${escapeTelegramHtml(article.source || 'Fonte desconhecida')}`,
    `Data: ${escapeTelegramHtml(formattedDate)}`,
    '',
    escapeTelegramHtml(article.url)
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: false
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Erro Telegram ${response.status}: ${body}`);
  }
}

async function articleExists(url) {
  const { data, error } = await supabase
    .from('news')
    .select('id')
    .eq('url', url)
    .maybeSingle();

  if (error) throw error;

  return Boolean(data);
}

async function insertArticle(article) {
  const { data, error } = await supabase
    .from('news')
    .insert(article)
    .select('id')
    .single();

  if (error) throw error;

  return data.id;
}

async function markAsSent(id) {
  const { error } = await supabase
    .from('news')
    .update({ sent_to_telegram: true })
    .eq('id', id);

  if (error) throw error;
}

async function processArticle(article) {
  const exists = await articleExists(article.url);

  if (exists) {
    console.log(`⏭️  Já existe: ${article.title}`);
    return { inserted: false };
  }

  const id = await insertArticle(article);
  console.log(`✅ Inserida: ${article.title}`);

  try {
    await sendTelegramMessage(article);
    await markAsSent(id);
    console.log(`📨 Telegram enviado: ${article.title}`);
  } catch (error) {
    console.error(`⚠️ Notícia inserida, mas falhou Telegram: ${article.title}`);
    console.error(error.message);
  }

  return { inserted: true };
}

async function fetchFeed(feed) {
  try {
    console.log(`\n📡 A ler feed: ${feed.name}`);
    const parsedFeed = await parser.parseURL(feed.url);
    return parsedFeed.items.map((item) => normalizeArticle(item, feed)).filter(Boolean);
  } catch (error) {
    console.error(`❌ Falha ao ler ${feed.name}: ${error.message}`);
    return [];
  }
}

async function main() {
  let insertedCount = 0;
  let seenInThisRun = new Set();

  for (const feed of FEEDS) {
    const articles = await fetchFeed(feed);

    for (const article of articles) {
      if (seenInThisRun.has(article.url)) {
        console.log(`🔁 Duplicada no mesmo ciclo: ${article.title}`);
        continue;
      }

      seenInThisRun.add(article.url);

      try {
        const result = await processArticle(article);
        if (result.inserted) insertedCount += 1;
      } catch (error) {
        console.error(`❌ Erro ao processar artigo: ${article.title}`);
        console.error(error.message);
      }
    }
  }

  console.log(`\n🏁 Concluído. Notícias novas inseridas: ${insertedCount}`);
}

main().catch((error) => {
  console.error('❌ Erro fatal no script.');
  console.error(error);
  process.exit(1);
});
