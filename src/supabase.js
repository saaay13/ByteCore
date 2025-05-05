// supabase.js
import { createClient } from '@supabase/supabase-js';

// Correcta extracción de variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crear el cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
