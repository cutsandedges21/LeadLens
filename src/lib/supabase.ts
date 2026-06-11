import { createBrowserClient } from '@supabase/ssr';

// Fall back to a placeholder when the env vars are missing OR empty. Using `||`
// (not `??`) so an empty string also falls back. This prevents a hard throw at
// module load, which would otherwise crash the production build / Vercel
// page-data collection when the vars aren't configured.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. ' +
      'Auth and database features will not work until these are configured (e.g. in Vercel project settings).'
  );
}

// Cookie-based browser client so the session is shared with the SSR middleware.
// A plain supabase-js client would store the session in localStorage only, and
// the middleware would never see it — bouncing every protected route to /auth.
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
