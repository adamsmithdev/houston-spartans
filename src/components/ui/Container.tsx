import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
	readonly children: React.ReactNode;
	readonly className?: string;
	readonly as?: 'div' | 'section' | 'main' | 'article';
}

export default function Container({
	children,
	className = '',
	as: Component = 'div',
}: ContainerProps) {
	return (
		<Component className={`${styles.container} ${className}`}>
			{children}
		</Component>
	);
}
