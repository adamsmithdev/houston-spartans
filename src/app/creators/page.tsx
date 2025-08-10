import { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContentCreators from '@/components/ContentCreators';
import ContentCreatorProgram from '@/components/ContentCreatorProgram';

export const metadata: Metadata = {
	title: 'Content Creators | Houston Spartans',
	description:
		'Discover the talented streamers and content creators representing Houston Spartans. Learn about our Content Creator Program and how to join our team.',
};

export default function CreatorsPage() {
	return (
		<>
			<PageHero
				title="CONTENT CREATORS"
				highlightedWord="CREATORS"
				description="Discover the talented streamers and content creators representing Houston Spartans. Join our Content Creator Program to become part of our growing community."
			/>
			<ContentCreators />
			<ContentCreatorProgram />
		</>
	);
}
