import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';

const SORT_COLUMN_BY_ROLE = {
	team: 'team_sort_order',
	creator: 'creator_sort_order',
	home: 'home_sort_order',
} as const;

type RosterRole = keyof typeof SORT_COLUMN_BY_ROLE;

function isRosterRole(value: unknown): value is RosterRole {
	return typeof value === 'string' && value in SORT_COLUMN_BY_ROLE;
}

// POST /api/admin/roster/reorder - Persist a new drag-and-drop order for one role list
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
		const { role, orderedIds } = body;

		if (!isRosterRole(role)) {
			return NextResponse.json(
				{ error: 'role must be one of "team", "creator", or "home"' },
				{ status: 400 },
			);
		}

		if (
			!Array.isArray(orderedIds) ||
			orderedIds.some((id) => typeof id !== 'string')
		) {
			return NextResponse.json(
				{ error: 'orderedIds must be an array of member ids' },
				{ status: 400 },
			);
		}

		const sortColumn = SORT_COLUMN_BY_ROLE[role];

		const results = await Promise.all(
			orderedIds.map((id: string, index: number) =>
				supabase
					.from('roster_members')
					.update({ [sortColumn]: index })
					.eq('id', id),
			),
		);

		const failed = results.find((result) => result.error);
		if (failed?.error) {
			throw failed.error;
		}

		return NextResponse.json({ message: 'Order updated successfully' });
	} catch (error) {
		console.error('Error reordering roster members:', error);
		return NextResponse.json(
			{ error: 'Failed to reorder roster members' },
			{ status: 500 },
		);
	}
}
