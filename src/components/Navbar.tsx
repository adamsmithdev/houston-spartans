import Image from 'next/image';
import Link from 'next/link';
import { DiscordIcon } from './icons';
import { HOUSTON_SPARTANS_STORE_URL } from '@/constants';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Image src="/images/logo.png" alt="Houston Spartans" width={30} height={30} />
        </div>
        <div className="nav-menu" id="nav-menu">
          <Link href="#home" className="nav-link">Home</Link>
          <Link href="#about" className="nav-link">About</Link>
          <Link href="#teams" className="nav-link">Teams</Link>
          <Link href="#creators" className="nav-link">Creators</Link>
          <Link href="#news" className="nav-link">News</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
          <Link href={HOUSTON_SPARTANS_STORE_URL} className="nav-link" target="_blank" rel="noopener noreferrer">
            Store
          </Link>
          <Link 
            href="https://discord.gg/fP5Ek7Xv3A" 
            className="nav-link discord-btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <DiscordIcon /> Join Discord
          </Link>
        </div>
        <div className="nav-toggle" id="nav-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}
