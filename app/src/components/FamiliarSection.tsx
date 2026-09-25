// ── "strangely familiar" — dreamlike, no cards, no grid ───────────

import { motion } from 'framer-motion';
import { FAMILIAR_LINES } from '../data/content';

export function FamiliarSection() {
  return (
    <section id="familiar" className="familiar theme-dream">
      <div className="familiar-mist" aria-hidden="true" />
      <div className="section-pad familiar-inner">
        <motion.p
          className="familiar-kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          strangely familiar ♡
        </motion.p>

        <div className="familiar-lines">
          {FAMILIAR_LINES.map((line, i) => (
            <motion.p
              key={i}
              className={`familiar-line ${i === 2 ? 'familiar-line-em' : ''}`}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: i * 0.08 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          className="familiar-close"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2 }}
        >
          I just know I like how easy it feels.
        </motion.p>
      </div>
    </section>
  );
}
