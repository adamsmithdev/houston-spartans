import { Container, SectionHeading } from '@/components/ui';
import SpartanCard from '@/components/SpartanCard';
import { XIcon } from '@/components/icons';
import styles from './AboutOwners.module.css';
import globalStyles from '@/styles/globals.module.css';

const owners = [
	{
		id: 'papa-spart',
		fullName: 'CHRIS CERVANTEZ',
		gamertag: 'PAPA SPART',
		orgRole: 'OWNER',
		picture: '/images/people/headshots/profile-papaspart.png',
		socialLinks: [
			{
				platform: 'twitter',
				url: 'https://x.com/PapaSpart78',
				icon: <XIcon />,
			},
		],
	},
	{
		id: 'mama-spart',
		fullName: 'ANITA CERVANTEZ',
		gamertag: 'MAMA SPART',
		orgRole: 'OWNER',
		picture: '/images/people/headshots/profile-mamaspart.png',
		socialLinks: [
			{
				platform: 'twitter',
				url: 'https://x.com/MamaSpart',
				icon: <XIcon />,
			},
		],
	},
];

export default function AboutOwners() {
	return (
		<section className={styles.ownersSection}>
			<Container>
				<SectionHeading
					level={2}
					description="Get to know the owners of the Houston Spartans"
				>
					OUR <span className={globalStyles.headingHighlight}>OWNERS</span>
				</SectionHeading>

				<div className={styles.ownersGrid}>
					{owners.map((owner) => (
						<SpartanCard
							key={owner.id}
							id={owner.id}
							fullName={owner.fullName}
							gamertag={owner.gamertag}
							orgRole={owner.orgRole}
							picture={owner.picture}
							socialLinks={owner.socialLinks}
						/>
					))}
				</div>
			</Container>
		</section>
	);
}
