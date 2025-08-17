import {
	Section,
	SectionHeading,
	EmptyState,
	processSocialLinks,
} from '@/components/ui';
import { SpartanCard } from '@/components/cards';
import { CONTENT_CREATORS, type ContentCreator } from '@/constants';
import styles from './ContentCreators.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function ContentCreators() {
	// Type assertion to work with the current empty array
	const creators = CONTENT_CREATORS as unknown as ContentCreator[];

	if (creators.length === 0) {
		return (
			<Section className={styles.creatorsSection}>
				<SectionHeading level={2}>
					OUR <span className={globalStyles.headingHighlight}>CREATORS</span>
				</SectionHeading>

				<EmptyState
					title="Content Creators Coming Soon"
					description="We're actively recruiting talented content creators to join the Houston Spartans family. Check out our Content Creator Program below to learn how you can be part of our team!"
					icon={<i className="fas fa-video"></i>}
				/>
			</Section>
		);
	}

	return (
		<Section className={styles.creatorsSection}>
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
						socialLinks={processSocialLinks(creator.socialLinks)}
					/>
				))}
			</div>
		</Section>
	);
}
