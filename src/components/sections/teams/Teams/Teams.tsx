import { Section, processSocialLinks } from '@/components/ui';
import { SpartanCard } from '@/components/cards';
import { getTeamMembers } from '@/lib/rosterDatabase';
import styles from './Teams.module.css';

export default async function Teams() {
	const teamMembers = await getTeamMembers();

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
					{teamMembers.map((member) => (
						<SpartanCard
							key={member.id}
							id={member.id}
							fullName={member.full_name}
							gamertag={member.gamertag ?? undefined}
							orgRole={member.team_role ?? ''}
							picture={member.picture_url ?? undefined}
							socialLinks={processSocialLinks(member.social_links)}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
