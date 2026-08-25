import './Welcome.css';

export default function Welcome({ onEnter = () => {} }) {
  return (
    <section id="welcome" className="welcome welcome--overlay" aria-hidden="false">
      <div className="welcome__content container">
        <div className="eyebrow">Welcome</div>
        <div className="hero__brand" aria-hidden="true">KURUKSHETRA</div>
        <h1 className="welcome__title">Welcome to Kurukshetra</h1>
        <p className="welcome__subtitle">
          Experience the future of blockchain gaming — fight, mine, and earn real value.
        </p>
        <div className="welcome__actions">
          <button type="button" className="glow-btn" onClick={() => onEnter()}>
            Enter Site
          </button>
        </div>
      </div>
    </section>
  );
}
