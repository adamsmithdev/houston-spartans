'use client';

import { useEffect } from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface PageLayoutProps {
	readonly children: React.ReactNode;
	readonly showBackToTop?: boolean;
}

export default function PageLayout({
	children,
	showBackToTop = true,
}: PageLayoutProps) {
	useEffect(() => {
		if (!showBackToTop) return;

		// Back to top functionality
		const backToTopButton = document.getElementById('back-to-top');
		const handleBackToTopScroll = () => {
			if (window.pageYOffset > 300) {
				backToTopButton?.classList.add('visible');
			} else {
				backToTopButton?.classList.remove('visible');
			}
		};

		window.addEventListener('scroll', handleBackToTopScroll);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleBackToTopScroll);
		};
	}, [showBackToTop]);

	return (
		<>
			<PageHeader />
			{children}
			<Footer />
			{showBackToTop && <BackToTop />}
		</>
	);
}
