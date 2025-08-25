import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';
import { uploadImage } from '@/lib/supabase/storage';

// POST /api/admin/news/upload - Upload image for news posts
export async function POST(request: NextRequest) {
	try {
		const authResult = await checkAdminAuth();
		if (isAuthError(authResult)) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;
		const folder = (formData.get('folder') as string) || 'content';

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Validate file type
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
		if (!allowedTypes.includes(file.type)) {
			return NextResponse.json(
				{
					error:
						'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
				},
				{ status: 400 },
			);
		}

		// Validate file size (50MB limit)
		const maxSize = 50 * 1024 * 1024; // 50MB in bytes
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: 'File size too large. Maximum size is 50MB.' },
				{ status: 400 },
			);
		}

		// Upload to Supabase Storage
		const { url, error } = await uploadImage(file, folder);

		if (error) {
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({
			url,
			message: 'Image uploaded successfully',
		});
	} catch (error) {
		console.error('Error uploading image:', error);
		return NextResponse.json(
			{ error: 'Failed to upload image' },
			{ status: 500 },
		);
	}
}
