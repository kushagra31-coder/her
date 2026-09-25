// ── shared UI helpers ─────────────────────────────────────────────

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Photo } from '../data/content';

/** Fade-up reveal on scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Image rendered with its inspected face-safe focal point. */
export function FocalImg({
  photo,
  className,
  eager = false,
  alt,
}: {
  photo: Photo;
  className?: string;
  eager?: boolean;
  alt?: string;
}) {
  return (
    <img
      src={photo.src}
      alt={alt ?? photo.caption}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      draggable={false}
      style={{ objectPosition: `${photo.posX}% ${photo.posY}%` }}
    />
  );
}

/** For tricky compositions: full image (contain) floating over a blurred
 *  duplicate that fills the frame — nothing ever gets cropped away. */
export function BlurFrame({
  photo,
  className,
  ratio,
}: {
  photo: Photo;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={`blur-frame ${className ?? ''}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={photo.src} alt="" aria-hidden="true" className="blur-frame-bg" loading="lazy" draggable={false} />
      <img
        src={photo.src}
        alt={photo.caption}
        className="blur-frame-fg"
        loading="lazy"
        draggable={false}
        style={{ objectPosition: `${photo.posX}% ${photo.posY}%` }}
      />
    </div>
  );
}

/** Small section kicker label. */
export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`kicker ${dark ? 'kicker-dark' : ''}`}>{children}</p>;
}
