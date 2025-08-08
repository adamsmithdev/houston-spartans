import { siYoutube } from 'simple-icons';

interface YouTubeIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function YouTubeIcon({
	className,
	size = 17,
}: YouTubeIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siYoutube.path} />
		</svg>
	);
}
