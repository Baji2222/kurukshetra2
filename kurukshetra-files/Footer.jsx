import { XIcon, TelegramIcon, DiscordIcon } from './Icons';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Game', href: '#gameplay' },
  { label: 'Blockchain', href: '#gameplay' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Community', href: '#community' },
];

const SOCIALS = [
  { label: 'X / Twitter', href: 'https://x.com/imcomingsoon_?s=11', Icon: XIcon },
  { label: 'Telegram', href: 'https://t.me/Deekshith_reddy_eleti', Icon: TelegramIcon },
  { label: 'Discord', href: 'https://discord.gg/ybuD7KTuv', Icon: DiscordIcon },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__brand-link">
            <span className="footer__brand-mark">K</span>
            <span className="footer__brand-name">KURUKSHETRA</span>
          </a>
          <p className="footer__tagline">Blockchain Battlefield</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="footer__nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__socials">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© 2026 Kurukshetra. All rights reserved.</p>
      </div>
    </footer>
  );
}
