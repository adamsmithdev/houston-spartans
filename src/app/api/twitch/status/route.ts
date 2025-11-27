import { NextResponse } from 'next/server';

interface TwitchTokenResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
}

interface TwitchStreamData {
	id: string;
	user_id: string;
	user_login: string;
	user_name: string;
	game_id: string;
	game_name: string;
	type: string;
	title: string;
	viewer_count: number;
	started_at: string;
	language: string;
	thumbnail_url: string;
	tag_ids: string[];
	is_mature: boolean;
}

interface TwitchStreamsResponse {
	data: TwitchStreamData[];
}

// Cache the token to avoid getting a new one on every request
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getTwitchAccessToken(): Promise<string> {
	// Return cached token if still valid
	if (cachedToken && Date.now() < tokenExpiry) {
		return cachedToken;
	}

	const clientId = process.env.TWITCH_CLIENT_ID;
	const clientSecret = process.env.TWITCH_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw new Error('Twitch API credentials not configured');
	}

	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
		{
			method: 'POST',
		},
	);

	if (!response.ok) {
		throw new Error('Failed to get Twitch access token');
	}

	const data: TwitchTokenResponse = await response.json();
	cachedToken = data.access_token;
	// Set expiry to 5 minutes before actual expiry for safety
	tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

	return cachedToken;
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const channel = searchParams.get('channel') || 'spart';

		const clientId = process.env.TWITCH_CLIENT_ID;
		if (!clientId) {
			return NextResponse.json(
				{ error: 'Twitch API not configured' },
				{ status: 500 },
			);
		}

		// Get access token
		const accessToken = await getTwitchAccessToken();

		// Check if stream is live
		const response = await fetch(
			`https://api.twitch.tv/helix/streams?user_login=${channel}`,
			{
				headers: {
					'Client-ID': clientId,
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch stream status');
		}

		const data: TwitchStreamsResponse = await response.json();
		const stream = data.data[0];

		if (stream) {
			// Stream is live
			return NextResponse.json(
				{
					isLive: true,
					title: stream.title,
					game: stream.game_name,
					viewerCount: stream.viewer_count,
					thumbnailUrl: stream.thumbnail_url
						.replace('{width}', '1920')
						.replace('{height}', '1080'),
					startedAt: stream.started_at,
				},
				{
					headers: {
						'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
					},
				},
			);
		} else {
			// Stream is offline
			return NextResponse.json(
				{
					isLive: false,
				},
				{
					headers: {
						'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60',
					},
				},
			);
		}
	} catch (error) {
		console.error('Error fetching Twitch status:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch stream status',
				isLive: false,
			},
			{ status: 500 },
		);
	}
}
