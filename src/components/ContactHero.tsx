import { Container } from '@/components/ui';
import styles from './ContactHero.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function ContactHero() {
	return (
		<section className={styles.contactHero}>
			<Container>
				<div className={styles.heroContent}>
					<h1>
						CONTACT <span className={globalStyles.headingHighlight}>US</span>
					</h1>
					<p className={styles.heroDescription}>
						Ready to join the Houston Spartans family? Have questions about our
						programs, partnerships, or esports opportunities? We&apos;d love to
						hear from you!
					</p>
				</div>
			</Container>
		</section>
	);
}
