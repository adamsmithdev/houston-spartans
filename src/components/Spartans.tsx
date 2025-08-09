import Image from 'next/image';
import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';
import { KickIcon, XIcon, TwitchIcon, TikTokIcon, YouTubeIcon } from './icons';
import styles from './Spartans.module.css';
import globalStyles from '@/styles/globals.module.css';

const spartans = [
	{
		id: 'ciscodisco',
		name: 'CISCODISCO',
		realName: '',
		role: 'CONTENT CREATOR',
		image: '/images/headshots/profile-ciscodisco.png',
		social: [
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
		name: 'KEVOLOGY',
		realName: 'Kevin Tucker',
		role: 'ASSISTANT',
		image: '/images/headshots/profile-kevology.png',
		social: [
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
		name: 'APOLLO',
		realName: 'Trae Pancerella',
		role: 'CALL OF DUTY DIRECTOR',
		image: '/images/headshots/profile-apollo.png',
		social: [
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
						<div key={spartan.id} className={styles.spartanCard}>
							<div className={styles.spartanImage}>
								<Image
									src={spartan.image}
									alt={spartan.name}
									width={120}
									height={120}
								/>
							</div>
							<div className={styles.spartanInfo}>
								<h3>{spartan.name}</h3>
								<p>{spartan.realName}</p>
								<span className={styles.role}>{spartan.role}</span>
								<div className={styles.socialLinks}>
									{spartan.social.map((social) => (
										<Link
											key={`${spartan.id}-${social.platform}`}
											href={social.url}
											target="_blank"
											aria-label={`Follow ${spartan.name} on ${social.platform}`}
										>
											{social.icon}
										</Link>
									))}
								</div>
							</div>
						</div>
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
