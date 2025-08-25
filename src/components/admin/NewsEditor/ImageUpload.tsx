'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
	readonly currentImage?: string;
	readonly onImageUpload: (url: string) => void;
	readonly folder?: string;
}

export default function ImageUpload({
	currentImage,
	onImageUpload,
	folder = 'headers',
}: ImageUploadProps) {
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validate file type
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
		if (!allowedTypes.includes(file.type)) {
			setError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
			return;
		}

		// Validate file size (50MB limit)
		const maxSize = 50 * 1024 * 1024; // 50MB in bytes
		if (file.size > maxSize) {
			setError('File size too large. Maximum size is 50MB.');
			return;
		}

		try {
			setUploading(true);
			setError(null);

			const formData = new FormData();
			formData.append('file', file);
			formData.append('folder', folder);

			const response = await fetch('/api/admin/news/upload', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to upload image');
			}

			const { url } = await response.json();
			onImageUpload(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to upload image');
		} finally {
			setUploading(false);
			// Reset file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleRemoveImage = () => {
		onImageUpload('');
	};

	return (
		<div className={styles.imageUpload}>
			{error && (
				<div className={styles.error}>
					<p>{error}</p>
					<button onClick={() => setError(null)}>×</button>
				</div>
			)}

			<div className={styles.uploadArea}>
				{currentImage ? (
					<div className={styles.imagePreview}>
						<div className={styles.imageContainer}>
							<Image
								src={currentImage}
								alt="Header image preview"
								fill
								className={styles.image}
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div className={styles.imageActions}>
							<Button
								variant="secondary"
								onClick={handleUploadClick}
								disabled={uploading}
							>
								{uploading ? 'Uploading...' : 'Change Image'}
							</Button>
							<Button
								variant="secondary"
								onClick={handleRemoveImage}
								disabled={uploading}
							>
								Remove
							</Button>
						</div>
					</div>
				) : (
					<div className={styles.uploadPrompt}>
						<div className={styles.uploadIcon}>📷</div>
						<h3>Upload Header Image</h3>
						<p>Choose an image to represent this post</p>
						<Button
							variant="primary"
							onClick={handleUploadClick}
							disabled={uploading}
						>
							{uploading ? 'Uploading...' : 'Select Image'}
						</Button>
						<p className={styles.uploadHint}>
							Supported formats: JPEG, PNG, WebP, GIF (max 50MB)
						</p>
					</div>
				)}
			</div>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileSelect}
				className={styles.hiddenInput}
			/>
		</div>
	);
}
