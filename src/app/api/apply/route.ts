import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ApplicationFormData {
	name: string;
	email: string;
	discordUsername: string;
	platform: string;
	platformUsername: string;
	followerCount: string;
	contentLinks: string;
	whyJoin: string;
}

export async function POST(request: NextRequest) {
	try {
		const body: ApplicationFormData = await request.json();
		const {
			name,
			email,
			discordUsername,
			platform,
			platformUsername,
			followerCount,
			contentLinks,
			whyJoin,
		} = body;

		// Validate required fields
		if (
			!name ||
			!email ||
			!discordUsername ||
			!platform ||
			!platformUsername ||
			!followerCount ||
			!contentLinks ||
			!whyJoin
		) {
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
			subject: 'Content Creator Application',
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #bc1616; border-bottom: 2px solid #bc1616; padding-bottom: 10px;">
						New Content Creator Application
					</h2>
					
					<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="color: #374151; margin-top: 0;">Basic Information</h3>
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Discord Username:</strong> ${discordUsername}</p>
					</div>
					
					<div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="color: #374151; margin-top: 0;">Platform Information</h3>
						<p><strong>Primary Platform:</strong> ${platform}</p>
						<p><strong>Platform Username:</strong> ${platformUsername}</p>
						<p><strong>Follower Count:</strong> ${followerCount}</p>
					</div>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #374151;">Content Links:</h3>
						<div style="background-color: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px;">
							${contentLinks.replaceAll('\n', '<br>')}
						</div>
					</div>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #374151;">Why Join Houston Spartans:</h3>
						<div style="background-color: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px;">
							${whyJoin.replaceAll('\n', '<br>')}
						</div>
					</div>
					
					<hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
					
					<p style="color: #6b7280; font-size: 14px;">
						This email was sent from the Houston Spartans website creator application form.
					</p>
				</div>
			`,
			replyTo: email,
		});

		return NextResponse.json(
			{ message: 'Application sent successfully', data },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Application sending error:', error);
		return NextResponse.json(
			{ error: 'Failed to send application. Please try again later.' },
			{ status: 500 },
		);
	}
}
