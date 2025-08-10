import { Container } from '@/components/ui';

interface SectionProps {
	readonly children: React.ReactNode;
	readonly className?: string;
	readonly id?: string;
	readonly containerClassName?: string;
	readonly disableContainer?: boolean;
}

export default function Section({
	children,
	className = '',
	id,
	containerClassName = '',
	disableContainer = false,
}: SectionProps) {
	const content = disableContainer ? (
		children
	) : (
		<Container className={containerClassName}>{children}</Container>
	);

	return (
		<section className={className} id={id}>
			{content}
		</section>
	);
}
