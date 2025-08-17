import { Container } from '@/components/ui';
import styles from '@/styles/globals.module.css';

interface PlaceholderPageProps {
	readonly title: string;
	readonly description: string;
	readonly comingSoonText?: string;
}

export default function PlaceholderPage({
	title,
	description,
	comingSoonText = 'More content coming soon!',
}: PlaceholderPageProps) {
	return (
		<main>
			<section className={styles.placeholderHero}>
				<Container>
					<h1>{title}</h1>
					<p className={styles.subtitle}>{description}</p>
				</Container>
			</section>

			<section className={styles.placeholderContent}>
				<Container>
					<div className={styles.constructionNotice}>
						<div className={styles.constructionIcon}>
							<i className="fas fa-hammer"></i>
						</div>
						<h2>Under Construction</h2>
						<p>{comingSoonText}</p>
						<p className={styles.placeholderContactInfo}>
							Have questions? Reach out to us on{' '}
							<a
								href="https://discord.gg/fP5Ek7Xv3A"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.discordLink}
							>
								Discord
							</a>
						</p>
					</div>
				</Container>
			</section>
		</main>
	);
}
