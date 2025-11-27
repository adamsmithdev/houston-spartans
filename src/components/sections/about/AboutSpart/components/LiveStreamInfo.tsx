import { TwitchIcon } from '@/components/icons';
import type { StreamStatus } from '../hooks/useTwitchStream';
import TwitchStreamEmbed from './TwitchStreamEmbed';
import styles from '../AboutSpart.module.css';

interface LiveStreamInfoProps {
	readonly streamStatus: StreamStatus;
	readonly channelUrl: string;
	readonly channelName: string;
	readonly embedParents: readonly string[];
}

export default function LiveStreamInfo({
	streamStatus,
	channelUrl,
	channelName,
	embedParents,
}: LiveStreamInfoProps) {
	return (
		<div className={styles.streamContainer}>
			<div className={styles.streamHeader}>
				<div className={styles.liveIndicator}>
					<span className={styles.liveDot}></span>
					<span className={styles.liveText}>LIVE NOW</span>
				</div>
				<a
					href={channelUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.twitchLink}
				>
					<TwitchIcon />
					<span>Open in Twitch</span>
				</a>
			</div>

			<div className={styles.streamInfo}>
				<div className={styles.streamGame}>
					<i className="fas fa-gamepad"></i>
					<span>{streamStatus.game || 'Gaming'}</span>
				</div>
				{streamStatus.viewerCount && (
					<div className={styles.viewerCount}>
						<i className="fas fa-eye"></i>
						<span>{streamStatus.viewerCount.toLocaleString()} viewers</span>
					</div>
				)}
			</div>

			{streamStatus.title && (
				<p className={styles.streamTitleText}>{streamStatus.title}</p>
			)}

			<TwitchStreamEmbed channel={channelName} parents={embedParents} />
		</div>
	);
}
