import { Container, Button, ButtonGroup } from '@/components/ui';
import styles from './PartnershipOpportunities.module.css';

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
