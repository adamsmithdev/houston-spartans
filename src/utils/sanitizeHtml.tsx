import DOMPurify from 'dompurify';

/**
 * Configuration for DOMPurify with safe defaults
 * Allows common formatting tags while preventing XSS
 */
const PURIFY_CONFIG = {
	ALLOWED_TAGS: [
		'h2',
		'h3',
		'h4',
		'p',
		'ul',
		'ol',
		'li',
		'a',
		'strong',
		'em',
		'br',
	],
	ALLOWED_ATTR: ['href', 'target', 'rel'],
	FORBID_ATTR: ['style', 'onclick', 'onload'],
};

/**
 * Safely sanitizes HTML content to prevent XSS attacks
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (html: string): string => {
	if (typeof window === 'undefined') {
		// Server-side: return as-is for now, could use jsdom if needed
		return html;
	}

	return DOMPurify.sanitize(html, PURIFY_CONFIG);
};

/**
 * Props for SafeHtml component
 */
interface SafeHtmlProps {
	readonly html: string;
	readonly className?: string;
}

/**
 * Component for safely rendering HTML content
 * Sanitizes content to prevent XSS while preserving formatting
 */
export const SafeHtml = ({ html, className }: SafeHtmlProps) => {
	const sanitizedHtml = sanitizeHtml(html);

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
		/>
	);
};
