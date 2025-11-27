import {
	Container,
	SectionHeading,
	Button,
	ButtonGroup,
} from '@/components/ui';
import styles from './ContentCreatorProgram.module.css';
import globalStyles from '@/styles/globals.module.css';

export default function ContentCreatorProgram() {
	return (
		<section className={styles.programSection}>
			<Container>
				<SectionHeading level={2}>
					CONTENT CREATOR{' '}
					<span className={globalStyles.headingHighlight}>PROGRAM</span>
				</SectionHeading>

				<div className={styles.programIntro}>
					<p className={styles.introText}>
						The Houston Spartans are launching an exciting Content Creator
						Program to connect with passionate creators who share our vision of
						excellence and community. This program is designed to empower
						creators, build community engagement, and provide rewarding
						opportunities for their contributions.
					</p>
				</div>

				<div className={styles.programHighlight}>
					<div className={styles.highlightContent}>
						<h3 className={styles.highlightTitle}>JOIN OUR CREATOR FAMILY</h3>
						<p className={styles.highlightDescription}>
							We&apos;re looking for passionate content creators who are growing
							their platforms and want to continue that growth within a
							supportive community. Whether you&apos;re streaming, creating
							videos, or building content across multiple platforms, if
							you&apos;re dedicated to your craft and want to be part of
							something bigger, we want to hear from you.
						</p>

						<div className={styles.programDetails}>
							<div className={styles.detailSection}>
								<h4>What We&apos;re Looking For:</h4>
								<ul className={styles.detailList}>
									<li>Active content creators passionate about their craft</li>
									<li>
										Creators who are growing their audience and engagement
									</li>
									<li>Commitment to producing quality content regularly</li>
									<li>Desire to collaborate and grow within a community</li>
									<li>Alignment with Houston Spartans values and brand</li>
								</ul>
							</div>

							<div className={styles.detailSection}>
								<h4>What You&apos;ll Receive:</h4>
								<ul className={styles.detailList}>
									<li>Social media promotion and shoutouts</li>
									<li>Access to our creator community and networking</li>
									<li>Opportunities for collaborations and co-streaming</li>
									<li>Support and resources to help grow your platform</li>
									<li>Exclusive event invitations</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.applicationSection}>
					<h3 className={styles.applicationTitle}>HOW TO APPLY</h3>

					<div className={styles.applicationSteps}>
						<div className={styles.step}>
							<div className={styles.stepNumber}>1</div>
							<div className={styles.stepContent}>
								<h4>Application Form</h4>
								<p>
									Fill out the application form on our website with details
									about your platforms, audience demographics, and why you want
									to join the program.
								</p>
							</div>
						</div>

						<div className={styles.step}>
							<div className={styles.stepNumber}>2</div>
							<div className={styles.stepContent}>
								<h4>Content Submission</h4>
								<p>
									Provide links to your best content showcasing your creativity
									and what makes you unique.
								</p>
							</div>
						</div>

						<div className={styles.step}>
							<div className={styles.stepNumber}>3</div>
							<div className={styles.stepContent}>
								<h4>Review Process</h4>
								<p>
									Our team will review applications and reach out to selected
									creators.
								</p>
							</div>
						</div>
					</div>

					<div className={styles.nextSteps}>
						<h4>The Next Steps:</h4>
						<p>
							If denied, opportunity to reapply can be made in 1 month from the
							date of the application. During this time get involved in our
							discord community. Being a valuable community member can only help
							strengthen your bond and relationship within the organization.
						</p>
					</div>

					<div className={styles.applyButton}>
						<ButtonGroup>
							<Button href="/apply" variant="primary">
								APPLY TO BECOME A SPARTAN <i className="fas fa-arrow-right"></i>
							</Button>
						</ButtonGroup>
					</div>
				</div>
			</Container>
		</section>
	);
}
