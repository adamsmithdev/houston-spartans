import { siFacebook } from 'simple-icons';

interface FacebookIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function FacebookIcon({
	className,
	size = 17,
}: FacebookIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siFacebook.path} />
		</svg>
	);
}
