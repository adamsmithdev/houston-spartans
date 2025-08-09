import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui';
import styles from './AboutBrand.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function AboutBrand() {
	return (
		<section className={styles.brandSection}>
			<Container>
				<SectionHeading level={2}>
					THE BRAND OF A{' '}
					<span className={globalStyles.headingHighlight}>SPARTAN</span>
				</SectionHeading>

				<div className={styles.brandContent}>
					<div className={styles.mottoSection}>
						<blockquote className={styles.motto}>
							&quot;No Retreat, No Surrender&quot;
						</blockquote>

						<p className={styles.mottoDescription}>
							At the heart of the Houston Spartans is our unwavering motto:
							&quot;No Retreat, No Surrender.&quot; This embodies our commitment
							to resilience, determination, and an unyielding spirit in
							everything we do. Whether in the heat of competition or in
							everyday challenges, this brand voice reflects our relentless
							drive to push forward, no matter the obstacles. It inspires us to
							stand strong, fight hard, and never back down. As a part of the
							Houston Spartans, we encourage you to embrace and amplify this
							message in all communications, actions, and representations of our
							brand.
						</p>
					</div>

					{/* <div className={styles.brandGuideSection}>
						<div className={styles.brandGuideCard}>
							<Link
								href="/documents/branding-guide.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.brandGuideLink}
							>
								<div className={styles.brandGuideImage}>
									<div className={styles.placeholderImage}>
										<i className="fas fa-file-pdf"></i>
									</div>
								</div>
								<h3>CLICK THIS PHOTO TO VIEW BRANDING AND STYLE GUIDE</h3>
							</Link>
						</div>
					</div> */}
				</div>
			</Container>
		</section>
	);
}
