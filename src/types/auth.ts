// Define user roles as a const assertion for type safety
export const USER_ROLES = [
	'member',
	'admin',
	'moderator',
	'team_captain',
] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Base user structure with required fields
export interface User {
	readonly id: string;
	readonly email: string;
	readonly full_name: string | null;
	readonly gamertag: string | null;
	readonly avatar_url: string | null;
	readonly bio: string | null;
	readonly role: UserRole;
	readonly created_at: string;
	readonly updated_at: string;
}

// Simplified auth state - avoid nested optional properties
export interface AuthState {
	readonly user: User | null;
	readonly isLoading: boolean;
	readonly error: string | null;
}

// Context interface with explicit method signatures
export interface AuthContextType {
	readonly user: User | null;
	readonly isLoading: boolean;
	readonly error: string | null;
	signIn(email: string, password: string): Promise<void>;
	signOut(): Promise<void>;
	clearError(): void;
}
