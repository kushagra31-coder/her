import { motion } from 'framer-motion';
import { PHOTOS } from '../data/content';

export function ChildhoodSection() {
  const photos = PHOTOS.filter(p => p.chapter === 'childhood');

  return (
    <section
      id="childhood"
      style={{
        background: 'linear-gradient(160deg, #f9f1e4 0%, #fdf6ee 50%, #f5eadb 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="childhood-heading"
    >
      {/* Scrapbook tape pieces */}
      {[
        { top: '8%', left: '5%', rotate: -30 },
        { top: '8%', right: '5%', rotate: 20 },
        { bottom: '10%', left: '8%', rotate: 15 },
        { bottom: '10%', right: '6%', rotate: -25 },
      ].map((pos, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            width: 60,
            height: 20,
            background: 'rgba(201,168,76,0.25)',
            borderRadius: 3,
            transform: `rotate(${pos.rotate}deg)`,
            ...Object.fromEntries(Object.entries(pos).filter(([k]) => ['top','bottom','left','right'].includes(k))),
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Doodle stars */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            fontSize: `${8 + Math.random() * 10}px`,
            color: i % 2 === 0 ? 'var(--gold)' : 'var(--rose)',
            opacity: 0.15 + Math.random() * 0.2,
            pointerEvents: 'none',
          }}
        >
          {['★', '✿', '♡', '·'][i % 4]}
        </span>
      ))}

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 16,
            color: 'var(--gold)',
            opacity: 0.8,
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: 8,
          }}>
            ✦ once upon a time ✦
          </span>
          <h2
            id="childhood-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(26px, 5vw, 40px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-main)',
              marginBottom: 12,
            }}
          >
            before all the memories ♡
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            color: 'var(--text-light)',
            fontSize: 15,
          }}>
            the beginning of someone extraordinary
          </p>
        </motion.div>

        {/* Photos layout */}
        <div style={{
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, rotate: photo.rotation ?? 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              style={{
                position: 'relative',
                rotate: photo.rotation ?? 0,
              }}
            >
              {/* Scrapbook card */}
              <div
                className="paper"
                style={{
                  padding: '16px 16px 48px',
                  width: 'clamp(220px, 30vw, 280px)',
                  position: 'relative',
                }}
              >
                {/* Tape strip on top */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-2deg)',
                    width: 64,
                    height: 22,
                    background: 'rgba(201,168,76,0.35)',
                    borderRadius: 4,
                  }}
                />

                {/* Faded edges effect */}
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 8,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    style={{
                      width: '100%',
                      display: 'block',
                      filter: 'sepia(15%) contrast(0.95) brightness(1.02)',
                    }}
                  />
                  {/* Vignette */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse, transparent 50%, rgba(245,234,219,0.4) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Caption */}
                <p
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 15,
                    color: 'var(--text-soft)',
                  }}
                >
                  {photo.caption}
                </p>

                {/* Corner star */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 10,
                    color: 'var(--gold)',
                    opacity: 0.4,
                    fontSize: 12,
                  }}
                >
                  ★
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: 48,
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--text-light)',
          }}
        >
          she always had that look in her eyes. like she knew something you didn't. ♡
        </motion.p>
      </div>
    </section>
  );
}
