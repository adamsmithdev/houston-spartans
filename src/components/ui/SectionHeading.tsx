import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
	readonly children: React.ReactNode;
	readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
	readonly centered?: boolean;
	readonly className?: string;
	readonly description?: string;
}

export default function SectionHeading({
	children,
	level = 2,
	centered = true,
	className = '',
	description,
}: SectionHeadingProps) {
	const headingClasses = `${styles.heading} ${centered ? styles.centered : ''} ${className}`;

	const renderHeading = () => {
		switch (level) {
			case 1:
				return <h1 className={headingClasses}>{children}</h1>;
			case 2:
				return <h2 className={headingClasses}>{children}</h2>;
			case 3:
				return <h3 className={headingClasses}>{children}</h3>;
			case 4:
				return <h4 className={headingClasses}>{children}</h4>;
			case 5:
				return <h5 className={headingClasses}>{children}</h5>;
			case 6:
				return <h6 className={headingClasses}>{children}</h6>;
			default:
				return <h2 className={headingClasses}>{children}</h2>;
		}
	};

	return (
		<div className={styles.headingContainer}>
			{renderHeading()}
			{description && (
				<p
					className={`${styles.description} ${centered ? styles.centered : ''}`}
				>
					{description}
				</p>
			)}
		</div>
	);
}
