import React from 'react';
import styles from './Card.module.css';

interface CardProps {
	readonly children: React.ReactNode;
	readonly variant?:
		| 'default'
		| 'mission'
		| 'spartan'
		| 'news'
		| 'community-step';
	readonly className?: string;
	readonly onClick?: () => void;
	readonly hover?: boolean;
}

export default function Card({
	children,
	variant = 'default',
	className = '',
	onClick,
	hover = true,
}: CardProps) {
	const cardClasses = `${styles.card} ${styles[variant]} ${hover ? styles.hover : ''} ${className}`;

	return (
		<div className={cardClasses} onClick={onClick}>
			{children}
		</div>
	);
}
