import Link from 'next/link';
import { Container } from '@/components/ui';
import {
	FacebookIcon,
	XIcon,
	InstagramIcon,
	LinktreeIcon,
} from '@/components/icons';
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Container>
				<div className={styles.footerContent}>
					<div className={styles.footerSection}>
						<h3>LATEST POSTS</h3>
						<div className={styles.footerPosts}>
							<Link href="#">RECAP: MIAMI LAN – ACADEMY RED</Link>
							<Link href="#">HOUSTON SPARTANS 4V4 BO3 VARIANT TOURNAMENT</Link>
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
						<Link href="#">Terms & Conditions</Link>
						<Link href="#">Privacy Policy</Link>
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
