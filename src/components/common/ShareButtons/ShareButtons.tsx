'use client';

import { useState, useEffect } from 'react';
import { XIcon, FacebookIcon, DiscordIcon } from '@/components/icons';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
	readonly title: string;
	readonly url?: string; // Keep optional for flexibility, but will default to current page
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
	const [currentUrl, setCurrentUrl] = useState('');

	// Get the current URL after component mounts (client-side only)
	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);

	// Use provided URL or current page URL
	const shareUrl = url || currentUrl;
	const encodedTitle = encodeURIComponent(title);
	const encodedUrl = encodeURIComponent(shareUrl);

	const shareLinks = {
		twitter: shareUrl
			? `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
			: `https://twitter.com/intent/tweet?text=${encodedTitle}`,
		facebook: shareUrl
			? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
			: `https://www.facebook.com/sharer/sharer.php?quote=${encodedTitle}`,
		discord: 'https://discord.gg/fP5Ek7Xv3A',
	};

	return (
		<div className={styles.shareButtons}>
			<a
				href={shareLinks.twitter}
				target="_blank"
				rel="noopener noreferrer"
				className={styles.shareBtn}
				aria-label="Share on X/Twitter"
			>
				<XIcon />
			</a>
			<a
				href={shareLinks.facebook}
				target="_blank"
				rel="noopener noreferrer"
				className={styles.shareBtn}
				aria-label="Share on Facebook"
			>
				<FacebookIcon />
			</a>
			<a
				href={shareLinks.discord}
				target="_blank"
				rel="noopener noreferrer"
				className={styles.shareBtn}
				aria-label="Join our Discord"
			>
				<DiscordIcon />
			</a>
		</div>
	);
}
