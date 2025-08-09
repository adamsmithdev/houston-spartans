import { Container, SectionHeading } from '@/components/ui';
import styles from './AboutEstablished.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function AboutEstablished() {
	return (
		<section className={styles.established}>
			<Container>
				<SectionHeading level={2}>
					ESTABLISHED IN{' '}
					<span className={globalStyles.headingHighlight}>2023</span>
				</SectionHeading>

				<div className={styles.content}>
					<div className={styles.textContent}>
						<p>
							The Houston Spartans were established in 2023 as a tribute to
							&quot;Spart,&quot; whose journey through the esports world began
							in the Challengers scene and culminated in his professional debut
							in 2019. Inspired by his determination and success, the Houston
							Spartans aim to support aspiring players in achieving their dreams
							of breaking into professional esports.
						</p>
						<p>
							As a family-owned organization, the Spartans are dedicated to
							fostering a close-knit community where everyone is welcomed as
							part of the Spartan Nation. Through mentorship, training, and
							unwavering support, the Houston Spartans are committed to helping
							the next generation of esports talent thrive.
						</p>
					</div>

					<div className={styles.videoContainer}>
						<div className={styles.videoWrapper}>
							<iframe
								src="https://www.youtube.com/embed/r9unuMRCQ2g?start=64"
								title="Houston Spartans - Our Journey"
								style={{ border: 'none' }}
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
