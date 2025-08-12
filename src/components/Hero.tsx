'use client';

import Image from 'next/image';
import { DiscordIcon } from './icons';
import styles from './Hero.module.css';

export default function Hero() {
	return (
		<section id="home" className={styles.hero}>
			<div className={styles.heroBackground}>
				<div className={styles.heroParticles}></div>
				<div className={styles.heroGradient}></div>
			</div>
			<div className={styles.heroContent}>
				<h1 className={styles.heroTitle}>
					<span className={styles.titleLine}>WELCOME TO</span>
					<span className={styles.titleMain}>SPARTAN NATION</span>
				</h1>
				<p className={styles.heroDescription}>
					<span className={styles.descriptionHighlight}>Rise.</span>
					<span className={styles.descriptionHighlight}>Compete.</span>
					<span className={styles.descriptionHighlight}>Conquer.</span>
				</p>
				<div className={styles.heroCta}>
					<a
						href="https://discord.gg/fP5Ek7Xv3A"
						target="_blank"
						rel="noopener noreferrer"
						className={`${styles.ctaButton} ${styles.primary}`}
					>
						<DiscordIcon />
						<span>JOIN THE SPARTANS</span>
						<div className={styles.buttonShine}></div>
					</a>
					<button
						className={styles.scrollIndicator}
						onClick={() => {
							const missionSection = document.getElementById('mission');
							missionSection?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						<i className="fas fa-chevron-down"></i>
					</button>
				</div>
			</div>
			<div className={styles.heroLogo}>
				<div className="logo-glow">
					<Image
						src="/images/branding/logo.png"
						alt="Houston Spartans Logo"
						width={120}
						height={120}
					/>
				</div>
			</div>
		</section>
	);
}
