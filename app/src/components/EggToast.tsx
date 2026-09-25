// ── Easter-egg toast ──────────────────────────────────────────────
// Listens for `her:egg` events (dispatched by sendEggToast) and shows the
// lines as a small floating note. Queues multiple finds politely.

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function EggToast() {
  const [lines, setLines] = useState<string[] | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onEgg = (e: Event) => {
      const detail = (e as CustomEvent<string[]>).detail;
      if (!detail || detail.length === 0) return;
      if (timer.current) window.clearTimeout(timer.current);
      setLines(detail);
      timer.current = window.setTimeout(() => {
        setLines(null);
        timer.current = null;
      }, 2600 + detail.length * 900);
    };
    window.addEventListener('her:egg', onEgg);
    return () => {
      window.removeEventListener('her:egg', onEgg);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="egg-toast-wrap" aria-live="polite">
      <AnimatePresence>
        {lines && (
          <motion.div
            key={lines.join('|')}
            className="egg-toast"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            {lines.map((l, i) => (
              <p key={i} className={i === 0 ? 'egg-toast-main' : 'egg-toast-sub'}>
                {l}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
