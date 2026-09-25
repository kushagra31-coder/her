// ── Hidden confession ─────────────────────────────────────────────
// Dark burgundy. One button. The screen darkens, hearts drift up slowly,
// the lines appear one by one.

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONFESSION_LINES } from '../data/content';
import { Reveal } from './ui';

const DRIFT_HEARTS = [0, 1, 2, 3, 4, 5, 6, 7];

export function ConfessionSection() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="confession" className="confession theme-burgundy">
      <div className="section-pad confession-inner">
        {!revealed ? (
          <Reveal className="confession-gate">
            <p className="confession-kicker">psst.</p>
            <button className="confession-btn" onClick={() => setRevealed(true)}>
              there's something I probably shouldn't say <span className="title-heart">♡</span>
            </button>
            <p className="confession-hint">(tap it. you know you want to.)</p>
          </Reveal>
        ) : (
          <div className="confession-reveal">
            <AnimatePresence>
              <motion.div
                key="darken"
                className="confession-darken"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
              />
            </AnimatePresence>

            <div className="confession-hearts" aria-hidden="true">
              {DRIFT_HEARTS.map((i) => (
                <motion.span
                  key={i}
                  className="confession-heart"
                  initial={{ y: '20vh', opacity: 0 }}
                  animate={{ y: '-70vh', opacity: [0, 0.7, 0.7, 0] }}
                  transition={{
                    duration: 9 + (i % 4) * 2,
                    repeat: Infinity,
                    delay: i * 1.3,
                    ease: 'easeInOut',
                  }}
                  style={{ left: `${8 + i * 11}%`, fontSize: `${14 + (i % 3) * 8}px` }}
                >
                  ♡
                </motion.span>
              ))}
            </div>

            <div className="confession-lines">
              {CONFESSION_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  className={`confession-line ${i === 0 ? 'confession-line-first' : ''}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8 + i * 1.1 }}
                >
                  {line}
                </motion.p>
              ))}
              <motion.p
                className="confession-line confession-line-last"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 + CONFESSION_LINES.length * 1.1 }}
              >
                for now. ♡
              </motion.p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
