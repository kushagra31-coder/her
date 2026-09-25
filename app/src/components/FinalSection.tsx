import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FinalSection() {
  const [step, setStep] = useState(0);

  const lines = [
    "I hope you know how beautiful you are.",
    "Not just in photographs.",
    "Not just because you have a pretty smile.",
    "There's something about the way your mind works,\nthe way you carry yourself,\nand the way you somehow feel familiar\nthat makes you stand out."
  ];

  return (
    <section 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-dark)',
        color: 'var(--cream)',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: 600, width: '100%' }}>
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 24, marginBottom: 40, color: 'var(--rose)' }}>
              before you leave...
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                background: 'transparent',
                border: '1px solid var(--cream)',
                color: 'var(--cream)',
                padding: '12px 24px',
                borderRadius: 30,
                fontFamily: 'DM Sans',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--cream)';
                e.currentTarget.style.color = 'var(--bg-dark)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--cream)';
              }}
            >
              continue
            </button>
          </motion.div>
        )}

        {step > 0 && step <= lines.length && (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: 'clamp(24px, 4vw, 32px)', 
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {lines[step - 1]}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {step > 0 && step <= lines.length && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setStep(s => s + 1)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--rose)',
              fontFamily: 'DM Sans',
              fontSize: 14,
              cursor: 'pointer',
              marginTop: 40,
              opacity: 0.7
            }}
          >
            next →
          </motion.button>
        )}

        {step > lines.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ marginTop: 60 }}
          >
            <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 28, color: 'var(--rose)' }}>
              and maybe... I like that more than I should ♡
            </p>
            <div style={{ marginTop: 80, fontSize: 12, fontFamily: 'DM Sans', color: 'rgba(253, 246, 238, 0.4)' }}>
              made with too many memories ♡
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
