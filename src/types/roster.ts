export interface SocialLink {
	readonly platform: string;
	readonly url: string;
}

export interface RosterMember {
	readonly id: string;
	readonly full_name: string;
	readonly gamertag: string | null;
	readonly picture_url: string | null;
	readonly social_links: ReadonlyArray<SocialLink>;

	readonly is_team_member: boolean;
	readonly team_role: string | null;

	readonly is_creator: boolean;
	readonly creator_tier: string | null;

	readonly is_featured_home: boolean;

	readonly team_sort_order: number;
	readonly creator_sort_order: number;
	readonly home_sort_order: number;
	readonly is_published: boolean;

	readonly created_at: string;
	readonly updated_at: string;
}
