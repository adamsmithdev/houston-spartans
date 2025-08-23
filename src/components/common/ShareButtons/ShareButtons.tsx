'use client';

import { XIcon, FacebookIcon, DiscordIcon } from '@/components/icons';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
	readonly title: string;
	readonly url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
	// Use current page URL as fallback if no URL provided
	const shareUrl = url || '';
	const encodedTitle = encodeURIComponent(title);
	const encodedUrl = shareUrl ? encodeURIComponent(shareUrl) : '';

	const shareLinks = {
		twitter:
			`https://twitter.com/intent/tweet?text=${encodedTitle}` +
			(encodedUrl ? `&url=${encodedUrl}` : ''),
		facebook:
			`https://www.facebook.com/sharer/sharer.php` +
			(encodedUrl ? `?u=${encodedUrl}` : ''),
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
