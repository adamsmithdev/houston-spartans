/**
 * Slug validation and generation utilities
 * Ensures consistent, URL-safe slugs across the application
 */

/**
 * Generate a URL-safe slug from a title
 * Handles edge cases like multiple spaces, special characters, and trim issues
 */
export function generateSlug(title: string): string {
	if (!title || typeof title !== 'string') {
		throw new Error('Title must be a non-empty string');
	}

	return (
		title
			.toLowerCase()
			.trim()
			// Remove any characters that aren't alphanumeric, spaces, or hyphens
			.replace(/[^\w\s-]/g, '')
			// Replace multiple spaces with single spaces
			.replace(/\s+/g, ' ')
			// Replace spaces with hyphens
			.replace(/\s/g, '-')
			// Replace multiple consecutive hyphens with single hyphen
			.replace(/-+/g, '-')
			// Remove leading and trailing hyphens
			.replace(/^-+/g, '')
			.replace(/-+$/g, '')
	);
}

/**
 * Validate if a slug meets our requirements
 * - Only lowercase letters, numbers, and hyphens
 * - No leading/trailing hyphens
 * - No consecutive hyphens
 * - Minimum 1 character, maximum 100 characters
 */
export function isValidSlug(slug: string): boolean {
	if (!slug || typeof slug !== 'string') {
		return false;
	}

	// Check length constraints
	if (slug.length < 1 || slug.length > 100) {
		return false;
	}

	// Check for valid characters only (lowercase, numbers, hyphens)
	if (!/^[a-z0-9-]+$/.test(slug)) {
		return false;
	}

	// Check for leading/trailing hyphens
	if (slug.startsWith('-') || slug.endsWith('-')) {
		return false;
	}

	// Check for consecutive hyphens
	if (slug.includes('--')) {
		return false;
	}

	return true;
}

/**
 * Sanitize and validate a slug
 * If invalid, attempt to generate a valid one from the input
 */
export function sanitizeSlug(input: string): string {
	if (!input || typeof input !== 'string') {
		throw new Error('Input must be a non-empty string');
	}

	// First try to use the input as-is if it's already valid
	if (isValidSlug(input)) {
		return input;
	}

	// Otherwise, generate a new slug
	const generated = generateSlug(input);

	if (!generated) {
		throw new Error('Unable to generate valid slug from input');
	}

	return generated;
}

/**
 * Generate a unique slug by appending a number if needed
 * Useful when checking against existing slugs in database
 */
export function makeUniqueSlug(
	baseSlug: string,
	existingSlugs: readonly string[],
): string {
	if (!existingSlugs.includes(baseSlug)) {
		return baseSlug;
	}

	let counter = 1;
	let candidateSlug: string;

	do {
		candidateSlug = `${baseSlug}-${counter}`;
		counter++;
	} while (existingSlugs.includes(candidateSlug));

	return candidateSlug;
}

/**
 * Validation errors for better error handling
 */
export const SlugValidationErrors = {
	EMPTY_INPUT: 'Slug cannot be empty',
	INVALID_TYPE: 'Slug must be a string',
	TOO_SHORT: 'Slug must be at least 1 character long',
	TOO_LONG: 'Slug must be no more than 100 characters long',
	INVALID_CHARACTERS:
		'Slug can only contain lowercase letters, numbers, and hyphens',
	LEADING_HYPHEN: 'Slug cannot start with a hyphen',
	TRAILING_HYPHEN: 'Slug cannot end with a hyphen',
	CONSECUTIVE_HYPHENS: 'Slug cannot contain consecutive hyphens',
} as const;

/**
 * Get detailed validation error for a slug
 */
export function getSlugValidationError(slug: string): string | null {
	if (!slug) {
		return SlugValidationErrors.EMPTY_INPUT;
	}

	if (typeof slug !== 'string') {
		return SlugValidationErrors.INVALID_TYPE;
	}

	if (slug.length < 1) {
		return SlugValidationErrors.TOO_SHORT;
	}

	if (slug.length > 100) {
		return SlugValidationErrors.TOO_LONG;
	}

	if (!/^[a-z0-9-]+$/.test(slug)) {
		return SlugValidationErrors.INVALID_CHARACTERS;
	}

	if (slug.startsWith('-')) {
		return SlugValidationErrors.LEADING_HYPHEN;
	}

	if (slug.endsWith('-')) {
		return SlugValidationErrors.TRAILING_HYPHEN;
	}

	if (slug.includes('--')) {
		return SlugValidationErrors.CONSECUTIVE_HYPHENS;
	}

	return null;
}
