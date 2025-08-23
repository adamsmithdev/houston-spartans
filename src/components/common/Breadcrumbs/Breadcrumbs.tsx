import Link from 'next/link';
import { Container } from '@/components/ui';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
	readonly label: string;
	readonly href?: string;
}

interface BreadcrumbsProps {
	readonly items: ReadonlyArray<BreadcrumbItem>;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav className={styles.breadcrumbs} aria-label="Breadcrumb">
			<Container>
				<ol className={styles.breadcrumbList}>
					{items.map((item, index) => (
						<li key={item.label} className={styles.breadcrumbItem}>
							{item.href && index !== items.length - 1 ? (
								<Link href={item.href} className={styles.breadcrumbLink}>
									{item.label}
								</Link>
							) : (
								<span className={styles.breadcrumbCurrent} aria-current="page">
									{item.label}
								</span>
							)}
							{index < items.length - 1 && (
								<span className={styles.breadcrumbSeparator} aria-hidden="true">
									/
								</span>
							)}
						</li>
					))}
				</ol>
			</Container>
		</nav>
	);
}
