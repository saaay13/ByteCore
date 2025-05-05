import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rpcfccukbgvjfthryawb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwY2ZjY3VrYmd2amZ0aHJ5YXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NDE2ODUsImV4cCI6MjA2MjAxNzY4NX0.vfazTiym5mqQFnYR2Vh5yj8-xtK0cR2AYyvJKQuNHnE';

export const supabase = createClient(supabaseUrl, supabaseKey);
