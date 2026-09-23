import { Container } from '@/components/ui';
import { RosterManagement } from '@/components/admin/RosterManagement';
import { createPageMetadata } from '@/utils/metadata';

export const metadata = createPageMetadata({
	title: 'Manage Roster - Admin Dashboard',
	description:
		'Admin dashboard for managing team members, content creators, and the homepage spotlight.',
});

export default function AdminRosterPage() {
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
						Manage <span style={{ color: '#bc1616' }}>Roster</span>
					</h1>
					<p style={{ color: '#b5a5a5', marginBottom: '40px' }}>
						Manage team members, content creators, and the homepage spotlight
						for the Houston Spartans website.
					</p>
					<RosterManagement />
				</div>
			</Container>
		</main>
	);
}
