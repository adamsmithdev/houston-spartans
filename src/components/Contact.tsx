'use client';

import { useState } from 'react';

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

	const handleSubmit = (e: React.FormEvent) => {
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

		// Simulate form submission
		showNotification(
			"Message sent successfully! We'll get back to you soon.",
			'success',
		);
		setFormData({ name: '', email: '', subject: '', message: '' });
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<section id="contact" className="contact">
			<div className="container">
				<div className="contact-grid">
					<div className="contact-form">
						<h2>CONTACT INFORMATION</h2>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Your Name"
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your Email"
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									placeholder="Subject"
									required
								/>
							</div>
							<div className="form-group">
								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									placeholder="Your Message"
									rows={5}
									required
								/>
							</div>
							<button type="submit" className="submit-btn">
								SUBMIT
							</button>
						</form>
						<p className="contact-text">FEEL FREE TO CONTACT US</p>
					</div>

					<div className="contact-info">
						<div className="info-item">
							<h3>OUR LOCATION</h3>
							<p>Houston, Texas</p>
						</div>
						<div className="info-item">
							<h3>EMAIL ADDRESS</h3>
							<p>houstontxspartans@gmail.com</p>
						</div>
					</div>
				</div>

				<div className="mission-statement">
					<p>
						At the Houston Spartans, our mission is to empower every player to
						achieve their goals and unlock their full potential at the highest
						level. We serve as a vital bridge for high school E-Sports, guiding
						them toward collegiate opportunities, helping them secure
						scholarships, and paving the way for professional aspirations.
					</p>
				</div>
			</div>

			{notification && (
				<div className={`notification notification-${notification.type}`}>
					{notification.message}
				</div>
			)}
		</section>
	);
}
