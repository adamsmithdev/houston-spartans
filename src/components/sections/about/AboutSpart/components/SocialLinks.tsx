import { TwitchIcon, XIcon } from '@/components/icons';
import styles from '../AboutSpart.module.css';

interface SocialLink {
	readonly platform: string;
	readonly url: string;
	readonly label: string;
}

interface SocialLinksProps {
	readonly links: readonly SocialLink[];
}

const iconMap = {
	twitch: TwitchIcon,
	x: XIcon,
};

export default function SocialLinks({ links }: SocialLinksProps) {
	return (
		<div className={styles.socialLinks}>
			<h3>CONNECT WITH SPART</h3>
			<div className={styles.socialGrid}>
				{links.map((link) => {
					const IconComponent = iconMap[link.platform as keyof typeof iconMap];

					return (
						<a
							key={link.platform}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.socialButton}
							aria-label={`Follow Spart on ${link.label}`}
						>
							{IconComponent && <IconComponent />}
							<span>{link.label}</span>
						</a>
					);
				})}
			</div>
		</div>
	);
}
