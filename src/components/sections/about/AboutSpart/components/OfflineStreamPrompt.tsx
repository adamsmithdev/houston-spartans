import { Button, ButtonGroup } from '@/components/ui';
import styles from '../AboutSpart.module.css';

interface OfflineLink {
	readonly icon: string;
	readonly label: string;
	readonly url: string;
}

interface OfflineStreamPromptProps {
	readonly channelUrl: string;
	readonly offlineLinks: readonly OfflineLink[];
}

export default function OfflineStreamPrompt({
	channelUrl,
	offlineLinks,
}: OfflineStreamPromptProps) {
	return (
		<div className={styles.offlineContainer}>
			<div className={styles.highlightContent}>
				<div className={styles.highlightIcon}>
					<i className="fas fa-broadcast-tower"></i>
				</div>
				<h3>CATCH SPART LIVE</h3>
				<p>
					Spart is currently offline, but you can follow his channel to get
					notified when he goes live! Watch him compete in Call of Duty
					tournaments, grind ranked matches, and share insights from years of
					professional experience.
				</p>
				<ButtonGroup>
					<Button href={channelUrl} variant="primary">
						FOLLOW ON TWITCH <i className="fas fa-heart"></i>
					</Button>
				</ButtonGroup>
				<div className={styles.offlineLinks}>
					{offlineLinks.map((link) => (
						<a
							key={link.url}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.offlineLink}
						>
							<i className={`fas ${link.icon}`}></i>
							<span>{link.label}</span>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
