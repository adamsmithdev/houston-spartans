import { Container } from '@/components/ui';
import SpartanCard from './SpartanCard';
import { TEAM_MEMBERS } from '@/constants';
import { XIcon, FacebookIcon } from '@/components/icons';
import styles from './Teams.module.css';

// Create a LinkedIn icon since it's not in the existing icons
const LinkedInIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
	</svg>
);

const getIconForPlatform = (platform: string) => {
	switch (platform) {
		case 'x':
			return <XIcon />;
		case 'facebook':
			return <FacebookIcon />;
		case 'linkedin':
			return <LinkedInIcon />;
		default:
			return null;
	}
};

export default function Teams() {
	return (
		<section className={styles.teamsSection}>
			<Container>
				<div className={styles.teamsContent}>
					<div className={styles.sectionHeader}>
						<h2>WE HAVE EXPERT TEAM MEMBERS</h2>
						<p className={styles.teamDescription}>
							The Houston Spartans Management Team (HSMT) is a dedicated group
							of managers along with staff committed in supporting the Spartans
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
								socialLinks={member.socialLinks
									.map((social) => ({
										platform: social.platform,
										url: social.url,
										icon: getIconForPlatform(social.platform),
									}))
									.filter((social) => social.icon !== null)}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}
