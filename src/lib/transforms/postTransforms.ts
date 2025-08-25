import { type NewsArticle } from '@/types/news';

/**
 * Database post structure from Supabase
 */
export interface DatabasePost {
	readonly id: string;
	readonly slug: string;
	readonly title: string;
	readonly excerpt: string;
	readonly content: string;
	readonly category: string;
	readonly author_name: string | null;
	readonly created_at: string;
	readonly updated_at: string;
	readonly published_at: string | null;
	readonly is_published: boolean;
	readonly is_featured: boolean;
	readonly image_url: string | null;
	readonly read_time: number | null;
	readonly tags: readonly string[] | null;
}

/**
 * Default fallback image for posts without images
 */
const DEFAULT_IMAGE = '/images/content/news/default-news.png';

/**
 * Transform a database post to NewsArticle format
 * Pure function with no side effects
 */
export function transformPostToArticle(post: DatabasePost): NewsArticle {
	return {
		id: post.slug,
		title: post.title,
		excerpt: post.excerpt,
		content: post.content,
		category: post.category as NewsArticle['category'],
		author: post.author_name || 'Houston Spartans',
		date: new Date(post.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
		slug: post.slug,
		image: post.image_url || DEFAULT_IMAGE,
		featured: post.is_featured,
		readTime: post.read_time || 5,
		tags: post.tags || [],
	};
}

/**
 * Transform multiple database posts to NewsArticle format
 * Utility function for batch transformations
 */
export function transformPostsToArticles(
	posts: readonly DatabasePost[],
): NewsArticle[] {
	return posts.map(transformPostToArticle);
}

/**
 * Type guard to check if a post has required fields
 * Simplified to avoid linting issues with unknown type checking
 */
export function isValidPost(post: unknown): post is DatabasePost {
	if (!post || typeof post !== 'object') {
		return false;
	}

	const p = post as Record<string, unknown>;
	return (
		typeof p.slug === 'string' &&
		typeof p.title === 'string' &&
		typeof p.content === 'string' &&
		typeof p.category === 'string' &&
		typeof p.created_at === 'string' &&
		typeof p.is_published === 'boolean' &&
		typeof p.is_featured === 'boolean'
	);
}
