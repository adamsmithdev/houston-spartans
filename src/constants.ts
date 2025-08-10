export const HOUSTON_SPARTANS_STORE_URL =
	'https://soardogg.com/?s=houston+spartans&post_type=product';

// Team Members Data
export const TEAM_MEMBERS = [
	{
		id: 'chris-cervantez',
		fullName: 'Chris Cervantez',
		gamertag: 'PapaSpart',
		orgRole: 'Owner',
		picture: '/images/headshots/profile-papaspart.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/PapaSpart78',
			},
		],
	},
	{
		id: 'trae-pancerella',
		fullName: 'Trae Pancerella',
		gamertag: 'Apollo',
		orgRole: 'COD Director',
		picture: '/images/headshots/profile-apollo.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/ihyApollo',
			},
		],
	},
	{
		id: 'robert-duran',
		fullName: 'Robert Duran',
		gamertag: 'DarkSZN',
		orgRole: 'CC Manager',
		picture: '/images/headshots/profile-darkszn.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/DarkFPS31',
			},
		],
	},
	{
		id: 'kevin-tucker',
		fullName: 'Kevin Tucker',
		gamertag: 'Kevology',
		orgRole: 'Assistant',
		picture: '/images/headshots/profile-kevology.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/xKevology',
			},
		],
	},
	{
		id: 'jadedfox',
		fullName: 'JadedFox',
		gamertag: 'JadedFox',
		orgRole: 'Social Media Manager',
		picture: '/images/headshots/profile-jadedfox.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/JadedFox',
			},
		],
	},
	{
		id: 'matt-delatorre',
		fullName: 'Matt DeLaTorre',
		gamertag: 'Stryker',
		orgRole: 'Legacy',
		picture: '/images/headshots/profile-stryker.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/strykadelatorre',
			},
		],
	},
	{
		id: 'xogrinchy',
		fullName: 'xoGrinchy',
		gamertag: 'xoGrinchy',
		orgRole: 'Legacy',
		picture: '/images/headshots/profile-xogrinchy.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/xoGrinchy',
			},
		],
	},
	{
		id: 'lil-spart',
		fullName: 'Lil Spart',
		gamertag: 'Lil Spart',
		orgRole: 'Legacy',
		picture: '/images/headshots/profile-lilspart.png',
		socialLinks: [],
	},
	{
		id: 'kourtney',
		fullName: 'Kourtney',
		gamertag: 'Kourtney',
		orgRole: 'Legacy',
		picture: '/images/headshots/profile-kourtney.png',
		socialLinks: [],
	},
] as const;

// Content Creator Program Tiers
export const CREATOR_PROGRAM_TIERS = [
	{
		id: 'spartan-recruit',
		name: 'SPARTAN RECRUIT',
		requirements: [
			'500+ followers/subscribers on a primary platform',
			'Must be monetized on at least one platform',
		],
		incentives: ['Team merch and social shoutouts'],
		color: '#bc1616',
	},
	{
		id: 'spartan-elite',
		name: 'SPARTAN ELITE',
		requirements: [
			'2,500+ followers/subscribers and regular engagement',
			'Must be monetized on at least two platforms',
		],
		incentives: [
			'Higher commissions',
			'Co-streaming opportunities',
			'Event invitations',
		],
		color: '#ff6666',
	},
	{
		id: 'spartan-champion',
		name: 'SPARTAN CHAMPION',
		requirements: [
			'10,000+ followers/subscribers or exceptional engagement metrics',
		],
		incentives: [
			'Paid sponsorships',
			'Full merch kits',
			'Access to exclusive collaborations with Spartan players and sponsors',
		],
		color: '#ffaa66',
	},
] as const;

// Content Creators Data (placeholder for now)
export const CONTENT_CREATORS = [
	// Add content creators here when data is available
	// Example structure:
	// {
	//   id: 'creator-1',
	//   fullName: 'Creator Name',
	//   gamertag: 'CreatorTag',
	//   creatorTier: 'Spartan Recruit',
	//   picture: '/images/headshots/profile-creator.png',
	//   socialLinks: [
	//     { platform: 'twitch', url: 'https://twitch.tv/creator' },
	//     { platform: 'youtube', url: 'https://youtube.com/@creator' }
	//   ]
	// }
] as const;

export type ContentCreator = {
	readonly id: string;
	readonly fullName: string;
	readonly gamertag: string;
	readonly creatorTier: string;
	readonly picture?: string;
	readonly socialLinks: ReadonlyArray<{
		readonly platform: string;
		readonly url: string;
	}>;
};
