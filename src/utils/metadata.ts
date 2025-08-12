import { type Metadata } from 'next';

interface PageMetadataOptions {
	title: string;
	description: string;
	keywords?: string[];
	ogImage?: string;
}

/**
 * Generates standardized metadata for pages
 * @param options - The metadata options
 * @returns Metadata object for Next.js pages
 */
export const createPageMetadata = ({
	title,
	description,
	keywords = [],
	ogImage = '/images/branding/logo.png',
}: PageMetadataOptions): Metadata => {
	const fullTitle = title.includes('Houston Spartans')
		? title
		: `${title} | Houston Spartans`;

	const defaultKeywords = [
		'Houston Spartans',
		'esports',
		'gaming',
		'Houston',
		'Texas',
		'competitive gaming',
		'gaming community',
	];

	return {
		title: fullTitle,
		description,
		keywords: [...defaultKeywords, ...keywords].join(', '),
		openGraph: {
			title: fullTitle,
			description,
			images: [ogImage],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			images: [ogImage],
		},
	};
};
