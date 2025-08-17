import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

console.log('process.env.CONTACT_EMAIL', process.env.CONTACT_EMAIL);

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export async function POST(request: NextRequest) {
	try {
		const body: ContactFormData = await request.json();
		const { name, email, subject, message } = body;

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 },
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 },
			);
		}

		// Send email using Resend
		const data = await resend.emails.send({
			from: 'Houston Spartans <noreply@houstonspartans.com>',
			to: [process.env.CONTACT_EMAIL || 'houstontxspartans@gmail.com'],
			subject: `Contact Form: ${subject}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
						New Contact Form Submission
					</h2>
					
					<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Subject:</strong> ${subject}</p>
					</div>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #374151;">Message:</h3>
						<div style="background-color: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px;">
							${message.replace(/\n/g, '<br>')}
						</div>
					</div>
					
					<hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
					
					<p style="color: #6b7280; font-size: 14px;">
						This email was sent from the Houston Spartans website contact form.
					</p>
				</div>
			`,
			replyTo: email, // This allows you to reply directly to the person who submitted the form
		});

		return NextResponse.json(
			{ message: 'Email sent successfully', data },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Email sending error:', error);
		return NextResponse.json(
			{ error: 'Failed to send email. Please try again later.' },
			{ status: 500 },
		);
	}
}
