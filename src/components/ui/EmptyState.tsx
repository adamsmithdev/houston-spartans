import { Container } from '@/components/ui';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
	readonly title: string;
	readonly description: string;
	readonly icon?: React.ReactNode;
	readonly className?: string;
}

export default function EmptyState({
	title,
	description,
	icon,
	className = '',
}: EmptyStateProps) {
	return (
		<Container>
			<div className={`${styles.emptyState} ${className}`}>
				{icon && <div className={styles.emptyStateIcon}>{icon}</div>}
				<h3 className={styles.emptyStateTitle}>{title}</h3>
				<p className={styles.emptyStateDescription}>{description}</p>
			</div>
		</Container>
	);
}
