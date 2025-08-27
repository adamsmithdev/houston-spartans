import { Container } from '@/components/ui';
import { NewsManagement } from '@/components/admin/NewsManagement';
import { createPageMetadata } from '@/utils/metadata';

export const metadata = createPageMetadata({
	title: 'Manage News - Admin Dashboard',
	description: 'Admin dashboard for managing news posts and articles.',
});

export default function AdminNewsPage() {
	return (
		<main
			style={{
				paddingTop: '80px',
				minHeight: '100vh',
				background: '#111010',
			}}
		>
			<Container>
				<div style={{ padding: '40px 0' }}>
					<h1
						style={{
							color: '#ffffff',
							fontSize: '2.5rem',
							marginBottom: '20px',
							borderBottom: '2px solid #bc1616',
							paddingBottom: '10px',
						}}
					>
						Manage <span style={{ color: '#bc1616' }}>News</span>
					</h1>
					<p style={{ color: '#b5a5a5', marginBottom: '40px' }}>
						Create, edit, and manage news posts for the Houston Spartans
						website.
					</p>
					<NewsManagement />
				</div>
			</Container>
		</main>
	);
}
