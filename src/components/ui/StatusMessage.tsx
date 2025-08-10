import styles from './StatusMessage.module.css';

interface StatusMessageProps {
	readonly type: 'success' | 'error' | 'warning' | 'info';
	readonly title: string;
	readonly message: string;
	readonly icon?: React.ReactNode;
	readonly action?: {
		label: string;
		onClick: () => void;
	};
	readonly className?: string;
}

export default function StatusMessage({
	type,
	title,
	message,
	icon,
	action,
	className = '',
}: StatusMessageProps) {
	const defaultIcons = {
		success: <i className="fas fa-check-circle"></i>,
		error: <i className="fas fa-exclamation-circle"></i>,
		warning: <i className="fas fa-exclamation-triangle"></i>,
		info: <i className="fas fa-info-circle"></i>,
	};

	const displayIcon = icon || defaultIcons[type];

	return (
		<div className={`${styles.statusMessage} ${styles[type]} ${className}`}>
			<div className={styles.statusIcon}>{displayIcon}</div>
			<h2 className={styles.statusTitle}>{title}</h2>
			<p className={styles.statusText}>{message}</p>
			{action && (
				<button
					className={styles.statusAction}
					onClick={action.onClick}
					type="button"
				>
					{action.label}
				</button>
			)}
		</div>
	);
}
