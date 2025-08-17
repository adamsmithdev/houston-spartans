'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container, SectionHeading, Button } from '@/components/ui';
import { collaboration } from '@/constants/images';
import styles from './Sponsors.module.css';
import globalStyles from '@/styles/globals.module.css';

const sponsors = [
	{
		id: 'ssi-pc',
		name: 'SSI PC Optimization',
		category: 'Technology Sponsor',
		src: collaboration.sponsors.ssi,
		description:
			'SSI PC Optimization specializes in maximizing computer performance for competitive gaming, providing hardware optimization services and technical support for peak gaming performance.',
		website: 'https://x.com/ssi_pc_opti',
	},
	{
		id: 'rally-esports',
		name: 'Rally Esports',
		category: 'Gaming Sponsor',
		src: collaboration.sponsors.rallyEsports,
		description:
			'Rally Esports supports competitive gaming communities through event sponsorship, player development programs, and fostering connections within the esports ecosystem.',
		website: 'https://x.com/rally_esports',
	},
	{
		id: 'soardogg',
		name: 'SoarDogg',
		category: 'Gaming Sponsor',
		src: collaboration.sponsors.soardogg,
		description:
			'SoarDogg provides premium gaming merchandise and community support, helping teams and players represent their passion for competitive gaming with high-quality gear and accessories.',
		website:
			'https://soardogg.com/marketplace/pro-shops/team-and-communities/houston-spartans/',
	},
];

export default function Sponsors() {
	const [selectedSponsor, setSelectedSponsor] = useState(sponsors[0]);

	return (
		<section className={styles.sponsors}>
			<Container>
				<SectionHeading description="At the Houston Spartans, our mission is to empower every player to achieve their goals and unlock their full potential at the highest level.">
					OUR <span className={globalStyles.headingHighlight}>SPONSORS</span>
				</SectionHeading>

				<div className={styles.showcaseGrid}>
					<div className={styles.logoGrid}>
						{sponsors.map((sponsor) => (
							<button
								key={sponsor.id}
								className={`${styles.logoButton} ${
									selectedSponsor.id === sponsor.id ? styles.active : ''
								}`}
								onClick={() => setSelectedSponsor(sponsor)}
							>
								<Image
									src={sponsor.src}
									alt={sponsor.name}
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
									src={selectedSponsor.src}
									alt={selectedSponsor.name}
									width={200}
									height={100}
									loading="lazy"
								/>
							</div>
							<div className={styles.selectedInfo}>
								<span className={styles.selectedCategory}>
									{selectedSponsor.category}
								</span>
								<h4 className={styles.selectedName}>{selectedSponsor.name}</h4>
								<p className={styles.selectedDescription}>
									{selectedSponsor.description}
								</p>
								<Button
									href={selectedSponsor.website}
									variant="view-all"
									className={styles.visitButton}
								>
									VISIT {selectedSponsor.name.toUpperCase()}{' '}
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
