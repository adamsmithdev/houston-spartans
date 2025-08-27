'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button, LoadingSpinner } from '@/components/ui';
import styles from './NewsManagement.module.css';

interface NewsPost {
	readonly id: string;
	readonly title: string;
	readonly slug: string;
	readonly excerpt: string;
	readonly category: string;
	readonly author_name: string;
	readonly created_at: string;
	readonly updated_at: string;
	readonly published_at: string | null;
	readonly is_published: boolean;
	readonly is_featured: boolean;
	readonly read_time: number;
	readonly tags: readonly string[];
}

interface NewsListResponse {
	readonly posts: readonly NewsPost[];
	readonly pagination: {
		readonly page: number;
		readonly limit: number;
		readonly total: number;
		readonly totalPages: number;
	};
}

export default function NewsManagement() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [posts, setPosts] = useState<readonly NewsPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filter, setFilter] = useState({
		category: 'All',
		published: 'all', // 'all', 'published', 'draft'
		search: '',
	});
	const [debouncedSearch, setDebouncedSearch] = useState('');

	// Helper function to truncate text with ellipses
	const truncateText = (text: string, maxLength: number = 20): string => {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	};

	// Fetch posts
	const fetchPosts = useCallback(async () => {
		try {
			setLoading(true);

			const params = new URLSearchParams({
				page: currentPage.toString(),
				limit: '10',
			});

			if (filter.category !== 'All') {
				params.append('category', filter.category);
			}

			if (filter.published === 'published') {
				params.append('published', 'true');
			} else if (filter.published === 'draft') {
				params.append('published', 'false');
			}

			if (debouncedSearch.trim()) {
				params.append('search', debouncedSearch.trim());
			}

			const response = await fetch(`/api/admin/news?${params}`);

			if (!response.ok) {
				throw new Error('Failed to fetch posts');
			}

			const data: NewsListResponse = await response.json();
			setPosts(data.posts);
			setTotalPages(data.pagination.totalPages);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	}, [currentPage, filter.category, filter.published, debouncedSearch]);

	// Delete post
	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this post?')) {
			return;
		}

		try {
			const response = await fetch(`/api/admin/news/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete post');
			}

			// Refresh the list
			fetchPosts();
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Failed to delete post');
		}
	};

	// Toggle published status
	const handleTogglePublished = async (post: NewsPost) => {
		try {
			const response = await fetch(`/api/admin/news/${post.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...post,
					is_published: !post.is_published,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to update post');
			}

			// Refresh the list
			fetchPosts();
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Failed to update post');
		}
	};

	// Toggle featured status
	const handleToggleFeatured = async (post: NewsPost) => {
		try {
			const response = await fetch(`/api/admin/news/${post.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...post,
					is_featured: !post.is_featured,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to update post');
			}

			// Refresh the list
			fetchPosts();
		} catch (err) {
			alert(
				err instanceof Error ? err.message : 'Failed to update featured status',
			);
		}
	};

	// Redirect to login if not authenticated or not admin
	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/login');
		}
	}, [user, isLoading, router]);

	// Debounce search input only - don't fetch here
	useEffect(() => {
		// Clear debouncedSearch immediately when search becomes empty
		if (filter.search.trim() === '') {
			setDebouncedSearch('');
			return;
		}

		// Otherwise, debounce the search term
		const timer = setTimeout(() => {
			setDebouncedSearch(filter.search);
		}, 300); // 300ms debounce

		return () => clearTimeout(timer);
	}, [filter.search]);

	// Main fetch effect - runs when any filter changes (including debounced search)
	useEffect(() => {
		if (user?.role === 'admin') {
			fetchPosts();
		}
	}, [
		user?.role,
		currentPage,
		filter.category,
		filter.published,
		debouncedSearch,
		fetchPosts,
	]);

	// Reset page when filters change (but not for search input)
	useEffect(() => {
		setCurrentPage(1);
	}, [filter.category, filter.published, debouncedSearch]);

	// Show loading spinner while auth is checking
	if (isLoading) {
		return <LoadingSpinner message="Checking authentication..." />;
	}

	// Show loading spinner while redirecting
	if (!user || user.role !== 'admin') {
		return <LoadingSpinner message="Redirecting to login..." />;
	}

	// Render posts list content based on state
	const renderPostsContent = () => {
		if (loading) {
			return <LoadingSpinner message="Loading posts..." />;
		}

		if (error) {
			return <div className={styles.error}>Error: {error}</div>;
		}

		if (posts.length === 0) {
			return (
				<div className={styles.empty}>
					<h3>No posts found</h3>
					<p>Create your first news post to get started.</p>
					<Link href="/admin/news/new">
						<Button variant="primary">Create Post</Button>
					</Link>
				</div>
			);
		}

		return (
			<>
				<div className={styles.postsList}>
					{posts.map((post) => (
						<article key={post.id} className={styles.postCard}>
							<div className={styles.postHeader}>
								<h3 className={styles.postTitle}>{truncateText(post.title)}</h3>
								<div className={styles.postMeta}>
									<span className={styles.category}>{post.category}</span>
									<span className={styles.date}>
										{new Date(post.created_at).toLocaleDateString()}
									</span>
									<span
										className={`${styles.status} ${post.is_published ? styles.published : styles.draft}`}
									>
										{post.is_published ? 'Published' : 'Draft'}
									</span>
								</div>
							</div>
							<p className={styles.excerpt}>{truncateText(post.excerpt)}</p>
							<div className={styles.postActions}>
								<div className={styles.statusButtonsGroup}>
									<Button
										variant={post.is_published ? 'warning' : 'success'}
										onClick={() => handleTogglePublished(post)}
										className={styles.iconButton}
									>
										<i
											className={`fas ${post.is_published ? 'fa-eye-slash' : 'fa-eye'}`}
										></i>
									</Button>

									<Button
										variant={post.is_featured ? 'info' : 'warning'}
										onClick={() => handleToggleFeatured(post)}
										className={styles.iconButton}
									>
										<i
											className={
												post.is_featured ? 'fas fa-star' : 'far fa-star'
											}
											style={{
												color: post.is_featured ? '#fbbf24' : undefined,
											}}
										></i>
									</Button>
								</div>

								<div className={styles.editDeleteGroup}>
									<Link
										href={`/admin/news/${post.id}`}
										className={styles.linkButton}
									>
										<Button variant="secondary" className={styles.iconButton}>
											<i className="fas fa-edit"></i>
										</Button>
									</Link>
									<Button
										variant="danger"
										onClick={() => handleDelete(post.id)}
										className={styles.iconButton}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</div>
							</div>
						</article>
					))}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className={styles.pagination}>
						<Button
							variant="secondary"
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 1}
						>
							Previous
						</Button>
						<span className={styles.pageInfo}>
							Page {currentPage} of {totalPages}
						</span>
						<Button
							variant="secondary"
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				)}
			</>
		);
	};

	return (
		<div className={styles.newsManagement}>
			{/* Header Actions */}
			<div className={styles.header}>
				<Link href="/admin/news/new">
					<Button variant="primary">Create New Post</Button>
				</Link>
			</div>

			{/* Filters */}
			<div className={styles.filters}>
				<div className={styles.filterGroup}>
					<label htmlFor="category">Category:</label>
					<select
						id="category"
						value={filter.category}
						onChange={(e) => setFilter({ ...filter, category: e.target.value })}
						className={styles.select}
					>
						<option value="All">All Categories</option>
						<option value="Tournaments">Tournaments</option>
						<option value="Community">Community</option>
						<option value="Team Updates">Team Updates</option>
						<option value="Careers">Careers</option>
					</select>
				</div>

				<div className={styles.filterGroup}>
					<label htmlFor="published">Status:</label>
					<select
						id="published"
						value={filter.published}
						onChange={(e) =>
							setFilter({ ...filter, published: e.target.value })
						}
						className={styles.select}
					>
						<option value="all">All Posts</option>
						<option value="published">Published</option>
						<option value="draft">Drafts</option>
					</select>
				</div>

				<div className={styles.filterGroup}>
					<label htmlFor="search">Search:</label>
					<input
						id="search"
						type="text"
						placeholder="Search posts..."
						value={filter.search}
						onChange={(e) => setFilter({ ...filter, search: e.target.value })}
						className={styles.searchInput}
					/>
				</div>
			</div>

			{/* Posts List */}
			{renderPostsContent()}
		</div>
	);
}
