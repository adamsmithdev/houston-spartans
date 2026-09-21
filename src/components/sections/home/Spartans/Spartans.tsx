import { Container, SectionHeading } from '@/components/ui';
import { SpartanCard } from '@/components/cards';
import { KickIcon, XIcon, TikTokIcon } from '@/components/icons';
import styles from './Spartans.module.css';
import globalStyles from '@/styles/globals.module.css';

const spartans = [
	{
		id: 'kevology',
		fullName: 'Kevin Tucker',
		gamertag: 'KEVOLOGY',
		orgRole: 'ASSISTANT',
		picture: '/images/people/headshots/profile-kevology.png',
		socialLinks: [
			{ platform: 'twitter', url: 'https://x.com/xkevology', icon: <XIcon /> },
			{
				platform: 'kick',
				url: 'https://kick.com/kevology',
				icon: <KickIcon />,
			},
			{
				platform: 'tiktok',
				url: 'https://www.tiktok.com/@xkevologyx',
				icon: <TikTokIcon />,
			},
		],
	},
	{
		id: 'carretttop',
		fullName: 'Garrett Mitchell',
		gamertag: 'CARRETTTOP',
		orgRole: 'Esports Director',
		picture: '/images/people/headshots/profile-carretttop.png',
		socialLinks: [
			{
				platform: 'twitter',
				url: 'https://x.com/hstxcarretttop',
				icon: <XIcon />,
			},
		],
	},
];

export default function Spartans() {
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
							fullName={spartan.fullName}
							gamertag={spartan.gamertag}
							orgRole={spartan.orgRole}
							picture={spartan.picture}
							socialLinks={spartan.socialLinks}
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
