import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';
import {
	ROSTER_VALIDATION_LIMITS,
	validateRosterMember,
} from '@/lib/validators/rosterValidator';

interface RouteParams {
	params: Promise<{ id: string }>;
}

// GET /api/admin/roster/[id] - Get specific roster member
export async function GET(_request: NextRequest, { params }: RouteParams) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const { id } = await params;

		const { data: member, error } = await supabase
			.from('roster_members')
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Roster member not found' },
					{ status: 404 },
				);
			}
			throw error;
		}

		return NextResponse.json({ member });
	} catch (error) {
		console.error('Error fetching roster member:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch roster member' },
			{ status: 500 },
		);
	}
}

// PUT /api/admin/roster/[id] - Update specific roster member
export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const { id } = await params;
		const body = await request.json();

		// Fetch the current row so fields the caller omits (e.g. the publish
		// toggle only sends role/status fields) are preserved rather than
		// silently wiped to null/empty on every PUT.
		const { data: currentMember, error: fetchError } = await supabase
			.from('roster_members')
			.select('*')
			.eq('id', id)
			.single();

		if (fetchError) {
			if (fetchError.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Roster member not found' },
					{ status: 404 },
				);
			}
			throw fetchError;
		}

		const full_name =
			body.full_name !== undefined ? body.full_name : currentMember.full_name;
		const gamertag =
			body.gamertag !== undefined ? body.gamertag : currentMember.gamertag;
		const picture_url =
			body.picture_url !== undefined
				? body.picture_url
				: currentMember.picture_url;
		const social_links =
			body.social_links !== undefined
				? body.social_links
				: currentMember.social_links;
		const is_team_member =
			body.is_team_member !== undefined
				? body.is_team_member
				: currentMember.is_team_member;
		const team_role =
			body.team_role !== undefined ? body.team_role : currentMember.team_role;
		const is_creator =
			body.is_creator !== undefined
				? body.is_creator
				: currentMember.is_creator;
		const creator_tier =
			body.creator_tier !== undefined
				? body.creator_tier
				: currentMember.creator_tier;
		const is_featured_home =
			body.is_featured_home !== undefined
				? body.is_featured_home
				: currentMember.is_featured_home;
		const { is_published } = body;

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
				.eq('is_featured_home', true)
				.neq('id', id);

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

		const updateData = {
			full_name: full_name?.trim() || '',
			gamertag: gamertag.trim(),
			picture_url: picture_url || null,
			social_links: Array.isArray(social_links) ? social_links : [],
			is_team_member,
			team_role: is_team_member ? team_role?.trim() || null : null,
			is_creator,
			creator_tier: is_creator ? creator_tier?.trim() || null : null,
			is_featured_home,
			...(is_published !== undefined && { is_published }),
		};

		const { data: member, error } = await supabase
			.from('roster_members')
			.update(updateData)
			.eq('id', id)
			.select()
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Roster member not found' },
					{ status: 404 },
				);
			}
			throw error;
		}

		return NextResponse.json({ member });
	} catch (error) {
		console.error('Error updating roster member:', error);
		return NextResponse.json(
			{ error: 'Failed to update roster member' },
			{ status: 500 },
		);
	}
}

// DELETE /api/admin/roster/[id] - Delete specific roster member
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const { id } = await params;

		const { error: fetchError } = await supabase
			.from('roster_members')
			.select('id')
			.eq('id', id)
			.single();

		if (fetchError) {
			if (fetchError.code === 'PGRST116') {
				return NextResponse.json(
					{ error: 'Roster member not found' },
					{ status: 404 },
				);
			}
			throw fetchError;
		}

		const { error } = await supabase
			.from('roster_members')
			.delete()
			.eq('id', id);

		if (error) {
			throw error;
		}

		return NextResponse.json(
			{ message: 'Roster member deleted successfully' },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Error deleting roster member:', error);
		return NextResponse.json(
			{ error: 'Failed to delete roster member' },
			{ status: 500 },
		);
	}
}
