'use server';

import { createClient } from '@/lib/supabase/server';
import { type NewsArticle } from '@/types/news';
import {
	transformPostsToArticles,
	transformPostToArticle,
	type DatabasePost,
} from '@/lib/transforms/postTransforms';

/**
 * Get all published news articles
 */
export async function getAllArticles(): Promise<NewsArticle[]> {
	try {
		const supabase = await createClient();

		const { data: posts, error } = await supabase
			.from('news_posts')
			.select('*')
			.eq('is_published', true)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Error fetching articles:', error);
			return [];
		}

		// Transform database posts to NewsArticle format using shared utility
		return transformPostsToArticles(posts as DatabasePost[]);
	} catch (error) {
		console.error('Error in getAllArticles:', error);
		return [];
	}
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(
	slug: string,
): Promise<NewsArticle | null> {
	try {
		const supabase = await createClient();

		const { data: post, error } = await supabase
			.from('news_posts')
			.select('*')
			.eq('slug', slug)
			.eq('is_published', true)
			.single();

		if (error || !post) {
			return null;
		}

		// Transform database post to NewsArticle format using shared utility
		return transformPostToArticle(post as DatabasePost);
	} catch (error) {
		console.error('Error in getArticleBySlug:', error);
		return null;
	}
}

/**
 * Get related articles (same category, excluding current article)
 */
export async function getRelatedArticles(
	currentSlug: string,
	category: string,
	limit: number = 3,
): Promise<NewsArticle[]> {
	try {
		const supabase = await createClient();

		const { data: posts, error } = await supabase
			.from('news_posts')
			.select('*')
			.eq('is_published', true)
			.eq('category', category)
			.neq('slug', currentSlug)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) {
			console.error('Error fetching related articles:', error);
			return [];
		}

		return transformPostsToArticles(posts as DatabasePost[]);
	} catch (error) {
		console.error('Error in getRelatedArticles:', error);
		return [];
	}
}

/**
 * Get all published slugs for static generation
 */
export async function getAllSlugs(): Promise<string[]> {
	try {
		const supabase = await createClient();

		const { data: posts, error } = await supabase
			.from('news_posts')
			.select('slug')
			.eq('is_published', true);

		if (error) {
			console.error('Error fetching slugs:', error);
			return [];
		}

		return posts.map((post) => post.slug);
	} catch (error) {
		console.error('Error in getAllSlugs:', error);
		return [];
	}
}

/**
 * Get featured articles for homepage
 */
export async function getFeaturedArticles(
	limit: number = 3,
): Promise<NewsArticle[]> {
	try {
		const supabase = await createClient();

		const { data: posts, error } = await supabase
			.from('news_posts')
			.select('*')
			.eq('is_published', true)
			.eq('is_featured', true)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) {
			console.error('Error fetching featured articles:', error);
			return [];
		}

		return transformPostsToArticles(posts as DatabasePost[]);
	} catch (error) {
		console.error('Error in getFeaturedArticles:', error);
		return [];
	}
}

/**
 * Get recent articles for homepage
 */
export async function getRecentArticles(
	limit: number = 6,
): Promise<NewsArticle[]> {
	try {
		const supabase = await createClient();

		const { data: posts, error } = await supabase
			.from('news_posts')
			.select('*')
			.eq('is_published', true)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) {
			console.error('Error fetching recent articles:', error);
			return [];
		}

		return transformPostsToArticles(posts as DatabasePost[]);
	} catch (error) {
		console.error('Error in getRecentArticles:', error);
		return [];
	}
}
