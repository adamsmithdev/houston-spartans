import type { Metadata } from 'next';
import { PageHero } from '@/components/layout';
import { Teams } from '@/components/sections/teams';
import { createPageMetadata } from '@/utils/metadata';

export const metadata: Metadata = createPageMetadata({
	title: 'Our Spartans',
	description:
		'Meet the Houston Spartans Management Team - dedicated managers and staff committed to supporting the Spartans community in Houston, Texas and worldwide.',
	keywords: ['team', 'management', 'staff', 'HSMT'],
});

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
