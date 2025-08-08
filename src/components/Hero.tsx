import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-particles"></div>
        <div className="hero-gradient"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">WELCOME TO</span>
          <span className="title-main">SPARTAN NATION</span>
        </h1>
        <p className="hero-description">
          <span className="description-highlight">Rise.</span>
          <span className="description-highlight">Compete.</span>
          <span className="description-highlight">Conquer.</span>
        </p>
        <div className="hero-cta">
          <a href="https://discord.gg/fP5Ek7Xv3A" target="_blank" rel="noopener noreferrer" className="cta-button primary">
            <i className="fab fa-discord"></i>
            <span>JOIN THE SPARTANS</span>
            <div className="button-shine"></div>
          </a>
          <button className="scroll-indicator" onClick={() => {
            const missionSection = document.getElementById('mission');
            missionSection?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      </div>
      <div className="hero-logo">
        <div className="logo-glow">
          <Image src="/images/logo.png" alt="Houston Spartans Logo" width={120} height={120} />
        </div>
      </div>
    </section>
  );
}
