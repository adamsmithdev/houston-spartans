import {
	Container,
	SectionHeading,
	Button,
	ButtonGroup,
} from '@/components/ui';
import styles from './PartnershipOpportunities.module.css';
import globalStyles from '@/styles/globals.module.css';

const opportunities = [
	{
		id: 'education',
		title: 'Education Partnerships',
		icon: 'fas fa-graduation-cap',
		description:
			'Partner with us to provide educational opportunities, scholarships, and pathways for students interested in esports careers.',
		benefits: [
			'Student engagement programs',
			'Scholarship opportunities',
			'Educational content creation',
			'Career development workshops',
		],
	},
	{
		id: 'gaming',
		title: 'Gaming Partnerships',
		icon: 'fas fa-gamepad',
		description:
			'Collaborate with Houston Spartans to reach the gaming community through tournaments, events, and content creation.',
		benefits: [
			'Tournament sponsorship',
			'Community engagement',
			'Content collaboration',
			'Brand visibility in gaming',
		],
	},
	{
		id: 'technology',
		title: 'Technology Sponsorships',
		icon: 'fas fa-microchip',
		description:
			'Provide cutting-edge technology and equipment to support our players and enhance their competitive performance.',
		benefits: [
			'Product placement opportunities',
			'Tech review content',
			'Performance optimization',
			'Innovation showcasing',
		],
	},
	{
		id: 'lifestyle',
		title: 'Lifestyle Partnerships',
		icon: 'fas fa-heart',
		description:
			'Connect with our community through lifestyle products, wellness programs, and community-building initiatives.',
		benefits: [
			'Community wellness programs',
			'Lifestyle content creation',
			'Event partnerships',
			'Brand integration opportunities',
		],
	},
];

export default function PartnershipOpportunities() {
	return (
		<section className={styles.opportunities}>
			<Container>
				<div className={styles.ctaSection}>
					<h3>Ready to Partner with Us?</h3>
					<p>
						Join the Houston Spartans family and help us build the future of
						esports. Together, we can create amazing opportunities for players
						and the gaming community.
					</p>
					<ButtonGroup>
						<Button href="/contact" variant="view-all">
							START A PARTNERSHIP <i className="fas fa-arrow-right"></i>
						</Button>
					</ButtonGroup>
				</div>
			</Container>
		</section>
	);
}
