// ── Hero — cinematic portrait ─────────────────────────────────────
// Blurred duplicate backdrop, glowing foreground portrait, no text over
// the face, subtle parallax, decorative hearts kept to the margins.

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PHOTOS } from '../data/content';
import { FocalImg, Reveal } from './ui';
import { FloatingLilyPetals } from './Particles';

const HERO = PHOTOS[1]; // photo_02 — the calm direct gaze

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="hero" className="hero theme-cinematic" ref={ref}>
      {/* blurred duplicate backdrop */}
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
        <img src={HERO.src} alt="" loading="eager" fetchPriority="high" draggable={false} />
        <div className="hero-bg-veil" />
      </motion.div>
      <FloatingLilyPetals count={8} />

      {/* decorative hearts — margins only, never over her face */}
      <div className="hero-hearts" aria-hidden="true">
        {['♡', '♡', '♡', '♡', '♡'].map((h, i) => (
          <motion.span
            key={i}
            className={`hero-heart h${i + 1}`}
            animate={{ y: [0, -14, 0], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          >
            {h}
          </motion.span>
        ))}
      </div>

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        <motion.figure className="hero-portrait" style={{ y: fgY }}>
          <div className="hero-glow" aria-hidden="true" />
          <FocalImg photo={HERO} eager className="hero-img" alt="her — the calm direct gaze" />
          <figcaption className="hero-caption">the camera has favorites. obviously.</figcaption>
        </motion.figure>

        <div className="hero-text">
          <Reveal>
            <h1 className="hero-title">
              some people arrive quietly.
              <br />
              <span className="hero-title-accent">and somehow become impossible to ignore. ♡</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="hero-sub">
              I don't know exactly what it is about you.
              <br />I just know there's something.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="hero-core">I didn't need years of history to notice that you're different.</p>
          </Reveal>
        </div>

        <motion.a
          href="#why-you"
          className="hero-scroll"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="scroll down"
        >
          <span>keep scrolling</span>↓
        </motion.a>
      </motion.div>
    </section>
  );
}
