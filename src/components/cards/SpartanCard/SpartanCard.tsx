import Image from 'next/image';
import Link from 'next/link';
import styles from './SpartanCard.module.css';

export interface SpartanCardProps {
	readonly id: string;
	readonly fullName: string;
	readonly gamertag?: string;
	readonly orgRole: string;
	readonly picture?: string;
	readonly socialLinks: ReadonlyArray<{
		readonly platform: string;
		readonly url: string;
		readonly icon: React.ReactNode;
	}>;
}

export default function SpartanCard({
	id,
	fullName,
	gamertag,
	orgRole,
	picture,
	socialLinks,
}: SpartanCardProps) {
	const renderAvatar = () => {
		if (picture) {
			return (
				<Image
					src={picture}
					alt={fullName}
					width={120}
					height={120}
					className={styles.profileImage}
				/>
			);
		}

		return (
			<div className={styles.placeholderAvatar}>
				<i className="fas fa-user"></i>
			</div>
		);
	};

	return (
		<div className={styles.spartanCard}>
			<div className={styles.imageContainer}>{renderAvatar()}</div>

			<div className={styles.spartanInfo}>
				<h3 className={styles.spartanName}>{fullName}</h3>
				{gamertag && <p className={styles.spartanGamertag}>{gamertag}</p>}
				<p className={styles.spartanRole}>{orgRole}</p>

				{socialLinks.length > 0 && (
					<div className={styles.socialLinks}>
						{socialLinks.map((social) => (
							<Link
								key={`${id}-${social.platform}`}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.socialLink}
								aria-label={`Follow ${fullName} on ${social.platform}`}
							>
								{social.icon}
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
