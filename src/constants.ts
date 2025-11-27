export const HOUSTON_SPARTANS_STORE_URL =
	'https://soardogg.com/?s=houston+spartans&post_type=product';

// Team Members Data
export const TEAM_MEMBERS = [
	{
		id: 'chris-cervantez',
		fullName: 'Chris Cervantez',
		gamertag: 'PapaSpart',
		orgRole: 'Owner',
		picture: '/images/people/headshots/profile-papaspart.png',
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
		picture: '/images/people/headshots/profile-apollo.png',
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
		picture: '/images/people/headshots/profile-darkszn.png',
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
		picture: '/images/people/headshots/profile-kevology.png',
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
		picture: '/images/people/headshots/profile-jadedfox.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/JadedFox',
			},
		],
	},
	{
		id: 'adam',
		fullName: 'Adam Smith',
		gamertag: 'Cypphex',
		orgRole: 'Website Development Director',
		picture: '/images/people/headshots/profile-cypphex.png',
		socialLinks: [],
	},
	{
		id: 'matt-delatorre',
		fullName: 'Matt DeLaTorre',
		gamertag: 'Stryker',
		orgRole: 'Legacy',
		picture: '/images/people/headshots/profile-stryker.png',
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
		picture: '/images/people/headshots/profile-xogrinchy.png',
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
		picture: '/images/people/headshots/profile-lilspart.png',
		socialLinks: [],
	},
	{
		id: 'kourtney',
		fullName: 'Kourtney',
		gamertag: 'Kourtney',
		orgRole: 'Legacy',
		picture: '/images/people/headshots/profile-kourtney.png',
		socialLinks: [],
	},
] as const;

// Content Creator Program Tiers
export const CREATOR_PROGRAM_TIERS = [
	{
		id: 'spartan-recruit',
		name: 'Content Creator',
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
	{
		id: 'arrow',
		fullName: 'Jaia Burkhalter',
		gamertag: 'Arrow',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-arrow.png',
		socialLinks: [
			{ platform: 'instagram', url: 'http://instagram.com/bestintown7549_' },
			{ platform: 'twitch', url: 'https://twitch.tv/bestintown7549' },
			{
				platform: 'youtube',
				url: 'https://www.youtube.com/@HTXBestInTown7549',
			},
		],
	},
	{
		id: 'ciscodisco',
		fullName: '',
		gamertag: 'Cisco Disco',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-ciscodisco.png',
		socialLinks: [
			{ platform: 'kick', url: 'https://kick.com/ciscodisco1618' },
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@ciscodisco1618' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/ciscodisco1618' },
			{ platform: 'x', url: 'https://x.com/ciscodisco1618' },
			{ platform: 'youtube', url: 'https://www.youtube.com/@CiscoDisco1618' },
		],
	},
	{
		id: 'Col3Train',
		fullName: '',
		gamertag: 'Col3Train',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-col3train.png',
		socialLinks: [
			{ platform: 'kick', url: 'https://kick.com/col3train' },
			{ platform: 'x', url: 'https://x.com/Col3TrainFBGG' },
		],
	},
	{
		id: 'dblduty',
		fullName: '',
		gamertag: 'DBLduty',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-dblduty.png',
		socialLinks: [
			{ platform: 'kick', url: 'https://kick.com/dblduty' },
			{ platform: 'x', url: 'https://x.com/dbldtydadx13' },
		],
	},
	{
		id: 'hawntingly',
		fullName: '',
		gamertag: 'Hawntingly',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-hawntingly.png',
		socialLinks: [
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@hawntingly' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/hawntingly' },
			{ platform: 'x', url: 'https://x.com/hawntingly' },
		],
	},
	{
		id: 'kevology',
		fullName: '',
		gamertag: 'Kevology',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-kevology.png',
		socialLinks: [
			{ platform: 'kick', url: 'https://kick.com/kevology' },
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@xkevologyx' },
			{ platform: 'x', url: 'https://x.com/xkevology' },
			{ platform: 'youtube', url: 'https://www.youtube.com/@xkevologyx' },
		],
	},
	{
		id: 'massacre',
		fullName: '',
		gamertag: 'Massacre',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-massacre.png',
		socialLinks: [
			{ platform: 'x', url: 'https://x.com/massacre_nl' },
			{ platform: 'youtube', url: 'https://www.youtube.com/@massacre_nl' },
		],
	},
	{
		id: 'mysteryy',
		fullName: '',
		gamertag: 'Mysteryy',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-mysteryy.png',
		socialLinks: [
			{
				platform: 'instagram',
				url: 'https://www.instagram.com/weluvumysteryy',
			},
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@whosthatmysteryy' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/issamysteryy' },
			{ platform: 'x', url: 'https://x.com/whosthatmystery' },
		],
	},
	{
		id: 'rhino',
		fullName: 'Griffin Wells',
		gamertag: 'Rhino',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-rhino.png',
		socialLinks: [
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@griffinwells1' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/issamysteryy' },
			{ platform: 'x', url: 'https://x.com/rhino_vizualz' },
			{ platform: 'youtube', url: 'https://www.youtube.com/@massacre_nl' },
		],
	},
	{
		id: 'sofrito',
		fullName: 'Carlos Carvalho',
		gamertag: 'SoFrito',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-sofrito.png',
		socialLinks: [
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@sofritogaming' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/sofritogaming' },
			{ platform: 'x', url: 'https://x.com/sofritogaming' },
			{ platform: 'youtube', url: 'https://www.youtube.com/@sofritogaming' },
		],
	},
	{
		id: 'voltz',
		fullName: '',
		gamertag: 'Voltz',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-voltz.png',
		socialLinks: [
			{ platform: 'twitch', url: 'https://www.twitch.tv/voltz_9120' },
			{ platform: 'x', url: 'https://x.com/voltz_9120' },
		],
	},
	{
		id: 'pescarodb',
		fullName: 'Drew Pescaro',
		gamertag: 'PescaroDB',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-pescarodb.png',
		socialLinks: [
			{ platform: 'twitch', url: 'https://www.twitch.tv/pescarodb' },
			{ platform: 'x', url: 'https://x.com/pescarodb' },
		],
	},
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
