import { useReveal } from './useReveal';
import { XIcon, TelegramIcon, DiscordIcon } from './Icons';
import './Community.css';

const CHANNELS = [
  { label: 'X / Twitter', href: 'https://x.com/imcomingsoon_?s=11', Icon: XIcon },
  { label: 'Telegram', href: 'https://t.me/Deekshith_reddy_eleti', Icon: TelegramIcon },
  { label: 'Discord', href: 'https://discord.gg/ybuD7KTuv', Icon: DiscordIcon },
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

          <div className="community-channels">
            {CHANNELS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="community-channel"
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
