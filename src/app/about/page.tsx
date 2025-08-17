import { PageHero } from '@/components/layout';
import {
	AboutEstablished,
	AboutMission,
	AboutOwners,
	AboutBrand,
} from '@/components/sections/about';

export default function AboutPage() {
	return (
		<>
			<PageHero
				title="ABOUT US"
				highlightedWord="US"
				description="Discover the story behind Houston Spartans - a family-run esports organization dedicated to empowering players and building a strong gaming community in the heart of Texas."
			/>
			<AboutEstablished />
			<AboutMission />
			<AboutOwners />
			<AboutBrand />
		</>
	);
}
