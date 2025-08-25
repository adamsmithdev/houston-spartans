import React from 'react';

interface NewsIconProps {
	readonly size?: number;
	readonly className?: string;
}

export default function NewsIcon({
	size = 24,
	className = '',
}: NewsIconProps): React.ReactElement {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M3 4H21V20H3V4ZM5 6V18H19V6H5ZM7 8H17V10H7V8ZM7 12H17V14H7V12ZM7 16H13V18H7V16Z"
				fill="currentColor"
			/>
		</svg>
	);
}
