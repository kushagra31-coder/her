import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONTENT } from '../data/content';
import { FloatingHearts } from './Particles';

interface OpeningScreenProps {
  onOpen: () => void;
}

export function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('opening');

    // Spawn heart burst
    const burst = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
    }));
    setHearts(burst);

    setTimeout(() => setPhase('done'), 1600);
    setTimeout(() => onOpen(), 1800);
  }, [phase, onOpen]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleOpen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleOpen]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(160deg, #1a0f0a 0%, #3d1f14 30%, #5c2a1a 60%, #8b2635 100%)',
            overflow: 'hidden',
          }}
          className="noise"
        >
          <FloatingHearts count={12} />

          {/* Stars/sparkles bg */}
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${6 + Math.random() * 8}px`,
                color: i % 3 === 0 ? '#c9a84c' : 'rgba(255,255,255,0.3)',
                animation: `sparkle ${2 + Math.random() * 3}s ${Math.random() * 3}s infinite`,
              }}
            >
              {['✦', '·', '✿'][i % 3]}
            </span>
          ))}

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            style={{ textAlign: 'center', maxWidth: 520, padding: '0 24px', zIndex: 2 }}
          >
            {/* Heart icon */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontSize: 40, marginBottom: 24, color: '#d9806a' }}
              aria-hidden
            >
              ♡
            </motion.div>

            <p
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(18px, 4vw, 26px)',
                fontStyle: 'italic',
                color: 'rgba(253,246,238,0.92)',
                lineHeight: 1.5,
                marginBottom: 16,
                letterSpacing: '0.02em',
              }}
            >
              {SITE_CONTENT.openingLine}
            </p>

            <p
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 'clamp(14px, 3vw, 18px)',
                color: 'rgba(201,168,76,0.85)',
                marginBottom: 48,
                letterSpacing: '0.05em',
              }}
            >
              {SITE_CONTENT.openingSubtitle}
            </p>

            {/* Envelope button */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <button
                id="open-envelope-btn"
                onClick={handleOpen}
                disabled={phase !== 'idle'}
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(217,128,106,0.15))',
                  border: '1.5px solid rgba(201,168,76,0.5)',
                  borderRadius: 50,
                  padding: '14px 40px',
                  color: '#fdf6ee',
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: 20,
                  cursor: phase === 'idle' ? 'pointer' : 'default',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.03em',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 30px rgba(201,168,76,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                aria-label="Open this gift"
              >
                {/* Shimmer */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2.5s infinite',
                  }}
                />
                <span style={{ position: 'relative' }}>
                  {phase === 'opening' ? '✨ opening...' : SITE_CONTENT.openingCTA}
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Heart burst on click */}
          <AnimatePresence>
            {phase === 'opening' && hearts.map(h => (
              <motion.span
                key={h.id}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 0.3,
                  x: (Math.random() - 0.5) * 300,
                  y: -(100 + Math.random() * 200),
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  left: '50%',
                  top: '55%',
                  color: ['#d9806a', '#c9a84c', '#f0dcd4'][h.id % 3],
                  fontSize: `${14 + Math.random() * 12}px`,
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
                aria-hidden
              >
                ♡
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
