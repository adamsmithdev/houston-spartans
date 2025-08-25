import { Container } from '@/components/ui';
import { AdminSidebar } from '@/components/layout';
import { NewsEditor } from '@/components/admin/NewsEditor';
import { createPageMetadata } from '@/utils/metadata';

export const metadata = createPageMetadata({
	title: 'Edit News Post - Admin Dashboard',
	description: 'Create or edit a news post.',
});

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function AdminNewsEditorPage({ params }: PageProps) {
	const resolvedParams = await params;
	const isEditing = resolvedParams.id !== 'new';
	const postId = isEditing ? resolvedParams.id : undefined;

	return (
		<>
			<AdminSidebar />
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
							{isEditing ? 'Edit' : 'Create'}{' '}
							<span style={{ color: '#bc1616' }}>News Post</span>
						</h1>
						<p style={{ color: '#b5a5a5', marginBottom: '40px' }}>
							{isEditing
								? 'Edit an existing news post.'
								: 'Create a new news post for the Houston Spartans website.'}
						</p>
						<NewsEditor postId={postId} />
					</div>
				</Container>
			</main>
		</>
	);
}
