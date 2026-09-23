'use server';

import { createClient } from '@/lib/supabase/server';
import { ROSTER_VALIDATION_LIMITS } from '@/lib/validators/rosterValidator';
import { type RosterMember } from '@/types/roster';

/**
 * Get all published Team / Staff members, ordered for the Teams page
 */
export async function getTeamMembers(): Promise<RosterMember[]> {
	try {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from('roster_members')
			.select('*')
			.eq('is_published', true)
			.eq('is_team_member', true)
			.order('team_sort_order', { ascending: true });

		if (error) {
			console.error('Error fetching team members:', error);
			return [];
		}

		return data as RosterMember[];
	} catch (error) {
		console.error('Error in getTeamMembers:', error);
		return [];
	}
}

/**
 * Get all published Content Creators, ordered for the Creators page
 */
export async function getContentCreators(): Promise<RosterMember[]> {
	try {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from('roster_members')
			.select('*')
			.eq('is_published', true)
			.eq('is_creator', true)
			.order('creator_sort_order', { ascending: true });

		if (error) {
			console.error('Error fetching content creators:', error);
			return [];
		}

		return data as RosterMember[];
	} catch (error) {
		console.error('Error in getContentCreators:', error);
		return [];
	}
}

/**
 * Get all published members featured on the homepage spotlight
 */
export async function getFeaturedHomeMembers(): Promise<RosterMember[]> {
	try {
		const supabase = await createClient();

		const { data, error } = await supabase
			.from('roster_members')
			.select('*')
			.eq('is_published', true)
			.eq('is_featured_home', true)
			.order('home_sort_order', { ascending: true })
			.limit(ROSTER_VALIDATION_LIMITS.homeSpotlight.max);

		if (error) {
			console.error('Error fetching featured home members:', error);
			return [];
		}

		return data as RosterMember[];
	} catch (error) {
		console.error('Error in getFeaturedHomeMembers:', error);
		return [];
	}
}
