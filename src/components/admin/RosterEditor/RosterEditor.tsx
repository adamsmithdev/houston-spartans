'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, LoadingSpinner } from '@/components/ui';
import {
	ROSTER_VALIDATION_LIMITS,
	validateRosterMember,
} from '@/lib/validators/rosterValidator';
import ImageUpload from './ImageUpload';
import HomeSpotlightSwapModal from './HomeSpotlightSwapModal';
import styles from './RosterEditor.module.css';

interface SocialLink {
	readonly platform: string;
	readonly url: string;
}

interface RosterMemberFormData {
	readonly id?: string;
	readonly full_name: string;
	readonly gamertag: string;
	readonly picture_url: string;
	readonly social_links: readonly SocialLink[];
	readonly is_team_member: boolean;
	readonly team_role: string;
	readonly is_creator: boolean;
	readonly creator_tier: string;
	readonly is_featured_home: boolean;
	readonly is_published: boolean;
}

interface RosterEditorProps {
	readonly memberId?: string;
}

const SOCIAL_PLATFORMS = [
	'x',
	'facebook',
	'instagram',
	'tiktok',
	'twitch',
	'youtube',
	'kick',
	'linkedin',
] as const;

const EMPTY_FORM: RosterMemberFormData = {
	full_name: '',
	gamertag: '',
	picture_url: '',
	social_links: [],
	is_team_member: false,
	team_role: '',
	is_creator: false,
	creator_tier: '',
	is_featured_home: false,
	is_published: false,
};

export default function RosterEditor({ memberId }: RosterEditorProps) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<RosterMemberFormData>(EMPTY_FORM);
	const [otherFeaturedHomeCount, setOtherFeaturedHomeCount] = useState(0);
	const [showSwapModal, setShowSwapModal] = useState(false);

	const updateFormData = useCallback(
		(updates: Partial<RosterMemberFormData>) => {
			setFormData((prev) => ({ ...prev, ...updates }));
		},
		[],
	);

	// Fetch existing member for editing
	useEffect(() => {
		if (memberId && memberId !== 'new') {
			const fetchMember = async () => {
				try {
					setLoading(true);
					const response = await fetch(`/api/admin/roster/${memberId}`);

					if (!response.ok) {
						throw new Error('Failed to fetch roster member');
					}

					const { member } = await response.json();
					setFormData({
						id: member.id,
						full_name: member.full_name ?? '',
						gamertag: member.gamertag ?? '',
						picture_url: member.picture_url ?? '',
						social_links: member.social_links ?? [],
						is_team_member: member.is_team_member,
						team_role: member.team_role ?? '',
						is_creator: member.is_creator,
						creator_tier: member.creator_tier ?? '',
						is_featured_home: member.is_featured_home,
						is_published: member.is_published,
					});
				} catch (err) {
					setError(
						err instanceof Error ? err.message : 'Failed to load roster member',
					);
				} finally {
					setLoading(false);
				}
			};

			fetchMember();
		}
	}, [memberId]);

	// Track how many OTHER members currently hold a homepage spotlight slot,
	// so the checkbox below can be disabled once the cap is reached.
	useEffect(() => {
		const fetchHomeFeaturedCount = async () => {
			try {
				const response = await fetch('/api/admin/roster?role=home');
				if (!response.ok) return;

				const { members } = await response.json();
				const others = (members as { id: string }[]).filter(
					(m) => m.id !== memberId,
				);
				setOtherFeaturedHomeCount(others.length);
			} catch {
				// Non-critical -- the server still enforces the real limit.
			}
		};

		fetchHomeFeaturedCount();
	}, [memberId]);

	const setErrorAndScroll = useCallback((message: string) => {
		setError(message);
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 0);
	}, []);

	const handleImageUpload = (url: string) => {
		updateFormData({ picture_url: url });
	};

	const handleAddSocialLink = () => {
		updateFormData({
			social_links: [
				...formData.social_links,
				{ platform: SOCIAL_PLATFORMS[0], url: '' },
			],
		});
	};

	const handleSocialLinkChange = (
		index: number,
		updates: Partial<SocialLink>,
	) => {
		updateFormData({
			social_links: formData.social_links.map((link, i) =>
				i === index ? { ...link, ...updates } : link,
			),
		});
	};

	const handleRemoveSocialLink = (index: number) => {
		updateFormData({
			social_links: formData.social_links.filter((_, i) => i !== index),
		});
	};

	const handleSave = async (publish: boolean) => {
		try {
			setSaving(true);
			setError(null);

			const validation = validateRosterMember({
				fullName: formData.full_name,
				gamertag: formData.gamertag,
				isTeamMember: formData.is_team_member,
				teamRole: formData.team_role,
				isCreator: formData.is_creator,
				creatorTier: formData.creator_tier,
				isFeaturedHome: formData.is_featured_home,
				socialLinks: formData.social_links,
			});

			if (!validation.isValid) {
				throw new Error(validation.errors[0]);
			}

			const memberData = {
				full_name: formData.full_name.trim(),
				gamertag: formData.gamertag.trim(),
				picture_url: formData.picture_url,
				social_links: formData.social_links,
				is_team_member: formData.is_team_member,
				team_role: formData.team_role.trim(),
				is_creator: formData.is_creator,
				creator_tier: formData.creator_tier.trim(),
				is_featured_home: formData.is_featured_home,
				is_published: publish,
			};

			const isEditing = memberId && memberId !== 'new';
			const url = isEditing
				? `/api/admin/roster/${memberId}`
				: '/api/admin/roster';
			const method = isEditing ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(memberData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.details?.[0] ||
						errorData.error ||
						'Failed to save roster member',
				);
			}

			router.push('/admin/roster');
		} catch (err) {
			setErrorAndScroll(
				err instanceof Error ? err.message : 'Failed to save roster member',
			);
		} finally {
			setSaving(false);
		}
	};

	// Redirect to login if not authenticated or not admin
	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/login');
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return <LoadingSpinner message="Checking authentication..." />;
	}

	if (!user || user.role !== 'admin') {
		return <LoadingSpinner message="Redirecting to login..." />;
	}

	if (loading) {
		return <LoadingSpinner message="Loading roster member..." />;
	}

	// Only block turning the checkbox ON -- always allow unfeaturing.
	const isHomeSpotlightFull =
		!formData.is_featured_home &&
		otherFeaturedHomeCount >= ROSTER_VALIDATION_LIMITS.homeSpotlight.max;

	return (
		<div className={styles.newsEditor}>
			{error && (
				<div className={styles.error}>
					<p>{error}</p>
					<button onClick={() => setError(null)}>×</button>
				</div>
			)}

			<form onSubmit={(e) => e.preventDefault()}>
				{/* Photo Upload */}
				<div className={styles.section}>
					<label className={styles.label}>Photo</label>
					<ImageUpload
						currentImage={formData.picture_url}
						onImageUpload={handleImageUpload}
						folder="headshots"
					/>
				</div>

				{/* Basic Info */}
				<div className={styles.section}>
					<div className={styles.row}>
						<div className={styles.field}>
							<label htmlFor="full_name" className={styles.label}>
								Full Name ({formData.full_name.length}/
								{ROSTER_VALIDATION_LIMITS.fullName.max})
							</label>
							<input
								id="full_name"
								type="text"
								value={formData.full_name}
								onChange={(e) => updateFormData({ full_name: e.target.value })}
								className={styles.input}
								placeholder="Enter full name"
								maxLength={ROSTER_VALIDATION_LIMITS.fullName.max}
							/>
						</div>

						<div className={styles.field}>
							<label htmlFor="gamertag" className={styles.label}>
								Gamertag * ({formData.gamertag.length}/
								{ROSTER_VALIDATION_LIMITS.gamertag.max})
							</label>
							<input
								id="gamertag"
								type="text"
								value={formData.gamertag}
								onChange={(e) => updateFormData({ gamertag: e.target.value })}
								className={styles.input}
								placeholder="Enter gamertag"
								maxLength={ROSTER_VALIDATION_LIMITS.gamertag.max}
								required
							/>
						</div>
					</div>
				</div>

				{/* Roles */}
				<div className={styles.section}>
					<div className={styles.checkboxGroup}>
						<label className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={formData.is_team_member}
								onChange={(e) =>
									updateFormData({ is_team_member: e.target.checked })
								}
								className={styles.checkbox}
							/>
							<span>Team / Staff</span>
						</label>
						{formData.is_team_member && (
							<div
								className={styles.field}
								style={{ marginTop: '10px', marginBottom: '10px' }}
							>
								<label htmlFor="team_role" className={styles.label}>
									Team Role
								</label>
								<input
									id="team_role"
									type="text"
									value={formData.team_role}
									onChange={(e) =>
										updateFormData({ team_role: e.target.value })
									}
									className={styles.input}
									placeholder="e.g. Esports Director"
									maxLength={ROSTER_VALIDATION_LIMITS.role.max}
								/>
							</div>
						)}
					</div>

					<div className={styles.checkboxGroup}>
						<label className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={formData.is_creator}
								onChange={(e) =>
									updateFormData({ is_creator: e.target.checked })
								}
								className={styles.checkbox}
							/>
							<span>Content Creator</span>
						</label>
						{formData.is_creator && (
							<div
								className={styles.field}
								style={{ marginTop: '10px', marginBottom: '10px' }}
							>
								<label htmlFor="creator_tier" className={styles.label}>
									Creator Tier
								</label>
								<input
									id="creator_tier"
									type="text"
									value={formData.creator_tier}
									onChange={(e) =>
										updateFormData({ creator_tier: e.target.value })
									}
									className={styles.input}
									placeholder="e.g. Spartan Elite"
									maxLength={ROSTER_VALIDATION_LIMITS.role.max}
								/>
							</div>
						)}
					</div>

					<div className={styles.checkboxGroup}>
						<label className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={formData.is_featured_home}
								onChange={(e) => {
									if (e.target.checked && isHomeSpotlightFull) {
										setShowSwapModal(true);
										return;
									}
									updateFormData({ is_featured_home: e.target.checked });
								}}
								className={styles.checkbox}
							/>
							<span>Feature on Homepage</span>
						</label>
						<p className={styles.helpText}>
							{isHomeSpotlightFull ? (
								<>
									Homepage spotlight is full (
									{ROSTER_VALIDATION_LIMITS.homeSpotlight.max}/
									{ROSTER_VALIDATION_LIMITS.homeSpotlight.max}).{' '}
									<button
										type="button"
										onClick={() => setShowSwapModal(true)}
										className={styles.inlineLinkButton}
									>
										Manage featured members
									</button>{' '}
									to swap someone out.
								</>
							) : (
								<>
									Shows in the &quot;Our Spartans&quot; spotlight on the
									homepage ({otherFeaturedHomeCount}/
									{ROSTER_VALIDATION_LIMITS.homeSpotlight.max} currently
									featured).
								</>
							)}
						</p>
					</div>
				</div>

				{showSwapModal && (
					<HomeSpotlightSwapModal
						onClose={() => setShowSwapModal(false)}
						onSwapped={() => {
							updateFormData({ is_featured_home: true });
							setOtherFeaturedHomeCount((count) => Math.max(0, count - 1));
							setShowSwapModal(false);
						}}
					/>
				)}

				{/* Social Links */}
				<div className={styles.section}>
					<label className={styles.label}>
						Social Links ({formData.social_links.length}/
						{ROSTER_VALIDATION_LIMITS.socialLinks.maxCount})
					</label>

					<div className={styles.socialLinksList}>
						{formData.social_links.map((link, index) => (
							<div key={index} className={styles.socialLinkRow}>
								<div className={styles.selectWrapper}>
									<select
										value={link.platform}
										onChange={(e) =>
											handleSocialLinkChange(index, {
												platform: e.target.value,
											})
										}
										className={styles.select}
									>
										{SOCIAL_PLATFORMS.map((platform) => (
											<option key={platform} value={platform}>
												{platform}
											</option>
										))}
									</select>
									<i
										className={`fas fa-chevron-down ${styles.selectArrow}`}
									></i>
								</div>
								<input
									type="url"
									value={link.url}
									onChange={(e) =>
										handleSocialLinkChange(index, { url: e.target.value })
									}
									className={styles.input}
									placeholder="https://..."
								/>
								<Button
									variant="danger"
									onClick={() => handleRemoveSocialLink(index)}
									className={styles.iconButton}
									title="Remove"
								>
									<i className="fas fa-trash"></i>
								</Button>
							</div>
						))}
					</div>

					{formData.social_links.length <
						ROSTER_VALIDATION_LIMITS.socialLinks.maxCount && (
						<Button
							variant="secondary"
							onClick={handleAddSocialLink}
							className={styles.addLinkButton}
						>
							+ Add Social Link
						</Button>
					)}
				</div>

				{/* Actions */}
				<div className={styles.actions}>
					<Button
						variant="secondary"
						onClick={() => router.push('/admin/roster')}
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
						{saving ? 'Publishing...' : 'Publish'}
					</Button>
				</div>
			</form>
		</div>
	);
}
