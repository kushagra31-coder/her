import { useState, useCallback } from 'react';
import './index.css';

import { OpeningScreen } from './components/OpeningScreen';
import { HeroSection } from './components/HeroSection';
import { LetterSection } from './components/LetterSection';
import { GallerySection } from './components/GallerySection';
import { ChildhoodSection } from './components/ChildhoodSection';
import { CinemaSection } from './components/CinemaSection';
import { TimelineSection } from './components/TimelineSection';
import { WishSection } from './components/WishSection';
import { FinalSection } from './components/FinalSection';
import { MusicPlayer } from './components/MusicPlayer';
import { HeartCursorTrail } from './components/Particles';

// New Sections
import { 
  TraitsSection, DiagramSection, SmartSection, ProfileSection, 
  EffectSection, SecretConfession, ComplimentMachine, 
  InfiniteScrollSection, FutureSection, SecretEnvelope 
} from './components/NewSections';

export default function App() {
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
    document.documentElement.style.overflow = '';
  }, []);

  return (
    <>
      <HeartCursorTrail />
      <OpeningScreen onOpen={handleOpen} />

      {opened && (
        <main id="main-content" aria-label="Memory website for her">
          <HeroSection />
          <LetterSection />
          <TraitsSection />
          
          <GallerySection />
          
          <SmartSection />
          <ProfileSection />
          
          <ChildhoodSection />
          <DiagramSection />
          
          <EffectSection />
          <CinemaSection />
          
          <InfiniteScrollSection />
          <TimelineSection />
          
          <SecretConfession />
          <ComplimentMachine />
          <SecretEnvelope />
          
          <WishSection />
          <FutureSection />
          
          <FinalSection />
        </main>
      )}

      <MusicPlayer />
    </>
  );
}
