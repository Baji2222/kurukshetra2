import { useReveal } from './useReveal';
import { ShieldIcon, PickaxeIcon, CoinIcon } from './Icons';
import './WhyKurukshetra.css';

const PILLARS = [
  {
    Icon: ShieldIcon,
    title: 'Battle',
    text: 'Drop into intense, competitive battle-royale combat built on a fair, transparent foundation designed to keep cheating and hacking out of the fight.',
  },
  {
    Icon: PickaxeIcon,
    title: 'Mine',
    text: 'While the battle rages, players mine cryptocurrency within the game environment — every match is also a resource run across the map.',
  },
  {
    Icon: CoinIcon,
    title: 'Earn',
    text: 'The play-to-earn concept turns gaming skill into tangible reward, letting your performance on the battlefield generate real value.',
  },
];

export default function WhyKurukshetra() {
  const headerRef = useReveal();

  return (
    <section id="why" className="why-section">
      <div className="container">
        <div ref={headerRef} className="reveal why-header">
          <div className="eyebrow">The thesis</div>
          <h2 className="why-title">Why Kurukshetra?</h2>
          <p className="why-copy">
            Kurukshetra combines battle-royale gameplay with blockchain technology to build a
            fairer arena — one designed from the ground up to address the cheating and hacking
            that plague competitive gaming today.
          </p>
        </div>

        <div className="why-grid">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }) {
  const ref = useReveal();
  const { Icon, title, text } = pillar;
  return (
    <div
      ref={ref}
      className="reveal pillar-card"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="pillar-card__icon">
        <Icon />
      </div>
      <h3 className="pillar-card__title">{title}</h3>
      <p className="pillar-card__text">{text}</p>
    </div>
  );
}
