import PageHero from '@/components/PageHero';
import AboutEstablished from '@/components/AboutEstablished';
import AboutMission from '@/components/AboutMission';
import AboutOwners from '@/components/AboutOwners';
import AboutBrand from '@/components/AboutBrand';

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
