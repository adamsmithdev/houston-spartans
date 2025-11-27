import { useState, useEffect } from 'react';

export interface StreamStatus {
	isLive: boolean;
	title?: string;
	game?: string;
	viewerCount?: number;
	thumbnailUrl?: string;
}

interface UseTwitchStreamOptions {
	channel: string;
	pollInterval?: number;
}

export function useTwitchStream({
	channel,
	pollInterval = 120000,
}: UseTwitchStreamOptions) {
	const [streamStatus, setStreamStatus] = useState<StreamStatus>({
		isLive: false,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchStreamStatus = async () => {
			try {
				const response = await fetch(`/api/twitch/status?channel=${channel}`);

				if (!response.ok) {
					throw new Error('Failed to fetch stream status');
				}

				const data = await response.json();
				setStreamStatus(data);
				setError(null);
			} catch (err) {
				console.error('Error fetching stream status:', err);
				setError(err instanceof Error ? err : new Error('Unknown error'));
			} finally {
				setIsLoading(false);
			}
		};

		// Initial fetch
		fetchStreamStatus();

		// Poll at specified interval
		const interval = setInterval(fetchStreamStatus, pollInterval);

		return () => clearInterval(interval);
	}, [channel, pollInterval]);

	return { streamStatus, isLoading, error };
}
