// ── "why you? ♡" — scattered sticker cards, cute edition ─────────
// Hand-tossed tilts, springy entrances, hover wiggles, drifting hearts.

import { motion } from 'framer-motion';
import { WHY_YOU } from '../data/content';
import { Kicker, Reveal } from './ui';

// slight tilts, like stickers dropped on a table
const TILTS = [-1.8, 1.3, -1.0, 1.6, -1.2, 1.0];
const FLOAT_HEARTS = [0, 1, 2, 3, 4, 5, 6];

export function WhyYouSection() {
  return (
    <section id="why-you" className="whyyou theme-cinematic-deep">
      <div className="whyyou-float" aria-hidden="true">
        {FLOAT_HEARTS.map((i) => (
          <span
            key={i}
            className="whyyou-float-heart"
            style={{
              left: `${4 + i * 14}%`,
              animationDuration: `${10 + i * 2.4}s`,
              animationDelay: `${-i * 3.1}s`,
              fontSize: `${13 + (i % 3) * 7}px`,
            }}
          >
            ♡
          </span>
        ))}
      </div>

      <div className="section-pad">
        <Reveal>
          <Kicker dark>part one</Kicker>
          <h2 className="section-title">
            why you? <span className="title-heart whyyou-heart-beat">♡</span>
          </h2>
          <svg className="whyyou-doodle" viewBox="0 0 220 22" aria-hidden="true">
            <path
              d="M5 13 C 45 5, 75 19, 110 11 S 180 7, 215 13"
              fill="none"
              stroke="#ff6f9f"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>
          <p className="section-sub">fair question. here's my honest answer.</p>
        </Reveal>

        <div className="whyyou-grid">
          {WHY_YOU.map((card, i) => (
            <motion.article
              key={card.title}
              className="whyyou-card"
              style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
              initial={{ opacity: 0, y: 44, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 170, damping: 14, delay: (i % 3) * 0.1 }}
              whileHover={{ scale: 1.045, rotate: 0, y: -6, transition: { type: 'spring', stiffness: 320, damping: 13 } }}
            >
              <span className="whyyou-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="whyyou-sticker-heart" aria-hidden="true">♡</span>
            </motion.article>
          ))}
        </div>

        <Reveal className="whyyou-close">
          <p className="whyyou-yeah">
            <span className="whyyou-yeah-sticker">Yeah.</span>
          </p>
          <p className="whyyou-problem">
            That's probably the problem. <span className="title-heart">♡</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
