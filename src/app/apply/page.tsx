import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ApplicationForm from '@/components/ApplicationForm';

export const metadata: Metadata = {
	title: 'Apply to Join | Houston Spartans',
	description:
		'Apply to become a Houston Spartan content creator. Join our community of passionate gamers and content creators representing excellence in esports.',
};

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
