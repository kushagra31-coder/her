// ── The letter — a physical envelope ──────────────────────────────
// "for you." on the front. Click: the flap opens, the paper slides out,
// the letter unfolds with handwritten underlines.

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LETTER_LINES } from '../data/content';
import { Kicker, Reveal } from './ui';

/** Hand-drawn underline that draws itself when scrolled into view. */
function Underline({ children }: { children: string }) {
  return (
    <span className="hand-ul">
      {children}
      <svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M4 8 C 30 4, 60 10, 116 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
        />
      </svg>
    </span>
  );
}

/** Renders letter lines, underlining the phrases that matter most. */
function LetterText() {
  return (
    <>
      {LETTER_LINES.map((line, i) =>
        line === '' ? (
          <span key={i} className="letter-break" />
        ) : (
          <motion.p
            key={i}
            className="letter-line"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.6) }}
          >
            {line.includes('noticeable') ? (
              <>
                I don't think you realize how <Underline>noticeable</Underline> you are.
              </>
            ) : line.includes('absolutely notice') ? (
              <>
                I <Underline>absolutely notice</Underline> when you're being cute.
              </>
            ) : (
              line
            )}
          </motion.p>
        ),
      )}
    </>
  );
}

type EnvState = 'closed' | 'opening' | 'open';

export function LetterSection() {
  const [env, setEnv] = useState<EnvState>('closed');

  const openEnvelope = () => {
    if (env !== 'closed') return;
    setEnv('opening');
    window.setTimeout(() => setEnv('open'), 1400);
  };

  return (
    <section id="letter" className="letter theme-cream">
      <div className="section-pad">
        <Reveal>
          <Kicker>a letter</Kicker>
          <h2 className="section-title">
            something I wrote <span className="title-heart">♡</span>
          </h2>
          <p className="section-sub">go on. it's addressed to you.</p>
        </Reveal>

        <div className="envelope-stage">
          <AnimatePresence mode="wait">
            {env !== 'open' ? (
              <motion.button
                key="envelope"
                className="envelope"
                onClick={openEnvelope}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="open the envelope"
              >
                {/* flap */}
                <motion.span
                  className="env-flap"
                  animate={env === 'opening' ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
                {/* paper peeking / sliding out */}
                <motion.span
                  className="env-paper"
                  animate={env === 'opening' ? { y: '-58%' } : { y: '-8%' }}
                  transition={{ duration: 0.9, delay: 0.45, ease: 'easeInOut' }}
                >
                  <span className="env-paper-lines" />
                </motion.span>
                <span className="env-body">
                  <span className="env-for">for you.</span>
                  <span className="env-seal">♡</span>
                </span>
              </motion.button>
            ) : (
              <motion.article
                key="paper"
                className="letter-paper"
                initial={{ opacity: 0, y: 60, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <span className="tape tape-tl" aria-hidden="true" />
                <span className="tape tape-tr" aria-hidden="true" />
                <LetterText />
                <p className="letter-sign">— someone who notices</p>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
