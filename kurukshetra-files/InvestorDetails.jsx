import { useReveal } from './useReveal';
import './InvestorDetails.css';

const FEATURES = [
  {
    title: 'Immersive Virtual World',
    text: 'Explore a meticulously designed map with strategic loot deployment.',
  },
  {
    title: 'In-Game Crypto Mining',
    text: 'Mine cryptocurrency while battling for survival.',
  },
  {
    title: 'Asset Ownership',
    text: 'Full player ownership of in-game assets and weapons upgrades.',
  },
  {
    title: 'Customizable Experience',
    text: 'Personalize controls and graphics settings to your preferences.',
  },
];

const BENEFITS = [
  {
    title: 'True Ownership',
    text: 'Players have full ownership of their in-game assets, secured by blockchain technology.',
  },
  {
    title: 'Transparency',
    text: 'Game data is tamper-proof and transparent, ensuring fair play for all participants.',
  },
  {
    title: 'Community Governance',
    text: "Players have a say in the game's development through community-driven governance.",
  },
  {
    title: 'Censorship Resistant',
    text: 'The decentralized nature of blockchain protects against censorship and unexpected shutdowns.',
  },
];

const TRUST_STEPS = [
  { number: '01', title: '365-Day Crypto Mining App', text: 'Establish community trust and engagement' },
  { number: '02', title: 'Play-to-Earn Model', text: 'Real value rewards for gaming skills' },
  { number: '03', title: 'Blockchain Integration', text: 'Secure, transparent, and fair gameplay' },
  { number: '04', title: 'Community-Centric Approach', text: '70% KURU$ supply for community mining' },
];

const FUTURE_STEPS = [
  { number: '01', title: 'Metaverse Integration', text: 'Expand the Kurukshetra universe into the broader metaverse landscape.' },
  { number: '02', title: 'Web3 Technologies', text: 'Leverage cutting-edge Web3 advancements to enhance gameplay and user experience.' },
  { number: '03', title: 'Ecosystem Expansion', text: 'Develop new games and applications within the Kurukshetra blockchain ecosystem.' },
];

function DetailGrid({ items }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="investor-detail-grid reveal-stagger">
      {items.map((item) => (
        <article key={item.title} className="investor-detail-item">
          {item.number && <span className="investor-detail-item__number">{item.number}</span>}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function SectionHeader({ wide, children }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal investor-section__header${wide ? ' investor-section__header--wide' : ''}`}>
      {children}
    </div>
  );
}

export default function InvestorDetails() {
  return (
    <div className="investor-details">
      <section id="features" className="investor-section">
        <div className="container">
          <SectionHeader>
            <div className="eyebrow">Investor brief</div>
            <h2>Key Features of Kurukshetra</h2>
          </SectionHeader>
          <DetailGrid items={FEATURES} />
        </div>
      </section>

      <section id="benefits" className="investor-section investor-section--alt">
        <div className="container">
          <SectionHeader>
            <div className="eyebrow">The blockchain advantage</div>
            <h2>Blockchain Benefits in Gaming</h2>
          </SectionHeader>
          <DetailGrid items={BENEFITS} />
        </div>
      </section>

      <section id="trust" className="investor-section">
        <div className="container">
          <SectionHeader wide>
            <div className="eyebrow">The foundation</div>
            <h2>Building Trust Through Innovation</h2>
            <p>
              Kurukshetra is committed to building a robust ecosystem that prioritizes player trust,
              engagement, and rewards. By leveraging blockchain technology and innovative gameplay
              mechanics, we&rsquo;re creating a gaming experience that&rsquo;s not only entertaining but also
              potentially profitable for our community.
            </p>
          </SectionHeader>
          <DetailGrid items={TRUST_STEPS} />
        </div>
      </section>

      <section id="future" className="investor-section investor-section--alt">
        <div className="container">
          <SectionHeader wide>
            <div className="eyebrow">The long view</div>
            <h2>The Future of Kurukshetra</h2>
            <p>
              As we continue to evolve, Kurukshetra aims to remain at the forefront of blockchain
              gaming innovation. Join us in shaping the future of digital entertainment, where gaming
              meets blockchain technology to create unprecedented opportunities for players and
              investors alike.
            </p>
          </SectionHeader>
          <DetailGrid items={FUTURE_STEPS} />
        </div>
      </section>
    </div>
  );
}
