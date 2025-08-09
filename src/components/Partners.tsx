import Image from 'next/image';
import {
	Button,
	ButtonGroup,
	SectionHeading,
	Container,
} from '@/components/ui';
import styles from './Partners.module.css';
import globalStyles from '@/styles/globals.module.css';

const partnerLogos = [
	{
		id: 'stafford-esports',
		src: '/images/partners/stafford-esports-logo.png',
		alt: 'Stafford Esports',
	},
	{
		id: 'never-chalked',
		src: '/images/partners/never-chalked-logo.png',
		alt: 'Never Chalked',
	},
	{ id: 'tx-sef', src: '/images/partners/tx-sef-logo.png', alt: 'Texas SEF' },
	{
		id: 'aldine-esports',
		src: '/images/partners/aldine-esports-logo.png',
		alt: 'Aldine Esports',
	},
	{
		id: 'war-gaming',
		src: '/images/partners/war-gaming-logo.png',
		alt: 'WAR Gaming',
	},
	{
		id: 'kindr3d-sauce',
		src: '/images/partners/kindr3d-sauce-logo.png',
		alt: 'Kindr3d Sauce Co',
	},
	{
		id: 'bluebonnet',
		src: '/images/partners/bluebonnet-logo.png',
		alt: 'Bluebonnet Law Firm',
	},
	{
		id: 'ssi-pc',
		src: '/images/sponsors/ssi-pc-optimization-logo.png',
		alt: 'SSI PC Optimization',
	},
	{
		id: 'rally-esports',
		src: '/images/sponsors/rally-esports-logo.png',
		alt: 'Rally Esports',
	},
	{
		id: 'soardogg',
		src: '/images/sponsors/soardogg-logo.png',
		alt: 'SoarDogg',
	},
];

export default function Partners() {
	return (
		<section className={styles.partners}>
			<Container>
				<SectionHeading>
					OUR <span className={globalStyles.headingHighlight}>PARTNERS</span>
				</SectionHeading>
				<div className={styles.carouselContainer}>
					<div className={styles.partnersCarousel}>
						{/* First set of logos */}
						{partnerLogos.map((logo) => (
							<div key={logo.id} className={styles.partnerLogo}>
								<Image src={logo.src} alt={logo.alt} width={150} height={80} />
							</div>
						))}
						{/* Duplicate logos for seamless loop */}
						{partnerLogos.map((logo) => (
							<div key={`duplicate-${logo.id}`} className={styles.partnerLogo}>
								<Image src={logo.src} alt={logo.alt} width={150} height={80} />
							</div>
						))}
					</div>
				</div>

				<ButtonGroup>
					<Button variant="view-all">
						ALL PARTNERS <i className="fas fa-arrow-right"></i>
					</Button>
				</ButtonGroup>
			</Container>
		</section>
	);
}
