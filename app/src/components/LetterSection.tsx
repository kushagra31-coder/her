import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE_CONTENT } from '../data/content';
import { PetalDivider } from './Particles';

export function LetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="letter"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #f5eadb 0%, #fdf6ee 50%, #f0dcd4 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="noise"
      aria-labelledby="letter-heading"
    >
      {/* Background decorative elements */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          fontSize: 80,
          opacity: 0.04,
          color: 'var(--burgundy)',
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        ♡
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          fontSize: 60,
          opacity: 0.04,
          color: 'var(--gold)',
          fontFamily: 'Cormorant Garamond, serif',
          pointerEvents: 'none',
        }}
      >
        ✿
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 16,
              color: 'var(--gold)',
              opacity: 0.8,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            ✦ for you ✦
          </span>
          <h2
            id="letter-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-main)',
              letterSpacing: '-0.01em',
            }}
          >
            {SITE_CONTENT.letterTitle}
          </h2>
        </motion.div>

        <PetalDivider />

        {/* Paper card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
          className="paper"
          style={{
            padding: 'clamp(32px, 5vw, 56px)',
            position: 'relative',
          }}
        >
          {/* Paper texture lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${120 + i * 36}px`,
                height: 1,
                background: 'rgba(139,38,53,0.04)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(20px, 3.5vw, 28px)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'var(--burgundy)',
              marginBottom: 32,
              paddingLeft: 24,
              borderLeft: '2.5px solid rgba(201,168,76,0.4)',
              whiteSpace: 'pre-line',
            }}
          >
            {SITE_CONTENT.letterQuote}
          </blockquote>

          {/* Divider */}
          <div
            aria-hidden
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 28,
              color: 'var(--gold)',
              opacity: 0.5,
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--gold)', opacity: 0.3 }} />
            <span>♡</span>
            <div style={{ flex: 1, height: 1, background: 'var(--gold)', opacity: 0.3 }} />
          </div>

          {/* Body */}
          {SITE_CONTENT.letterBody.split('\n\n').map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(15px, 2vw, 17px)',
                lineHeight: 1.85,
                color: 'var(--text-soft)',
                marginBottom: i < 2 ? 20 : 0,
                fontWeight: 300,
              }}
            >
              {para}
            </p>
          ))}

          {/* Signature */}
          <div
            style={{
              marginTop: 36,
              textAlign: 'right',
              fontFamily: 'Dancing Script, cursive',
              fontSize: 22,
              color: 'var(--rose)',
              opacity: 0.85,
            }}
          >
            {SITE_CONTENT.letterSignature}
          </div>

          {/* Corner doodles */}
          {['top-left', 'top-right', 'bottom-right'].map((corner) => {
            const [v, h] = corner.split('-');
            return (
              <span
                key={corner}
                aria-hidden
                style={{
                  position: 'absolute',
                  [v]: 16,
                  [h]: 20,
                  fontSize: 16,
                  opacity: 0.2,
                  color: 'var(--gold)',
                }}
              >
                {v === 'top' && h === 'left' ? '✿' : h === 'right' && v === 'top' ? '♡' : '✦'}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
