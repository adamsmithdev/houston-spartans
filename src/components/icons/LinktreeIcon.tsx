import { siLinktree } from 'simple-icons';

interface LinktreeIconProps {
	readonly className?: string;
	readonly size?: number;
}

export default function LinktreeIcon({
	className,
	size = 17,
}: LinktreeIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={siLinktree.path} />
		</svg>
	);
}
