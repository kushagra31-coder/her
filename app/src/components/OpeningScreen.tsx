// ── Opening screen ──────────────────────────────────────────────
// The FIRST thing the click handler does is call audio.play() directly on
// the shared element. If the browser blocks it, we visibly fall back to
// "tap to play ♡" — which calls play() again from its own click.

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMusic } from '../audio/music';
import { FloatingHearts } from './Particles';

interface OpeningScreenProps {
  onOpen: () => void;
}

export function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const { start, state } = useMusic();
  const [leaving, setLeaving] = useState(false);

  const enter = () => {
    // Small beat so the heart tap lands, then the world opens.
    setLeaving(true);
    window.setTimeout(onOpen, 650);
  };

  // The gesture: play() is invoked synchronously inside the click.
  const handleOpen = async () => {
    const ok = await start();
    if (ok || state.hasError) {
      enter();
    }
    // If blocked and not an error, `awaitingGesture` is now true and the
    // "tap to play ♡" button appears below.
  };

  const handleTapToPlay = async () => {
    const ok = await start();
    if (ok) enter();
  };

  const handleComeInAnyway = () => enter();

  return (
    <motion.div
      className="opening-screen"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingHearts count={26} />
      <div className="opening-vignette" />

      <motion.div
        className="opening-inner"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <motion.div
          className="opening-heart"
          animate={leaving ? { scale: [1, 1.35, 1.6], opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
          transition={leaving ? { duration: 0.65 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♡
        </motion.div>

        <p className="opening-kicker">a little world, made of noticed things</p>
        <h1 className="opening-title">
          some people arrive quietly.
          <br />
          <span className="opening-title-accent">and somehow become impossible to ignore.</span>
        </h1>

        <AnimatePresence mode="wait">
          {state.hasError ? (
            <motion.div
              key="error"
              className="opening-fallback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="opening-error">the song is hiding ♡</p>
              <p className="opening-error-sub">drop the music file into /public/audio/our-song.mp3</p>
              <button className="opening-cta" onClick={handleComeInAnyway}>
                come in anyway ♡
              </button>
            </motion.div>
          ) : state.awaitingGesture ? (
            <motion.div
              key="tap"
              className="opening-fallback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="opening-blocked-note">your browser paused the music — one more tap:</p>
              <button className="opening-cta" onClick={handleTapToPlay}>
                tap to play ♡
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="cta"
              className="opening-cta"
              onClick={handleOpen}
              disabled={leaving}
              exit={{ opacity: 0, y: -8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              open this little world ♡
            </motion.button>
          )}
        </AnimatePresence>

        <p className="opening-hint">sound on, if you can ♡</p>
      </motion.div>
    </motion.div>
  );
}
