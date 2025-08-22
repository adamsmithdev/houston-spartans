'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SignOutIcon } from '@/components/icons';
import styles from './AdminSidebar.module.css';

// Component state interface
interface SidebarState {
	readonly isCollapsed: boolean;
}

function AdminSidebar(): React.ReactElement | null {
	const [state, setState] = useState<SidebarState>({ isCollapsed: true });
	const { user, signOut, isLoading } = useAuth();
	const router = useRouter();

	// State update helper
	const updateState = useCallback(function (
		updates: Partial<SidebarState>,
	): void {
		setState(function (prevState) {
			return { ...prevState, ...updates };
		});
	}, []);

	// Handle sign out
	const handleSignOut = useCallback(
		async function (): Promise<void> {
			try {
				await signOut();
				router.push('/');
				updateState({ isCollapsed: true });
			} catch {
				// Error is handled by AuthContext, no need to handle here
			}
		},
		[signOut, router, updateState],
	);

	// Toggle sidebar
	const toggleSidebar = useCallback(
		function (): void {
			updateState({ isCollapsed: !state.isCollapsed });
		},
		[state.isCollapsed, updateState],
	);

	// Handle overlay close
	const handleOverlayClose = useCallback(
		function (): void {
			updateState({ isCollapsed: true });
		},
		[updateState],
	);

	// Handle overlay key down
	const handleOverlayKeyDown = useCallback(
		function (event: React.KeyboardEvent): void {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				updateState({ isCollapsed: true });
			}
		},
		[updateState],
	);

	// Don't render if user is not authenticated
	if (!user) {
		return null;
	}

	// Get user display name
	function getUserDisplayName(): string {
		if (!user) {
			return 'User';
		}
		return user.full_name || user.gamertag || 'User';
	}

	// Get user avatar initial
	function getUserInitial(): string {
		const displayName = getUserDisplayName();
		return displayName.charAt(0).toUpperCase();
	}

	return (
		<>
			{/* Toggle Button */}
			<button
				className={`${styles.toggleBtn} ${state.isCollapsed ? styles.collapsed : styles.expanded}`}
				onClick={toggleSidebar}
				aria-label="Toggle admin panel"
				type="button"
			>
				<span className={styles.hamburger}>
					<span></span>
					<span></span>
					<span></span>
				</span>
			</button>

			{/* Sidebar */}
			<div
				className={`${styles.sidebar} ${state.isCollapsed ? styles.collapsed : styles.expanded}`}
			>
				<div className={styles.sidebarHeader}>
					<div className={styles.userInfo}>
						<div className={styles.avatar}>
							{user.avatar_url ? (
								<Image
									src={user.avatar_url}
									alt="Profile"
									width={40}
									height={40}
									className={styles.avatarImage}
								/>
							) : (
								<div className={styles.avatarPlaceholder}>
									{getUserInitial()}
								</div>
							)}
						</div>
						{!state.isCollapsed && (
							<div className={styles.userDetails}>
								<div className={styles.userName}>{getUserDisplayName()}</div>
								<div className={styles.userRole}>{user.role}</div>
							</div>
						)}
					</div>
				</div>

				<nav className={styles.sidebarNav}>
					<button
						onClick={handleSignOut}
						className={`${styles.navItem} ${styles.signOutBtn}`}
						disabled={isLoading}
						title={state.isCollapsed ? 'Sign Out' : ''}
						type="button"
					>
						<span className={styles.navIcon}>
							<SignOutIcon size={18} />
						</span>
						{!state.isCollapsed && (
							<span className={styles.navText}>
								{isLoading ? 'Signing Out...' : 'Sign Out'}
							</span>
						)}
					</button>
				</nav>
			</div>

			{/* Overlay for mobile */}
			{!state.isCollapsed && (
				<button
					className={styles.overlay}
					onClick={handleOverlayClose}
					onKeyDown={handleOverlayKeyDown}
					aria-label="Close sidebar"
					type="button"
				/>
			)}
		</>
	);
}

export default AdminSidebar;
