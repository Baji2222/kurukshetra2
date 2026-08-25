import { useEffect, useState } from 'react';
import { XIcon, TelegramIcon, DiscordIcon, MenuIcon, CloseIcon } from './Icons';
import './Navbar.css';

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#home" className="navbar__brand" onClick={() => setOpen(false)}>
          <img className="navbar__brand-mark" src="/coin-logo.png" alt="Kurukshetra" />
          <span className="navbar__brand-name">KURUKSHETRA</span>
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__socials">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="navbar__social"
              aria-label={label}
            >
              <Icon className="navbar__social-icon" />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="navbar__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__mobile-link" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="navbar__mobile-socials">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
              <Icon className="navbar__social-icon" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
