// ── cinematic mind section ────────────────────────────────────────
// A dark, slowly revealed portrait next to staged lines about her mind.

import { motion } from 'framer-motion';
import { PHOTOS } from '../data/content';
import { FocalImg } from './ui';

const PORTRAIT = PHOTOS[10]; // photo_11

const LINES: { text: string; big?: boolean }[] = [
  { text: "you're beautiful." },
  { text: "that's obvious." },
  { text: 'but honestly...' },
  { text: 'your mind is what makes you interesting.', big: true },
  { text: "I like that you're not just someone I can look at." },
  { text: "You're someone I actually want to understand." },
];

export function MindSection() {
  return (
    <section id="mind" className="mind theme-cinematic">
      <div className="section-pad mind-inner">
        <motion.figure
          className="mind-portrait"
          initial={{ opacity: 0, clipPath: 'inset(12% 8% 12% 8% round 24px)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          <FocalImg photo={PORTRAIT} className="mind-img" alt="her portrait, slowly revealed" />
          <div className="mind-frame-glow" aria-hidden="true" />
        </motion.figure>

        <div className="mind-text">
          {LINES.map((l, i) => (
            <motion.p
              key={i}
              className={l.big ? 'mind-line mind-line-big' : 'mind-line'}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              {l.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
