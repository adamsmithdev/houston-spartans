import {
	Section,
	SectionHeading,
	EmptyState,
	processSocialLinks,
} from '@/components/ui';
import { SpartanCard } from '@/components/cards';
import { getContentCreators } from '@/lib/rosterDatabase';
import styles from './ContentCreators.module.css';
import globalStyles from '@/styles/globals.module.css';

export default async function ContentCreators() {
	const creators = await getContentCreators();

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
						fullName={creator.full_name}
						gamertag={creator.gamertag ?? undefined}
						orgRole={creator.creator_tier ?? 'Content Creator'}
						picture={creator.picture_url ?? undefined}
						socialLinks={processSocialLinks(creator.social_links)}
					/>
				))}
			</div>
		</Section>
	);
}
