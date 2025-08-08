import { siInstagram } from 'simple-icons';

interface InstagramIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function InstagramIcon({
	className,
	size = 17,
}: InstagramIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siInstagram.path} />
		</svg>
	);
}
