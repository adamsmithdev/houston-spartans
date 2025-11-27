import type { Metadata } from 'next';
import { PageHero } from '@/components/layout';
import { Container } from '@/components/ui';
import { createPageMetadata } from '@/utils/metadata';
import styles from './faqs.module.css';

export const metadata: Metadata = createPageMetadata({
	title: 'FAQs',
	description:
		'Find answers to frequently asked questions about Houston Spartans, our Content Creator Program, and how to get involved.',
	keywords: ['faq', 'questions', 'help', 'support', 'information'],
});

export default function FAQsPage() {
	return (
		<>
			<PageHero
				title="FREQUENTLY ASKED QUESTIONS"
				highlightedWord="QUESTIONS"
				description="Find answers to common questions about Houston Spartans and our programs."
			/>
			<section className={styles.faqSection}>
				<Container>
					<div className={styles.faqContent}>
						<div className={styles.faqCategory}>
							<h2>General Questions</h2>

							<div className={styles.faqItem}>
								<h3>What is Houston Spartans?</h3>
								<p>
									Houston Spartans is a family-run esports organization based in
									Houston, Texas. We&apos;re dedicated to building a strong
									gaming community, supporting competitive teams, and empowering
									content creators across various platforms.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>When was Houston Spartans founded?</h3>
								<p>
									Houston Spartans was established in 2023 by Chris Cervantez
									(PapaSpart) with the goal of creating opportunities for gamers
									and content creators in the Houston area and beyond.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>What games does Houston Spartans compete in?</h3>
								<p>
									We primarily focus on Call of Duty, but we&apos;re expanding
									into other competitive titles. Our organization supports both
									competitive teams and content creators across various gaming
									platforms.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>How can I stay updated on Houston Spartans news?</h3>
								<p>
									You can stay connected by following us on our social media
									channels (X/Twitter, Instagram, TikTok), joining our Discord
									community, and checking the News section on our website
									regularly.
								</p>
							</div>
						</div>

						<div className={styles.faqCategory}>
							<h2>Content Creator Program</h2>

							<div className={styles.faqItem}>
								<h3>What is the Content Creator Program?</h3>
								<p>
									Our Content Creator Program is designed to support and empower
									creators who want to grow their platforms within a supportive
									community. Members receive team merchandise, social media
									promotion, collaboration opportunities, and access to our
									creator network.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>Who can apply to the Content Creator Program?</h3>
								<p>
									We welcome applications from passionate content creators who
									are actively growing their platforms and producing quality
									content. You don&apos;t need to focus exclusively on gaming -
									we value diverse content that aligns with our brand values and
									community.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>What are the requirements to join?</h3>
								<p>
									We look for creators who are committed to producing quality
									content regularly, actively growing their audience, and want
									to collaborate within a community. While we don&apos;t have
									strict follower count requirements, we do evaluate engagement,
									content quality, and alignment with our values.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>How do I apply to become a content creator?</h3>
								<p>
									Visit our Apply page and fill out the application form with
									details about your platforms, content, and why you want to
									join Houston Spartans. Include links to your best content so
									we can review your work.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>How long does the application process take?</h3>
								<p>
									We typically review applications within 5-7 business days. If
									your application is approved, we&apos;ll reach out via email
									with next steps. If denied, you can reapply after 1 month.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>What benefits do content creators receive?</h3>
								<p>
									Content creators receive official Houston Spartans
									merchandise, social media promotion and shoutouts, access to
									our creator community for networking, collaboration
									opportunities, resources and support to grow your platform,
									and invitations to exclusive events.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>Do I need to stream or create content about gaming?</h3>
								<p>
									While many of our creators focus on gaming content, we&apos;re
									open to diverse content types. What matters most is quality,
									consistency, and alignment with our community values.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>
									Can I be part of another organization while being a Houston
									Spartans creator?
								</h3>
								<p>
									This depends on the nature of your involvement with other
									organizations. Generally, we prefer creators who can fully
									represent Houston Spartans, but we evaluate each situation
									individually. Please mention any existing affiliations in your
									application.
								</p>
							</div>
						</div>

						<div className={styles.faqCategory}>
							<h2>Competitive Teams</h2>

							<div className={styles.faqItem}>
								<h3>Does Houston Spartans have competitive teams?</h3>
								<p>
									Yes! We have competitive Call of Duty teams that compete in
									various tournaments and leagues. Check our Teams page for
									current rosters and team information.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>How can I try out for a competitive team?</h3>
								<p>
									Team tryouts and recruitment processes vary. The best way to
									stay informed about opportunities is to join our Discord
									community and follow our social media for announcements.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>What skill level is required for competitive teams?</h3>
								<p>
									We look for dedicated players with competitive experience and
									strong team communication skills. Specific requirements vary
									by game and team, but we value commitment, teamwork, and the
									desire to improve.
								</p>
							</div>
						</div>

						<div className={styles.faqCategory}>
							<h2>Community & Discord</h2>

							<div className={styles.faqItem}>
								<h3>How do I join the Houston Spartans Discord?</h3>
								<p>
									Click the &quot;Join Discord&quot; button in our website
									navigation or visit discord.gg/fP5Ek7Xv3A. Our Discord is open
									to everyone interested in the Houston Spartans community.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>What can I expect in the Discord community?</h3>
								<p>
									Our Discord is a welcoming space for gamers, content creators,
									and fans to connect. You&apos;ll find channels for gaming
									discussions, content sharing, team updates, and general
									community interaction. Being active in Discord is a great way
									to strengthen your connection with Houston Spartans.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>Are there community events?</h3>
								<p>
									Yes! We host various community events, viewing parties, and
									online tournaments. Event announcements are shared on Discord
									and our social media channels.
								</p>
							</div>
						</div>

						<div className={styles.faqCategory}>
							<h2>Partnerships & Sponsorships</h2>

							<div className={styles.faqItem}>
								<h3>Does Houston Spartans work with sponsors and partners?</h3>
								<p>
									Yes! We partner with brands that align with our values and
									support the gaming community. Check our Partners page to see
									our current partnerships.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>How can my company partner with Houston Spartans?</h3>
								<p>
									If you&apos;re interested in partnership or sponsorship
									opportunities, please reach out via our Contact page.
									We&apos;re always open to discussing mutually beneficial
									collaborations.
								</p>
							</div>
						</div>

						<div className={styles.faqCategory}>
							<h2>Merchandise & Store</h2>

							<div className={styles.faqItem}>
								<h3>Where can I buy Houston Spartans merchandise?</h3>
								<p>
									You can purchase official Houston Spartans merchandise through
									our online store. Click the &quot;Store&quot; link in the
									navigation to browse available items.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>Do content creators receive free merchandise?</h3>
								<p>
									Yes! Approved content creators in our program receive official
									Houston Spartans team merchandise as part of their benefits
									package.
								</p>
							</div>
						</div>

						<div className={styles.faqCategory}>
							<h2>Contact & Support</h2>

							<div className={styles.faqItem}>
								<h3>How can I contact Houston Spartans?</h3>
								<p>
									You can reach us through our Contact page, via email at
									houstontxspartans@gmail.com, or on Discord at
									discord.gg/fP5Ek7Xv3A. We try to respond to all inquiries
									within 1-2 business days.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3>
									I have a question that&apos;s not answered here. What should I
									do?
								</h3>
								<p>
									If you can&apos;t find the answer you&apos;re looking for,
									please don&apos;t hesitate to reach out through our Contact
									page or join our Discord community where our team and
									community members can help answer your questions.
								</p>
							</div>
						</div>

						<div className={styles.callToAction}>
							<h3>Still have questions?</h3>
							<p>
								Join our Discord community or reach out through our contact form
								- we&apos;re here to help!
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
