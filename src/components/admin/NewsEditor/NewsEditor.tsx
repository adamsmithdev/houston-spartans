'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, LoadingSpinner } from '@/components/ui';
import { generateSlug } from '@/lib/validators/slugValidator';
import {
	NEWS_VALIDATION_LIMITS,
	validateTags,
} from '@/lib/validators/newsValidator';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import styles from './NewsEditor.module.css';

interface NewsPost {
	readonly id?: string;
	readonly title: string;
	readonly slug: string;
	readonly excerpt: string;
	readonly content: string;
	readonly category: string;
	readonly is_published: boolean;
	readonly is_featured: boolean;
	readonly image_url: string;
	readonly read_time: number;
	readonly tags: readonly string[];
}

interface NewsEditorProps {
	readonly postId?: string;
}

const CATEGORIES = [
	'Tournaments',
	'Community',
	'Team Updates',
	'Careers',
] as const;

export default function NewsEditor({ postId }: NewsEditorProps) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [tagInput, setTagInput] = useState('');

	const [formData, setFormData] = useState<NewsPost>({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
		category: 'Community',
		is_published: false,
		is_featured: false,
		image_url: '',
		read_time: 5,
		tags: [],
	});

	// Auto-generate slug from title
	const generateSlugFromTitle = useCallback((title: string): string => {
		if (!title?.trim()) {
			return '';
		}
		return generateSlug(title);
	}, []);

	// Get publish button text based on current state
	const getPublishButtonText = (): string => {
		return formData.is_published ? 'Update & Publish' : 'Publish';
	};

	// Update form data
	const updateFormData = useCallback((updates: Partial<NewsPost>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	}, []);

	// Fetch existing post for editing
	useEffect(() => {
		if (postId && postId !== 'new') {
			const fetchPost = async () => {
				try {
					setLoading(true);
					const response = await fetch(`/api/admin/news/${postId}`);

					if (!response.ok) {
						throw new Error('Failed to fetch post');
					}

					const { post } = await response.json();
					setFormData(post);
					setTagInput(post.tags.join(', '));
				} catch (err) {
					setError(err instanceof Error ? err.message : 'Failed to load post');
				} finally {
					setLoading(false);
				}
			};

			fetchPost();
		}
	}, [postId]);

	// Auto-scroll to top when error occurs
	useEffect(() => {
		if (error) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [error]);

	// Function to scroll to top and set error (ensures scroll even if error already exists)
	const setErrorAndScroll = useCallback((errorMessage: string) => {
		setError(errorMessage);
		// Always scroll to top when setting an error, even if error already exists
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 0);
	}, []);

	// Auto-generate slug when title changes (only for new posts)
	useEffect(() => {
		if (!postId || postId === 'new') {
			const slug = generateSlugFromTitle(formData.title);
			if (slug !== formData.slug) {
				updateFormData({ slug });
			}
		}
	}, [
		formData.title,
		formData.slug,
		postId,
		generateSlugFromTitle,
		updateFormData,
	]);

	// Save post
	const handleSave = async (publish: boolean = false) => {
		try {
			setSaving(true);
			setError(null);

			// Validation
			if (!formData.title.trim()) {
				throw new Error('Title is required');
			}
			if (!formData.slug.trim()) {
				throw new Error('Slug is required');
			}
			if (!formData.content.trim()) {
				throw new Error('Content is required');
			}

			// Parse tags
			const tags = tagInput
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);

			const postData = {
				...formData,
				is_published: publish,
				tags,
			};

			const isEditing = postId && postId !== 'new';
			const url = isEditing ? `/api/admin/news/${postId}` : '/api/admin/news';
			const method = isEditing ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to save post');
			}

			await response.json();

			// Redirect to admin news list page after successful save
			router.push('/admin/news');
		} catch (err) {
			setErrorAndScroll(
				err instanceof Error ? err.message : 'Failed to save post',
			);
		} finally {
			setSaving(false);
		}
	};

	// Handle form field changes
	const handleInputChange = (
		field: keyof NewsPost,
		value: string | number | boolean | File | null,
	) => {
		updateFormData({ [field]: value });
	};

	// Handle image upload
	const handleImageUpload = (url: string) => {
		updateFormData({ image_url: url });
	};

	// Redirect to login if not authenticated or not admin
	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/login');
		}
	}, [user, isLoading, router]);

	// Show loading spinner while auth is checking
	if (isLoading) {
		return <LoadingSpinner message="Checking authentication..." />;
	}

	// Show loading spinner while redirecting
	if (!user || user.role !== 'admin') {
		return <LoadingSpinner message="Redirecting to login..." />;
	}

	if (loading) {
		return <LoadingSpinner message="Loading post..." />;
	}

	return (
		<div className={styles.newsEditor}>
			{error && (
				<div className={styles.error}>
					<p>{error}</p>
					<button onClick={() => setError(null)}>×</button>
				</div>
			)}

			<form onSubmit={(e) => e.preventDefault()}>
				{/* Header Image Upload */}
				<div className={styles.section}>
					<label className={styles.label} htmlFor="header-image-input">
						Header Image
					</label>
					<ImageUpload
						currentImage={formData.image_url}
						onImageUpload={handleImageUpload}
						folder="headers"
					/>
				</div>

				{/* Basic Info */}
				<div className={styles.section}>
					<div className={styles.row}>
						<div className={styles.field}>
							<label htmlFor="title" className={styles.label}>
								Title * ({formData.title.length}/
								{NEWS_VALIDATION_LIMITS.title.max})
							</label>
							<input
								id="title"
								type="text"
								value={formData.title}
								onChange={(e) => handleInputChange('title', e.target.value)}
								className={`${styles.input} ${
									formData.title.length > NEWS_VALIDATION_LIMITS.title.max
										? styles.invalid
										: ''
								}`}
								placeholder="Enter post title"
								maxLength={NEWS_VALIDATION_LIMITS.title.max}
								required
							/>
							{formData.title.length > NEWS_VALIDATION_LIMITS.title.max && (
								<div className={styles.errorText}>
									Title is too long ({formData.title.length}/
									{NEWS_VALIDATION_LIMITS.title.max} characters)
								</div>
							)}
							{formData.title.length < NEWS_VALIDATION_LIMITS.title.min &&
								formData.title.length > 0 && (
									<div className={styles.warningText}>
										Title should be at least {NEWS_VALIDATION_LIMITS.title.min}{' '}
										characters
									</div>
								)}
						</div>

						<div className={styles.field}>
							<label htmlFor="slug" className={styles.label}>
								Slug * ({formData.slug.length}/{NEWS_VALIDATION_LIMITS.slug.max}
								)
							</label>
							<input
								id="slug"
								type="text"
								value={formData.slug}
								onChange={(e) => handleInputChange('slug', e.target.value)}
								className={`${styles.input} ${
									formData.slug.length > NEWS_VALIDATION_LIMITS.slug.max
										? styles.invalid
										: ''
								}`}
								placeholder="url-friendly-slug"
								maxLength={NEWS_VALIDATION_LIMITS.slug.max}
								required
							/>
							{formData.slug.length > NEWS_VALIDATION_LIMITS.slug.max && (
								<div className={styles.errorText}>
									Slug is too long ({formData.slug.length}/
									{NEWS_VALIDATION_LIMITS.slug.max} characters)
								</div>
							)}
							{formData.slug.length < NEWS_VALIDATION_LIMITS.slug.min &&
								formData.slug.length > 0 && (
									<div className={styles.warningText}>
										Slug should be at least {NEWS_VALIDATION_LIMITS.slug.min}{' '}
										characters
									</div>
								)}
							<small className={styles.hint}>
								URL: /news/{formData.slug || 'your-slug'}
							</small>
						</div>
					</div>

					<div className={styles.row}>
						<div className={styles.field}>
							<label htmlFor="category" className={styles.label}>
								Category
							</label>
							<select
								id="category"
								value={formData.category}
								onChange={(e) => handleInputChange('category', e.target.value)}
								className={styles.select}
							>
								{CATEGORIES.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>

						<div className={styles.field}>
							<label htmlFor="readTime" className={styles.label}>
								Read Time (minutes)
							</label>
							<input
								id="readTime"
								type="number"
								min={NEWS_VALIDATION_LIMITS.readTime.min}
								max={NEWS_VALIDATION_LIMITS.readTime.max}
								value={formData.read_time || ''}
								onChange={(e) => {
									const value = e.target.value;
									if (value === '') {
										handleInputChange('read_time', 0);
									} else {
										const numValue = parseInt(value);
										if (
											!isNaN(numValue) &&
											numValue >= NEWS_VALIDATION_LIMITS.readTime.min &&
											numValue <= NEWS_VALIDATION_LIMITS.readTime.max
										) {
											handleInputChange('read_time', numValue);
										}
									}
								}}
								onBlur={() => {
									// Set default value if field is empty when user leaves
									if (formData.read_time === 0 || !formData.read_time) {
										handleInputChange('read_time', 5);
									}
								}}
								className={`${styles.input} ${
									formData.read_time &&
									(formData.read_time < NEWS_VALIDATION_LIMITS.readTime.min ||
										formData.read_time > NEWS_VALIDATION_LIMITS.readTime.max)
										? styles.invalid
										: ''
								}`}
								placeholder="5"
							/>
							{Boolean(
								formData.read_time &&
									(formData.read_time < NEWS_VALIDATION_LIMITS.readTime.min ||
										formData.read_time > NEWS_VALIDATION_LIMITS.readTime.max),
							) && (
								<div className={styles.errorText}>
									Read time must be between{' '}
									{NEWS_VALIDATION_LIMITS.readTime.min} and{' '}
									{NEWS_VALIDATION_LIMITS.readTime.max} minutes
								</div>
							)}
						</div>
					</div>

					<div className={styles.field}>
						<label htmlFor="excerpt" className={styles.label}>
							Excerpt ({formData.excerpt.length}/
							{NEWS_VALIDATION_LIMITS.excerpt.max})
						</label>
						<textarea
							id="excerpt"
							value={formData.excerpt}
							onChange={(e) => handleInputChange('excerpt', e.target.value)}
							className={`${styles.textarea} ${
								formData.excerpt.length > NEWS_VALIDATION_LIMITS.excerpt.max
									? styles.invalid
									: ''
							}`}
							placeholder="Brief description of the post (optional)"
							maxLength={NEWS_VALIDATION_LIMITS.excerpt.max}
							rows={3}
						/>
						{formData.excerpt.length > NEWS_VALIDATION_LIMITS.excerpt.max && (
							<div className={styles.errorText}>
								Excerpt is too long ({formData.excerpt.length}/
								{NEWS_VALIDATION_LIMITS.excerpt.max} characters)
							</div>
						)}
					</div>

					<div className={styles.field} style={{ marginTop: '20px' }}>
						<label htmlFor="tags" className={styles.label}>
							Tags (
							{(() => {
								const tags = tagInput
									.split(',')
									.map((tag) => tag.trim())
									.filter((tag) => tag.length > 0);
								return `${tags.length}/${NEWS_VALIDATION_LIMITS.tags.maxCount}`;
							})()}
							)
						</label>
						<input
							id="tags"
							type="text"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							className={`${styles.input} ${(() => {
								const tags = tagInput
									.split(',')
									.map((tag) => tag.trim())
									.filter((tag) => tag.length > 0);
								const validation = validateTags(tags);
								return !validation.isValid ? styles.invalid : '';
							})()}`}
							placeholder="tag1, tag2, tag3"
						/>
						{(() => {
							const tags = tagInput
								.split(',')
								.map((tag) => tag.trim())
								.filter((tag) => tag.length > 0);
							const validation = validateTags(tags);

							if (!validation.isValid) {
								return (
									<div className={styles.errorText}>{validation.errors[0]}</div>
								);
							}

							if (validation.warnings.length > 0) {
								return (
									<div className={styles.warningText}>
										{validation.warnings[0]}
									</div>
								);
							}

							return null;
						})()}
						<small className={styles.hint}>
							Separate tags with commas (max{' '}
							{NEWS_VALIDATION_LIMITS.tags.maxCount} tags,{' '}
							{NEWS_VALIDATION_LIMITS.tags.maxLength} chars each)
						</small>
					</div>
				</div>

				{/* Content Editor */}
				<div className={styles.section}>
					<fieldset>
						<legend className={styles.label}>Content *</legend>
						<RichTextEditor
							content={formData.content}
							onChange={(content: string) =>
								handleInputChange('content', content)
							}
						/>
					</fieldset>
				</div>

				{/* Options */}
				<div className={styles.section}>
					<div className={styles.checkboxGroup}>
						<label className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={formData.is_featured}
								onChange={(e) =>
									handleInputChange('is_featured', e.target.checked)
								}
								className={styles.checkbox}
							/>
							<span>Featured Post</span>
						</label>
						{formData.is_featured && (
							<p className={styles.helpText}>
								⚠️ Featuring this post will automatically unfeature any other
								currently featured post.
							</p>
						)}
					</div>
				</div>

				{/* Actions */}
				<div className={styles.actions}>
					<Button
						variant="secondary"
						onClick={() => router.push('/admin/news')}
						disabled={saving}
					>
						Cancel
					</Button>

					<Button
						variant="secondary"
						onClick={() => handleSave(false)}
						disabled={saving}
					>
						{saving ? 'Saving...' : 'Save Draft'}
					</Button>

					<Button
						variant="primary"
						onClick={() => handleSave(true)}
						disabled={saving}
					>
						{saving ? 'Publishing...' : getPublishButtonText()}
					</Button>
				</div>
			</form>
		</div>
	);
}
