import { siX } from 'simple-icons';

interface XIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function XIcon({ className, size = 17 }: XIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siX.path} />
		</svg>
	);
}
