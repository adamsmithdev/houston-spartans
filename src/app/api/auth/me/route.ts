import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
	try {
		const supabase = await createClient();

		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 401 });
		}

		if (!user) {
			return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
		}

		// Get user profile from our users table
		const { data: profile, error: profileError } = await supabase
			.from('users')
			.select('*')
			.eq('id', user.id)
			.single();

		// Handle case where users table doesn't exist or user profile doesn't exist
		if (
			profileError &&
			profileError.code !== 'PGRST116' &&
			profileError.code !== 'PGRST205'
		) {
			console.error('Error fetching user profile:', profileError);
			return NextResponse.json(
				{ error: 'Error fetching profile' },
				{ status: 500 },
			);
		}

		const userProfile = {
			id: user.id,
			email: user.email!,
			full_name: profile?.full_name || null,
			gamertag: profile?.gamertag || null,
			avatar_url: profile?.avatar_url || null,
			bio: profile?.bio || null,
			role: profile?.role || 'member',
			created_at: profile?.created_at || user.created_at,
			updated_at: profile?.updated_at || user.updated_at || user.created_at,
		};

		return NextResponse.json({ user: userProfile });
	} catch (error) {
		console.error('Get user error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
