import { createClient } from '@supabase/supabase-js';

// Le ponemos un texto de respaldo ('https://dummy.supabase.co') para que el Build 
// de Next.js/Vercel no explote si no encuentra las variables en el primer milisegundo.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

export const supabase = createClient(supabaseUrl, supabaseKey);