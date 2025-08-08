import { Container } from '@/components/ui';
import { HOUSTON_SPARTANS_STORE_URL } from '@/constants';

export default function Merch() {
  return (
    <section id="merch" className="merch">
      <div className="merch-background">
        <div className="merch-overlay"></div>
      </div>
      <Container>
        <div className="merch-content">
          <h2>SPARTAN MERCH IS LIVE</h2>
          <a href={HOUSTON_SPARTANS_STORE_URL} target="_blank" rel="noopener noreferrer" className="merch-cta-btn">
            <i className="fas fa-shopping-cart"></i>
            <span>GET YOURS NOW</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </Container>
    </section>
  );
}
