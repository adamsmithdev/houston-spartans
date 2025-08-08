import Image from 'next/image';
import Link from 'next/link';

const spartans = [
  {
    id: 'ciscodisco',
    name: 'CISCODISCO',
    role: 'CONTENT CREATOR',
    image: '/images/headshots/profile-ciscodisco.png',
    social: [
      { platform: 'twitter', url: '#', icon: 'fab fa-x-twitter' },
      { platform: 'youtube', url: '#', icon: 'fab fa-youtube' }
    ]
  },
  {
    id: 'kevology',
    name: 'KEVOLOGY',
    realName: 'KEVIN TUCKER',
    role: 'ASSISTANT',
    image: '/images/headshots/profile-kevology.png',
    social: [
      { platform: 'twitter', url: '#', icon: 'fab fa-x-twitter' }
    ]
  },
  {
    id: 'apollo',
    name: 'APOLLO',
    realName: 'TRAE PANCERELLA',
    role: 'CALL OF DUTY DIRECTOR',
    image: '/images/headshots/profile-apollo.png',
    social: [
      { platform: 'twitter', url: '#', icon: 'fab fa-x-twitter' }
    ]
  }
];

export default function Spartans() {
  return (
    <section id="spartans" className="spartans">
      <div className="container">
        <h2>OUR <span className="heading-highlight">SPARTANS</span></h2>
        <p>Get to know a few of our featured Houston Spartans</p>
        
        <div className="spartans-grid">
          {spartans.map((spartan) => (
            <div key={spartan.id} className="spartan-card">
              <div className="spartan-image">
                <Image src={spartan.image} alt={spartan.name} width={120} height={120} />
              </div>
              <div className="spartan-info">
                <h3>{spartan.name}</h3>
                {spartan.realName && <p>{spartan.realName}</p>}
                <span className="role">{spartan.role}</span>
                <div className="social-links">
                  {spartan.social.map((social) => (
                    <Link key={`${spartan.id}-${social.platform}`} href={social.url} aria-label={`Follow ${spartan.name} on ${social.platform}`}>
                      <i className={social.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="champion-section">
          <h3>EXPERIENCE TO BE A CHAMPION?</h3>
          <p>Learn from Call of Duty League Professional and Co-Founder, Spart</p>
          <div className="champion-video">
            <iframe 
              src="https://www.youtube.com/embed/3v32FmKoEWI" 
              title="Experience to be a Champion - Houston Spartans" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
