// ============================================================
//  SCARLET HAUL — Supabase client
//  Replace the two values below with your own from supabase.com
//  Project Settings → API → URL and anon key
// ============================================================
const SUPABASE_URL = 'https://ulxlahfbwjrzlxjoejxf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGxhaGZid2pyemx4am9lanhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE3MTYzNywiZXhwIjoyMDkwNzQ3NjM3fQ.MX15d4lYEyIyVnE5qPOngSFo5Wk7m9XqC6g0aiC8sgQ';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
