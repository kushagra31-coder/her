// ── "why you? ♡" — cinematic cards ───────────────────────────────

import { motion } from 'framer-motion';
import { WHY_YOU } from '../data/content';
import { Kicker, Reveal } from './ui';

export function WhyYouSection() {
  return (
    <section id="why-you" className="whyyou theme-cinematic-deep">
      <div className="section-pad">
        <Reveal>
          <Kicker dark>part one</Kicker>
          <h2 className="section-title">
            why you? <span className="title-heart">♡</span>
          </h2>
          <p className="section-sub">fair question. here's my honest answer.</p>
        </Reveal>

        <div className="whyyou-grid">
          {WHY_YOU.map((card, i) => (
            <motion.article
              key={card.title}
              className="whyyou-card"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <span className="whyyou-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.article>
          ))}
        </div>

        <Reveal className="whyyou-close">
          <p className="whyyou-yeah">Yeah.</p>
          <p className="whyyou-problem">
            That's probably the problem. <span className="title-heart">♡</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
