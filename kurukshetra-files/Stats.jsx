import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from './useReveal';
import { useCountUp } from './useCountUp';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    target: 215,
    prefix: '$',
    suffix: 'B',
    label: 'Market Value',
    detail: 'Current gaming industry valuation',
  },
  {
    target: 14,
    prefix: '',
    suffix: '%',
    label: 'Annual Growth',
    detail: 'Impressive year-over-year increase',
  },
  {
    target: 614.91,
    prefix: '$',
    suffix: 'B',
    decimals: 2,
    label: '2030 Projection',
    detail: 'Blockchain gaming market projection',
  },
];

function StatCard({ stat, index }) {
  const [countRef, value] = useCountUp(stat.target, { decimals: stat.decimals || 0 });
  const cardRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Individual stat cards animate in staggered fashion
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        delay: index * 0.3,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          markers: false,
        },
      }
    );

    // Labels fade in after cards
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          delay: index * 0.3 + 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            end: 'top 15%',
            scrub: 1,
            markers: false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === cardRef.current) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <div ref={cardRef} className="stat-card">
      <div ref={countRef} className="stat-card__value">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div ref={labelRef} className="stat-card__label">
        {stat.label}
      </div>
      <p className="stat-card__detail">{stat.detail}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const circuitryRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Darker background overlay as user scrolls into this section
    gsap.fromTo(
      section,
      { backgroundColor: 'rgba(5, 5, 6, 0)' },
      {
        backgroundColor: 'rgba(5, 5, 6, 0.8)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          markers: false,
        },
      }
    );

    // Blockchain circuit pattern fades in
    if (circuitryRef.current) {
      gsap.fromTo(
        circuitryRef.current,
        { opacity: 0 },
        {
          opacity: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
            markers: false,
          },
        }
      );
    }

    // Section title fades in from bottom
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
            markers: false,
          },
        }
      );
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
    <section ref={sectionRef} id="stats" className="stats-section">
      <div ref={circuitryRef} className="stats__circuitry" aria-hidden="true" />

      <div className="container">
        <div ref={headerRef} className="reveal stats-header">
          <div className="eyebrow">By the numbers</div>
          <h2 className="stats-title">The Booming Gaming Industry</h2>
          <p className="stats-subtitle">
            The global gaming industry has reached unprecedented heights, now valued at $215 billion
            with an impressive 14% annual growth rate. Projections indicate a market capitalization
            in the trillions by 2035. However, this thriving landscape is not without its challenges.
            Players increasingly face issues like cheating and hacking in popular battle royale games
            such as Free Fire, PUBG Mobile, and Call of Duty, leading to a decline in player
            engagement and enjoyment. Enter Kurukshetra, a groundbreaking solution that leverages
            blockchain technology to address these concerns and revolutionize the gaming experience.
            As the blockchain gaming market expands from $154.46 billion in 2023 to a projected
            $614.91 billion by 2030, Kurukshetra is poised to capture a significant share of this
            burgeoning market.
          </p>
        </div>

        <div ref={gridRef} className="stats-grid">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
