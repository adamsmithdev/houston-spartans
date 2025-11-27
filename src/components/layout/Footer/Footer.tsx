import Link from 'next/link';
import { Container } from '@/components/ui';
import {
	FacebookIcon,
	XIcon,
	InstagramIcon,
	LinktreeIcon,
} from '@/components/icons';
import { getRecentArticles } from '@/lib/newsDatabase';
import { type NewsArticle } from '@/types/news';
import styles from './Footer.module.css';

export default async function Footer() {
	// Get the latest 2 articles for the footer
	let recentArticles: NewsArticle[];
	try {
		recentArticles = await getRecentArticles(2);
	} catch (error) {
		console.error('Error fetching recent articles for footer:', error);
		recentArticles = [];
	}
	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.footerContent}>
					<div className={styles.footerSection}>
						<h3>LATEST POSTS</h3>
						<div className={styles.footerPosts}>
							{recentArticles.map((article) => (
								<Link key={article.slug} href={`/news/${article.slug}`}>
									{article.title.length > 50
										? `${article.title.substring(0, 47).toUpperCase()}...`
										: article.title.toUpperCase()}
								</Link>
							))}
							{/* Fallback if no articles */}
							{recentArticles.length === 0 && (
								<>
									<Link href="/news">VIEW ALL NEWS</Link>
									<Link href="/news">STAY UPDATED</Link>
								</>
							)}
						</div>
					</div>

					<div className={styles.footerSection}>
						<div className={styles.socialMedia}>
							<Link
								href="https://www.facebook.com/TheHoustonSpartans"
								target="_blank"
								aria-label="Follow us on Facebook"
							>
								<FacebookIcon />
							</Link>
							<Link
								href="https://x.com/HTownSpartansGG"
								target="_blank"
								aria-label="Follow us on X/Twitter"
							>
								<XIcon />
							</Link>
							<Link
								href="https://www.instagram.com/htownspartansgg/"
								target="_blank"
								aria-label="Follow us on Instagram"
							>
								<InstagramIcon />
							</Link>
							<Link
								href="https://linktr.ee/HoustonSpartans"
								target="_blank"
								aria-label="Visit our Linktree"
							>
								<LinktreeIcon />
							</Link>
						</div>
					</div>
				</div>

				<div className={styles.footerBottom}>
					<div className={styles.footerLinks}>
						<Link href="/terms">Terms & Conditions</Link>
						<Link href="/privacy">Privacy Policy</Link>
						<Link href="#">FAQs</Link>
						<Link href="https://www.houstonspartans.com">Home</Link>
					</div>
					<p className={styles.copyright}>
						© 2025 Houston Spartans. All rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	);
}
