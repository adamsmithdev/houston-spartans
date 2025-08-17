import { Container } from '@/components/ui';
import styles from './PageHero.module.css';
import globalStyles from '@/styles/globals.module.css';

interface PageHeroProps {
	readonly title: string;
	readonly highlightedWord?: string;
	readonly description: string;
	readonly showMethods?: boolean;
	readonly methods?: ReadonlyArray<{
		readonly icon: string;
		readonly label: string;
	}>;
}

export default function PageHero({
	title,
	highlightedWord,
	description,
	showMethods = false,
	methods = [],
}: PageHeroProps) {
	const renderTitle = () => {
		if (highlightedWord) {
			const parts = title.split(highlightedWord);
			return (
				<>
					{parts[0]}
					<span className={globalStyles.headingHighlight}>
						{highlightedWord}
					</span>
					{parts[1]}
				</>
			);
		}
		return title;
	};

	return (
		<section className={styles.pageHero}>
			<Container>
				<div className={styles.heroContent}>
					<h1>{renderTitle()}</h1>
					<p className={styles.heroDescription}>{description}</p>
					{showMethods && methods.length > 0 && (
						<div className={styles.methods}>
							{methods.map((method) => (
								<div key={method.label} className={styles.method}>
									<i className={method.icon}></i>
									<span>{method.label}</span>
								</div>
							))}
						</div>
					)}
				</div>
			</Container>
		</section>
	);
}
