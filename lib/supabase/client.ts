import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kzjyetclbsljbjkarlpc.supabase.co'
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'sb_publishable_dgzwe5XyZeP8SvXjsqDShQ_cB8D6M9M'

  if (!supabaseUrl || !supabasePublishableKey) {
    return null
  }

  return createBrowserClient(supabaseUrl, supabasePublishableKey)
}
