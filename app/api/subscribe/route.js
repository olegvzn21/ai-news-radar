import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

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
      message: 'Obrigado! Entraste na lista com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao guardar subscriber:', error);

    return NextResponse.json(
      { error: 'Não foi possível guardar o email.' },
      { status: 500 }
    );
  }
}