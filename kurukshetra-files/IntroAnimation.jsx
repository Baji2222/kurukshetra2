import { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

const LETTERS = 'KURUKSHETRA'.split('');

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState('dark');
  const [coinLanded, setCoinLanded] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const audioContext = useRef(null);
  const playCue = (type, index = 0) => {
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      const context = audioContext.current || new Context();
      audioContext.current = context;
      if (context.state === 'suspended') context.resume();
      const now = context.currentTime;
      const gain = context.createGain();
      gain.connect(context.destination);
      gain.gain.setValueAtTime(0.0001, now);

      const oscillator = context.createOscillator();
      oscillator.type = type === 'letter' ? 'triangle' : 'sine';
      const startFrequency = type === 'letter' ? 300 + index * 24 : type === 'rise' ? 110 : 220;
      const endFrequency = type === 'letter' ? 700 + index * 30 : type === 'rise' ? 440 : 330;
      oscillator.frequency.setValueAtTime(startFrequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + (type === 'rise' ? 1.2 : type === 'letter' ? 0.16 : 0.45));
      gain.gain.exponentialRampToValueAtTime(type === 'letter' ? 0.1 : 0.14, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (type === 'rise' ? 1.35 : type === 'letter' ? 0.28 : 0.8));
      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + (type === 'rise' ? 1.4 : type === 'letter' ? 0.3 : 0.85));
    } catch {}
  };
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';
    if (reduceMotion) { setCoinLanded(true); setRevealed(LETTERS.length); const done = setTimeout(() => { document.body.style.overflow = ''; onComplete(); }, 1200); return () => clearTimeout(done); }
    const timers = []; const at = (seconds, action) => timers.push(setTimeout(action, seconds * 1000));
    at(0.35, () => { setStage('toss'); playCue('rise'); });
    at(2.35, () => { setStage('land'); setCoinLanded(true); playCue('resolve'); });
    at(2.7, () => setStage('showcase'));
    LETTERS.forEach((_, index) => {
      if (index === 4) return;
      const letterOrder = index > 4 ? index - 1 : index;
      at(3.5 + letterOrder * 0.14, () => {
        setStage('reveal');
        setRevealed(letterOrder + 1);
        playCue('letter', letterOrder);
      });
    });
    at(5.9, () => setStage('hold')); at(6.8, () => setStage('exit')); at(7.3, () => { document.body.style.overflow = ''; onComplete(); });
    return () => { timers.forEach(clearTimeout); document.body.style.overflow = ''; if (audioContext.current) audioContext.current.close(); };
  }, [onComplete]);
  return <div className={`intro intro--${stage}`} aria-label="KURUKSHETRA title reveal">
    <div className="intro__background" />
    <div className="intro__smoke" /><div className="intro__floor" />
    <div className="intro__embers" aria-hidden="true">{Array.from({ length: 22 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    <div className="intro__word">
      <div className="intro__letters" aria-label="KURUKSHETRA">
        {LETTERS.map((letter, i) => {
          const isCoinPosition = i === 4;
          if (isCoinPosition) {
            return (
              <div
                key={`coin-${i}`}
                className={'intro__coin-slot' + (coinLanded ? ' intro__coin-slot--landed' : '')}
              >
                <img className="intro__coin-face" src="/coin-logo.png" alt="Kurukshetra coin" />
                <div className="intro__impact-flash" />
              </div>
            );
          }

          const letterOrder = i > 4 ? i - 1 : i;
          const isVisible = letterOrder < revealed;

          return (
            <span
              key={`${letter}-${i}`}
              className={'intro__letter' + (isVisible ? ' intro__letter--active' : '')}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  </div>;
}
