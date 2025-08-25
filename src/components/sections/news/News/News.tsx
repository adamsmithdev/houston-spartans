'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, SectionHeading, Button } from '@/components/ui';
import { getRecentArticles } from '@/lib/newsDatabase';
import { type NewsArticle } from '@/types/news';
import styles from './News.module.css';

export default function News() {
	const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const articles = await getRecentArticles(3); // Get 3 recent articles for homepage
				setNewsArticles(articles);
			} catch (error) {
				console.error('Error fetching recent articles:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) {
		return (
			<section id="news" className={styles.news}>
				<Container>
					<SectionHeading description="Loading the latest news from the Houston Spartans...">
						LATEST NEWS POSTS
					</SectionHeading>
					<div className={styles.loading}>
						<div className={styles.spinner} />
					</div>
				</Container>
			</section>
		);
	}

	if (newsArticles.length === 0) {
		return (
			<section id="news" className={styles.news}>
				<Container>
					<SectionHeading description="Stay tuned for the latest updates from the Houston Spartans!">
						LATEST NEWS POSTS
					</SectionHeading>
					<div className={styles.emptyState}>
						<p>No recent news articles available. Check back soon!</p>
					</div>
				</Container>
			</section>
		);
	}

	return (
		<section id="news" className={styles.news}>
			<Container>
				<SectionHeading description="Find Out What's Happening in Spartan Nation: Stay Updated with the Latest News, Events, and Highlights from the Houston Spartans Esports Community!">
					LATEST NEWS POSTS
				</SectionHeading>

				<div className={styles.newsGrid}>
					{newsArticles.map((article) => (
						<article key={article.id} className={styles.newsCard}>
							<div className={styles.newsImage}>
								<Image
									src={article.image}
									alt={article.title}
									width={400}
									height={200}
								/>
							</div>
							<div className={styles.newsContent}>
								<span className={styles.newsCategory}>{article.category}</span>
								<h3>{article.title}</h3>
								<p>{article.excerpt}</p>
								<div className={styles.newsMeta}>
									<span className={styles.author}>By {article.author}</span>
									<span className={styles.date}>{article.date}</span>
								</div>
							</div>
						</article>
					))}
				</div>

				<div className={styles.newsActions}>
					<Link href="/news">
						<Button variant="primary">View All News</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}
