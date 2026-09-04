import { useEffect, useRef, useState } from 'react';
import IntroAnimation from './IntroAnimation';
import Battlefield from './Battlefield';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Hero from './Hero';
import Stats from './Stats';
import Gameplay from './Gameplay';
import CryptoSystem from './CryptoSystem';
import InvestorDetails from './InvestorDetails';
import Roadmap from './Roadmap';
import Community from './Community';
import CTA from './CTA';
import Footer from './Footer';

function App() {
  // Intro plays once on initial load only — never replayed on section
  // changes or scroll. Main content mounts underneath immediately so
  // there's no blank gap once the intro dissolves.
  // Start with intro marked done so it doesn't auto-play before the
  // entry welcome overlay is dismissed.
  const [introDone, setIntroDone] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const pageBattlefieldRef = useRef(null);

  useEffect(() => {
    const battlefield = pageBattlefieldRef.current;
    const sections = Array.from(document.querySelectorAll('main > section'));
    if (!battlefield || sections.length === 0) return undefined;

    const updateFocus = () => {
      const focusLine = window.innerHeight * 0.45;
      let activeIndex = 0;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= focusLine) activeIndex = index;
      });
      battlefield.dataset.focus = String(activeIndex);
    };

    updateFocus();
    window.addEventListener('scroll', updateFocus, { passive: true });
    window.addEventListener('resize', updateFocus);
    return () => {
      window.removeEventListener('scroll', updateFocus);
      window.removeEventListener('resize', updateFocus);
    };
  }, []);

  return (
    <>
      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}

      <div ref={pageBattlefieldRef} className="page-battlefield" data-focus="0" aria-hidden="true">
        <Battlefield variant="page" image="./battlefield-hero.jpg" />
      </div>
      <Navbar />
      {showWelcome && (
        <Welcome
          onEnter={() => {
            setShowWelcome(false);
            setIntroDone(false); // start the intro animation after entry
          }}
        />
      )}
      <main>
        <Hero />
        <Stats />
        <Gameplay />
        <CryptoSystem />
        <InvestorDetails />
        <Roadmap />
        <Community />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
