import { Container, SectionHeading, processSocialLinks } from '@/components/ui';
import { SpartanCard } from '@/components/cards';
import { getFeaturedHomeMembers } from '@/lib/rosterDatabase';
import styles from './Spartans.module.css';
import globalStyles from '@/styles/globals.module.css';

export default async function Spartans() {
	const spartans = await getFeaturedHomeMembers();

	return (
		<section id="spartans" className={styles.spartans}>
			<Container>
				<SectionHeading description="Get to know a few of our featured Houston Spartans">
					OUR <span className={globalStyles.headingHighlight}>SPARTANS</span>
				</SectionHeading>

				<div className={styles.spartansGrid}>
					{spartans.map((spartan) => (
						<SpartanCard
							key={spartan.id}
							id={spartan.id}
							fullName={spartan.full_name}
							gamertag={spartan.gamertag ?? undefined}
							orgRole={
								(spartan.is_team_member ? spartan.team_role : null) ??
								spartan.creator_tier ??
								''
							}
							picture={spartan.picture_url ?? undefined}
							socialLinks={processSocialLinks(spartan.social_links)}
						/>
					))}
				</div>

				<div className={styles.championSection}>
					<h3>EXPERIENCE TO BE A CHAMPION?</h3>
					<p>
						Learn from Call of Duty League Professional and Co-Founder, Spart
					</p>
					<div className={styles.championVideo}>
						<iframe
							src="https://www.youtube.com/embed/3v32FmKoEWI"
							title="Experience to be a Champion - Houston Spartans"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}
