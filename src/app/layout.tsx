import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import '@/styles/sections/index.css';

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
		images: ['/images/logo.png'],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Houston Spartans - Esports Community',
		description:
			'Rise. Compete. Conquer. Join the Houston Spartans esports community.',
		images: ['/images/logo.png'],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
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
			<body className={`${montserrat.variable} antialiased`}>{children}</body>
		</html>
	);
}
