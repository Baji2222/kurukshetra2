import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CryptoSystem.css';

gsap.registerPlugin(ScrollTrigger);

export default function CryptoSystem() {
  const sectionRef = useRef(null);
  const coinRef = useRef(null);
  const circuitryRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => section.classList.toggle('in-view', entry.isIntersecting),
      { threshold: 0.05 }
    );
    visibilityObserver.observe(section);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(section, { opacity: 1, y: 0 });
        if (coinRef.current) gsap.set(coinRef.current, { rotationY: 0 });
        if (circuitryRef.current) gsap.set(circuitryRef.current, { opacity: 0.35 });
        return;
      }

      // Main section animation: fade in and translate
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            markers: false,
          },
        }
      );

      const coinWrapper = section.querySelector('.crypto__coin-wrapper');
      const coinTilt = section.querySelector('.crypto__coin-tilt');
      let tiltFrame = 0;

      const onPointerMove = (event) => {
        if (!coinWrapper || !coinTilt) return;
        const bounds = coinWrapper.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        cancelAnimationFrame(tiltFrame);
        tiltFrame = requestAnimationFrame(() => {
          gsap.to(coinTilt, {
            rotationY: x * 24,
            rotationX: y * -16,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };

      const resetPointer = () => {
        cancelAnimationFrame(tiltFrame);
        if (!coinTilt) return;
        gsap.to(coinTilt, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power3.out' });
      };

      coinWrapper?.addEventListener('pointermove', onPointerMove);
      coinWrapper?.addEventListener('pointerleave', resetPointer);

      // Circuitry animation: subtle glow pulse tied to scroll
      gsap.to(circuitryRef.current, {
        opacity: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
          markers: false,
        },
      });

      // Left side reveal with stagger
      const contentSection = section.querySelector('.crypto__content');
      if (contentSection) {
        gsap.fromTo(
          contentSection,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
              markers: false,
            },
          }
        );
      }

      // Right side reveal with stagger
      const tokenCards = section.querySelectorAll('.crypto__token');
      if (tokenCards.length) {
        gsap.fromTo(
          tokenCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 15%',
              scrub: 1,
              markers: false,
            },
          }
        );
      }

      return () => {
        cancelAnimationFrame(tiltFrame);
        coinWrapper?.removeEventListener('pointermove', onPointerMove);
        coinWrapper?.removeEventListener('pointerleave', resetPointer);
      };
    }, section);

    return () => {
      visibilityObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="crypto" className="crypto-section">
      {/* Animated blockchain circuitry background */}
      <div ref={circuitryRef} className="crypto__circuitry" aria-hidden="true" />

      <div className="container crypto-container">
        <div className="crypto__header">
          <div className="eyebrow">The blockchain layer</div>
          <h2 className="crypto__title">What is Kurukshetra?</h2>
        </div>

        {/* Central rotating coin */}
        <div className="crypto__coin-wrapper">
          <div ref={coinRef} className="crypto__coin" aria-hidden="true">
            <div className="crypto__coin-tilt">
              <img className="crypto__coin-face crypto__coin-face--front" src="/coin-logo.webp" alt="" />
              <img className="crypto__coin-face crypto__coin-face--back" src="/coin-logo.webp" alt="" />
            </div>
          </div>
        </div>

        {/* Kurukshetra Introduction & Dual Token System */}
        <div className="crypto__content">
          <article className="crypto__intro">
            <p className="crypto__intro-text">
              Kurukshetra is a next-gen blockchain gaming universe inspired by the greatest war ever fought.
              Built on a dual-token economy, Kurukshetra is not just a game - it's a skill-based earning
              battleground.
            </p>
          </article>

          <div className="crypto__token-system">
            <div className="crypto__token">
              <h3 className="crypto__token-title">KURU$ - The Governance Token</h3>
              <p className="crypto__token-subtitle">
                KURU$ is the soul of Kurukshetra. It is not just a token, it's your key to the kingdom.
              </p>
              <ul className="crypto__token-features">
                <li>
                  <strong>Access Pass:</strong> Stake or hold KURU$ to unlock the game world and enter
                  battle arenas.
                </li>
                <li>
                  <strong>Governance:</strong> Vote on game updates, characters, maps & treasury decisions.
                </li>
                <li>
                  <strong>In-Game Economy:</strong> Buy legendary weapons, skins, characters, lands and NFTs.
                </li>
                <li>
                  <strong>Play-to-Earn Boost:</strong> The more KURU$ you hold, the higher your earning
                  multiplier and rewards from your gaming skills.
                </li>
              </ul>
            </div>

            <div className="crypto__token">
              <h3 className="crypto__token-title">$WAR - Virtual Warrior</h3>
              <p className="crypto__token-subtitle">
                The Meme Token of Kurukshetra. By The Community, For The Community.
              </p>
              <p className="crypto__token-desc">
                $WAR is not just a token. It's the spirit of every warrior who fights in Kurukshetra.
              </p>
              <p className="crypto__token-desc">
                While KURU$ governs the kingdom, $WAR fuels the battlefield.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
