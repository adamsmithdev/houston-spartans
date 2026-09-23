import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth, isAuthError } from '@/lib/auth/adminAuth';
import { uploadImage, ROSTER_BUCKET_NAME } from '@/lib/supabase/storage';

// POST /api/admin/roster/upload - Upload a headshot for a roster member
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
		const folder = (formData.get('folder') as string) || 'headshots';

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

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

		const maxSize = 50 * 1024 * 1024; // 50MB
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: 'File size too large. Maximum size is 50MB.' },
				{ status: 400 },
			);
		}

		const { url, error } = await uploadImage(file, folder, ROSTER_BUCKET_NAME);

		if (error) {
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({
			url,
			message: 'Image uploaded successfully',
		});
	} catch (error) {
		console.error('Error uploading roster image:', error);
		return NextResponse.json(
			{ error: 'Failed to upload image' },
			{ status: 500 },
		);
	}
}
