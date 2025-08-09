import PageHero from '@/components/PageHero';
import Contact from '@/components/Contact';

export default function ContactPage() {
	return (
		<main>
			<PageHero
				title="CONTACT US"
				highlightedWord="US"
				description="Ready to join the Houston Spartans family? Have questions about our programs, partnerships, or esports opportunities? We'd love to hear from you!"
			/>
			<Contact />
		</main>
	);
}
