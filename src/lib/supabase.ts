import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

// Cookie-based browser client so the session is shared with the SSR
// middleware (which reads auth from cookies via @supabase/ssr). A plain
// supabase-js client would store the session in localStorage only, and the
// middleware would never see it — bouncing every protected route back to /auth.
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
