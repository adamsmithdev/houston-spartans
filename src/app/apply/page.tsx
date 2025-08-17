import type { Metadata } from 'next';
import { PageHero } from '@/components/layout';
import { ApplicationForm } from '@/components/forms';
import { createPageMetadata } from '@/utils/metadata';

export const metadata: Metadata = createPageMetadata({
	title: 'Apply to Join',
	description:
		'Apply to join the Houston Spartans Content Creator Program. Submit your application to become part of our gaming community.',
	keywords: ['apply', 'application', 'join', 'content creator', 'program'],
});

export default function ApplyPage() {
	return (
		<>
			<PageHero
				title="APPLY TO JOIN"
				highlightedWord="JOIN"
				description="Ready to become a Houston Spartan? Fill out our application form below and take the first step towards joining our content creator community."
			/>
			<ApplicationForm />
		</>
	);
}
