import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';
import { validateNewsPost } from '@/lib/validators/newsValidator';
import type { SupabaseClient } from '@supabase/supabase-js';

interface RouteParams {
	params: Promise<{ id: string }>;
}

interface NewsPostUpdateRequest {
	title: string;
	slug: string;
	excerpt?: string;
	content: string;
	category?: string;
	is_published?: boolean;
	is_featured?: boolean;
	image_url?: string;
	read_time?: string | number;
	tags?: string[];
}

interface NewsPostRecord {
	id: string;
	title: string;
	slug: string;
	excerpt?: string;
	content: string;
	category?: string;
	is_published: boolean;
	is_featured: boolean;
	image_url?: string;
	read_time: number;
	tags: string[];
	published_at?: string | null;
}

// GET /api/admin/news/[id] - Get specific news post
export async function GET(request: NextRequest, { params }: RouteParams) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const resolvedParams = await params;
		const { id } = resolvedParams;

		const { data: post, error } = await supabase
			.from('news_posts')
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return NextResponse.json({ error: 'Post not found' }, { status: 404 });
			}
			throw error;
		}

		return NextResponse.json({ post });
	} catch (error) {
		console.error('Error fetching news post:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch news post' },
			{ status: 500 },
		);
	}
}

/**
 * Validates required fields for news post update using comprehensive validation
 */
function validateUpdateFields(
	body: NewsPostUpdateRequest,
): NextResponse | null {
	const validationData = {
		title: body.title || '',
		slug: body.slug || '',
		excerpt: body.excerpt || '', // Now optional
		content: body.content || '',
		category: body.category || 'Community',
		readTime: parseInt(body.read_time?.toString() || '5'),
		tags: Array.isArray(body.tags) ? body.tags : [],
		imageUrl: body.image_url,
	};

	const validation = validateNewsPost(validationData);
	if (!validation.isValid) {
		return NextResponse.json(
			{
				error: 'Validation failed',
				details: validation.errors,
			},
			{ status: 400 },
		);
	}

	return null;
}

/**
 * Normalizes slug format
 */
function normalizeSlug(slug: string): string {
	return slug
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, '-')
		.replace(/-+/g, '-');
}

/**
 * Prepares update data object with proper type conversion
 */
function prepareUpdateData(
	body: NewsPostUpdateRequest,
	currentPost: NewsPostRecord,
): Record<string, unknown> {
	const {
		title,
		slug,
		excerpt,
		content,
		category,
		is_featured,
		image_url,
		read_time,
		tags,
	} = body;

	return {
		title,
		slug: normalizeSlug(slug),
		excerpt,
		content,
		category,
		is_featured,
		image_url,
		read_time: read_time
			? parseInt(read_time.toString())
			: currentPost.read_time,
		tags: Array.isArray(tags) ? tags : currentPost.tags,
	};
}

/**
 * Handles publishing status logic and timestamps
 */
function handlePublishingStatus(
	updateData: Record<string, unknown>,
	is_published: boolean | undefined,
	currentPost: NewsPostRecord,
): void {
	if (is_published === undefined) return;

	updateData.is_published = is_published;

	if (is_published && !currentPost.published_at) {
		updateData.published_at = new Date().toISOString();
	} else if (!is_published) {
		updateData.published_at = null;
	}
}

/**
 * Unfeatures other posts when this post is being featured
 */
async function handleFeaturingLogic(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	supabase: any,
	id: string,
	is_featured: boolean | undefined,
	currentPost: NewsPostRecord,
): Promise<void> {
	if (is_featured !== true || currentPost.is_featured) return;

	const { error } = await supabase
		.from('news_posts')
		.update({ is_featured: false })
		.neq('id', id)
		.eq('is_featured', true);

	if (error) {
		console.error('Error unfeaturing other posts:', error);
		// Continue with the update anyway - this is not a critical failure
	}
}

/**
 * Fetches current post and handles not found errors
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchCurrentPost(supabase: any, id: string) {
	const { data: currentPost, error: fetchError } = await supabase
		.from('news_posts')
		.select('*')
		.eq('id', id)
		.single();

	if (fetchError) {
		if (fetchError.code === 'PGRST116') {
			return {
				error: NextResponse.json({ error: 'Post not found' }, { status: 404 }),
			};
		}
		throw fetchError;
	}

	return { currentPost: currentPost as NewsPostRecord };
}

/**
 * Updates the post in database with error handling
 */
async function updatePostInDatabase(
	supabase: SupabaseClient,
	id: string,
	updateData: Record<string, unknown>,
) {
	const { data: post, error } = await supabase
		.from('news_posts')
		.update(updateData)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		if (error.code === '23505') {
			return {
				error: NextResponse.json(
					{ error: 'A post with this slug already exists' },
					{ status: 409 },
				),
			};
		}
		throw error;
	}

	return { post };
}

// PUT /api/admin/news/[id] - Update specific news post
export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const resolvedParams = await params;
		const { id } = resolvedParams;
		const body = await request.json();

		// Validate required fields
		const validationError = validateUpdateFields(body);
		if (validationError) return validationError;

		// Fetch current post
		const fetchResult = await fetchCurrentPost(supabase, id);
		if ('error' in fetchResult) return fetchResult.error;
		const { currentPost } = fetchResult;

		// Prepare update data
		const updateData = prepareUpdateData(body, currentPost);

		// Handle publishing status
		handlePublishingStatus(updateData, body.is_published, currentPost);

		// Handle featuring logic
		await handleFeaturingLogic(supabase, id, body.is_featured, currentPost);

		// Update the post
		const updateResult = await updatePostInDatabase(supabase, id, updateData);
		if ('error' in updateResult) return updateResult.error;

		return NextResponse.json({ post: updateResult.post });
	} catch (error) {
		console.error('Error updating news post:', error);
		return NextResponse.json(
			{ error: 'Failed to update news post' },
			{ status: 500 },
		);
	}
}

// DELETE /api/admin/news/[id] - Delete specific news post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const resolvedParams = await params;
		const { id } = resolvedParams;

		// Check if post exists
		const { error: fetchError } = await supabase
			.from('news_posts')
			.select('id, image_url')
			.eq('id', id)
			.single();

		if (fetchError) {
			if (fetchError.code === 'PGRST116') {
				return NextResponse.json({ error: 'Post not found' }, { status: 404 });
			}
			throw fetchError;
		}

		// Delete the post
		const { error } = await supabase.from('news_posts').delete().eq('id', id);

		if (error) {
			throw error;
		}

		// NOTE: Future enhancement could include cleanup of associated images:
		// - Parse post content for embedded images and remove from storage
		// - Remove header image if stored in our Supabase bucket
		// Currently images remain in storage for data integrity

		return NextResponse.json(
			{ message: 'Post deleted successfully' },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Error deleting news post:', error);
		return NextResponse.json(
			{ error: 'Failed to delete news post' },
			{ status: 500 },
		);
	}
}
