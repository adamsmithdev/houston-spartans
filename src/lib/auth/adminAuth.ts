import { createClient } from '@/lib/supabase/server';

/**
 * Shared authentication check for admin users
 * Returns either user/supabase client or error details
 */
export async function checkAdminAuth() {
	const supabase = await createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return { error: 'Not authenticated', status: 401 };
	}

	// Get user profile to check role
	const { data: profile, error: profileError } = await supabase
		.from('users')
		.select('role')
		.eq('id', user.id)
		.single();

	if (profileError || !profile || profile.role !== 'admin') {
		return { error: 'Access denied. Admin role required.', status: 403 };
	}

	return { user, supabase };
}

/**
 * Type guard to check if auth result contains an error
 */
export function isAuthError(
	result: Awaited<ReturnType<typeof checkAdminAuth>>,
): result is { error: string; status: number } {
	return 'error' in result;
}
