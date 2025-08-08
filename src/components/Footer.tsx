import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LATEST POSTS</h3>
            <div className="footer-posts">
              <Link href="#">RECAP: MIAMI LAN – ACADEMY RED</Link>
              <Link href="#">HOUSTON SPARTANS 4V4 BO3 VARIANT TOURNAMENT</Link>
            </div>
          </div>
          
          <div className="footer-section">
            <div className="social-media">
              <Link href="#" aria-label="Follow us on Facebook">
                <i className="fab fa-facebook"></i>
              </Link>
              <Link href="#" aria-label="Follow us on X/Twitter">
                <i className="fab fa-x-twitter"></i>
              </Link>
              <Link href="#" aria-label="Follow us on Instagram">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#" aria-label="Visit our Linktree">
                <i className="fas fa-link"></i>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-links">
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">FAQs</Link>
            <Link href="#">Home</Link>
          </div>
          <p className="copyright">© 2025 Houston Spartans. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
