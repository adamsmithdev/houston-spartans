import {
	Container,
	SectionHeading,
	Button,
	ButtonGroup,
} from '@/components/ui';
import { CREATOR_PROGRAM_TIERS } from '@/constants';
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
						excellence in esports and gaming. This program is designed to
						empower creators, build community engagement, and provide rewarding
						opportunities for their contributions.
					</p>
				</div>

				<div className={styles.tiersGrid}>
					{CREATOR_PROGRAM_TIERS.map((tier) => (
						<div key={tier.id} className={styles.tierCard}>
							<div className={styles.tierHeader}>
								<h3 className={styles.tierName}>{tier.name}</h3>
							</div>

							<div className={styles.tierContent}>
								<div className={styles.requirementsSection}>
									<h4>Requirements:</h4>
									<ul className={styles.requirementsList}>
										{tier.requirements.map((requirement) => (
											<li key={requirement}>{requirement}</li>
										))}
									</ul>
								</div>

								<div className={styles.incentivesSection}>
									<h4>Incentives:</h4>
									<ul className={styles.incentivesList}>
										{tier.incentives.map((incentive) => (
											<li key={incentive}>{incentive}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
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
									and relevance to gaming or esports.
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
