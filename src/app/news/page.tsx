import { PageHero } from '@/components/layout';
import { Breadcrumbs } from '@/components/common';
import { NewsList, NewsletterSignup } from '@/components/sections/news';
import { createPageMetadata } from '@/utils/metadata';

export const metadata = createPageMetadata({
	title: 'Latest News - Houston Spartans',
	description:
		'Stay updated with the latest Houston Spartans news, tournament results, team announcements, and community highlights from the heart of Texas esports.',
	keywords: [
		'news',
		'blog',
		'tournament results',
		'team updates',
		'gaming community news',
	],
});

const breadcrumbItems = [
	{ label: 'Home', href: '/' },
	{ label: 'News' },
] as const;

export default function NewsPage() {
	return (
		<>
			<PageHero
				title="LATEST NEWS"
				highlightedWord="NEWS"
				description="Stay updated with the latest Houston Spartans news, tournament results, team announcements, and community highlights from the heart of Texas esports."
			/>
			<Breadcrumbs items={breadcrumbItems} />
			<NewsList />
			<NewsletterSignup />
		</>
	);
}
