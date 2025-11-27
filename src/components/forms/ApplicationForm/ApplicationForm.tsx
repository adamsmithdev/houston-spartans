'use client';

import { useState } from 'react';
import { Container, SectionHeading, Button } from '@/components/ui';
import styles from './ApplicationForm.module.css';
import globalStyles from '@/styles/globals.module.css';

interface FormData {
	// Basic Information
	name: string;
	email: string;
	discordUsername: string;

	// Platform Information
	platform: string;
	platformUsername: string;
	followerCount: string;

	// Application Details
	contentLinks: string;
	whyJoin: string;
}

const initialFormData: FormData = {
	name: '',
	email: '',
	discordUsername: '',
	platform: '',
	platformUsername: '',
	followerCount: '',
	contentLinks: '',
	whyJoin: '',
};

export default function ApplicationForm() {
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		try {
			const response = await fetch('/api/apply', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to submit application');
			}

			setSubmitStatus('success');
			setFormData(initialFormData);
		} catch (error) {
			console.error('Form submission error:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (submitStatus === 'success') {
		return (
			<section className={styles.formContainer}>
				<Container>
					<div className={styles.successMessage}>
						<div className={styles.successIcon}>
							<i className="fas fa-check-circle"></i>
						</div>
						<h2>Application Submitted Successfully!</h2>
						<p>
							Thank you for your interest in joining the Houston Spartans
							Content Creator Program. Our team will review your application and
							reach out to you within 5-7 business days.
						</p>
						<p>
							In the meantime, we encourage you to join our Discord community to
							connect with other creators and stay updated on the latest news.
						</p>
						<Button variant="primary" onClick={() => setSubmitStatus('idle')}>
							Submit Another Application
						</Button>
					</div>
				</Container>
			</section>
		);
	}

	return (
		<section className={styles.formContainer}>
			<Container>
				<SectionHeading level={2}>
					APPLICATION{' '}
					<span className={globalStyles.headingHighlight}>FORM</span>
				</SectionHeading>

				<div className={styles.formIntro}>
					<p>
						Fill out the form below with details about your platforms, audience
						demographics, and why you want to join the program. Provide links to
						your best content showcasing your creativity and relevance to gaming
						or esports.
					</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.applicationForm}>
					{/* Basic Information */}
					<div className={styles.formSection}>
						<h3>Basic Information</h3>
						<div className={styles.formGrid}>
							<div className={styles.formGroup}>
								<label htmlFor="name">Full Name *</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="email">Email Address *</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="discordUsername">Discord Username *</label>
								<input
									type="text"
									id="discordUsername"
									name="discordUsername"
									value={formData.discordUsername}
									onChange={handleInputChange}
									placeholder="username#1234"
									required
								/>
							</div>
						</div>
					</div>

					{/* Platform Information */}
					<div className={styles.formSection}>
						<h3>Platform Information</h3>
						<div className={styles.formGrid}>
							<div className={styles.formGroup}>
								<label htmlFor="platform">Primary Platform *</label>
								<select
									id="platform"
									name="platform"
									value={formData.platform}
									onChange={handleInputChange}
									required
								>
									<option value="">Select Platform</option>
									<option value="twitch">Twitch</option>
									<option value="youtube">YouTube</option>
									<option value="tiktok">TikTok</option>
									<option value="instagram">Instagram</option>
									<option value="x">X (Twitter)</option>
									<option value="facebook">Facebook</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="platformUsername">Platform Username *</label>
								<input
									type="text"
									id="platformUsername"
									name="platformUsername"
									value={formData.platformUsername}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className={styles.formGroup}>
								<label htmlFor="followerCount">Followers/Subscribers *</label>
								<input
									type="number"
									id="followerCount"
									name="followerCount"
									value={formData.followerCount}
									onChange={handleInputChange}
									min="0"
									required
								/>
							</div>
						</div>
					</div>

					{/* Content & Application */}
					<div className={styles.formSection}>
						<h3>Application Details</h3>

						<div className={styles.formGroup}>
							<label htmlFor="contentLinks">Best Content Links *</label>
							<textarea
								id="contentLinks"
								name="contentLinks"
								value={formData.contentLinks}
								onChange={handleInputChange}
								placeholder="Please provide 3-5 links to your best content that showcases your creativity and relevance to gaming/esports"
								rows={4}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="whyJoin">
								Why do you want to join the Houston Spartans? *
							</label>
							<textarea
								id="whyJoin"
								name="whyJoin"
								value={formData.whyJoin}
								onChange={handleInputChange}
								placeholder="Tell us about your passion for gaming/esports and why you want to be part of our community"
								rows={5}
								required
							/>
						</div>
					</div>

					{submitStatus === 'error' && (
						<div className={styles.errorMessage}>
							<p>
								There was an error submitting your application. Please try
								again.
							</p>
						</div>
					)}

					<div className={styles.submitSection}>
						<Button type="submit" variant="primary" disabled={isSubmitting}>
							{isSubmitting ? 'Submitting...' : 'Submit Application'}
							<i className="fas fa-paper-plane"></i>
						</Button>
					</div>
				</form>
			</Container>
		</section>
	);
}
