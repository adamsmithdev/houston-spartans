// Twitch configuration constants
export const TWITCH_CONFIG = {
	channelName: 'spart',
	channelUrl: 'https://twitch.tv/spart',
	embedParents: ['localhost', 'houstonspartans.com', 'www.houstonspartans.com'],
	pollInterval: 120000, // 2 minutes
} as const;

export const SOCIAL_LINKS = [
	{
		platform: 'twitch',
		url: 'https://twitch.tv/spart',
		label: 'Twitch',
	},
	{
		platform: 'x',
		url: 'https://x.com/itsspart',
		label: 'X / Twitter',
	},
] as const;

export const OFFLINE_LINKS = [
	{
		icon: 'fa-video',
		label: 'Watch Past Streams',
		url: 'https://twitch.tv/spart/videos',
	},
	{
		icon: 'fa-film',
		label: 'View Highlights',
		url: 'https://twitch.tv/spart/clips',
	},
] as const;
