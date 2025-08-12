import { Container, SectionHeading } from '@/components/ui';
import SpartanCard from './SpartanCard';
import { KickIcon, XIcon, TwitchIcon, TikTokIcon, YouTubeIcon } from './icons';
import styles from './Spartans.module.css';
import globalStyles from '@/styles/globals.module.css';

const spartans = [
	{
		id: 'ciscodisco',
		fullName: '',
		gamertag: 'CISCODISCO',
		orgRole: 'CONTENT CREATOR',
		picture: '/images/people/headshots/profile-ciscodisco.png',
		socialLinks: [
			{
				platform: 'twitter',
				url: 'https://x.com/ciscodisco1618',
				icon: <XIcon />,
			},
			{
				platform: 'twitch',
				url: 'https://www.twitch.tv/ciscodisco1618',
				icon: <TwitchIcon />,
			},
			{
				platform: 'kick',
				url: 'https://kick.com/ciscodisco1618',
				icon: <KickIcon />,
			},
			{
				platform: 'tiktok',
				url: 'https://www.tiktok.com/@ciscodisco1618',
				icon: <TikTokIcon />,
			},
			{
				platform: 'youtube',
				url: 'https://www.youtube.com/@CiscoDisco1618',
				icon: <YouTubeIcon />,
			},
		],
	},
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
		id: 'apollo',
		fullName: 'Trae Pancerella',
		gamertag: 'APOLLO',
		orgRole: 'CALL OF DUTY DIRECTOR',
		picture: '/images/people/headshots/profile-apollo.png',
		socialLinks: [
			{ platform: 'twitter', url: 'https://x.com/ihyapollo', icon: <XIcon /> },
			{
				platform: 'twitch',
				url: 'https://www.twitch.tv/ihy_apollo',
				icon: <TwitchIcon />,
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
