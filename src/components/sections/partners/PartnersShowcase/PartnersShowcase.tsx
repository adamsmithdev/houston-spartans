'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container, Button } from '@/components/ui';
import { collaboration } from '@/constants/images';
import styles from './PartnersShowcase.module.css';
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

export default function PartnersShowcase() {
	const [selectedPartner, setSelectedPartner] = useState(partners[0]);
	const [selectedSponsor, setSelectedSponsor] = useState(sponsors[0]);

	return (
		<section className={styles.partnersShowcase}>
			<Container>
				{/* Partners Section */}
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>
						OUR <span className={globalStyles.headingHighlight}>PARTNERS</span>
					</h3>
					<p className={styles.sectionDescription}>
						Their support helps us enhance our programs, engage with the
						community, and provide valuable opportunities for our members. We
						are grateful for their commitment and contributions, which play a
						crucial role in our continued success!
					</p>

					<div className={styles.sectionContent}>
						<div className={styles.logoGrid}>
							{partners.map((partner) => (
								<div
									key={partner.id}
									className={`${styles.logoItem} ${
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
								</div>
							))}
						</div>

						<div className={styles.detailCard}>
							<div className={styles.detailHeader}>
								<div className={styles.detailInfo}>
									<span className={styles.detailCategory}>
										{selectedPartner.category}
									</span>
									<h4 className={styles.detailName}>{selectedPartner.name}</h4>
								</div>
							</div>
							<p className={styles.detailDescription}>
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

				{/* Sponsors Section */}
				<div className={styles.section}>
					<h3 className={styles.sectionTitle}>
						OUR <span className={globalStyles.headingHighlight}>SPONSORS</span>
					</h3>
					<p className={styles.sectionDescription}>
						At the Houston Spartans, our mission is to empower every player to
						achieve their goals and unlock their full potential at the highest
						level. We serve as a vital bridge for high school E-Sports, guiding
						them toward collegiate opportunities.
					</p>

					<div className={styles.sectionContent}>
						<div className={styles.logoGrid}>
							{sponsors.map((sponsor) => (
								<div
									key={sponsor.id}
									className={`${styles.logoItem} ${
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
								</div>
							))}
						</div>

						<div className={styles.detailCard}>
							<div className={styles.detailHeader}>
								<div className={styles.detailInfo}>
									<span className={styles.detailCategory}>
										{selectedSponsor.category}
									</span>
									<h4 className={styles.detailName}>{selectedSponsor.name}</h4>
								</div>
							</div>
							<p className={styles.detailDescription}>
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
			</Container>
		</section>
	);
}
