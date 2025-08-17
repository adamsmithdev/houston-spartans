import { PageHero } from '@/components/layout';
import { Contact } from '@/components/forms';

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
