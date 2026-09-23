import React from 'react';

interface UsersIconProps {
	readonly size?: number;
	readonly className?: string;
}

export default function UsersIcon({
	size = 24,
	className = '',
}: UsersIconProps): React.ReactElement {
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
				d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
				fill="currentColor"
			/>
			<path
				d="M9 14C5.68629 14 3 15.7909 3 18V20H15V18C15 15.7909 12.3137 14 9 14Z"
				fill="currentColor"
			/>
			<path
				d="M16.5 12C18.4853 12 20 10.4853 20 8.5C20 6.51472 18.4853 5 16.5 5C16.1264 5 15.7663 5.0574 15.4282 5.16382C16.0759 6.06731 16.5 7.19602 16.5 8.5C16.5 9.80398 16.0759 10.9327 15.4282 11.8362C15.7663 11.9426 16.1264 12 16.5 12Z"
				fill="currentColor"
			/>
			<path
				d="M17 14.0698C19.3671 14.5306 21 15.9532 21 18V20H17V18C17 16.4977 16.3915 15.1479 15.4142 14.1229C16.0006 14.0342 16.5 14.014 17 14.0698Z"
				fill="currentColor"
			/>
		</svg>
	);
}
