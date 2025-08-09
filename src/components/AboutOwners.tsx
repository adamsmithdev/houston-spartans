import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';
import { XIcon } from '@/components/icons';
import styles from './AboutOwners.module.css';
import globalStyles from '@/styles/globals.module.css';

const owners = [
	{
		id: 'papa-spart',
		name: 'CHRIS CERVANTEZ',
		nickname: 'PAPA SPART',
		role: 'OWNER',
		initials: 'CC',
		social: {
			twitter: 'https://x.com/PapaSpart78',
		},
	},
	{
		id: 'mama-spart',
		name: 'ANITA CERVANTEZ',
		nickname: 'MAMA SPART',
		role: 'OWNER',
		initials: 'AC',
		social: {
			twitter: 'https://x.com/MamaSpart',
		},
	},
];

export default function AboutOwners() {
	return (
		<section className={styles.ownersSection}>
			<Container>
				<SectionHeading level={2}>
					OUR <span className={globalStyles.headingHighlight}>OWNERS</span>
				</SectionHeading>

				<p className={styles.subtitle}>
					Get to know a few of our Houston Spartans
				</p>

				<div className={styles.ownersGrid}>
					{owners.map((owner) => (
						<div key={owner.id} className={styles.ownerCard}>
							<div className={styles.imageContainer}>
								<div className={styles.ownerInitials}>{owner.initials}</div>
							</div>

							<div className={styles.ownerInfo}>
								<h3 className={styles.ownerName}>{owner.name}</h3>
								<p className={styles.ownerNickname}>{owner.nickname}</p>
								<p className={styles.ownerRole}>{owner.role}</p>

								<div className={styles.socialLinks}>
									<Link
										href={owner.social.twitter}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.socialLink}
									>
										<XIcon />
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}
