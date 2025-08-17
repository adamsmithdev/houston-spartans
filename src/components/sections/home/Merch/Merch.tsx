import { Container } from '@/components/ui';
import { HOUSTON_SPARTANS_STORE_URL } from '@/constants';
import styles from './Merch.module.css';

export default function Merch() {
	return (
		<section id="merch" className={styles.merch}>
			<div className={styles.merchBackground}>
				<div className={styles.merchOverlay}></div>
			</div>
			<Container>
				<div className={styles.merchContent}>
					<h2>SPARTAN MERCH IS LIVE</h2>
					<a
						href={HOUSTON_SPARTANS_STORE_URL}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.merchCtaBtn}
					>
						<i className="fas fa-shopping-cart"></i>
						<span>GET YOURS NOW</span>
						<i className="fas fa-arrow-right"></i>
					</a>
				</div>
			</Container>
		</section>
	);
}
