'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container, SectionHeading, Button } from '@/components/ui';
import { collaboration } from '@/constants/images';
import styles from './PartnersSection.module.css';
import globalStyles from '@/styles/globals.module.css';

const partners = [
	{
		id: 'stafford-esports',
		name: 'Stafford High School ESports',
		category: 'Education Partner',
		src: collaboration.partners.staffordEsports,
		description:
			'Stafford High School ESports program represents excellence in competitive gaming education, fostering student development through structured esports programs and competitive opportunities.',
		website: 'https://shs.staffordmsd.org/',
	},
	{
		id: 'never-chalked',
		name: 'Never Chalked',
		category: 'Media Partner',
		src: collaboration.partners.neverChalked,
		description:
			'The premier CDL podcast delivering in-depth analysis, player interviews, and comprehensive coverage of the Call of Duty League competitive scene.',
		website: 'https://x.com/NeverChalkedPOD',
	},
	{
		id: 'tx-sef',
		name: 'Texas Scholastic Esports Federation',
		category: 'Education Partner',
		src: collaboration.partners.txSef,
		description:
			'The Texas Scholastic Esports Federation (TXSEF) promotes competitive gaming in educational settings, providing structured tournaments and development programs for students across Texas.',
		website: 'https://www.texsef.org/',
	},
	{
		id: 'aldine-esports',
		name: 'Aldine Esports',
		category: 'Education Partner',
		src: collaboration.partners.aldineEsports,
		description:
			'Aldine Esports represents a forward-thinking approach to integrating competitive gaming into educational curricula, developing the next generation of esports athletes and industry professionals.',
		website: 'https://x.com/aldineesports',
	},
	{
		id: 'war-gaming',
		name: 'WAR Gaming',
		category: 'Gaming Partner',
		src: collaboration.partners.warGaming,
		description:
			'Warriors and Rodeo (WAR Gaming) brings together competitive gaming excellence with community engagement, supporting charitable initiatives and fostering inclusive gaming environments.',
		website: 'https://warmissions.org/',
	},
	{
		id: 'kindr3d-sauce',
		name: 'Kindr3d Sauce Co',
		category: 'Lifestyle Partner',
		src: collaboration.partners.kindr3dSauce,
		description:
			'Kindr3d Sauce Co delivers premium sauces and condiments that fuel gaming sessions and community gatherings, bringing flavor and excitement to the esports lifestyle.',
		website: 'http://www.kindr3dnations.com/',
	},
	{
		id: 'bluebonnet',
		name: 'Bluebonnet Law Firm, P.C.',
		category: 'Legal Partner',
		src: collaboration.partners.bluebonnet,
		description:
			'Bluebonnet Law Firm, P.C. provides comprehensive legal services and guidance, ensuring Houston Spartans operates with integrity and compliance in all business endeavors.',
		website: 'https://www.bluebonnetlawfirmpc.com/',
	},
];

export default function PartnersSection() {
	const [selectedPartner, setSelectedPartner] = useState(partners[0]);

	return (
		<section className={styles.partnersSection}>
			<Container>
				<SectionHeading description="Their support helps us enhance our programs, engage with the community, and provide valuable opportunities for our members.">
					OUR <span className={globalStyles.headingHighlight}>PARTNERS</span>
				</SectionHeading>

				<div className={styles.showcaseGrid}>
					<div className={styles.logoGrid}>
						{partners.map((partner) => (
							<button
								key={partner.id}
								className={`${styles.logoButton} ${
									selectedPartner.id === partner.id ? styles.active : ''
								}`}
								onClick={() => setSelectedPartner(partner)}
							>
								<Image
									src={partner.src}
									alt={partner.name}
									width={120}
									height={60}
									loading="lazy"
								/>
							</button>
						))}
					</div>

					<div className={styles.selectedContent}>
						<div className={styles.selectedCard}>
							<div className={styles.selectedLogo}>
								<Image
									src={selectedPartner.src}
									alt={selectedPartner.name}
									width={200}
									height={100}
									loading="lazy"
								/>
							</div>
							<div className={styles.selectedInfo}>
								<span className={styles.selectedCategory}>
									{selectedPartner.category}
								</span>
								<h4 className={styles.selectedName}>{selectedPartner.name}</h4>
								<p className={styles.selectedDescription}>
									{selectedPartner.description}
								</p>
								<Button
									href={selectedPartner.website}
									variant="view-all"
									className={styles.visitButton}
								>
									VISIT {selectedPartner.name.toUpperCase()}{' '}
									<i className="fas fa-external-link-alt"></i>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
