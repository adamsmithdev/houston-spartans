import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';

// GET /api/admin/news - Get all news posts (including drafts for admin)
export async function GET(request: NextRequest) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { supabase } = authResult;
		const { searchParams } = new URL(request.url);

		// Query parameters
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const category = searchParams.get('category');
		const published = searchParams.get('published'); // 'true', 'false', or null for all
		const search = searchParams.get('search');

		let query = supabase
			.from('news_posts')
			.select('*', { count: 'exact' })
			.order('updated_at', { ascending: false });

		// Apply filters
		if (category && category !== 'All') {
			query = query.eq('category', category);
		}

		if (published === 'true') {
			query = query.eq('is_published', true);
		} else if (published === 'false') {
			query = query.eq('is_published', false);
		}

		if (search) {
			query = query.or(`title.ilike.%${search}%, excerpt.ilike.%${search}%`);
		}

		// Apply pagination
		const from = (page - 1) * limit;
		const to = from + limit - 1;
		query = query.range(from, to);

		const { data: posts, error, count } = await query;

		if (error) {
			throw error;
		}

		return NextResponse.json({
			posts,
			pagination: {
				page,
				limit,
				total: count || 0,
				totalPages: Math.ceil((count || 0) / limit),
			},
		});
	} catch (error) {
		console.error('Error fetching news posts:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch news posts' },
			{ status: 500 },
		);
	}
}

// POST /api/admin/news - Create new news post
export async function POST(request: NextRequest) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { user, supabase } = authResult;
		const body = await request.json();

		const {
			title,
			slug,
			excerpt,
			content,
			category = 'Community',
			is_published = false,
			is_featured = false,
			image_url,
			read_time = 5,
			tags = [],
		} = body;

		// Validation
		if (!title || !slug || !content) {
			return NextResponse.json(
				{ error: 'Title, slug, and content are required' },
				{ status: 400 },
			);
		}

		// Get user profile for author name
		const { data: profile } = await supabase
			.from('users')
			.select('full_name, email')
			.eq('id', user.id)
			.single();

		const author_name = profile?.full_name || profile?.email || 'Admin User';

		// Prepare post data
		const postData = {
			title,
			slug: slug
				.toLowerCase()
				.replace(/[^a-z0-9-]/g, '-')
				.replace(/-+/g, '-'),
			excerpt,
			content,
			category,
			author_id: user.id,
			author_name,
			is_published,
			is_featured,
			image_url,
			read_time: parseInt(read_time.toString()) || 5,
			tags: Array.isArray(tags) ? tags : [],
			published_at: is_published ? new Date().toISOString() : null,
		};

		// Auto-unfeaturing logic: If this new post is being featured, unfeature all others
		if (is_featured === true) {
			const { error: unfeatueError } = await supabase
				.from('news_posts')
				.update({ is_featured: false })
				.eq('is_featured', true);

			if (unfeatueError) {
				console.error('Error unfeaturing other posts:', unfeatueError);
				// Continue with the creation anyway - this is not a critical failure
			}
		}

		// Insert the post
		const { data: post, error } = await supabase
			.from('news_posts')
			.insert([postData])
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

		return NextResponse.json({ post }, { status: 201 });
	} catch (error) {
		console.error('Error creating news post:', error);
		return NextResponse.json(
			{ error: 'Failed to create news post' },
			{ status: 500 },
		);
	}
}
