// ============================================================
//  SCARLET HAUL — Supabase client
//  Replace the two values below with your own from supabase.com
//  Project Settings → API → URL and anon key
// ============================================================
const SUPABASE_URL = 'https://ulxlahfbwjrzlxjoejxf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGxhaGZid2pyemx4am9lanhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNzE2MzcsImV4cCI6MjA5MDc0NzYzN30.2KO4UzD6bjOM9DeqNg9KbpwaZaMoc2Bt04k4vnRtDsc';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
