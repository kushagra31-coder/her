// ── Final scene — the connected ending ────────────────────────────
// Deep burgundy/black, slow particles, one portrait, opening-style
// heart/glow/accent typography. Hold the heart for 2s: one last secret.

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FINAL_LINES, PHOTOS } from '../data/content';
import { sendEggToast } from '../audio/music';
import { FloatingHearts } from './Particles';
import { FocalImg } from './ui';

const PORTRAIT = PHOTOS[11]; // photo_12 — the intense gaze

export function FinalSection() {
  const [holding, setHolding] = useState(false);
  const holdTimer = useRef<number | null>(null);

  const beginHold = () => {
    setHolding(true);
    holdTimer.current = window.setTimeout(() => {
      setHolding(false);
      sendEggToast(['fine.', 'one last compliment.', "you're ridiculously cute."]);
    }, 2000);
  };

  const cancelHold = () => {
    setHolding(false);
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const backToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="final" className="final theme-final">
      <FloatingHearts count={30} />
      <div className="final-vignette" aria-hidden="true" />

      <div className="section-pad final-inner">
        {/* opening-style heart — hold it */}
        <motion.button
          className={`final-heart ${holding ? 'charging' : ''}`}
          onPointerDown={beginHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onContextMenu={(e) => e.preventDefault()}
          animate={
            holding
              ? { scale: 1.45 }
              : { scale: [1, 1.07, 1] }
          }
          transition={
            holding
              ? { duration: 2, ease: 'linear' }
              : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
          }
          aria-label="hold this heart for a secret"
          title="hold me ♡"
        >
          ♡
        </motion.button>
        <p className="final-hold-hint">(psst — hold the heart)</p>

        <motion.figure
          className="final-portrait"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="final-glow" aria-hidden="true" />
          <FocalImg photo={PORTRAIT} className="final-img" alt="her — the look that started all this" />
        </motion.figure>

        <div className="final-lines">
          {FINAL_LINES.map((line, i) => (
            <motion.p
              key={i}
              className="final-line"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            className="final-line"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            and maybe that's my favorite thing about you.
          </motion.p>

          <motion.p
            className="final-keep"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            keep being you, okay? <span className="title-heart">♡</span>
          </motion.p>

          <motion.p
            className="final-sign"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            — from someone who may be a little too fond of you
          </motion.p>
        </div>

        <motion.button
          className="final-more"
          onClick={backToTop}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          there's more to discover ♡
        </motion.button>
      </div>
    </section>
  );
}
