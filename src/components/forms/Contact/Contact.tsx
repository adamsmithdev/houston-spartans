'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import {
	DiscordIcon,
	XIcon,
	InstagramIcon,
	FacebookIcon,
} from '@/components/icons';
import styles from './Contact.module.css';

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export default function Contact() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [notification, setNotification] = useState<{
		message: string;
		type: 'success' | 'error' | 'info';
	} | null>(null);

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const showNotification = (
		message: string,
		type: 'success' | 'error' | 'info' = 'info',
	) => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			showNotification('Please fill in all fields', 'error');
			return;
		}

		if (!isValidEmail(formData.email)) {
			showNotification('Please enter a valid email address', 'error');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				showNotification(
					"Message sent successfully! We'll get back to you soon.",
					'success',
				);
				setFormData({ name: '', email: '', subject: '', message: '' });
			} else {
				showNotification(
					result.error || 'Failed to send message. Please try again.',
					'error',
				);
			}
		} catch (error) {
			console.error('Error sending message:', error);
			showNotification(
				'Failed to send message. Please check your connection and try again.',
				'error',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const getNotificationClass = (type: 'success' | 'error' | 'info') => {
		switch (type) {
			case 'success':
				return styles.notificationSuccess;
			case 'error':
				return styles.notificationError;
			default:
				return styles.notificationInfo;
		}
	};

	return (
		<section id="contact" className={styles.contact}>
			<Container>
				<div className={styles.contactGrid}>
					<div className={styles.contactForm}>
						<h2>CONTACT INFORMATION</h2>
						<form onSubmit={handleSubmit}>
							<div className={styles.formGroup}>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Your Name"
									required
								/>
							</div>
							<div className={styles.formGroup}>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your Email"
									required
								/>
							</div>
							<div className={styles.formGroup}>
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									placeholder="Subject"
									required
								/>
							</div>
							<div className={styles.formGroup}>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									placeholder="Your Message"
									rows={5}
									required
								/>
							</div>
							<Button type="submit" variant="submit" disabled={isSubmitting}>
								{isSubmitting ? 'SENDING...' : 'SUBMIT'}
							</Button>
						</form>
					</div>

					<div className={styles.contactInfo}>
						<div className={styles.infoItem}>
							<h3>OUR LOCATION</h3>
							<p>Houston, Texas</p>
						</div>
						<div className={styles.infoItem}>
							<h3>EMAIL ADDRESS</h3>
							<p>houstontxspartans@gmail.com</p>
						</div>
						<div className={styles.infoItem}>
							<h3>JOIN OUR COMMUNITY</h3>
							<p>Connect with us on social media and Discord!</p>
							<div className={styles.socialLinks}>
								<Link
									href="https://discord.gg/fP5Ek7Xv3A"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Join our Discord"
								>
									<DiscordIcon />
								</Link>
								<Link
									href="https://x.com/HTownSpartansGG"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow us on X/Twitter"
								>
									<XIcon />
								</Link>
								<Link
									href="https://www.instagram.com/htownspartansgg/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow us on Instagram"
								>
									<InstagramIcon />
								</Link>
								<Link
									href="https://www.facebook.com/TheHoustonSpartans"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow us on Facebook"
								>
									<FacebookIcon />
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.missionStatement}>
					<p>
						At the Houston Spartans, our mission is to empower every player to
						achieve their goals and unlock their full potential at the highest
						level. We serve as a vital bridge for high school E-Sports, guiding
						them toward collegiate opportunities, helping them secure
						scholarships, and paving the way for professional aspirations.
					</p>
				</div>
			</Container>

			{notification && (
				<div
					className={`${styles.notification} ${getNotificationClass(notification.type)}`}
				>
					{notification.message}
				</div>
			)}
		</section>
	);
}
