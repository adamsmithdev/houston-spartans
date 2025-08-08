import { siTiktok } from 'simple-icons';

interface TikTokIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function TikTokIcon({ className, size = 17 }: TikTokIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siTiktok.path} />
		</svg>
	);
}
