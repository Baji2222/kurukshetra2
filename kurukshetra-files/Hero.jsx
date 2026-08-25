import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Battlefield from './Battlefield';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const brandRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scroll-linked animations for PAGE 1
    // As user scrolls, the hero content moves up and fades out
    gsap.to(contentRef.current, {
      y: -100,
      opacity: 0.3,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
        markers: false,
      },
    });

    // Brand/Logo moves up faster (parallax effect)
    gsap.to([eyebrowRef.current, brandRef.current], {
      y: -300,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '80% top',
        scrub: 2,
        markers: false,
      },
    });

    // Title moves up with slight zoom out
    gsap.to(titleRef.current, {
      y: -150,
      scale: 0.8,
      opacity: 0.5,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '60% top',
        scrub: 2,
        markers: false,
      },
    });

    // Subtitle fades earlier
    gsap.to(subtitleRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '40% top',
        scrub: 1,
        markers: false,
      },
    });

    // CTA buttons fade and move up
    gsap.to(actionsRef.current, {
      opacity: 0,
      y: -30,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '30% top',
        scrub: 1,
        markers: false,
      },
    });

    // Battlefield parallax effect - subtle zoom in
    const battlefield = section.querySelector('.battlefield-bg');
    if (battlefield) {
      gsap.to(battlefield, {
        scale: 1.1,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
          markers: false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero">
      <Battlefield variant="hero" image="./battlefield-hero.jpg" />

      <div ref={contentRef} className="hero__content container">
        <div ref={eyebrowRef} className="eyebrow">96 players · one battlefield</div>
        <div className="hero__brand" ref={brandRef} aria-hidden="true">
          KURUKSHETRA
        </div>
        <h1 ref={titleRef} className="hero__title">
          Kurukshetra: Revolutionizing Gaming
          <span className="hero__title-accent"> with Blockchain Battlefield</span>
        </h1>
        <p ref={subtitleRef} className="hero__subtitle">
          Experience the future of gaming with Kurukshetra, where blockchain meets battle royale.
          Earn real value as you play, fight, and mine in a revolutionary gaming ecosystem.
        </p>
        <div ref={actionsRef} className="hero__actions">
          <a href="#community" className="glow-btn">
            Join the Battle
          </a>
          <a href="#why" className="ghost-btn">
            Learn More
          </a>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
