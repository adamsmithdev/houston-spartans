'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, SectionHeading, Button } from '@/components/ui';
import { getAllArticles } from '@/lib/newsData';
import { type NewsCategory } from '@/types/news';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import styles from './NewsList.module.css';

type CategoryFilter = 'All' | NewsCategory;

const categories: ReadonlyArray<CategoryFilter> = [
	'All',
	'Tournaments',
	'Community',
	'Team Updates',
	'Careers',
] as const;

export default function NewsList() {
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
	const newsArticles = getAllArticles();
	const scrollToSection = useScrollToSection();

	// Always show the featured article regardless of category
	const featuredArticle = newsArticles.find((article) => article.featured);

	// Filter regular articles based on active category (excluding featured)
	const allRegularArticles = newsArticles.filter(
		(article) => !article.featured,
	);
	const regularArticles =
		activeCategory === 'All'
			? allRegularArticles
			: allRegularArticles.filter(
					(article) => article.category === activeCategory,
				);

	const handleCategoryClick = (category: CategoryFilter) => {
		setActiveCategory(category);
		scrollToSection('[data-articles-section]');
	};

	return (
		<section className={styles.newsList}>
			<Container>
				{featuredArticle && (
					<div className={styles.featuredSection}>
						<SectionHeading description="Stay up-to-date with the latest Houston Spartans news, tournament results, team updates, and community highlights.">
							{activeCategory === 'All'
								? 'FEATURED POST'
								: `FEATURED ${activeCategory.toUpperCase()} POST`}
						</SectionHeading>
						<article className={styles.featuredPost}>
							<div className={styles.featuredImage}>
								<Image
									src={featuredArticle.image}
									alt={featuredArticle.title}
									width={800}
									height={400}
									priority
								/>
								<div className={styles.featuredOverlay}>
									<span className={styles.featuredCategory}>
										{featuredArticle.category}
									</span>
								</div>
							</div>
							<div className={styles.featuredContent}>
								<div className={styles.featuredMeta}>
									<span className={styles.author}>
										By {featuredArticle.author}
									</span>
									<span className={styles.date}>{featuredArticle.date}</span>
									<span className={styles.readTime}>
										{featuredArticle.readTime} min read
									</span>
								</div>
								<h2>{featuredArticle.title}</h2>
								<p>{featuredArticle.excerpt}</p>
								<div className={styles.tags}>
									{featuredArticle.tags.map((tag) => (
										<span key={tag} className={styles.tag}>
											{tag}
										</span>
									))}
								</div>
								<Link href={`/news/${featuredArticle.slug}`}>
									<Button variant="primary" className={styles.readMoreBtn}>
										Read Full Article
									</Button>
								</Link>
							</div>
						</article>
					</div>
				)}

				<div className={styles.articlesSection} data-articles-section>
					<div className={styles.sectionHeader}>
						<SectionHeading>LATEST POSTS</SectionHeading>
					</div>

					<div className={styles.categories}>
						{categories.map((category) => {
							const articleCount =
								category === 'All'
									? newsArticles.length
									: newsArticles.filter(
											(article) => article.category === category,
										).length;

							return (
								<button
									key={category}
									onClick={() => handleCategoryClick(category)}
									className={`${styles.categoryBtn} ${category === activeCategory ? styles.active : ''}`}
								>
									{category}
									<span className={styles.categoryCount}>({articleCount})</span>
								</button>
							);
						})}
					</div>

					<div key={activeCategory} className={styles.articlesGrid}>
						{regularArticles.length > 0 ? (
							regularArticles.map((article) => (
								<article key={article.id} className={styles.articleCard}>
									<div className={styles.articleImage}>
										<Image
											src={article.image}
											alt={article.title}
											width={400}
											height={250}
										/>
										<div className={styles.articleOverlay}>
											<span className={styles.articleCategory}>
												{article.category}
											</span>
										</div>
									</div>
									<div className={styles.articleContent}>
										<div className={styles.articleMeta}>
											<span className={styles.author}>By {article.author}</span>
											<span className={styles.date}>{article.date}</span>
											<span className={styles.readTime}>
												{article.readTime} min read
											</span>
										</div>
										<h3>{article.title}</h3>
										<p>{article.excerpt}</p>
										<div className={styles.tags}>
											{article.tags.slice(0, 3).map((tag) => (
												<span key={tag} className={styles.tag}>
													{tag}
												</span>
											))}
										</div>
										<Link href={`/news/${article.slug}`}>
											<Button
												variant="secondary"
												className={styles.readMoreBtn}
											>
												Read More
											</Button>
										</Link>
									</div>
								</article>
							))
						) : (
							<div className={styles.noArticles}>
								<h3>No articles found</h3>
								<p>
									There are currently no articles in the {activeCategory}{' '}
									category.
								</p>
								<Button
									variant="primary"
									onClick={() => handleCategoryClick('All')}
									className={styles.showAllBtn}
								>
									Show All Articles
								</Button>
							</div>
						)}
					</div>
				</div>
			</Container>
		</section>
	);
}
