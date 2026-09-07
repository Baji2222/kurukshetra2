import { useCallback, useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

const LETTERS = 'KURUKSHETRA'.split('');

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState('dark');
  const [coinLanded, setCoinLanded] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const audioContext = useRef(null);
  const soundEnabled = useRef(true);

  const ensureAudioContext = useCallback(() => {
    if (!soundEnabled.current || typeof window === 'undefined') return null;

    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;

    if (!audioContext.current) {
      audioContext.current = new AudioCtor();
    }

    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume().catch(() => {});
    }

    return audioContext.current;
  }, []);

  const playCue = useCallback((type, index = 0) => {
    const context = ensureAudioContext();
    if (!context) return;

    try {
      const now = context.currentTime;

      if (type === 'resolve') {
        // Big bass landing hit: a pitch-dropping sub boom + a short filtered
        // noise thud layered underneath for body/punch.
        const boomGain = context.createGain();
        boomGain.connect(context.destination);
        boomGain.gain.setValueAtTime(0.0001, now);
        boomGain.gain.exponentialRampToValueAtTime(0.55, now + 0.02);
        boomGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

        const boom = context.createOscillator();
        boom.type = 'sine';
        boom.frequency.setValueAtTime(150, now);
        boom.frequency.exponentialRampToValueAtTime(38, now + 0.45);
        boom.connect(boomGain);
        boom.start(now);
        boom.stop(now + 0.9);

        const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.35, context.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i += 1) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        }
        const noise = context.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseFilter = context.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(280, now);
        const noiseGain = context.createGain();
        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(context.destination);
        noise.start(now);
        return;
      }

      const gain = context.createGain();
      gain.connect(context.destination);
      gain.gain.setValueAtTime(0.0001, now);

      const oscillator = context.createOscillator();
      oscillator.type = type === 'letter' ? 'triangle' : 'sine';
      const startFrequency = type === 'letter' ? 300 + index * 24 : type === 'rise' ? 110 : 220;
      const endFrequency = type === 'letter' ? 700 + index * 30 : type === 'rise' ? 440 : 330;

      oscillator.frequency.setValueAtTime(startFrequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        endFrequency,
        now + (type === 'rise' ? 1.2 : type === 'letter' ? 0.16 : 0.45)
      );

      gain.gain.exponentialRampToValueAtTime(type === 'letter' ? 0.1 : 0.14, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (type === 'rise' ? 1.35 : type === 'letter' ? 0.28 : 0.8));

      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + (type === 'rise' ? 1.4 : type === 'letter' ? 0.3 : 0.85));
    } catch {
      // Avoid throwing on browsers with limited audio support.
    }
  }, [ensureAudioContext]);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';

    if (reduceMotion) {
      setCoinLanded(true);
      setRevealed(LETTERS.length);
      const done = setTimeout(() => {
        document.body.style.overflow = '';
        onComplete();
      }, 1200);

      return () => {
        clearTimeout(done);
        document.body.style.overflow = '';
      };
    }

    const timers = [];
    const at = (seconds, action) => timers.push(setTimeout(action, seconds * 1000));

    at(0.35, () => { setStage('toss'); playCue('rise'); });
    at(1.85, () => { setStage('land'); setCoinLanded(true); playCue('resolve'); });
    at(2.0, () => setStage('showcase'));

    LETTERS.forEach((_, index) => {
      if (index === 4) return;
      const letterOrder = index > 4 ? index - 1 : index;
      at(2.35 + letterOrder * 0.16, () => {
        setStage('reveal');
        setRevealed(letterOrder + 1);
        playCue('letter', letterOrder);
      });
    });

    at(4.2, () => setStage('hold'));
    at(5.1, () => setStage('exit'));
    at(5.6, () => {
      document.body.style.overflow = '';
      onComplete();
    });

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';

      if (audioContext.current) {
        audioContext.current.close().catch(() => {});
        audioContext.current = null;
      }
    };
  }, [onComplete, playCue]);

  return (
    <div className={`intro intro--${stage}`} aria-label="KURUKSHETRA title reveal">
      <button
        className="intro__sound-toggle"
        type="button"
        aria-label={soundOn ? 'Mute intro sound' : 'Unmute intro sound'}
        onClick={() => {
          const nextSoundOn = !soundEnabled.current;
          soundEnabled.current = nextSoundOn;
          setSoundOn(nextSoundOn);
          if (!nextSoundOn && audioContext.current) {
            audioContext.current.suspend().catch(() => {});
          }
        }}
      >
        {soundOn ? 'SOUND ON' : 'SOUND OFF'}
      </button>
      <div className="intro__background" />
      <div className="intro__smoke" /><div className="intro__floor" />
      <div className="intro__embers" aria-hidden="true">{Array.from({ length: 10 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
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
                  <img className="intro__coin-face" src="/coin-logo.webp" alt="Kurukshetra coin" />
                  <div className="intro__impact-flash" />
                  <div className="intro__landing-smoke" />
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
    </div>
  );
}
