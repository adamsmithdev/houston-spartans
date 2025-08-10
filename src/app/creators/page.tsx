import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContentCreators from '@/components/ContentCreators';
import ContentCreatorProgram from '@/components/ContentCreatorProgram';
import { createPageMetadata } from '@/utils/metadata';

export const metadata: Metadata = createPageMetadata({
	title: 'Content Creators',
	description:
		'Join the Houston Spartans Content Creator Program. Connect with fellow creators, grow your brand, and be part of our gaming community.',
	keywords: ['content creators', 'streaming', 'youtube', 'twitch', 'program'],
});

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
