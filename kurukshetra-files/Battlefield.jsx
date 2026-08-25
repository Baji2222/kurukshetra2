import './Battlefield.css';

/**
 * Procedural, CSS-drawn battlefield scene: horizon glow, distant structure
 * silhouettes, drifting smoke, drone particles and a scanline overlay.
 *
 * To swap in real key art later, drop a file at /public/assets/<name>.jpg
 * and pass it as `image` — it renders as the base layer beneath the same
 * gradient/particle treatment, so the composition doesn't need to change.
 */
export default function Battlefield({ image, variant = 'hero', children }) {
  return (
    <div className={`battlefield battlefield--${variant}`}>
      {image && (
        <div className="battlefield__photo" style={{ backgroundImage: `url(${image})` }} />
      )}
      <div className="battlefield__sky" />
      <div className="battlefield__structures" aria-hidden="true">
        <span className="bf-tower bf-tower--1" />
        <span className="bf-tower bf-tower--2" />
        <span className="bf-tower bf-tower--3" />
        <span className="bf-tower bf-tower--4" />
      </div>
      <div className="battlefield__smoke" aria-hidden="true" />
      <div className="battlefield__particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`bf-spark bf-spark--${(i % 7) + 1}`} />
        ))}
      </div>
      <div className="battlefield__scanlines" aria-hidden="true" />
      <div className="battlefield__vignette" />
      {children}
    </div>
  );
}
