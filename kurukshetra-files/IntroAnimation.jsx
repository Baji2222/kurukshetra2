import { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

// Deliberately excludes the first K: the supplied coin is that character.
const LETTERS = 'URUKSHETRA'.split('');
const AUDIO = { ignition: '/ignition.mp3', impactA: '/impact-a.mp3', impactB: '/impact-b.mp3', final: '/final-impact.mp3', rumble: '/rumble.mp3' };

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState('dark');
  const [coinLanded, setCoinLanded] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const soundOn = useRef(true);
  const playSound = (src, volume = 1) => {
    if (!soundOn.current) return;
    const sound = new Audio(src);
    sound.volume = volume;
    // Browsers can reject one early autoplay attempt while allowing the next
    // sound after the visitor's Enter tap. Keep every cue independent.
    sound.play().catch(() => {});
  };
  // Synced to the 2s coinToss keyframes: fast wind-up whir (0-0.76s), a low
  // wavering bullet-time drone through the mid-air hang (0.76-1.28s), then a
  // rising whoosh as the spin resumes speed into the landing (1.28-2s).
  const playSpin = () => {
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      const context = new Context(); const now = context.currentTime;
      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.24, now + 0.04);
      master.gain.exponentialRampToValueAtTime(0.15, now + 0.76);
      master.gain.exponentialRampToValueAtTime(0.11, now + 1.28);
      master.gain.exponentialRampToValueAtTime(0.32, now + 1.78);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 2);
      master.connect(context.destination);

      [520, 780, 1170, 1560].forEach((frequency, i) => {
        const oscillator = context.createOscillator(); oscillator.type = 'triangle';
        const start = now + i * 0.06;
        oscillator.frequency.setValueAtTime(frequency, start);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + 0.76);
        oscillator.connect(master); oscillator.start(start); oscillator.stop(now + 0.78);
      });

      const drone = context.createOscillator(); drone.type = 'sine';
      drone.frequency.setValueAtTime(180, now + 0.76); drone.frequency.linearRampToValueAtTime(148, now + 1.28);
      const vibrato = context.createOscillator(); vibrato.type = 'sine'; vibrato.frequency.setValueAtTime(5.5, now + 0.76);
      const vibratoGain = context.createGain(); vibratoGain.gain.setValueAtTime(6, now + 0.76);
      vibrato.connect(vibratoGain); vibratoGain.connect(drone.frequency);
      drone.connect(master); vibrato.start(now + 0.76); vibrato.stop(now + 1.3); drone.start(now + 0.76); drone.stop(now + 1.3);

      const whoosh = context.createOscillator(); whoosh.type = 'sawtooth';
      whoosh.frequency.setValueAtTime(220, now + 1.28); whoosh.frequency.exponentialRampToValueAtTime(1400, now + 1.98);
      whoosh.connect(master); whoosh.start(now + 1.28); whoosh.stop(now + 2);

      window.setTimeout(() => context.close(), 2400);
    } catch { /* visual reveal remains available without Web Audio */ }
  };
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';
    if (reduceMotion) { setCoinLanded(true); setRevealed(LETTERS.length); const done = setTimeout(() => { document.body.style.overflow = ''; onComplete(); }, 1800); return () => clearTimeout(done); }
    const timers = []; const at = (seconds, action) => timers.push(setTimeout(action, seconds * 1000));
    // Coin-only sound bed: toss strike + rising spin; no letter cue here.
    // Toss now runs 2s (was 1.35s) to fit the mid-air bullet-time hang.
    at(0.45, () => { setStage('toss'); playSound(AUDIO.ignition, 0.85); playSpin(); });
    // The heavy final-impact file is reserved exclusively for the coin landing.
    at(2.45, () => { setStage('land'); setCoinLanded(true); playSound(AUDIO.final, 1); });
    // Showcase beat: the coin holds large and centred so the engraving is
    // actually readable, before shrinking down to sit inline with the word.
    at(2.85, () => setStage('showcase'));
    // Each letter uses only the lighter alternating metallic impact cues.
    LETTERS.forEach((_, i) => at(3.95 + i * 0.27, () => { setStage('reveal'); setRevealed(i + 1); playSound(i % 2 ? AUDIO.impactA : AUDIO.impactB, 0.55); }));
    at(7.15, () => { setStage('hold'); playSound(AUDIO.rumble, 0.35); }); at(9, () => setStage('exit')); at(9.7, () => { document.body.style.overflow = ''; onComplete(); });
    return () => { timers.forEach(clearTimeout); document.body.style.overflow = ''; };
  }, [onComplete]);
  return <div className={`intro intro--${stage}`} aria-label="KURUKSHETRA title reveal">
    <div className="intro__background" />
    <div className="intro__smoke" /><div className="intro__floor" />
    <div className="intro__embers" aria-hidden="true">{Array.from({ length: 22 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    <div className="intro__word"><div className={'intro__coin-slot' + (coinLanded ? ' intro__coin-slot--landed' : '')}>
      <img className="intro__coin-face" src="/coin-logo.png" alt="Kurukshetra K dollar coin" /><div className="intro__impact-flash" />
    </div><div className="intro__letters" aria-label="URUKSHETRA">{LETTERS.map((letter, i) => <span key={`${letter}-${i}`} className={'intro__letter' + (i < revealed ? ' intro__letter--active' : '')}>{letter}</span>)}</div></div>
  </div>;
}
