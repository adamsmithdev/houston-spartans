'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui';

interface AuthLoadingProviderProps {
	readonly children: React.ReactNode;
	readonly fallback?: React.ReactElement;
	readonly requireAdmin?: boolean;
	readonly redirectTo?: string;
}

/**
 * Provider that shows a loading state while authentication is being checked
 * Optionally redirects unauthorized users to login or specified route
 */
export function AuthLoadingProvider({
	children,
	fallback,
	requireAdmin = false,
	redirectTo = '/login',
}: AuthLoadingProviderProps): React.ReactElement {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	// Handle redirection with useEffect to avoid side effects during render
	useEffect(() => {
		if (!isLoading) {
			// Handle admin requirement
			if (requireAdmin && (!user || user.role !== 'admin')) {
				router.push(redirectTo);
				return;
			}

			// Handle general authentication requirement
			if (!requireAdmin && !user) {
				router.push(redirectTo);
				return;
			}
		}
	}, [user, isLoading, requireAdmin, redirectTo, router]);

	if (isLoading) {
		return fallback || <LoadingSpinner message="Loading application..." />;
	}

	// Show loading while redirecting
	if (requireAdmin && (!user || user.role !== 'admin')) {
		return <LoadingSpinner message="Redirecting..." />;
	}

	if (!requireAdmin && !user) {
		return <LoadingSpinner message="Redirecting to login..." />;
	}

	return <>{children}</>;
}
