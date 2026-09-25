import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONTENT } from '../data/content';
import { ConfettiBurst } from './Particles';

export function WishSection() {
  const [wished, setWished] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleWish = () => {
    if (wished) return;
    setWished(true);
    setShowMessage(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  // Stars float on wish
  const stars = wished ? Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${20 + Math.random() * 60}%`,
    delay: Math.random() * 1,
    char: ['✦', '★', '♡', '✿', '·'][i % 5],
    color: ['#c9a84c', '#d9806a', '#8b2635', '#f0dcd4'][i % 4],
  })) : [];

  return (
    <section
      id="wish"
      style={{
        background: 'linear-gradient(160deg, #f9f1e4 0%, #fdf6ee 50%, #f0dcd4 100%)',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
      className="noise"
    >
      {/* Darkening overlay on wish */}
      <AnimatePresence>
        {wished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(26,15,10,0.15)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating stars on wish */}
      <AnimatePresence>
        {wished && stars.map(s => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: -200, scale: [0, 1, 0.5] }}
            transition={{ delay: s.delay, duration: 2 }}
            style={{
              position: 'absolute',
              left: s.left,
              bottom: '30%',
              fontSize: 18,
              color: s.color,
              pointerEvents: 'none',
              zIndex: 2,
            }}
            aria-hidden
          >
            {s.char}
          </motion.span>
        ))}
      </AnimatePresence>

      <ConfettiBurst active={confetti} />

      <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 40 }}
        >
          <span style={{ fontFamily: 'Dancing Script', fontSize: 16, color: 'var(--gold)', opacity: 0.8, letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>
            ✦ almost at the end ✦
          </span>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(26px, 4.5vw, 40px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-main)',
            }}
          >
            close your eyes for a moment ♡
          </h2>
        </motion.div>

        {/* Wish button */}
        <motion.div
          whileHover={{ scale: wished ? 1 : 1.04 }}
          whileTap={{ scale: wished ? 1 : 0.97 }}
        >
          <button
            id="wish-btn"
            onClick={handleWish}
            disabled={wished}
            style={{
              background: wished
                ? 'linear-gradient(135deg, var(--burgundy), var(--rose))'
                : 'linear-gradient(135deg, var(--cream), var(--ivory))',
              border: `1.5px solid ${wished ? 'transparent' : 'rgba(201,168,76,0.4)'}`,
              borderRadius: 50,
              padding: '16px 48px',
              fontFamily: 'Dancing Script, cursive',
              fontSize: 22,
              color: wished ? 'white' : 'var(--burgundy)',
              cursor: wished ? 'default' : 'pointer',
              boxShadow: wished
                ? '0 8px 32px rgba(139,38,53,0.3)'
                : '0 4px 20px rgba(139,38,53,0.1)',
              transition: 'all 0.4s ease',
              letterSpacing: '0.03em',
            }}
            aria-label={wished ? 'Wish made' : 'Make a wish'}
          >
            {wished ? '✦ wish made ♡' : SITE_CONTENT.wishButton}
          </button>
        </motion.div>

        {/* Wish message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              style={{ marginTop: 48 }}
            >
              <div
                className="paper"
                style={{
                  padding: 'clamp(28px, 4vw, 48px)',
                  maxWidth: 500,
                  margin: '0 auto',
                }}
              >
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(18px, 3vw, 24px)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--burgundy)',
                    lineHeight: 1.7,
                    marginBottom: 24,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {SITE_CONTENT.wishMessage}
                </motion.p>

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    fontSize: 36,
                    color: 'var(--rose)',
                  }}
                  aria-hidden
                >
                  ♡
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
