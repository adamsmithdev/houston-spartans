import Link from 'next/link';
import { FacebookIcon, XIcon, InstagramIcon, LinktreeIcon } from './icons';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-section">
						<h3>LATEST POSTS</h3>
						<div className="footer-posts">
							<Link href="#">RECAP: MIAMI LAN – ACADEMY RED</Link>
							<Link href="#">HOUSTON SPARTANS 4V4 BO3 VARIANT TOURNAMENT</Link>
						</div>
					</div>

					<div className="footer-section">
						<div className="social-media">
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

				<div className="footer-bottom">
					<div className="footer-links">
						<Link href="#">Terms & Conditions</Link>
						<Link href="#">Privacy Policy</Link>
						<Link href="#">FAQs</Link>
						<Link href="https://www.houstonspartans.com">Home</Link>
					</div>
					<p className="copyright">
						© 2025 Houston Spartans. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
