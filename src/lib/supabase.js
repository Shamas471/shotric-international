// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL     = 'https://wsliasfayrewbnrmlopq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbGlhc2ZheXJld2Jucm1sb3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODMzODUsImV4cCI6MjA5NzQ1OTM4NX0._sna3QfXKygeVv65hRkq_CmCteCkDlVWRmzChI-p5Y0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

