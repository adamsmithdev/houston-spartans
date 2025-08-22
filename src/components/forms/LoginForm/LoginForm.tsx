'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import styles from './LoginForm.module.css';

// Form state interface
interface FormState {
	readonly email: string;
	readonly password: string;
	readonly isSubmitting: boolean;
}

// Constants
const INITIAL_FORM_STATE: FormState = {
	email: '',
	password: '',
	isSubmitting: false,
};

function LoginForm(): React.ReactElement | null {
	const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
	const { signIn, user, isLoading, error, clearError } = useAuth();
	const router = useRouter();

	// Update form state helper
	const updateFormState = useCallback(function (
		updates: Partial<FormState>,
	): void {
		setFormState(function (prevState) {
			return { ...prevState, ...updates };
		});
	}, []);

	// Redirect authenticated users
	useEffect(
		function () {
			if (user) {
				router.replace('/');
			}
		},
		[user, router],
	);

	// Handle form submission
	const handleSubmit = useCallback(
		async function (event: React.FormEvent<HTMLFormElement>): Promise<void> {
			event.preventDefault();

			if (!formState.email || !formState.password) {
				return;
			}

			updateFormState({ isSubmitting: true });

			try {
				await signIn(formState.email, formState.password);
				// Router redirect will be handled by useEffect
			} catch {
				// Error is handled by AuthContext and displayed via error state
				updateFormState({ isSubmitting: false });
			}
		},
		[formState.email, formState.password, signIn, updateFormState],
	);

	// Handle input changes
	const handleEmailChange = useCallback(
		function (event: React.ChangeEvent<HTMLInputElement>): void {
			const value = event.target.value;
			updateFormState({ email: value });
			if (error) {
				clearError();
			}
		},
		[updateFormState, error, clearError],
	);

	const handlePasswordChange = useCallback(
		function (event: React.ChangeEvent<HTMLInputElement>): void {
			const value = event.target.value;
			updateFormState({ password: value });
			if (error) {
				clearError();
			}
		},
		[updateFormState, error, clearError],
	);

	// Don't render if user is authenticated
	if (user) {
		return null;
	}

	// Show loading state
	if (isLoading) {
		return (
			<div className={styles.loginContainer}>
				<div className={styles.loginForm}>
					<div className={styles.logoSection}>
						<Image
							src="/images/branding/logo.png"
							alt="Houston Spartans"
							width={80}
							height={80}
							className={styles.logo}
						/>
						<h1 className={styles.title}>Loading...</h1>
					</div>
				</div>
			</div>
		);
	}

	const isFormDisabled = formState.isSubmitting || isLoading;

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginForm}>
				<div className={styles.logoSection}>
					<Image
						src="/images/branding/logo.png"
						alt="Houston Spartans"
						width={80}
						height={80}
						className={styles.logo}
					/>
					<h1 className={styles.title}>Welcome Back</h1>
					<p className={styles.subtitle}>Sign in to your Spartans account</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.errorContainer}>
						{error && <div className={styles.error}>{error}</div>}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="email" className={styles.label}>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={formState.email}
							onChange={handleEmailChange}
							required
							className={styles.input}
							placeholder="Enter your email"
							disabled={isFormDisabled}
							autoComplete="email"
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password" className={styles.label}>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={formState.password}
							onChange={handlePasswordChange}
							required
							className={styles.input}
							placeholder="Enter your password"
							disabled={isFormDisabled}
							autoComplete="current-password"
						/>
					</div>

					<button
						type="submit"
						disabled={isFormDisabled}
						className={styles.submitButton}
					>
						{formState.isSubmitting ? 'Signing In...' : 'Sign In'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
