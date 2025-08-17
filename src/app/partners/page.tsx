import { PageHero } from '@/components/layout';
import {
	PartnersSection,
	Sponsors,
	PartnershipOpportunities,
} from '@/components/sections/partners';

export default function PartnersPage() {
	return (
		<main>
			<PageHero
				title="PARTNERS & SPONSORS"
				highlightedWord="SPONSORS"
				description="The Houston Spartans proudly partner with and are sponsored by a diverse group of organizations that share our passion for community, education, athletics, and excellence."
			/>
			<PartnersSection />
			<Sponsors />
			<PartnershipOpportunities />
		</main>
	);
}
