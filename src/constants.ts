export const HOUSTON_SPARTANS_STORE_URL =
	'https://soardogg.com/?s=houston+spartans&post_type=product';

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
