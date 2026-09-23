import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/roster?role=team|creator|home - Published roster members for public pages
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const role = searchParams.get('role');

		const supabase = await createClient();

		let query = supabase
			.from('roster_members')
			.select('*')
			.eq('is_published', true);

		if (role === 'team') {
			query = query
				.eq('is_team_member', true)
				.order('team_sort_order', { ascending: true });
		} else if (role === 'creator') {
			query = query
				.eq('is_creator', true)
				.order('creator_sort_order', { ascending: true });
		} else if (role === 'home') {
			query = query
				.eq('is_featured_home', true)
				.order('home_sort_order', { ascending: true });
		} else {
			query = query.order('full_name', { ascending: true });
		}

		const { data: members, error } = await query;

		if (error) {
			throw error;
		}

		return NextResponse.json({ members: members ?? [] });
	} catch (error) {
		console.error('Error fetching roster members:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch roster members' },
			{ status: 500 },
		);
	}
}
