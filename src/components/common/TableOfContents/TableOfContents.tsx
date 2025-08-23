'use client';

import { useMemo } from 'react';
import styles from './TableOfContents.module.css';

interface TocItem {
	readonly id: string;
	readonly text: string;
	readonly level: number;
}

interface TableOfContentsProps {
	readonly content: string;
}

/**
 * Extract headings from HTML content without DOM manipulation
 * @param content HTML content string
 * @returns Array of table of contents items
 */
const extractHeadings = (content: string): ReadonlyArray<TocItem> => {
	// Simple regex to extract h2 and h3 tags
	const headingRegex = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
	const headings: TocItem[] = [];
	let match;
	let index = 0;

	while ((match = headingRegex.exec(content)) !== null) {
		const level = parseInt(match[1].charAt(1));
		const text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any nested tags
		const id = `heading-${index}`;

		headings.push({
			id,
			text,
			level,
		});
		index++;
	}

	return headings;
};

export default function TableOfContents({ content }: TableOfContentsProps) {
	const tocItems = useMemo(() => extractHeadings(content), [content]);

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	if (tocItems.length === 0) {
		return null;
	}

	return (
		<div className={styles.tableOfContents}>
			<h3>Table of Contents</h3>
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{tocItems.map((item) => {
						const levelClass = `level${item.level}`;
						const itemClasses = `${styles.item} ${styles[levelClass]}`;

						return (
							<li key={item.id} className={itemClasses}>
								<button
									type="button"
									onClick={() => scrollToHeading(item.id)}
									className={styles.link}
								>
									{item.text}
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}
