import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import '@/styles/global-base.css';
import { Navbar, Footer, AdminSidebar } from '@/components/layout';
import { BackToTop } from '@/components/common';
import { AuthProvider } from '@/contexts/AuthContext';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Houston Spartans - Esports Community',
	description:
		'Rise. Compete. Conquer. Join the Houston Spartans esports community and unlock your full potential at the highest level.',
	keywords:
		'Houston Spartans, esports, gaming, community, tournaments, Call of Duty, competitive gaming',
	authors: [{ name: 'Houston Spartans' }],
	openGraph: {
		title: 'Houston Spartans - Esports Community',
		description:
			'Rise. Compete. Conquer. Join the Houston Spartans esports community.',
		images: ['/images/branding/logo.png'],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Houston Spartans - Esports Community',
		description:
			'Rise. Compete. Conquer. Join the Houston Spartans esports community.',
		images: ['/images/branding/logo.png'],
	},
	icons: {
		icon: '/images/branding/favicon.ico',
		shortcut: '/images/branding/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
				/>
			</head>
			<body className={`${montserrat.variable} antialiased`}>
				<AuthProvider>
					<AdminSidebar />
					<Navbar />
					{children}
					<Footer />
					<BackToTop />
				</AuthProvider>
			</body>
		</html>
	);
}
