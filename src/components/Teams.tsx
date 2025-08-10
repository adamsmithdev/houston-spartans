import { Section, processSocialLinks } from '@/components/ui';
import SpartanCard from './SpartanCard';
import { TEAM_MEMBERS } from '@/constants';
import styles from './Teams.module.css';

export default function Teams() {
	return (
		<Section className={styles.teamsSection}>
			<div className={styles.teamsContent}>
				<div className={styles.sectionHeader}>
					<h2>WE HAVE EXPERT TEAM MEMBERS</h2>
					<p className={styles.teamDescription}>
						The Houston Spartans Management Team (HSMT) is a dedicated group of
						managers along with staff committed in supporting the Spartans
						community in the Houston, Texas area and all over the world. They
						work tirelessly to coordinate events, provide guidance, build
						relationships and foster a positive and inclusive environment for
						esports of all levels and throughout the community. #HSTX #HS4L
						#SpartanNation.
					</p>
				</div>

				<div className={styles.teamGrid}>
					{TEAM_MEMBERS.map((member) => (
						<SpartanCard
							key={member.id}
							id={member.id}
							fullName={member.fullName}
							gamertag={member.gamertag}
							orgRole={member.orgRole}
							picture={member.picture}
							socialLinks={processSocialLinks(member.socialLinks)}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
