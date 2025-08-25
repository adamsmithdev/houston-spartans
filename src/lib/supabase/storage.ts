import { createClient } from './server';

const BUCKET_NAME = 'news-images';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param folder - Optional folder path (e.g., 'content', 'headers')
 * @returns Promise with the public URL or error
 */
export async function uploadImage(
	file: File,
	folder: string = 'content',
): Promise<{ url?: string; error?: string }> {
	try {
		const supabase = await createClient();

		// Generate unique filename
		const fileExt = file.name.split('.').pop();
		const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
		const filePath = `${folder}/${fileName}`;

		// Upload file
		const { data, error } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(filePath, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			throw error;
		}

		// Get public URL
		const { data: urlData } = supabase.storage
			.from(BUCKET_NAME)
			.getPublicUrl(data.path);

		return { url: urlData.publicUrl };
	} catch (error) {
		console.error('Error uploading image:', error);
		return { error: 'Failed to upload image' };
	}
}

/**
 * Delete an image from Supabase Storage
 * @param filePath - The file path to delete
 * @returns Promise with success/error status
 */
export async function deleteImage(
	filePath: string,
): Promise<{ success?: boolean; error?: string }> {
	try {
		const supabase = await createClient();

		const { error } = await supabase.storage
			.from(BUCKET_NAME)
			.remove([filePath]);

		if (error) {
			throw error;
		}

		return { success: true };
	} catch (error) {
		console.error('Error deleting image:', error);
		return { error: 'Failed to delete image' };
	}
}

/**
 * Get signed URL for private images (if needed)
 * @param filePath - The file path
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Promise with the signed URL or error
 */
export async function getSignedUrl(
	filePath: string,
	expiresIn: number = 3600,
): Promise<{ url?: string; error?: string }> {
	try {
		const supabase = await createClient();

		const { data, error } = await supabase.storage
			.from(BUCKET_NAME)
			.createSignedUrl(filePath, expiresIn);

		if (error) {
			throw error;
		}

		return { url: data.signedUrl };
	} catch (error) {
		console.error('Error getting signed URL:', error);
		return { error: 'Failed to get signed URL' };
	}
}

export { BUCKET_NAME };
