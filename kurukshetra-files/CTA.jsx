import { useReveal } from './useReveal';
import Battlefield from './Battlefield';
import './CTA.css';

export default function CTA() {
  const ref = useReveal();

  return (
    <section className="cta-section">
      <Battlefield variant="cta" />
      <div ref={ref} className="reveal cta-content container">
        <h2 className="cta-title">The Battle Begins Here</h2>
        <p className="cta-copy">Step into Kurukshetra and experience the future of blockchain gaming.</p>
        <a href="#community" className="glow-btn">
          Join the Battle
        </a>
      </div>
    </section>
  );
}
