'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DiscordIcon } from '@/components/icons';
import { HOUSTON_SPARTANS_STORE_URL } from '@/constants';
import styles from './Navbar.module.css';

export default function Navbar() {
	useEffect(() => {
		// Mobile Navigation Toggle
		const navToggle = document.getElementById('nav-toggle');
		const navMenu = document.getElementById('nav-menu');
		const navLinks = document.querySelectorAll(`.${styles.navLink}`);
		const navbar = document.querySelector(`.${styles.navbar}`);

		// Helper function to activate hamburger menu
		const activateHamburgerMenu = () => {
			const bars = navToggle?.querySelectorAll(`.${styles.bar}`);
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
			const bars = navToggle?.querySelectorAll(`.${styles.bar}`);
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
				navbar?.classList.add(styles.scrolled);
			} else {
				navbar?.classList.remove(styles.scrolled);
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
		navToggle?.addEventListener('click', handleNavToggle);
		navLinks.forEach((link) => {
			link.addEventListener('click', handleNavLinkClick);
		});

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
			navToggle?.removeEventListener('click', handleNavToggle);
			navLinks.forEach((link) => {
				link.removeEventListener('click', handleNavLinkClick);
			});
		};
	}, []);

	return (
		<nav className={styles.navbar}>
			<div className={styles.navContainer}>
				<Link href="/" className={styles.navLogo}>
					<Image
						src="/images/branding/logo.png"
						alt="Houston Spartans"
						width={30}
						height={30}
					/>
				</Link>
				<div className={`${styles.navMenu}`} id="nav-menu">
					<Link href="/" className={styles.navLink}>
						Home
					</Link>
					<Link href="/about" className={styles.navLink}>
						About
					</Link>
					<Link href="/news" className={styles.navLink}>
						News
					</Link>
					<Link href="/contact" className={styles.navLink}>
						Contact
					</Link>
					<Link href="/teams" className={styles.navLink}>
						Teams
					</Link>
					<Link href="/creators" className={styles.navLink}>
						Creators
					</Link>
					<Link href="/partners" className={styles.navLink}>
						Partners
					</Link>
					<Link
						href={HOUSTON_SPARTANS_STORE_URL}
						className={styles.navLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						Store
					</Link>
					<Link
						href="https://discord.gg/fP5Ek7Xv3A"
						className={`${styles.navLink} ${styles.discordBtn}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<DiscordIcon /> Join Discord
					</Link>
				</div>
				<div className={styles.navToggle} id="nav-toggle">
					<span className={styles.bar}></span>
					<span className={styles.bar}></span>
					<span className={styles.bar}></span>
				</div>
			</div>
		</nav>
	);
}
