import type { Metadata } from 'next';
import { PageHero } from '@/components/layout';
import { Container } from '@/components/ui';
import { createPageMetadata } from '@/utils/metadata';
import styles from './terms.module.css';

export const metadata: Metadata = createPageMetadata({
	title: 'Terms & Conditions',
	description:
		'Read the terms and conditions for using the Houston Spartans website and participating in our programs.',
	keywords: ['terms', 'conditions', 'legal', 'policy'],
});

export default function TermsPage() {
	return (
		<>
			<PageHero
				title="TERMS & CONDITIONS"
				highlightedWord="CONDITIONS"
				description="Please read these terms and conditions carefully before using our website or participating in our programs."
			/>
			<section className={styles.termsSection}>
				<Container>
					<div className={styles.termsContent}>
						<div className={styles.lastUpdated}>
							Last Updated: November 26, 2025
						</div>

						<div className={styles.termsBlock}>
							<h2>1. Acceptance of Terms</h2>
							<p>
								By accessing and using the Houston Spartans website
								(houstonspartans.com), you accept and agree to be bound by the
								terms and provision of this agreement. If you do not agree to
								these terms, please do not use our website.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>2. Use of Website</h2>
							<p>
								The content of this website is for your general information and
								use only. It is subject to change without notice. You may not
								use this website for any illegal or unauthorized purpose.
							</p>
							<p>You agree not to:</p>
							<ul>
								<li>
									Reproduce, duplicate, copy or resell any part of our website
									without express written permission
								</li>
								<li>
									Use the website in any way that damages, disables, or impairs
									the website
								</li>
								<li>
									Attempt to gain unauthorized access to any portion of the
									website
								</li>
								<li>
									Use any automated system or software to extract data from the
									website
								</li>
							</ul>
						</div>

						<div className={styles.termsBlock}>
							<h2>3. Content Creator Program</h2>
							<p>
								Participation in the Houston Spartans Content Creator Program is
								subject to approval and ongoing compliance with program
								requirements. We reserve the right to:
							</p>
							<ul>
								<li>Accept or reject any application at our sole discretion</li>
								<li>
									Modify program benefits, requirements, or terms at any time
								</li>
								<li>
									Terminate a creator&apos;s participation for violation of
									terms or brand guidelines
								</li>
								<li>
									Request removal of content that does not align with our brand
									values
								</li>
							</ul>
							<p>
								Content creators are responsible for complying with all
								applicable platform terms of service and disclosure requirements
								for sponsored content.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>4. Intellectual Property</h2>
							<p>
								All content on this website, including but not limited to text,
								graphics, logos, images, and software, is the property of
								Houston Spartans or its content suppliers and is protected by
								copyright and intellectual property laws.
							</p>
							<p>
								The Houston Spartans name, logo, and all related marks are
								trademarks of Houston Spartans. You may not use these marks
								without prior written permission.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>5. User Content</h2>
							<p>
								If you submit content to our website (including but not limited
								to applications, comments, or other materials), you grant
								Houston Spartans a non-exclusive, royalty-free, perpetual,
								worldwide license to use, reproduce, modify, and display such
								content.
							</p>
							<p>
								You represent and warrant that you own or have the necessary
								rights to any content you submit and that such content does not
								violate any third-party rights.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>6. Third-Party Links</h2>
							<p>
								Our website may contain links to third-party websites. These
								links are provided for your convenience only. We have no control
								over the content of these websites and accept no responsibility
								for them or for any loss or damage that may arise from your use
								of them.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>7. Disclaimer of Warranties</h2>
							<p>
								This website is provided on an &quot;as is&quot; and &quot;as
								available&quot; basis. Houston Spartans makes no warranties,
								expressed or implied, regarding the website&apos;s operation or
								the information, content, or materials included on this website.
							</p>
							<p>We do not warrant that:</p>
							<ul>
								<li>
									The website will be available uninterrupted or error-free
								</li>
								<li>Defects will be corrected</li>
								<li>
									The website or its server are free of viruses or other harmful
									components
								</li>
							</ul>
						</div>

						<div className={styles.termsBlock}>
							<h2>8. Limitation of Liability</h2>
							<p>
								Houston Spartans, its officers, directors, employees, or agents
								shall not be liable for any indirect, incidental, special,
								consequential, or punitive damages arising out of your access to
								or use of the website.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>9. Indemnification</h2>
							<p>
								You agree to indemnify and hold harmless Houston Spartans and
								its affiliates from any claims, damages, losses, liabilities,
								and expenses (including legal fees) arising from your use of the
								website or violation of these terms.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>10. Modification of Terms</h2>
							<p>
								Houston Spartans reserves the right to modify these terms at any
								time. Changes will be effective immediately upon posting to the
								website. Your continued use of the website following any changes
								indicates your acceptance of the new terms.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>11. Governing Law</h2>
							<p>
								These terms shall be governed by and construed in accordance
								with the laws of the State of Texas, United States, without
								regard to its conflict of law provisions.
							</p>
						</div>

						<div className={styles.termsBlock}>
							<h2>12. Contact Information</h2>
							<p>
								If you have any questions about these Terms & Conditions, please
								contact us:
							</p>
							<ul>
								<li>Email: houstontxspartans@gmail.com</li>
								<li>Discord: discord.gg/fP5Ek7Xv3A</li>
							</ul>
						</div>

						<div className={styles.acknowledgment}>
							<p>
								By using the Houston Spartans website, you acknowledge that you
								have read and understood these Terms & Conditions and agree to
								be bound by them.
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
