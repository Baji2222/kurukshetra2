import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Roadmap.css';

gsap.registerPlugin(ScrollTrigger);

const STOPS = [
  {
    number: '01',
    label: 'PHASE 1: MINING APP',
    text: '$WAR mining app live | 70% for the community',
  },
  {
    number: '02',
    label: 'PHASE 2: GAME',
    text: 'Battle game launch | Play and earn $WAR',
  },
  {
    number: '03',
    label: 'PHASE 3: WEB3 + PREDICTION 11',
    text: 'Web3 wallet | Prediction 11 esports mode',
  },
  {
    number: '04',
    label: 'PHASE 4: FILMS',
    text: 'DAO-governed blockchain films',
  },
  {
    number: '05',
    label: 'PHASE 5: METAVERSE & AI',
    text: 'Metaverse world | AI warriors | VR',
  },
];

export default function Roadmap() {
  const sectionRef = useRef(null);
  const progressRef = useRef([]);
  const stopsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const context = gsap.context(() => {
      gsap.to(progressRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          end: 'bottom 65%',
          scrub: 1,
        },
      });

      stopsRef.current.forEach((stop) => {
        gsap.fromTo(
          stop,
          { opacity: 0.3, y: 24 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: stop,
              start: 'top 82%',
              end: 'top 52%',
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="roadmap" className="roadmap-section">
      <div className="container">
        <div className="roadmap-header">
          <div className="eyebrow">Kurukshetra roadmap</div>
          <h2 className="roadmap-title">Five Phases. One Expanding World.</h2>
          <p className="roadmap-intro">
            Follow the project from the mining app and battle game through Web3, films, the
            metaverse, AI warriors, and VR.
          </p>
        </div>

        <div className="roadmap-track" aria-label="Kurukshetra project journey">
          <svg className="roadmap-route" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
            <path className="roadmap-route__base roadmap-route__base--desktop" d="M 250 70 H 750 V 250 H 250 V 430 H 750" />
            <path className="roadmap-route__road roadmap-route__road--desktop" d="M 250 70 H 750 V 250 H 250 V 430 H 750" />
            <path className="roadmap-route__lane roadmap-route__lane--desktop" d="M 250 70 H 750 V 250 H 250 V 430 H 750" />
            <path className="roadmap-route__progress roadmap-route__progress--desktop" ref={(node) => { progressRef.current[0] = node; }} d="M 250 70 H 750 V 250 H 250 V 430 H 750" />
            <path className="roadmap-route__base roadmap-route__base--mobile" d="M 500 35 V 465" />
            <path className="roadmap-route__road roadmap-route__road--mobile" d="M 500 35 V 465" />
            <path className="roadmap-route__lane roadmap-route__lane--mobile" d="M 500 35 V 465" />
            <path className="roadmap-route__progress roadmap-route__progress--mobile" ref={(node) => { progressRef.current[1] = node; }} d="M 500 35 V 465" />
          </svg>
          <ol className="roadmap-stops">
            {STOPS.map((stop, index) => (
              <li
                key={stop.number}
                ref={(node) => {
                  stopsRef.current[index] = node;
                }}
                className="roadmap-stop"
              >
                <span className="roadmap-stop__marker">{stop.number}</span>
                <div className="roadmap-stop__content">
                  <h3>{stop.label}</h3>
                  <p>{stop.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
