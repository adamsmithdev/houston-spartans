/**
 * News post validation utilities
 * Provides comprehensive validation for news posts with detailed error messages
 */

export interface NewsPostValidationLimits {
	readonly title: {
		readonly min: number;
		readonly max: number;
	};
	readonly slug: {
		readonly min: number;
		readonly max: number;
	};
	readonly excerpt: {
		readonly min: number;
		readonly max: number;
	};
	readonly content: {
		readonly min: number;
		readonly max: number;
	};
	readonly readTime: {
		readonly min: number;
		readonly max: number;
	};
	readonly tags: {
		readonly maxCount: number;
		readonly maxLength: number;
		readonly minLength: number;
	};
	readonly imageUrl: {
		readonly max: number;
	};
}

export const NEWS_VALIDATION_LIMITS: NewsPostValidationLimits = {
	title: { min: 5, max: 120 },
	slug: { min: 3, max: 100 },
	excerpt: { min: 0, max: 300 }, // No minimum, optional field
	content: { min: 0, max: 50000 }, // No minimum required
	readTime: { min: 1, max: 60 },
	tags: { maxCount: 10, maxLength: 30, minLength: 2 },
	imageUrl: { max: 500 },
} as const;

export const VALID_CATEGORIES = [
	'Tournaments',
	'Community',
	'Team Updates',
	'Careers',
] as const;

export type ValidCategory = (typeof VALID_CATEGORIES)[number];

export interface ValidationResult {
	readonly isValid: boolean;
	readonly errors: readonly string[];
	readonly warnings: readonly string[];
}

export interface NewsPostValidationData {
	readonly title: string;
	readonly slug: string;
	readonly excerpt: string;
	readonly content: string;
	readonly category: string;
	readonly readTime: number;
	readonly tags: readonly string[];
	readonly imageUrl?: string;
}

/**
 * Validate title field
 */
export function validateTitle(title: string): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!title || typeof title !== 'string') {
		errors.push('Title is required');
		return { isValid: false, errors, warnings };
	}

	const trimmed = title.trim();

	if (trimmed.length < NEWS_VALIDATION_LIMITS.title.min) {
		errors.push(
			`Title must be at least ${NEWS_VALIDATION_LIMITS.title.min} characters long`,
		);
	}

	if (trimmed.length > NEWS_VALIDATION_LIMITS.title.max) {
		errors.push(
			`Title must be no more than ${NEWS_VALIDATION_LIMITS.title.max} characters long`,
		);
	}

	// Check for HTML tags
	if (/<[^>]*>/g.test(trimmed)) {
		errors.push('Title cannot contain HTML tags');
	}

	// Warning for very long titles
	if (trimmed.length > 80) {
		warnings.push('Title is quite long and may be truncated in some displays');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate excerpt field
 */
export function validateExcerpt(excerpt: string): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	// Excerpt is now optional
	if (!excerpt || typeof excerpt !== 'string') {
		return { isValid: true, errors, warnings };
	}

	const trimmed = excerpt.trim();

	// No minimum length requirement
	if (trimmed.length > NEWS_VALIDATION_LIMITS.excerpt.max) {
		errors.push(
			`Excerpt must be no more than ${NEWS_VALIDATION_LIMITS.excerpt.max} characters long`,
		);
	}

	// Check for HTML tags
	if (/<[^>]*>/g.test(trimmed)) {
		errors.push('Excerpt cannot contain HTML tags');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate content field
 */
export function validateContent(content: string): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!content || typeof content !== 'string') {
		errors.push('Content is required');
		return { isValid: false, errors, warnings };
	}

	// No minimum length requirement, just check maximum
	if (content.length > NEWS_VALIDATION_LIMITS.content.max) {
		errors.push(
			`Content must be no more than ${NEWS_VALIDATION_LIMITS.content.max} characters long`,
		);
	}

	// Warning for very long content
	if (content.length > 30000) {
		warnings.push('Content is very long and may impact page load performance');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate category field
 */
export function validateCategory(category: string): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!category || typeof category !== 'string') {
		errors.push('Category is required');
		return { isValid: false, errors, warnings };
	}

	if (!VALID_CATEGORIES.includes(category as ValidCategory)) {
		errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate read time field
 */
export function validateReadTime(readTime: number): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (typeof readTime !== 'number' || isNaN(readTime)) {
		errors.push('Read time must be a valid number');
		return { isValid: false, errors, warnings };
	}

	if (!Number.isInteger(readTime)) {
		errors.push('Read time must be a whole number');
	}

	if (readTime < NEWS_VALIDATION_LIMITS.readTime.min) {
		errors.push(
			`Read time must be at least ${NEWS_VALIDATION_LIMITS.readTime.min} minute`,
		);
	}

	if (readTime > NEWS_VALIDATION_LIMITS.readTime.max) {
		errors.push(
			`Read time must be no more than ${NEWS_VALIDATION_LIMITS.readTime.max} minutes`,
		);
	}

	// Warning for very long read times
	if (readTime > 30) {
		warnings.push(
			'This is a very long article - consider breaking it into multiple parts',
		);
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate tags array
 */
export function validateTags(tags: readonly string[]): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!Array.isArray(tags)) {
		errors.push('Tags must be an array');
		return { isValid: false, errors, warnings };
	}

	if (tags.length > NEWS_VALIDATION_LIMITS.tags.maxCount) {
		errors.push(
			`Cannot have more than ${NEWS_VALIDATION_LIMITS.tags.maxCount} tags`,
		);
	}

	// Validate individual tags
	const seenTags = new Set<string>();
	for (const [index, tag] of tags.entries()) {
		if (typeof tag !== 'string') {
			errors.push(`Tag ${index + 1} must be a string`);
			continue;
		}

		const trimmed = tag.trim();

		if (trimmed.length < NEWS_VALIDATION_LIMITS.tags.minLength) {
			errors.push(
				`Tag "${trimmed}" must be at least ${NEWS_VALIDATION_LIMITS.tags.minLength} characters long`,
			);
		}

		if (trimmed.length > NEWS_VALIDATION_LIMITS.tags.maxLength) {
			errors.push(
				`Tag "${trimmed}" must be no more than ${NEWS_VALIDATION_LIMITS.tags.maxLength} characters long`,
			);
		}

		// Check for valid characters (alphanumeric + spaces)
		if (!/^[a-zA-Z0-9\s]+$/.test(trimmed)) {
			errors.push(
				`Tag "${trimmed}" can only contain letters, numbers, and spaces`,
			);
		}

		// Check for duplicates (case-insensitive)
		const normalized = trimmed.toLowerCase();
		if (seenTags.has(normalized)) {
			errors.push(`Duplicate tag: "${trimmed}"`);
		} else {
			seenTags.add(normalized);
		}
	}

	// Warning for many tags
	if (tags.length > 6) {
		warnings.push(
			'Many tags may clutter the post display - consider using fewer, more focused tags',
		);
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate image URL field
 */
export function validateImageUrl(
	imageUrl: string | undefined,
): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!imageUrl) {
		// Image URL is optional
		return { isValid: true, errors, warnings };
	}

	if (typeof imageUrl !== 'string') {
		errors.push('Image URL must be a string');
		return { isValid: false, errors, warnings };
	}

	if (imageUrl.length > NEWS_VALIDATION_LIMITS.imageUrl.max) {
		errors.push(
			`Image URL must be no more than ${NEWS_VALIDATION_LIMITS.imageUrl.max} characters long`,
		);
	}

	// Basic URL validation
	try {
		new URL(imageUrl);
	} catch {
		errors.push('Image URL must be a valid URL');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

/**
 * Validate entire news post
 */
export function validateNewsPost(
	data: NewsPostValidationData,
): ValidationResult {
	const allErrors: string[] = [];
	const allWarnings: string[] = [];

	// Validate each field
	const validations = [
		validateTitle(data.title),
		validateExcerpt(data.excerpt),
		validateContent(data.content),
		validateCategory(data.category),
		validateReadTime(data.readTime),
		validateTags(data.tags),
		validateImageUrl(data.imageUrl),
	];

	// Collect all errors and warnings
	for (const validation of validations) {
		allErrors.push(...validation.errors);
		allWarnings.push(...validation.warnings);
	}

	// Additional cross-field validations
	const contentWordCount = data.content
		.replace(/<[^>]*>/g, '')
		.trim()
		.split(/\s+/).length;
	const estimatedReadTime = Math.ceil(contentWordCount / 200); // Average reading speed

	if (Math.abs(data.readTime - estimatedReadTime) > 3) {
		allWarnings.push(
			`Read time (${data.readTime} min) seems inconsistent with content length. Estimated: ${estimatedReadTime} min`,
		);
	}

	return {
		isValid: allErrors.length === 0,
		errors: allErrors,
		warnings: allWarnings,
	};
}

/**
 * Get character count for display purposes
 */
export function getCharacterCounts(data: Partial<NewsPostValidationData>) {
	return {
		title: data.title?.length || 0,
		excerpt: data.excerpt?.length || 0,
		content: data.content?.length || 0,
		contentTextOnly: data.content?.replace(/<[^>]*>/g, '').length || 0,
		imageUrl: data.imageUrl?.length || 0,
	};
}

/**
 * Get remaining character counts
 */
export function getRemainingCharacters(data: Partial<NewsPostValidationData>) {
	const counts = getCharacterCounts(data);
	return {
		title: NEWS_VALIDATION_LIMITS.title.max - counts.title,
		excerpt: NEWS_VALIDATION_LIMITS.excerpt.max - counts.excerpt,
		content: NEWS_VALIDATION_LIMITS.content.max - counts.content,
		imageUrl: NEWS_VALIDATION_LIMITS.imageUrl.max - counts.imageUrl,
	};
}
