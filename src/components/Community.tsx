import Image from 'next/image';
import { Button, ButtonGroup } from '@/components/ui';
import { DiscordIcon } from './icons';

export default function Community() {
	return (
		<section id="community" className="community">
			<div className="container">
				<h2>
					OUR <span className="heading-highlight">COMMUNITY</span>
				</h2>
				<p className="community-description">
					The Houston Spartans community is a vibrant and inclusive group of
					passionate gamers, dedicated to supporting each other, building
					relationships, celebrating achievements, and fostering a positive
					esports culture.
				</p>

				<div className="community-showcase">
					<div className="community-images">
						<div className="community-image-card">
							<Image
								src="/images/community/community-1.png"
								alt="Houston Spartans Community Event"
								width={400}
								height={200}
								loading="lazy"
							/>
							<div className="image-overlay">
								<div className="overlay-content">
									<i className="fas fa-trophy"></i>
									<span>Tournaments</span>
								</div>
							</div>
						</div>
						<div className="community-image-card">
							<Image
								src="/images/community/community-2.png"
								alt="Houston Spartans Gaming Session"
								width={200}
								height={200}
								loading="lazy"
							/>
							<div className="image-overlay">
								<div className="overlay-content">
									<i className="fas fa-users"></i>
									<span>Community Events</span>
								</div>
							</div>
						</div>
						<div className="community-image-card">
							<Image
								src="/images/community/community-3.png"
								alt="Houston Spartans Tournament"
								width={200}
								height={200}
								loading="lazy"
							/>
							<div className="image-overlay">
								<div className="overlay-content">
									<i className="fas fa-gamepad"></i>
									<span>Gaming Sessions</span>
								</div>
							</div>
						</div>
					</div>

					<div className="community-steps">
						<div className="step">
							<div className="step-number">
								<i className="fas fa-comments"></i>
							</div>
							<div className="step-content">
								<h3>JOIN THE CONVERSATION</h3>
								<p>
									Connect with the Houston Spartans community by joining our
									social media channels and Discord server.
								</p>
							</div>
						</div>
						<div className="step">
							<div className="step-number">
								<DiscordIcon />
							</div>
							<div className="step-content">
								<h3>JOIN THE DISCORD SERVER</h3>
								<p>
									Dive deeper by joining the Houston Spartans&apos; Discord
									server, where you can chat with players, fans, and staff
									directly.
								</p>
							</div>
						</div>
						<div className="step">
							<div className="step-number">
								<i className="fas fa-calendar-alt"></i>
							</div>
							<div className="step-content">
								<h3>ATTEND EVENTS AND TOURNAMENTS</h3>
								<p>
									Experience the community in action by attending events,
									whether they&apos;re online tournaments, local meetups, or
									watch parties.
								</p>
							</div>
						</div>
					</div>
				</div>

				<ButtonGroup>
					<Button href="https://discord.gg/fP5Ek7Xv3A" variant="view-all">
						JOIN OUR COMMUNITY <i className="fas fa-arrow-right"></i>
					</Button>
				</ButtonGroup>
			</div>
		</section>
	);
}
