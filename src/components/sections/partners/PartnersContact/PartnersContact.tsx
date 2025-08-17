import { Container, Button, ButtonGroup } from '@/components/ui';
import styles from './PartnersContact.module.css';

export default function PartnersContact() {
	return (
		<section className={styles.partnersContact}>
			<Container>
				<div className={styles.contactGrid}>
					<div className={styles.ctaCard}>
						<div className={styles.ctaIcon}>
							<i className="fas fa-handshake"></i>
						</div>
						<h3>Ready to Partner?</h3>
						<p>
							Take the first step towards an exciting partnership with Houston
							Spartans. Let&apos;s discuss how we can create value together.
						</p>
						<ButtonGroup>
							<Button href="/contact" variant="primary">
								CONTACT US
							</Button>
						</ButtonGroup>
						<div className={styles.ctaNote}>
							<i className="fas fa-info-circle"></i>
							<span>
								Partnership proposals welcome via email or contact form
							</span>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
