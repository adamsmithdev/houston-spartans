import { siDiscord } from 'simple-icons';

interface DiscordIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function DiscordIcon({
	className,
	size = 17,
}: DiscordIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siDiscord.path} />
		</svg>
	);
}
