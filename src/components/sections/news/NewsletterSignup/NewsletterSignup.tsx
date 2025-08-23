import { Container, SectionHeading, Button } from '@/components/ui';
import styles from './NewsletterSignup.module.css';

export default function NewsletterSignup() {
	return (
		<section className={styles.newsletter}>
			<Container>
				<div className={styles.newsletterContent}>
					<div className={styles.newsletterText}>
						<SectionHeading description="Get the latest Houston Spartans news, tournament updates, and exclusive content delivered straight to your inbox.">
							STAY IN THE LOOP
						</SectionHeading>
					</div>
					<div className={styles.newsletterForm}>
						<form className={styles.form}>
							<div className={styles.inputGroup}>
								<input
									type="email"
									placeholder="Enter your email address"
									className={styles.emailInput}
									required
								/>
								<Button
									variant="primary"
									type="submit"
									className={styles.subscribeBtn}
								>
									Subscribe
								</Button>
							</div>
							<p className={styles.disclaimer}>
								We respect your privacy. Unsubscribe at any time.
							</p>
						</form>
					</div>
				</div>
			</Container>
		</section>
	);
}
