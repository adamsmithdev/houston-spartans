'use client';

import { Container, SectionHeading } from '@/components/ui';
import { useTwitchStream } from './hooks/useTwitchStream';
import LiveStreamInfo from './components/LiveStreamInfo';
import OfflineStreamPrompt from './components/OfflineStreamPrompt';
import SocialLinks from './components/SocialLinks';
import { TWITCH_CONFIG, SOCIAL_LINKS, OFFLINE_LINKS } from './constants';
import styles from './AboutSpart.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function AboutSpart() {
	const { streamStatus } = useTwitchStream({
		channel: TWITCH_CONFIG.channelName,
		pollInterval: TWITCH_CONFIG.pollInterval,
	});

	return (
		<section className={styles.spartSection}>
			<Container>
				<SectionHeading level={2}>
					FOLLOW{' '}
					<span className={globalStyles.headingHighlight}>SPART&apos;S</span>{' '}
					JOURNEY
				</SectionHeading>

				<div className={styles.content}>
					<div className={styles.textContent}>
						<p>
							Today, Spart continues to compete at the highest level while
							building the Houston Spartans organization. His passion for
							competitive Call of Duty and commitment to nurturing the next
							generation of esports talent drives everything we do.
						</p>
						<p>
							Follow along as he streams competitive gameplay, shares insights
							from years of professional experience, and works alongside the
							Spartans community to create opportunities for aspiring players.
							Whether you&apos;re looking to improve your game, stay updated on
							the competitive scene, or just enjoy high-level gameplay,
							Spart&apos;s channels are where the action happens.
						</p>

						<SocialLinks links={SOCIAL_LINKS} />
					</div>

					{streamStatus.isLive ? (
						<LiveStreamInfo
							streamStatus={streamStatus}
							channelUrl={TWITCH_CONFIG.channelUrl}
							channelName={TWITCH_CONFIG.channelName}
							embedParents={TWITCH_CONFIG.embedParents}
						/>
					) : (
						<OfflineStreamPrompt
							channelUrl={TWITCH_CONFIG.channelUrl}
							offlineLinks={OFFLINE_LINKS}
						/>
					)}
				</div>
			</Container>
		</section>
	);
}
