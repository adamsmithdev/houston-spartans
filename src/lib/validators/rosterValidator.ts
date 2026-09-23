/**
 * Roster member validation utilities
 */

export const ROSTER_VALIDATION_LIMITS = {
	fullName: { min: 0, max: 100 },
	gamertag: { min: 1, max: 50 },
	role: { max: 60 }, // team_role / creator_tier
	socialLinks: { maxCount: 10 },
	// Max members shown in the homepage "Our Spartans" spotlight. Change
	// this one number to raise/lower the cap everywhere it's enforced.
	homeSpotlight: { max: 3 },
} as const;

export interface RosterSocialLinkInput {
	readonly platform?: string;
	readonly url?: string;
}

export interface RosterMemberValidationInput {
	readonly fullName: string;
	readonly gamertag?: string;
	readonly isTeamMember: boolean;
	readonly teamRole?: string;
	readonly isCreator: boolean;
	readonly creatorTier?: string;
	readonly isFeaturedHome: boolean;
	readonly socialLinks: readonly RosterSocialLinkInput[];
}

export interface ValidationResult {
	readonly isValid: boolean;
	readonly errors: readonly string[];
}

function isValidUrl(url: string): boolean {
	try {
		const parsed = new URL(url);
		return parsed.protocol === 'http:' || parsed.protocol === 'https:';
	} catch {
		return false;
	}
}

export function validateRosterMember(
	input: RosterMemberValidationInput,
): ValidationResult {
	const errors: string[] = [];
	const { fullName: nameLimits, gamertag: gamertagLimits } =
		ROSTER_VALIDATION_LIMITS;

	const fullName = input.fullName?.trim() ?? '';
	if (fullName.length > nameLimits.max) {
		errors.push(`Full name must be ${nameLimits.max} characters or fewer.`);
	}

	const gamertag = input.gamertag?.trim() ?? '';
	if (gamertag.length < gamertagLimits.min) {
		errors.push('Gamertag is required.');
	} else if (gamertag.length > gamertagLimits.max) {
		errors.push(`Gamertag must be ${gamertagLimits.max} characters or fewer.`);
	}

	if (!input.isTeamMember && !input.isCreator && !input.isFeaturedHome) {
		errors.push(
			'Select at least one role: Team/Staff, Content Creator, or Featured on Homepage.',
		);
	}

	if (
		input.isTeamMember &&
		input.teamRole &&
		input.teamRole.length > ROSTER_VALIDATION_LIMITS.role.max
	) {
		errors.push(
			`Team role must be ${ROSTER_VALIDATION_LIMITS.role.max} characters or fewer.`,
		);
	}

	if (
		input.isCreator &&
		input.creatorTier &&
		input.creatorTier.length > ROSTER_VALIDATION_LIMITS.role.max
	) {
		errors.push(
			`Creator tier must be ${ROSTER_VALIDATION_LIMITS.role.max} characters or fewer.`,
		);
	}

	if (
		input.socialLinks.length > ROSTER_VALIDATION_LIMITS.socialLinks.maxCount
	) {
		errors.push(
			`No more than ${ROSTER_VALIDATION_LIMITS.socialLinks.maxCount} social links are allowed.`,
		);
	}

	input.socialLinks.forEach((link, index) => {
		if (!link.platform?.trim()) {
			errors.push(`Social link ${index + 1} is missing a platform.`);
		}
		if (!link.url?.trim() || !isValidUrl(link.url.trim())) {
			errors.push(`Social link ${index + 1} has an invalid URL.`);
		}
	});

	return { isValid: errors.length === 0, errors };
}
