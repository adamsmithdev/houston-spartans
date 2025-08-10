import { Container, SectionHeading } from '@/components/ui';
import SpartanCard from './SpartanCard';
import { CONTENT_CREATORS, type ContentCreator } from '@/constants';
import {
	XIcon,
	TwitchIcon,
	YouTubeIcon,
	TikTokIcon,
	InstagramIcon,
} from '@/components/icons';
import styles from './ContentCreators.module.css';
import globalStyles from '@/styles/globals.module.css';

const getIconForPlatform = (platform: string) => {
	switch (platform) {
		case 'x':
			return <XIcon />;
		case 'twitch':
			return <TwitchIcon />;
		case 'youtube':
			return <YouTubeIcon />;
		case 'tiktok':
			return <TikTokIcon />;
		case 'instagram':
			return <InstagramIcon />;
		default:
			return null;
	}
};

export default function ContentCreators() {
	// Type assertion to work with the current empty array
	const creators = CONTENT_CREATORS as unknown as ContentCreator[];

	if (creators.length === 0) {
		return (
			<section className={styles.creatorsSection}>
				<Container>
					<SectionHeading level={2}>
						OUR <span className={globalStyles.headingHighlight}>CREATORS</span>
					</SectionHeading>

					<div className={styles.emptyState}>
						<div className={styles.emptyIcon}>
							<i className="fas fa-video"></i>
						</div>
						<h3>Content Creators Coming Soon</h3>
						<p>
							We&apos;re actively recruiting talented content creators to join
							the Houston Spartans family. Check out our Content Creator Program
							below to learn how you can be part of our team!
						</p>
					</div>
				</Container>
			</section>
		);
	}

	return (
		<section className={styles.creatorsSection}>
			<Container>
				<SectionHeading level={2}>
					OUR <span className={globalStyles.headingHighlight}>CREATORS</span>
				</SectionHeading>

				<div className={styles.creatorsGrid}>
					{creators.map((creator) => (
						<SpartanCard
							key={creator.id}
							id={creator.id}
							fullName={creator.fullName}
							gamertag={creator.gamertag}
							orgRole={creator.creatorTier}
							picture={creator.picture}
							socialLinks={creator.socialLinks
								.map((social) => ({
									platform: social.platform,
									url: social.url,
									icon: getIconForPlatform(social.platform),
								}))
								.filter((social) => social.icon !== null)}
						/>
					))}
				</div>
			</Container>
		</section>
	);
}
