import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Teams from '@/components/Teams';

export const metadata: Metadata = {
	title: 'Our Spartans | Houston Spartans',
	description:
		'Meet the Houston Spartans Management Team - a dedicated group of managers and staff committed to supporting the Spartans community in Houston, Texas and around the world.',
};

export default function TeamsPage() {
	return (
		<>
			<PageHero
				title="OUR SPARTANS"
				highlightedWord="SPARTANS"
				description="Meet the Houston Spartans Management Team - a dedicated group of managers and staff committed to supporting the Spartans community in Houston, Texas and around the world."
			/>
			<Teams />
		</>
	);
}
