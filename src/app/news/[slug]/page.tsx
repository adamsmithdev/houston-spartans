import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/layout';
import { Breadcrumbs, ShareButtons } from '@/components/common';
import { Container, Button } from '@/components/ui';
import {
	getArticleBySlug,
	getRelatedArticles,
	getAllSlugs,
} from '@/lib/newsData';
import { createPageMetadata } from '@/utils/metadata';
import { SafeHtml } from '@/utils/sanitizeHtml';
import styles from './page.module.css';

interface BlogPostPageProps {
	readonly params: Promise<{
		readonly slug: string;
	}>;
}

export async function generateStaticParams() {
	const slugs = getAllSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);

	if (!article) {
		return {
			title: 'Article Not Found - Houston Spartans',
		};
	}

	return createPageMetadata({
		title: `${article.title} - Houston Spartans`,
		description: article.excerpt,
		keywords: [...article.tags, 'Houston Spartans', 'esports news'],
	});
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	const relatedArticles = getRelatedArticles(slug, 3);

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'News', href: '/news' },
		{ label: article.title },
	] as const;

	return (
		<>
			<PageHero title={article.title} description={article.excerpt} />
			<Breadcrumbs items={breadcrumbItems} />

			<main className={styles.blogPost}>
				<Container>
					<div className={styles.postLayout}>
						<article className={styles.articleContent}>
							<header className={styles.articleHeader}>
								<div className={styles.articleMeta}>
									<span className={styles.category}>{article.category}</span>
									<div className={styles.metaInfo}>
										<span className={styles.author}>By {article.author}</span>
										<span className={styles.date}>{article.date}</span>
										<span className={styles.readTime}>
											{article.readTime} min read
										</span>
									</div>
								</div>

								<div className={styles.featuredImage}>
									<Image
										src={article.image}
										alt={article.title}
										width={800}
										height={400}
										priority
									/>
								</div>

								<div className={styles.tags}>
									{article.tags.map((tag) => (
										<span key={tag} className={styles.tag}>
											{tag}
										</span>
									))}
								</div>
							</header>

							<SafeHtml html={article.content} className={styles.articleBody} />

							<footer className={styles.articleFooter}>
								<div className={styles.shareSection}>
									<h3>Share & Connect</h3>
									<ShareButtons title={article.title} />
								</div>

								<div className={styles.backToNews}>
									<Link href="/news">
										<Button variant="primary">← Back to All News</Button>
									</Link>
								</div>
							</footer>
						</article>

						<aside className={styles.sidebar}>
							<div className={styles.relatedArticles}>
								<h3>Related Articles</h3>
								<div className={styles.relatedGrid}>
									{relatedArticles.map((relatedArticle) => (
										<Link
											key={relatedArticle.id}
											href={`/news/${relatedArticle.slug}`}
											className={styles.relatedCard}
										>
											<div className={styles.relatedImage}>
												<Image
													src={relatedArticle.image}
													alt={relatedArticle.title}
													width={200}
													height={120}
												/>
											</div>
											<div className={styles.relatedContent}>
												<span className={styles.relatedCategory}>
													{relatedArticle.category}
												</span>
												<h4>{relatedArticle.title}</h4>
												<span className={styles.relatedDate}>
													{relatedArticle.date}
												</span>
											</div>
										</Link>
									))}
								</div>
							</div>

							<div className={styles.newsletter}>
								<h3>Stay Updated</h3>
								<p>
									Get the latest Houston Spartans news delivered to your inbox.
								</p>
								<form className={styles.newsletterForm}>
									<input
										type="email"
										placeholder="Your email"
										className={styles.emailInput}
									/>
									<Button variant="primary" type="submit">
										Subscribe
									</Button>
								</form>
							</div>
						</aside>
					</div>
				</Container>
			</main>
		</>
	);
}
