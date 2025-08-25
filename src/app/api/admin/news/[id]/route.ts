import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';

interface RouteParams {
	params: Promise<{ id: string }>;
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

		const {
			title,
			slug,
			excerpt,
			content,
			category,
			is_published,
			is_featured,
			image_url,
			read_time,
			tags,
		} = body;

		// Validation
		if (!title || !slug || !content) {
			return NextResponse.json(
				{ error: 'Title, slug, and content are required' },
				{ status: 400 },
			);
		}

		// Get current post to check if it exists
		const { data: currentPost, error: fetchError } = await supabase
			.from('news_posts')
			.select('*')
			.eq('id', id)
			.single();

		if (fetchError) {
			if (fetchError.code === 'PGRST116') {
				return NextResponse.json({ error: 'Post not found' }, { status: 404 });
			}
			throw fetchError;
		}

		// Prepare update data
		const updateData: Record<string, unknown> = {
			title,
			slug: slug
				.toLowerCase()
				.replace(/[^a-z0-9-]/g, '-')
				.replace(/-+/g, '-'),
			excerpt,
			content,
			category,
			is_featured,
			image_url,
			read_time: parseInt(read_time?.toString()) || currentPost.read_time,
			tags: Array.isArray(tags) ? tags : currentPost.tags,
		};

		// Handle publishing status
		if (is_published !== undefined) {
			updateData.is_published = is_published;

			// Set published_at timestamp when publishing for the first time
			if (is_published && !currentPost.published_at) {
				updateData.published_at = new Date().toISOString();
			}
			// Clear published_at when unpublishing
			else if (!is_published) {
				updateData.published_at = null;
			}
		}

		// Auto-unfeaturing logic: If this post is being featured, unfeature all others
		if (is_featured === true && !currentPost.is_featured) {
			const { error: unfeatueError } = await supabase
				.from('news_posts')
				.update({ is_featured: false })
				.neq('id', id)
				.eq('is_featured', true);

			if (unfeatueError) {
				console.error('Error unfeaturing other posts:', unfeatueError);
				// Continue with the update anyway - this is not a critical failure
			}
		}

		// Update the post
		const { data: post, error } = await supabase
			.from('news_posts')
			.update(updateData)
			.eq('id', id)
			.select()
			.single();

		if (error) {
			if (error.code === '23505') {
				// Unique constraint violation
				return NextResponse.json(
					{ error: 'A post with this slug already exists' },
					{ status: 409 },
				);
			}
			throw error;
		}

		return NextResponse.json({ post });
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
