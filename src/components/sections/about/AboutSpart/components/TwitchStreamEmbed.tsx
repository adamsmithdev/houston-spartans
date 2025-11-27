import styles from '../AboutSpart.module.css';

interface TwitchStreamEmbedProps {
	readonly channel: string;
	readonly parents: readonly string[];
}

export default function TwitchStreamEmbed({
	channel,
	parents,
}: TwitchStreamEmbedProps) {
	const parentParam = parents.join('&parent=');

	return (
		<div className={styles.embedWrapper}>
			<iframe
				src={`https://player.twitch.tv/?channel=${channel}&parent=${parentParam}`}
				height="100%"
				width="100%"
				allowFullScreen
				title={`${channel}'s Twitch Stream`}
			></iframe>
		</div>
	);
}
