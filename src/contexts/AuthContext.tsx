'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
} from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AuthContextType, AuthState, User, UserRole } from '@/types/auth';

// Create context with explicit undefined to enforce proper usage
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook with proper error handling
function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

// Define types for Supabase auth user
interface SupabaseAuthUser {
	readonly id: string;
	readonly email: string;
	readonly created_at: string;
	readonly updated_at?: string;
}

interface UserProfile {
	readonly full_name?: string | null;
	readonly gamertag?: string | null;
	readonly avatar_url?: string | null;
	readonly bio?: string | null;
	readonly role?: string;
	readonly created_at?: string;
	readonly updated_at?: string;
}

// Helper function to create user object from auth data
function createUserFromAuthData(
	authUser: SupabaseAuthUser,
	profile: UserProfile | null,
): User {
	return {
		id: authUser.id,
		email: authUser.email,
		full_name: profile?.full_name || null,
		gamertag: profile?.gamertag || null,
		avatar_url: profile?.avatar_url || null,
		bio: profile?.bio || null,
		role: (profile?.role as UserRole) || 'member',
		created_at: profile?.created_at || authUser.created_at,
		updated_at:
			profile?.updated_at || authUser.updated_at || authUser.created_at,
	};
}

interface AuthProviderProps {
	readonly children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
	const [state, setState] = useState<AuthState>({
		user: null,
		isLoading: true,
		error: null,
	});

	const supabase = useMemo(() => createClient(), []);

	// Simple state update helper
	const updateState = useCallback(function (updates: Partial<AuthState>): void {
		setState(function (prevState) {
			return { ...prevState, ...updates };
		});
	}, []);

	// Fetch user data with proper error handling
	const fetchUser = useCallback(
		async function (): Promise<void> {
			try {
				updateState({ isLoading: true, error: null });

				const { data: authData, error: authError } =
					await supabase.auth.getUser();

				// If there's an auth error, it likely means no session exists
				// This is normal behavior and shouldn't be treated as an error state
				if (authError) {
					updateState({ user: null, isLoading: false, error: null });
					return;
				}

				if (!authData.user) {
					updateState({ user: null, isLoading: false });
					return;
				}

				// Fetch profile data
				const { data: profile, error: profileError } = await supabase
					.from('users')
					.select('*')
					.eq('id', authData.user.id)
					.single();

				// Handle expected errors (table doesn't exist or no profile)
				if (
					profileError &&
					profileError.code !== 'PGRST116' &&
					profileError.code !== 'PGRST205'
				) {
					throw profileError;
				}

				const user = createUserFromAuthData(
					authData.user as SupabaseAuthUser,
					profile,
				);
				updateState({ user, isLoading: false });
			} catch (error) {
				// Only show errors that are actual problems, not missing sessions
				const errorMessage =
					error instanceof Error ? error.message : 'Authentication error';
				console.error('Auth error:', errorMessage);
				updateState({ user: null, isLoading: false, error: null });
			}
		},
		[supabase, updateState],
	);

	// Sign in function with explicit error handling
	const signIn = useCallback(
		async function (email: string, password: string): Promise<void> {
			if (!email || !password) {
				throw new Error('Email and password are required');
			}

			updateState({ isLoading: true, error: null });

			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				updateState({ isLoading: false, error: error.message });
				throw error;
			}

			// fetchUser will be called via auth state change listener
		},
		[supabase, updateState],
	);

	// Sign out function
	const signOut = useCallback(
		async function (): Promise<void> {
			updateState({ isLoading: true, error: null });

			const { error } = await supabase.auth.signOut();

			if (error) {
				updateState({ isLoading: false, error: error.message });
				throw error;
			}

			updateState({ user: null, isLoading: false });
		},
		[supabase, updateState],
	);

	// Clear error function
	const clearError = useCallback(
		function (): void {
			updateState({ error: null });
		},
		[updateState],
	);

	// Effect for initial auth check and listener setup
	useEffect(
		function () {
			let isMounted = true;

			// Initial user fetch
			fetchUser();

			// Auth state change listener
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange(function (event, session) {
				if (!isMounted) return;

				if (event === 'SIGNED_IN' && session) {
					fetchUser();
				} else if (event === 'SIGNED_OUT') {
					updateState({ user: null, isLoading: false, error: null });
				}
			});

			// Cleanup
			return function () {
				isMounted = false;
				subscription.unsubscribe();
			};
		},
		[fetchUser, supabase.auth, updateState],
	);

	// Memoized context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		function (): AuthContextType {
			return {
				user: state.user,
				isLoading: state.isLoading,
				error: state.error,
				signIn,
				signOut,
				clearError,
			};
		},
		[state.user, state.isLoading, state.error, signIn, signOut, clearError],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export { AuthProvider, useAuth };
