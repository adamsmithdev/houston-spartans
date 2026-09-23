'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, LoadingSpinner } from '@/components/ui';
import styles from './HomeSpotlightSwapModal.module.css';

interface FeaturedMember {
	readonly id: string;
	readonly full_name: string;
	readonly gamertag: string | null;
	readonly picture_url: string | null;
	readonly team_role: string | null;
	readonly creator_tier: string | null;
	readonly is_team_member: boolean;
}

interface HomeSpotlightSwapModalProps {
	readonly onClose: () => void;
	readonly onSwapped: () => void;
}

export default function HomeSpotlightSwapModal({
	onClose,
	onSwapped,
}: HomeSpotlightSwapModalProps) {
	const [members, setMembers] = useState<readonly FeaturedMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [removingId, setRemovingId] = useState<string | null>(null);

	useEffect(() => {
		const fetchFeatured = async () => {
			try {
				const response = await fetch('/api/admin/roster?role=home');
				if (!response.ok) {
					throw new Error('Failed to load featured members');
				}
				const { members: data } = await response.json();
				setMembers(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to load featured members',
				);
			} finally {
				setLoading(false);
			}
		};

		fetchFeatured();
	}, []);

	const handleRemove = async (member: FeaturedMember) => {
		setRemovingId(member.id);
		setError(null);

		try {
			const response = await fetch(`/api/admin/roster/${member.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ is_featured_home: false }),
			});

			if (!response.ok) {
				throw new Error('Failed to unfeature member');
			}

			onSwapped();
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to unfeature member',
			);
			setRemovingId(null);
		}
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="swap-modal-title"
			>
				<div className={styles.modalHeader}>
					<h3 id="swap-modal-title">Homepage Spotlight is Full</h3>
					<button
						type="button"
						onClick={onClose}
						className={styles.closeButton}
						aria-label="Close"
					>
						×
					</button>
				</div>

				<p className={styles.hint}>
					Remove one of these members to feature this one instead.
				</p>

				{error && <div className={styles.error}>{error}</div>}

				{loading ? (
					<LoadingSpinner message="Loading featured members..." />
				) : (
					<ul className={styles.memberList}>
						{members.map((member) => (
							<li key={member.id} className={styles.memberRow}>
								{member.picture_url ? (
									<Image
										src={member.picture_url}
										alt={member.full_name}
										width={40}
										height={40}
										className={styles.avatarThumb}
									/>
								) : (
									<div className={styles.avatarPlaceholder}>
										<i className="fas fa-user"></i>
									</div>
								)}

								<div className={styles.memberInfo}>
									<p className={styles.memberName}>
										{member.full_name}
										{member.gamertag ? ` (${member.gamertag})` : ''}
									</p>
									<p className={styles.memberRole}>
										{member.team_role || member.creator_tier || ''}
									</p>
								</div>

								<Button
									variant="danger"
									onClick={() => handleRemove(member)}
									disabled={removingId === member.id}
								>
									{removingId === member.id ? 'Removing...' : 'Remove'}
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
