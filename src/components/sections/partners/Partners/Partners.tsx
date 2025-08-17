import Image from 'next/image';
import {
	Button,
	ButtonGroup,
	SectionHeading,
	Container,
} from '@/components/ui';
import { collaboration } from '@/constants/images';
import styles from './Partners.module.css';
import globalStyles from '@/styles/globals.module.css';

const { partners, sponsors } = collaboration;

const partnerLogos = [
	{
		id: 'stafford-esports',
		src: partners.staffordEsports,
		alt: 'Stafford Esports',
	},
	{
		id: 'never-chalked',
		src: partners.neverChalked,
		alt: 'Never Chalked',
	},
	{ id: 'tx-sef', src: partners.txSef, alt: 'Texas SEF' },
	{
		id: 'aldine-esports',
		src: partners.aldineEsports,
		alt: 'Aldine Esports',
	},
	{
		id: 'war-gaming',
		src: partners.warGaming,
		alt: 'WAR Gaming',
	},
	{
		id: 'kindr3d-sauce',
		src: partners.kindr3dSauce,
		alt: 'Kindr3d Sauce Co',
	},
	{
		id: 'bluebonnet',
		src: partners.bluebonnet,
		alt: 'Bluebonnet Law Firm',
	},
	{
		id: 'ssi-pc',
		src: sponsors.ssi,
		alt: 'SSI PC Optimization',
	},
	{
		id: 'rally-esports',
		src: sponsors.rallyEsports,
		alt: 'Rally Esports',
	},
	{
		id: 'soardogg',
		src: sponsors.soardogg,
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
					<Button href="/partners" variant="view-all">
						ALL PARTNERS <i className="fas fa-arrow-right"></i>
					</Button>
				</ButtonGroup>
			</Container>
		</section>
	);
}
