'use client';

import { useEffect } from 'react';

export default function ClientNavigation() {
	useEffect(() => {
		// Mobile Navigation Toggle
		const navToggle = document.getElementById('nav-toggle');
		const navMenu = document.getElementById('nav-menu');
		const navLinks = document.querySelectorAll('.nav-link');
		const navbar = document.querySelector('.navbar');

		// Helper function to activate hamburger menu
		const activateHamburgerMenu = () => {
			const bars = navToggle?.querySelectorAll('.bar');
			bars?.forEach((bar, index) => {
				if (index === 0)
					(bar as HTMLElement).style.transform =
						'rotate(-45deg) translate(-5px, 6px)';
				if (index === 1) (bar as HTMLElement).style.opacity = '0';
				if (index === 2)
					(bar as HTMLElement).style.transform =
						'rotate(45deg) translate(-5px, -6px)';
			});
		};

		// Helper function to reset hamburger menu
		const resetHamburgerMenu = () => {
			const bars = navToggle?.querySelectorAll('.bar');
			bars?.forEach((bar) => {
				(bar as HTMLElement).style.transform = '';
				(bar as HTMLElement).style.opacity = '1';
			});
		};

		// Navbar scroll effect
		const handleScroll = () => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop > 50) {
				navbar?.classList.add('scrolled');
			} else {
				navbar?.classList.remove('scrolled');
			}
		};

		// Back to top functionality
		const backToTopButton = document.getElementById('back-to-top');
		const handleBackToTopScroll = () => {
			if (window.pageYOffset > 300) {
				backToTopButton?.classList.add('visible');
			} else {
				backToTopButton?.classList.remove('visible');
			}
		};

		// Toggle mobile menu
		const handleNavToggle = () => {
			navMenu?.classList.toggle('active');
			const isActive = navMenu?.classList.contains('active') || false;
			if (isActive) {
				activateHamburgerMenu();
			} else {
				resetHamburgerMenu();
			}
		};

		// Close mobile menu when clicking on nav links
		const handleNavLinkClick = () => {
			navMenu?.classList.remove('active');
			resetHamburgerMenu();
		};

		// Event listeners
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('scroll', handleBackToTopScroll);
		navToggle?.addEventListener('click', handleNavToggle);
		navLinks.forEach((link) => {
			link.addEventListener('click', handleNavLinkClick);
		});

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('scroll', handleBackToTopScroll);
			navToggle?.removeEventListener('click', handleNavToggle);
			navLinks.forEach((link) => {
				link.removeEventListener('click', handleNavLinkClick);
			});
		};
	}, []);

	// This component only provides functionality, no UI
	return null;
}
