import {
	Container,
	SectionHeading,
	Button,
	ButtonGroup,
} from '@/components/ui';
import styles from './AboutMission.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function AboutMission() {
	return (
		<section className={styles.missionSection}>
			<Container>
				<SectionHeading level={2}>
					THE <span className={globalStyles.headingHighlight}>MISSION</span>
				</SectionHeading>

				<div className={styles.missionContent}>
					<p className={styles.missionText}>
						At the Houston Spartans, our mission is to empower every player to
						achieve their goals and unlock their full potential at the highest
						level. We serve as a vital bridge for competitive and high school
						esports, guiding players towards collegiate opportunities, helping
						them earn scholarships and paving the way for professional
						aspirations.
					</p>
					<p className={styles.missionText}>
						As a family-run organization, we are deeply committed to supporting
						our players in their academic and esports pursuits and fostering a
						strong sense of community and belonging. Together, we strive to
						create an environment where everyone feels valued and inspired to
						succeed.
					</p>

					<div className={styles.readMoreContainer}>
						<ButtonGroup>
							<Button href="/teams" variant="view-all">
								OUR TEAMS <i className="fas fa-arrow-right"></i>
							</Button>
						</ButtonGroup>
					</div>
				</div>

				{/* <div className={styles.competitionSection}>
					<Card variant="mission">
						<div className={styles.cardIcon}>
							<i className="fas fa-trophy"></i>
						</div>
						<h3>COMPETITION</h3>
						<p>Competing for the main event</p>
					</Card>
				</div> */}
			</Container>
		</section>
	);
}
