import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import styles from './not-found.module.css';

export default function NotFound() {
	return (
		<div className={styles.notFound}>
			<Container>
				<div className={styles.content}>
					<h1>Article Not Found</h1>
					<p>
						The article you&apos;re looking for doesn&apos;t exist or may have
						been moved.
					</p>
					<div className={styles.actions}>
						<Link href="/news">
							<Button variant="primary">← Back to All News</Button>
						</Link>
						<Link href="/">
							<Button variant="secondary">Go to Homepage</Button>
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
}
