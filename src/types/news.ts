export interface NewsArticle {
	readonly id: string;
	readonly title: string;
	readonly excerpt: string;
	readonly content: string;
	readonly category: NewsCategory;
	readonly author: string;
	readonly date: string;
	readonly readTime: number;
	readonly image: string;
	readonly featured: boolean;
	readonly tags: ReadonlyArray<string>;
	readonly slug?: string;
}

export type NewsCategory =
	| 'Tournaments'
	| 'Community'
	| 'Team Updates'
	| 'Careers';

export interface NewsCategoryFilter {
	readonly label: string;
	readonly value: NewsCategory | 'All';
	readonly count?: number;
}
