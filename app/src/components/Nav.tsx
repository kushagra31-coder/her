// ── slim nav ──────────────────────────────────────────────────────
// Appears after the opening. The tiny heart is easter egg #1.

import { motion } from 'framer-motion';
import { sendEggToast } from '../audio/music';

const LINKS = [
  { href: '#hero', label: 'her' },
  { href: '#why-you', label: 'why you' },
  { href: '#gallery', label: 'gallery' },
  { href: '#cinema', label: 'cinema' },
  { href: '#letter', label: 'letter' },
  { href: '#final', label: 'the end?' },
];

export function Nav() {
  const onHeart = () => {
    sendEggToast(['you found one.', "you're observant. I like that."]);
  };

  return (
    <motion.nav
      className="site-nav"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
    >
      <button className="nav-heart" onClick={onHeart} aria-label="a tiny heart" title="♡">
        ♡
      </button>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
