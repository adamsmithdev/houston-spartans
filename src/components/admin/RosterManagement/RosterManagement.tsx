'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
	arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAuth } from '@/contexts/AuthContext';
import { Button, LoadingSpinner } from '@/components/ui';
import { ROSTER_VALIDATION_LIMITS } from '@/lib/validators/rosterValidator';
import styles from './RosterManagement.module.css';

interface RosterMember {
	readonly id: string;
	readonly full_name: string;
	readonly gamertag: string | null;
	readonly picture_url: string | null;
	readonly is_team_member: boolean;
	readonly team_role: string | null;
	readonly is_creator: boolean;
	readonly creator_tier: string | null;
	readonly is_featured_home: boolean;
	readonly is_published: boolean;
	readonly updated_at: string;
}

type RosterTab = 'all' | 'team' | 'creator' | 'home';

const TABS: ReadonlyArray<{ readonly id: RosterTab; readonly label: string }> =
	[
		{ id: 'all', label: 'All Members' },
		{ id: 'team', label: 'Team / Staff' },
		{ id: 'creator', label: 'Content Creators' },
		{ id: 'home', label: 'Homepage Spotlight' },
	];

function renderRoleBadges(member: RosterMember) {
	return (
		<div className={styles.postMeta}>
			{member.is_team_member && (
				<span className={styles.category}>
					TEAM{member.team_role ? ` · ${member.team_role}` : ''}
				</span>
			)}
			{member.is_creator && (
				<span className={styles.category}>
					CREATOR{member.creator_tier ? ` · ${member.creator_tier}` : ''}
				</span>
			)}
			{member.is_featured_home && <span className={styles.category}>HOME</span>}
			<span
				className={`${styles.status} ${
					member.is_published ? styles.published : styles.draft
				}`}
			>
				{member.is_published ? 'Published' : 'Draft'}
			</span>
		</div>
	);
}

interface MemberCardProps {
	readonly member: RosterMember;
	readonly draggable: boolean;
	readonly onTogglePublished: (member: RosterMember) => void;
	readonly onDelete: (id: string) => void;
}

function MemberAvatar({ member }: { readonly member: RosterMember }) {
	if (member.picture_url) {
		return (
			<Image
				src={member.picture_url}
				alt={member.full_name}
				width={44}
				height={44}
				className={styles.avatarThumb}
			/>
		);
	}

	return (
		<div className={styles.avatarPlaceholder}>
			<i className="fas fa-user"></i>
		</div>
	);
}

function PostHeader({ member }: { readonly member: RosterMember }) {
	return (
		<div className={styles.postHeaderRow}>
			<MemberAvatar member={member} />
			<div className={styles.postHeader}>
				<h3 className={styles.postTitle}>{member.full_name}</h3>
				{member.gamertag && (
					<p className={styles.gamertagText}>{member.gamertag}</p>
				)}
				{renderRoleBadges(member)}
			</div>
		</div>
	);
}

function PostActionsRow({
	member,
	onTogglePublished,
	onDelete,
}: Omit<MemberCardProps, 'draggable'>) {
	return (
		<div className={styles.postActions}>
			<div className={styles.editDeleteGroup}>
				<Button
					variant={member.is_published ? 'warning' : 'success'}
					onClick={() => onTogglePublished(member)}
					className={styles.iconButton}
					title={member.is_published ? 'Unpublish' : 'Publish'}
				>
					<i
						className={`fas ${member.is_published ? 'fa-eye-slash' : 'fa-eye'}`}
					></i>
				</Button>

				<Link href={`/admin/roster/${member.id}`} className={styles.linkButton}>
					<Button
						variant="secondary"
						className={styles.iconButton}
						title="Edit"
					>
						<i className="fas fa-edit"></i>
					</Button>
				</Link>
				<Button
					variant="danger"
					onClick={() => onDelete(member.id)}
					className={styles.iconButton}
					title="Delete"
				>
					<i className="fas fa-trash"></i>
				</Button>
			</div>
		</div>
	);
}

function SortableMemberCard({
	member,
	onTogglePublished,
	onDelete,
}: Omit<MemberCardProps, 'draggable'>) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: member.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<article
			ref={setNodeRef}
			style={style}
			className={`${styles.postCard} ${isDragging ? styles.dragging : ''}`}
		>
			<div className={styles.postCardRow}>
				<div className={styles.dragHandle} {...attributes} {...listeners}>
					<i className="fas fa-grip-vertical"></i>
				</div>
				<div style={{ flex: 1 }}>
					<PostHeader member={member} />
				</div>
			</div>
			<PostActionsRow
				member={member}
				onTogglePublished={onTogglePublished}
				onDelete={onDelete}
			/>
		</article>
	);
}

function StaticMemberCard({
	member,
	onTogglePublished,
	onDelete,
}: Omit<MemberCardProps, 'draggable'>) {
	return (
		<article className={styles.postCard}>
			<PostHeader member={member} />
			<PostActionsRow
				member={member}
				onTogglePublished={onTogglePublished}
				onDelete={onDelete}
			/>
		</article>
	);
}

export default function RosterManagement() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<RosterTab>('all');
	const [members, setMembers] = useState<readonly RosterMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		}),
	);

	const fetchMembers = useCallback(async () => {
		try {
			setLoading(true);

			const params = new URLSearchParams();
			if (activeTab !== 'all') {
				params.append('role', activeTab);
			}
			if (debouncedSearch.trim()) {
				params.append('search', debouncedSearch.trim());
			}

			const response = await fetch(`/api/admin/roster?${params}`);

			if (!response.ok) {
				throw new Error('Failed to fetch roster members');
			}

			const data = await response.json();
			setMembers(data.members);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	}, [activeTab, debouncedSearch]);

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this roster member?')) {
			return;
		}

		try {
			const response = await fetch(`/api/admin/roster/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete roster member');
			}

			setMembers((prev) => prev.filter((m) => m.id !== id));
		} catch (err) {
			alert(
				err instanceof Error ? err.message : 'Failed to delete roster member',
			);
		}
	};

	const handleTogglePublished = async (member: RosterMember) => {
		try {
			const response = await fetch(`/api/admin/roster/${member.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					full_name: member.full_name,
					gamertag: member.gamertag,
					is_team_member: member.is_team_member,
					team_role: member.team_role,
					is_creator: member.is_creator,
					creator_tier: member.creator_tier,
					is_featured_home: member.is_featured_home,
					is_published: !member.is_published,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to update roster member');
			}

			setMembers((prev) =>
				prev.map((m) =>
					m.id === member.id ? { ...m, is_published: !m.is_published } : m,
				),
			);
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Failed to update status');
		}
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over || active.id === over.id || activeTab === 'all') {
			return;
		}

		const oldIndex = members.findIndex((m) => m.id === active.id);
		const newIndex = members.findIndex((m) => m.id === over.id);

		if (oldIndex === -1 || newIndex === -1) {
			return;
		}

		const reordered = arrayMove([...members], oldIndex, newIndex);
		const previousMembers = members;
		setMembers(reordered);

		try {
			const response = await fetch('/api/admin/roster/reorder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					role: activeTab,
					orderedIds: reordered.map((m) => m.id),
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to save new order');
			}
		} catch (err) {
			setMembers(previousMembers);
			alert(err instanceof Error ? err.message : 'Failed to save new order');
		}
	};

	// Redirect to login if not authenticated or not admin
	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/login');
		}
	}, [user, isLoading, router]);

	// Debounce search
	useEffect(() => {
		if (search.trim() === '') {
			setDebouncedSearch('');
			return;
		}

		const timer = setTimeout(() => {
			setDebouncedSearch(search);
		}, 300);

		return () => clearTimeout(timer);
	}, [search]);

	useEffect(() => {
		if (user?.role === 'admin') {
			fetchMembers();
		}
	}, [user?.role, fetchMembers]);

	if (isLoading) {
		return <LoadingSpinner message="Checking authentication..." />;
	}

	if (!user || user.role !== 'admin') {
		return <LoadingSpinner message="Redirecting to login..." />;
	}

	const isDraggableTab = activeTab !== 'all';

	const renderContent = () => {
		if (loading) {
			return <LoadingSpinner message="Loading roster..." />;
		}

		if (error) {
			return <div className={styles.error}>Error: {error}</div>;
		}

		if (members.length === 0) {
			return (
				<div className={styles.empty}>
					<h3>No roster members found</h3>
					<p>Add your first roster member to get started.</p>
					<Link href="/admin/roster/new">
						<Button variant="primary">Add Member</Button>
					</Link>
				</div>
			);
		}

		if (isDraggableTab) {
			return (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={members.map((m) => m.id)}
						strategy={verticalListSortingStrategy}
					>
						<div className={styles.postsList}>
							{members.map((member) => (
								<SortableMemberCard
									key={member.id}
									member={member}
									onTogglePublished={handleTogglePublished}
									onDelete={handleDelete}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			);
		}

		return (
			<div className={styles.postsList}>
				{members.map((member) => (
					<StaticMemberCard
						key={member.id}
						member={member}
						onTogglePublished={handleTogglePublished}
						onDelete={handleDelete}
					/>
				))}
			</div>
		);
	};

	return (
		<div className={styles.newsManagement}>
			<div className={styles.header}>
				<Link href="/admin/roster/new">
					<Button variant="primary">Add New Member</Button>
				</Link>
			</div>

			<div className={styles.tabs}>
				{TABS.map((tab) => (
					<button
						key={tab.id}
						type="button"
						className={`${styles.tab} ${
							activeTab === tab.id ? styles.tabActive : ''
						}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<p className={styles.tabHint}>
				{isDraggableTab
					? 'Drag members by the handle to reorder how they appear on the public page.'
					: 'Showing every roster member alphabetically. Select a role tab to reorder that list.'}
				{activeTab === 'home' && !loading && (
					<span className={styles.spotlightCount}>
						{' '}
						· {members.length}/{ROSTER_VALIDATION_LIMITS.homeSpotlight.max}{' '}
						featured
					</span>
				)}
			</p>

			<div className={styles.filters}>
				<div className={styles.filterGroup}>
					<label htmlFor="search">Search:</label>
					<input
						id="search"
						type="text"
						placeholder="Search by name or gamertag..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className={styles.searchInput}
					/>
				</div>
			</div>

			{renderContent()}
		</div>
	);
}
