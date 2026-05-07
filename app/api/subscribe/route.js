import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function isValidEmail(email) {
  if (!email) return false;
  if (email.length > 254) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Variáveis Supabase em falta no servidor.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body?.email?.trim().toLowerCase();
    const website = body?.website?.trim();

    // Honeypot: bots costumam preencher campos escondidos
    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Obrigado! Entraste na lista.'
      });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();

    const { error } = await supabase
      .from('subscribers')
      .upsert(
        {
          email,
          source: 'website'
        },
        {
          onConflict: 'email',
          ignoreDuplicates: true
        }
      );

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Obrigado! Entraste na lista.'
    });
  } catch (error) {
    console.error('Erro ao guardar subscriber:', error);

    return NextResponse.json(
      { error: 'Não foi possível guardar o email neste momento.' },
      { status: 500 }
    );
  }
}