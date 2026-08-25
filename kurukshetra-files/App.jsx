import { useState } from 'react';
import IntroAnimation from './IntroAnimation';
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

  return (
    <>
      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}

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
