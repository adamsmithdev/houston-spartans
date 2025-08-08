import Image from 'next/image';

const newsArticles = [
  {
    id: 'miami-lan-recap',
    title: 'RECAP: MIAMI LAN – ACADEMY RED',
    excerpt: 'Pool Play The first match was against X Element Black, a…',
    category: 'Tournaments',
    author: 'Houston Spartans',
    date: 'January 31, 2025',
    image: '/images/blog/blog-1.png'
  },
  {
    id: 'tournament-announcement',
    title: 'HOUSTON SPARTANS 4V4 BO3 VARIANT TOURNAMENT',
    excerpt: 'Houston Spartans Tournament Ruleset January 26th at 2 pm cstCheck in begins…',
    category: 'Tournaments',
    author: 'Houston Spartans',
    date: 'January 21, 2025',
    image: '/images/blog/blog-2.png'
  },
  {
    id: 'general-manager-position',
    title: 'JOIN THE HOUSTON SPARTANS ESPORTS TEAM AS GENERAL MANAGER!',
    excerpt: 'Are you passionate about esports and ready to lead one of…',
    category: 'Careers',
    author: 'Houston Spartans',
    date: 'January 4, 2025',
    image: '/images/blog/blog-3.png'
  }
];

export default function News() {
  return (
    <section id="news" className="news">
      <div className="container">
        <h2>LATEST NEWS POSTS</h2>
        <p>Find Out What&apos;s Happening in Spartan Nation: Stay Updated with the Latest News, Events, and Highlights from the Houston Spartans Esports Community!</p>
        
        <div className="news-grid">
          {newsArticles.map((article) => (
            <article key={article.id} className="news-card">
              <div className="news-image">
                <Image src={article.image} alt={article.title} width={400} height={200} />
              </div>
              <div className="news-content">
                <span className="news-category">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="news-meta">
                  <span className="author">By {article.author}</span>
                  <span className="date">{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
