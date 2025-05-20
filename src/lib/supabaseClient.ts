import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// These would normally be environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);