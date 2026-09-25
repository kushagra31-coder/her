import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONTENT } from '../data/content';
import { FloatingHearts } from './Particles';

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #fdf6ee 0%, #f5eadb 40%, #edddd4 70%, #e8d0c4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="noise"
      aria-label="Hero section"
    >
      <FloatingHearts count={6} />

      {/* Soft vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(139,38,53,0.06) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 4}deg)`,
            transition: 'transform 0.3s ease-out',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {/* Glow halo */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: -20,
              borderRadius: 32,
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.2) 0%, transparent 70%)',
              animation: 'pulse-soft 4s ease-in-out infinite',
            }}
          />

          <div
            className="glow-frame film-grain"
            style={{
              borderRadius: 28,
              overflow: 'hidden',
              width: 'clamp(260px, 35vw, 400px)',
              aspectRatio: '3/4',
              position: 'relative',
            }}
          >
            <img
              src="/assets/photos/photo_02.jpg"
              alt="Portrait in white and red sari, looking sideways in a garden"
              loading="eager"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: `scale(1.04) translate(${mousePos.x * -8}px, ${mousePos.y * -6}px)`,
                transition: 'transform 0.4s ease-out',
                display: 'block',
              }}
            />
            {/* Soft overlay */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 60%, rgba(139,38,53,0.08) 100%)',
              }}
            />
          </div>

          {/* Floating hearts around image */}
          {[
            { top: '10%', right: '-20px', delay: 0 },
            { bottom: '20%', left: '-18px', delay: 1.2 },
            { top: '50%', right: '-15px', delay: 2 },
          ].map((pos, i) => (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                color: '#d9806a',
                fontSize: i === 0 ? 18 : 14,
                opacity: 0.6,
                ...pos,
              } as React.CSSProperties}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3 + i, delay: pos.delay, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              ♡
            </motion.span>
          ))}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ maxWidth: 480, flex: 1, minWidth: 260 }}
        >
          {/* Accent line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ height: 1.5, width: 40, background: 'var(--gold)', opacity: 0.6 }} />
            <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: 16, color: 'var(--gold)', opacity: 0.8 }}>
              a memory collection
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(30px, 5vw, 52px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.25,
              color: 'var(--text-main)',
              marginBottom: 20,
              letterSpacing: '-0.01em',
            }}
          >
            {SITE_CONTENT.heroTitle}
          </h1>

          <p
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--rose)',
              marginBottom: 32,
              opacity: 0.9,
            }}
          >
            {SITE_CONTENT.heroSubtitle}
          </p>

          {/* Decorative tags */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['the sari days', 'tiny moments', 'just her ♡'].map(tag => (
              <span
                key={tag}
                style={{
                  padding: '6px 16px',
                  borderRadius: 50,
                  background: 'rgba(139,38,53,0.07)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  fontSize: 13,
                  color: 'var(--text-soft)',
                  fontFamily: 'DM Sans, sans-serif',
                  letterSpacing: '0.03em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
