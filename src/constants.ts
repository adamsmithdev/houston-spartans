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
		id: 'garrett-mitchell',
		fullName: 'Garrett Mitchell',
		gamertag: 'CARRETTTOP',
		orgRole: 'General Manager',
		picture: '/images/people/headshots/profile-carretttop.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/HSTXCARRETTTOP',
			},
		],
	},
	{
		id: 'colton-english',
		fullName: 'Colton English',
		gamertag: 'DANK',
		orgRole: 'Esports Director',
		picture: '/images/people/headshots/profile-dank.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/DANK____1',
			},
		],
	},
	{
		id: 'kujoh',
		fullName: 'Eric',
		gamertag: 'Kujoh',
		orgRole: 'Rocket League Manager',
		picture: '/images/people/headshots/profile-kujoh.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/ImKujoh',
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
		id: 'freakyszn',
		fullName: '',
		gamertag: 'FreakySZN',
		orgRole: 'CC Manager',
		picture: '/images/people/headshots/profile-freakyszn.png',
		socialLinks: [
			{ platform: 'x', url: 'https://x.com/xFreakySZNx' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/xfreakyszn' },
		],
	},
	{
		id: 'dblduty',
		fullName: '',
		gamertag: 'DBLduty',
		orgRole: 'CC Manager',
		picture: '/images/people/headshots/profile-dblduty.png',
		socialLinks: [
			{ platform: 'kick', url: 'https://kick.com/dblduty' },
			{ platform: 'x', url: 'https://x.com/dbldtydadx13' },
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
		id: 'molitor',
		fullName: 'Mike',
		gamertag: 'Molitor',
		orgRole: 'Esports School Director',
		picture: '/images/people/headshots/profile-molitor.png',
		socialLinks: [],
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
		id: 'trae-pancerella',
		fullName: 'Trae Pancerella',
		gamertag: 'Apollo',
		orgRole: 'Legacy',
		picture: '/images/people/headshots/profile-apollo.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/ihyApollo',
			},
		],
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
		id: 'jadedfox',
		fullName: '',
		gamertag: 'JadedFox',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-jadedfox.png',
		socialLinks: [
			{
				platform: 'x',
				url: 'https://x.com/JadedFox',
			},
			{
				platform: 'twitch',
				url: 'https://www.twitch.tv/JadedFox6',
			},
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
		id: 'leedlely',
		fullName: '',
		gamertag: 'LeedleLy',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-leedlely.png',
		socialLinks: [
			{ platform: 'tiktok', url: 'https://www.tiktok.com/@leedlely' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/leedle_ly' },
			{ platform: 'x', url: 'https://x.com/LeedleLyHSTX' },
		],
	},
	{
		id: 'nyx',
		fullName: '',
		gamertag: 'nyx',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-nyx.png',
		socialLinks: [
			{ platform: 'x', url: 'https://x.com/nyxxrll' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/nyxxrll' },
		],
	},
	{
		id: 'mrsworldwide',
		fullName: '',
		gamertag: 'MrsWorldwide',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-mrsworldwide.png',
		socialLinks: [
			{ platform: 'twitch', url: 'https://www.twitch.tv/xMrsWorldwide' },
		],
	},
	{
		id: 'tfjoker',
		fullName: '',
		gamertag: 'TFJoker',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-tfjoker.png',
		socialLinks: [{ platform: 'twitch', url: 'https://www.twitch.tv/TFJok3r' }],
	},
	{
		id: 'freakyszn',
		fullName: '',
		gamertag: 'FreakySZN',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-freakyszn.png',
		socialLinks: [
			{ platform: 'x', url: 'https://x.com/xFreakySZNx' },
			{ platform: 'twitch', url: 'https://www.twitch.tv/xfreakyszn' },
		],
	},
	{
		id: 'yogabagaba91',
		fullName: '',
		gamertag: 'Yo_Gabagaba',
		creatorTier: 'Content Creator',
		picture: '/images/people/headshots/profile-yogabagaba91.png',
		socialLinks: [
			{ platform: 'twitch', url: 'https://www.twitch.tv/gabrielarivas91' },
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
