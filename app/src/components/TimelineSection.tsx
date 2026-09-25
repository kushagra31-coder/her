import { motion } from 'framer-motion';
import { TIMELINE, SITE_CONTENT } from '../data/content';

export function TimelineSection() {
  return (
    <section
      id="timeline"
      style={{
        background: 'linear-gradient(160deg, #fdf6ee 0%, #f9f1e4 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="noise"
      aria-labelledby="timeline-heading"
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: 16, color: 'var(--gold)', opacity: 0.8, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            ✦ her story ✦
          </span>
          <h2
            id="timeline-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-main)',
            }}
          >
            {SITE_CONTENT.timelineTitle}
          </h2>
        </motion.div>

        {/* Timeline items */}
        <div style={{ position: 'relative' }}>
          {/* Central line */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 1.5,
              background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent)',
              transform: 'translateX(-50%)',
              zIndex: 0,
            }}
          />

          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1, duration: 0.7 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-end' : 'flex-start',
                  paddingRight: isLeft ? '52%' : 0,
                  paddingLeft: isLeft ? 0 : '52%',
                  marginBottom: 48,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Heart connector */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 16,
                    color: item.color,
                    background: 'var(--cream)',
                    padding: '4px 6px',
                    lineHeight: 1,
                    borderRadius: '50%',
                    border: `1.5px solid ${item.color}40`,
                    zIndex: 2,
                  }}
                >
                  ♡
                </div>

                {/* Card */}
                <div
                  className="paper"
                  style={{
                    maxWidth: 340,
                    display: 'flex',
                    flexDirection: isLeft ? 'row-reverse' : 'row',
                    gap: 16,
                    padding: '16px',
                    alignItems: 'center',
                  }}
                >
                  {/* Photo */}
                  <div style={{
                    width: 72,
                    height: 90,
                    borderRadius: 10,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: `2px solid ${item.color}30`,
                  }}>
                    <img
                      src={item.photo}
                      alt={item.alt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: 18,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        color: 'var(--text-main)',
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 13,
                        color: 'var(--text-light)',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
