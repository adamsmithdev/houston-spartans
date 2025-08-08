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
			<section className="placeholder-hero">
				<div className="container">
					<h1>{title}</h1>
					<p className="subtitle">{description}</p>
				</div>
			</section>

			<section className="placeholder-content">
				<div className="container">
					<div className="construction-notice">
						<div className="construction-icon">
							<i className="fas fa-hammer"></i>
						</div>
						<h2>Under Construction</h2>
						<p>{comingSoonText}</p>
						<p className="placeholder-contact-info">
							Have questions? Reach out to us on{' '}
							<a
								href="https://discord.gg/fP5Ek7Xv3A"
								target="_blank"
								rel="noopener noreferrer"
								className="discord-link"
							>
								Discord
							</a>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
