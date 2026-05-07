import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

function check(name) {
  const value = process.env[name];

  console.log(name, {
    exists: Boolean(value),
    length: value ? value.length : 0,
    startsWith: value ? value.slice(0, 12) : null,
    endsWith: value ? value.slice(-8) : null,
    hasSpaces: value ? /\s/.test(value) : false,
  });
}

check('NEXT_PUBLIC_SUPABASE_URL');
check('NEXT_PUBLIC_SUPABASE_ANON_KEY');
check('SUPABASE_SERVICE_ROLE_KEY');
check('TELEGRAM_BOT_TOKEN');
check('TELEGRAM_CHAT_ID');