import { Container, SectionHeading } from '@/components/ui';
import styles from './AboutHero.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function AboutHero() {
	return (
		<section className={styles.aboutHero}>
			<Container>
				<SectionHeading
					level={1}
					description="Learn more about our esports community, mission, and the warriors behind the name."
				>
					ABOUT <span className={globalStyles.headingHighlight}>US</span>
				</SectionHeading>
			</Container>
		</section>
	);
}
