// ── Childhood — "before I knew you ♡" ─────────────────────────────
// Careful wording: I wasn't there. No shared memories are implied.

import { motion } from 'framer-motion';
import { CHILDHOOD_LINES, CHILDHOOD_PHOTOS } from '../data/content';
import { FocalImg, Kicker, Reveal } from './ui';

export function ChildhoodSection() {
  return (
    <section id="childhood" className="childhood theme-soft">
      <div className="section-pad childhood-inner">
        <Reveal>
          <Kicker>little her</Kicker>
          <h2 className="section-title">
            before I knew you <span className="title-heart">♡</span>
          </h2>
        </Reveal>

        <div className="childhood-photos">
          {CHILDHOOD_PHOTOS.map((p, i) => (
            <motion.figure
              key={p.id}
              className={`childhood-photo ${i === 1 ? 'tilt-r' : 'tilt-l'}`}
              initial={{ opacity: 0, y: 32, rotate: i === 1 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 2 : -2 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <span className="tape" aria-hidden="true" />
              <div className="childhood-imgwrap" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                <FocalImg photo={p} className="childhood-img" />
              </div>
              <figcaption>{p.caption}</figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="childhood-lines">
          {CHILDHOOD_LINES.map((line, i) => (
            <motion.p
              key={i}
              className="childhood-line"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
