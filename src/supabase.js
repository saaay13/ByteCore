import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yyhjugmkmwfjtgdvetjf.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5aGp1Z21rbXdmanRnZHZldGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDg3NTIsImV4cCI6MjA2MDgyNDc1Mn0.zsu26YumbZgfeNu-9D1gn9GC4jbHkEkGVsofFZrQkco'
export const supabase = createClient(supabaseUrl, supabaseKey);
