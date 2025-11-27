import type { Metadata } from 'next';
import { PageHero } from '@/components/layout';
import { Container } from '@/components/ui';
import { createPageMetadata } from '@/utils/metadata';
import styles from './privacy.module.css';

export const metadata: Metadata = createPageMetadata({
	title: 'Privacy Policy',
	description:
		'Learn how Houston Spartans collects, uses, and protects your personal information.',
	keywords: ['privacy', 'policy', 'data protection', 'personal information'],
});

export default function PrivacyPage() {
	return (
		<>
			<PageHero
				title="PRIVACY POLICY"
				highlightedWord="POLICY"
				description="Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information."
			/>
			<section className={styles.privacySection}>
				<Container>
					<div className={styles.privacyContent}>
						<div className={styles.lastUpdated}>
							Last Updated: November 26, 2025
						</div>

						<div className={styles.privacyBlock}>
							<h2>1. Introduction</h2>
							<p>
								Houston Spartans (&quot;we,&quot; &quot;our,&quot; or
								&quot;us&quot;) is committed to protecting your privacy. This
								Privacy Policy explains how we collect, use, disclose, and
								safeguard your information when you visit our website
								(houstonspartans.com) or participate in our programs.
							</p>
							<p>
								Please read this privacy policy carefully. If you do not agree
								with the terms of this privacy policy, please do not access the
								website.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>2. Information We Collect</h2>
							<h3>Personal Information</h3>
							<p>
								We may collect personal information that you voluntarily provide
								to us when you:
							</p>
							<ul>
								<li>Submit a contact form</li>
								<li>Apply to our Content Creator Program</li>
								<li>Subscribe to our newsletter or communications</li>
								<li>Participate in our Discord community</li>
								<li>Interact with us on social media</li>
							</ul>
							<p>This personal information may include:</p>
							<ul>
								<li>
									Name and contact information (email address, Discord username)
								</li>
								<li>Social media handles and platform usernames</li>
								<li>Content links and portfolio information</li>
								<li>Demographic information (optional)</li>
								<li>Any other information you choose to provide</li>
							</ul>

							<h3>Automatically Collected Information</h3>
							<p>
								When you visit our website, we may automatically collect certain
								information about your device, including:
							</p>
							<ul>
								<li>IP address</li>
								<li>Browser type and version</li>
								<li>Operating system</li>
								<li>Pages visited and time spent on pages</li>
								<li>Referring website addresses</li>
								<li>Date and time of visits</li>
							</ul>
						</div>

						<div className={styles.privacyBlock}>
							<h2>3. How We Use Your Information</h2>
							<p>
								We use the information we collect for various purposes,
								including to:
							</p>
							<ul>
								<li>Process and respond to your inquiries and applications</li>
								<li>
									Manage our Content Creator Program and communicate with
									participants
								</li>
								<li>
									Send you updates, newsletters, and promotional materials
								</li>
								<li>Improve our website and user experience</li>
								<li>Analyze website usage and trends</li>
								<li>Prevent fraudulent or illegal activity</li>
								<li>Comply with legal obligations</li>
								<li>
									Fulfill any other purpose for which you provided the
									information
								</li>
							</ul>
						</div>

						<div className={styles.privacyBlock}>
							<h2>4. Disclosure of Your Information</h2>
							<p>
								We may share your information in the following circumstances:
							</p>
							<ul>
								<li>
									<strong>Service Providers:</strong> We may share information
									with third-party service providers who perform services on our
									behalf (e.g., email service providers, analytics providers)
								</li>
								<li>
									<strong>Legal Requirements:</strong> We may disclose
									information if required by law or in response to valid
									requests by public authorities
								</li>
								<li>
									<strong>Business Transfers:</strong> Information may be
									transferred in connection with a merger, acquisition, or sale
									of assets
								</li>
								<li>
									<strong>With Your Consent:</strong> We may share information
									with your explicit consent or at your direction
								</li>
							</ul>
							<p>
								We do not sell, rent, or trade your personal information to
								third parties for their marketing purposes.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>5. Cookies and Tracking Technologies</h2>
							<p>
								We may use cookies, web beacons, and similar tracking
								technologies to collect information about your browsing
								activities. Cookies are small data files stored on your device.
							</p>
							<p>
								You can control cookies through your browser settings. However,
								disabling cookies may limit your ability to use certain features
								of our website.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>6. Third-Party Websites</h2>
							<p>
								Our website may contain links to third-party websites and
								services. We are not responsible for the privacy practices of
								these third parties. We encourage you to review their privacy
								policies before providing any personal information.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>7. Data Security</h2>
							<p>
								We implement reasonable security measures to protect your
								personal information from unauthorized access, use, or
								disclosure. However, no method of transmission over the internet
								or electronic storage is 100% secure. While we strive to protect
								your information, we cannot guarantee its absolute security.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>8. Data Retention</h2>
							<p>
								We retain your personal information only for as long as
								necessary to fulfill the purposes outlined in this privacy
								policy, unless a longer retention period is required or
								permitted by law.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>9. Your Privacy Rights</h2>
							<p>
								Depending on your location, you may have certain rights
								regarding your personal information, including:
							</p>
							<ul>
								<li>
									<strong>Access:</strong> The right to request access to your
									personal information
								</li>
								<li>
									<strong>Correction:</strong> The right to request correction
									of inaccurate information
								</li>
								<li>
									<strong>Deletion:</strong> The right to request deletion of
									your personal information
								</li>
								<li>
									<strong>Opt-Out:</strong> The right to opt-out of marketing
									communications
								</li>
								<li>
									<strong>Data Portability:</strong> The right to receive your
									data in a portable format
								</li>
							</ul>
							<p>
								To exercise these rights, please contact us using the
								information provided below.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>10. Children&apos;s Privacy</h2>
							<p>
								Our website is not intended for children under the age of 13. We
								do not knowingly collect personal information from children
								under 13. If you believe we have collected information from a
								child under 13, please contact us immediately.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>11. International Users</h2>
							<p>
								If you are accessing our website from outside the United States,
								please be aware that your information may be transferred to,
								stored, and processed in the United States. By using our
								website, you consent to such transfer.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>12. Changes to This Privacy Policy</h2>
							<p>
								We may update this privacy policy from time to time. We will
								notify you of any changes by posting the new privacy policy on
								this page and updating the &quot;Last Updated&quot; date.
							</p>
							<p>
								We encourage you to review this privacy policy periodically to
								stay informed about how we are protecting your information.
							</p>
						</div>

						<div className={styles.privacyBlock}>
							<h2>13. Contact Us</h2>
							<p>
								If you have questions or concerns about this Privacy Policy or
								our data practices, please contact us:
							</p>
							<ul>
								<li>Email: houstontxspartans@gmail.com</li>
								<li>Discord: discord.gg/fP5Ek7Xv3A</li>
							</ul>
						</div>

						<div className={styles.acknowledgment}>
							<p>
								By using the Houston Spartans website, you acknowledge that you
								have read and understood this Privacy Policy and agree to its
								terms.
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
