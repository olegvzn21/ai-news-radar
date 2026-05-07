import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL existe:', Boolean(supabaseUrl));
console.log('Service key existe:', Boolean(serviceRoleKey));
console.log('URL:', supabaseUrl);
console.log('Service key começa com:', serviceRoleKey?.slice(0, 20));
console.log('Service key tamanho:', serviceRoleKey?.length);

const supabase = createClient(supabaseUrl, serviceRoleKey);

const { data, error } = await supabase
  .from('news')
  .select('id,title')
  .limit(1);

if (error) {
  console.error('ERRO SUPABASE:', error);
} else {
  console.log('SUCESSO:', data);
}