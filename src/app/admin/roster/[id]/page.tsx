import { Container } from '@/components/ui';
import { RosterEditor } from '@/components/admin/RosterEditor';
import { createPageMetadata } from '@/utils/metadata';

export const metadata = createPageMetadata({
	title: 'Edit Roster Member - Admin Dashboard',
	description: 'Create or edit a roster member.',
});

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function AdminRosterEditorPage({ params }: PageProps) {
	const resolvedParams = await params;
	const isEditing = resolvedParams.id !== 'new';
	const memberId = isEditing ? resolvedParams.id : undefined;

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
						{isEditing ? 'Edit' : 'Add'}{' '}
						<span style={{ color: '#bc1616' }}>Roster Member</span>
					</h1>
					<p style={{ color: '#b5a5a5', marginBottom: '40px' }}>
						{isEditing
							? 'Edit an existing roster member.'
							: 'Add a new team member, content creator, or homepage feature.'}
					</p>
					<RosterEditor memberId={memberId} />
				</div>
			</Container>
		</main>
	);
}
