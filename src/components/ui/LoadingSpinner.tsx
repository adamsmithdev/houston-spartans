'use client';

import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
	readonly message?: string;
	readonly size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({
	message = 'Loading...',
	size = 'medium',
}: LoadingSpinnerProps): React.ReactElement {
	return (
		<div className={styles.container}>
			<div className={`${styles.spinner} ${styles[size]}`}>
				<div className={styles.spinnerCircle}></div>
			</div>
			<p className={styles.message}>{message}</p>
		</div>
	);
}
