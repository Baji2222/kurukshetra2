import { useReveal } from './useReveal';
import { XIcon, TelegramIcon, DiscordIcon } from './Icons';
import './Community.css';

const CHANNELS = [
  { label: 'Twitter', href: 'https://x.com/imcomingsoon_?s=11', Icon: XIcon, tone: 'twitter' },
  { label: 'Telegram', href: 'https://t.me/Deekshith_reddy_eleti', Icon: TelegramIcon, tone: 'telegram' },
  { label: 'Discord', href: 'https://discord.gg/ybuD7KTuv', Icon: DiscordIcon, tone: 'discord' },
];

export default function Community() {
  const ref = useReveal();

  return (
    <section id="community" className="community-section">
      <div className="container">
        <div ref={ref} className="reveal community-inner">
          <div className="eyebrow">Muster the ranks</div>
          <h2 className="community-title">Join the Kurukshetra Community</h2>
          <p className="community-copy">Be part of the next generation of blockchain gaming.</p>

          <div className="community-orbit" aria-label="Kurukshetra community links">
            <div className="community-orbit__ring community-orbit__ring--outer" />
            <div className="community-orbit__ring community-orbit__ring--inner" />

            <div className="community-orbit__center">
              <img src="/coin-logo.png" alt="Kurukshetra logo" />
              <span>KURUKSHETRA</span>
            </div>

            {CHANNELS.map(({ label, href, Icon, tone }, index) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={`community-channel community-channel--${tone}`}
                style={{ '--angle': `${index * 120}deg`, '--delay': index }}
              >
                <span className="community-channel__icon">
                  <Icon />
                </span>
                <span className="community-channel__label">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
