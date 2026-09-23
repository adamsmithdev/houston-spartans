import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';
import {
	ROSTER_VALIDATION_LIMITS,
	validateRosterMember,
} from '@/lib/validators/rosterValidator';

// GET /api/admin/roster - List all roster members (including unpublished)
export async function GET(request: NextRequest) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const { searchParams } = new URL(request.url);

		const role = searchParams.get('role'); // 'team' | 'creator' | 'home' | null
		const search = searchParams.get('search');

		let query = supabase.from('roster_members').select('*');

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

		if (search) {
			query = query.or(
				`full_name.ilike.%${search}%, gamertag.ilike.%${search}%`,
			);
		}

		const { data: members, error } = await query;

		if (error) {
			throw error;
		}

		return NextResponse.json({ members });
	} catch (error) {
		console.error('Error fetching roster members:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch roster members' },
			{ status: 500 },
		);
	}
}

// POST /api/admin/roster - Create new roster member
export async function POST(request: NextRequest) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const body = await request.json();

		const {
			full_name,
			gamertag,
			picture_url,
			social_links = [],
			is_team_member = false,
			team_role,
			is_creator = false,
			creator_tier,
			is_featured_home = false,
			is_published = false,
		} = body;

		const validation = validateRosterMember({
			fullName: full_name || '',
			gamertag,
			isTeamMember: is_team_member,
			teamRole: team_role,
			isCreator: is_creator,
			creatorTier: creator_tier,
			isFeaturedHome: is_featured_home,
			socialLinks: Array.isArray(social_links) ? social_links : [],
		});

		if (!validation.isValid) {
			return NextResponse.json(
				{ error: 'Validation failed', details: validation.errors },
				{ status: 400 },
			);
		}

		if (is_featured_home) {
			const { count, error: countError } = await supabase
				.from('roster_members')
				.select('id', { count: 'exact', head: true })
				.eq('is_featured_home', true);

			if (countError) {
				throw countError;
			}

			if ((count ?? 0) >= ROSTER_VALIDATION_LIMITS.homeSpotlight.max) {
				return NextResponse.json(
					{
						error: `Homepage spotlight is full (max ${ROSTER_VALIDATION_LIMITS.homeSpotlight.max}). Unfeature another member first.`,
					},
					{ status: 409 },
				);
			}
		}

		const memberData = {
			full_name: full_name?.trim() || '',
			gamertag: gamertag.trim(),
			picture_url: picture_url || null,
			social_links: Array.isArray(social_links) ? social_links : [],
			is_team_member,
			team_role: is_team_member ? team_role?.trim() || null : null,
			is_creator,
			creator_tier: is_creator ? creator_tier?.trim() || null : null,
			is_featured_home,
			is_published,
		};

		const { data: member, error } = await supabase
			.from('roster_members')
			.insert([memberData])
			.select()
			.single();

		if (error) {
			throw error;
		}

		return NextResponse.json({ member }, { status: 201 });
	} catch (error) {
		console.error('Error creating roster member:', error);
		return NextResponse.json(
			{ error: 'Failed to create roster member' },
			{ status: 500 },
		);
	}
}
