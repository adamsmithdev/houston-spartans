import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for build-time operations
 * This client doesn't use cookies and is safe to use in generateStaticParams
 */
export function createBuildClient() {
	return createSupabaseClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
}
