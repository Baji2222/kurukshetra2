import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from './useReveal';
import { ParachuteIcon, TargetIcon, TrophyIcon } from './Icons';
import './Gameplay.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    Icon: ParachuteIcon,
    title: 'Drop In',
    text: 'Players parachute into a vast, meticulously designed map filled with strategic loot and mining opportunities.',
  },
  {
    num: '02',
    Icon: TargetIcon,
    title: 'Survive & Mine',
    text: 'Engage in intense battles while simultaneously mining cryptocurrency within the game world.',
  },
  {
    num: '03',
    Icon: TrophyIcon,
    title: 'Earn Real Value',
    text: 'Top teams claim mined crypto from all 96 players, turning gaming skills into tangible rewards.',
  },
];

export default function Gameplay() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header fades in as user scrolls into this section
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
            markers: false,
          },
        }
      );
    }

    // Timeline line grows from top to bottom as user scrolls
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 2,
            markers: false,
          },
        }
      );
    }

    // Background parallax effect - cinematic depth
    const bg = section.querySelector('.gameplay__bg');
    if (bg) {
      gsap.to(bg, {
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
          markers: false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === timelineRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="gameplay" className="gameplay-section">
      <div className="gameplay__bg" aria-hidden="true" />

      <div className="container">
        <div ref={headerRef} className="reveal gameplay-header">
          <div className="eyebrow">The loop</div>
          <h2 className="gameplay-title">Kurukshetra&rsquo;s Innovative Gameplay</h2>
          <p className="gameplay-description">
            Enter the battlefield where strategy meets blockchain. Three stages of progression
            define the Kurukshetra experience:
          </p>
        </div>

        <div ref={timelineRef} className="gameplay-timeline">
          <div ref={lineRef} className="gameplay-timeline__line" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <TimelineStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const { num, Icon, title, text } = step;

  useEffect(() => {
    if (!ref.current) return;

    // Individual steps fade in and slide from left/right alternating
    const direction = index % 2 === 0 ? -50 : 50;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x: direction,
        y: 50,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
          markers: false,
        },
      }
    );

    // Marker glow pulses
    const marker = ref.current.querySelector('.gameplay-step__marker');
    if (marker) {
      gsap.to(marker, {
        boxShadow: '0 0 30px rgba(255, 138, 61, 0.6), 0 0 60px rgba(255, 138, 61, 0.3)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 60%',
          end: 'top 10%',
          scrub: 1,
          markers: false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ref.current) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <div ref={ref} className="reveal gameplay-step">
      <div className="gameplay-step__marker">
        <Icon />
      </div>
      <div className="gameplay-step__num">{num}</div>
      <h3 className="gameplay-step__title">{title}</h3>
      <p className="gameplay-step__text">{text}</p>
    </div>
  );
}
