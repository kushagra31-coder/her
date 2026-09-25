import { useState, useCallback } from 'react';
import './index.css';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import { MusicProvider } from './audio/music';
import { OpeningScreen } from './components/OpeningScreen';
import { Nav } from './components/Nav';
import { HeroSection } from './components/HeroSection';
import { WhyYouSection } from './components/WhyYouSection';
import { GallerySection } from './components/GallerySection';
import { MindSection } from './components/MindSection';
import { FamiliarSection } from './components/FamiliarSection';
import { CinemaSection } from './components/CinemaSection';
import { ChildhoodSection } from './components/ChildhoodSection';
import { LetterSection } from './components/LetterSection';
import { ConfessionSection } from './components/ConfessionSection';
import { FinalSection } from './components/FinalSection';
import { MusicPlayer } from './components/MusicPlayer';
import EggToast from './components/EggToast';
import { HeartCursorTrail, LilyDivider } from './components/Particles';

export default function App() {
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
    document.documentElement.style.overflow = '';
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        <HeartCursorTrail />
        <EggToast />

        <AnimatePresence>
          {!opened && <OpeningScreen key="opening" onOpen={handleOpen} />}
        </AnimatePresence>

        {opened && (
          <main id="main-content" aria-label="a little world for her">
            <Nav />
            <HeroSection />
            <WhyYouSection />
            <GallerySection />
            <MindSection />
            <FamiliarSection />
            <CinemaSection />
            <ChildhoodSection />
            <LetterSection />
            <LilyDivider />
            <ConfessionSection />
            <LilyDivider />
            <FinalSection />
          </main>
        )}

        {opened && <MusicPlayer />}
      </MusicProvider>
    </MotionConfig>
  );
}
