import Image from 'next/image';
import Link from 'next/link';
import { KickIcon, XIcon, TwitchIcon, TikTokIcon, YouTubeIcon } from './icons';

const spartans = [
  {
    id: 'ciscodisco',
    name: 'CISCODISCO',
    realName: '',
    role: 'CONTENT CREATOR',
    image: '/images/headshots/profile-ciscodisco.png',
    social: [
      { platform: 'twitter', url: 'https://x.com/ciscodisco1618', icon: <XIcon /> },
      { platform: 'twitch', url: 'https://www.twitch.tv/ciscodisco1618', icon: <TwitchIcon /> },
      { platform: 'kick', url: 'https://kick.com/ciscodisco1618', icon: <KickIcon /> },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@ciscodisco1618', icon: <TikTokIcon /> },
      { platform: 'youtube', url: 'https://www.youtube.com/@CiscoDisco1618', icon: <YouTubeIcon /> },
    ]
  },
  {
    id: 'kevology',
    name: 'KEVOLOGY',
    realName: 'Kevin Tucker',
    role: 'ASSISTANT',
    image: '/images/headshots/profile-kevology.png',
    social: [
      { platform: 'twitter', url: 'https://x.com/xkevology', icon: <XIcon /> },
      { platform: 'kick', url: 'https://kick.com/kevology', icon: <KickIcon /> },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@xkevologyx', icon: <TikTokIcon /> },
    ]
  },
  {
    id: 'apollo',
    name: 'APOLLO',
    realName: 'Trae Pancerella',
    role: 'CALL OF DUTY DIRECTOR',
    image: '/images/headshots/profile-apollo.png',
    social: [
      { platform: 'twitter', url: 'https://x.com/ihyapollo', icon: <XIcon /> },
      { platform: 'twitch', url: 'https://www.twitch.tv/ihy_apollo', icon: <TwitchIcon /> },
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
                <p>{spartan.realName}</p>
                <span className="role">{spartan.role}</span>
                <div className="social-links">
                  {spartan.social.map((social) => (
                    <Link key={`${spartan.id}-${social.platform}`} href={social.url} target='_blank' aria-label={`Follow ${spartan.name} on ${social.platform}`}>
                      {social.icon}
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
