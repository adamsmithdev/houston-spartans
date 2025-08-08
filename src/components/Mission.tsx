import { Container, SectionHeading, Card } from '@/components/ui';

export default function Mission() {
	return (
		<section id="mission" className="mission">
			<Container>
				<SectionHeading description="At the Houston Spartans, our mission is to empower every player to achieve their goals and unlock their full potential at the highest level.">
					WELCOME & JOIN OUR SPARTAN JOURNEY
				</SectionHeading>

				<div className="mission-cards">
					<Card variant="mission">
						<div className="card-icon">
							<i className="fas fa-trophy"></i>
						</div>
						<h3>COMPETITION</h3>
						<p>&quot;Rise. Compete. Conquer.&quot;</p>
					</Card>
					<Card variant="mission">
						<div className="card-icon">
							<i className="fas fa-users"></i>
						</div>
						<h3>COMMUNITY</h3>
						<p>
							Community is a vibrant and inclusive group of passionate gamers,
							dedicated to supporting each other
						</p>
					</Card>
					<Card variant="mission">
						<div className="card-icon">
							<i className="fas fa-video"></i>
						</div>
						<h3>CONTENT</h3>
						<p>Engaging content that showcases high-level gameplay</p>
					</Card>
				</div>
			</Container>
		</section>
	);
}
