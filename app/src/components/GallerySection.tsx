import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PHOTOS } from '../data/content';
import type { Photo } from '../data/content';

interface LightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  index: number;
}

function Lightbox({ photo, photos, onClose, onPrev, onNext, index }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Swipe support
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev();
  };

  if (!photo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="lightbox-backdrop"
      role="dialog"
      aria-modal
      aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Counter */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 13,
          fontFamily: 'DM Sans, sans-serif',
          letterSpacing: '0.1em',
          zIndex: 2,
        }}
      >
        {index + 1} / {photos.length}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          zIndex: 2,
          transition: 'background 0.2s',
        }}
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
        style={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          zIndex: 2,
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
        style={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          zIndex: 2,
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            style={{
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              borderRadius: 12,
              boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
            }}
          />
          {photo.caption && (
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Dancing Script, cursive',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              {photo.caption}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// Polaroid card
function PolaroidCard({
  photo,
  onClick,
  delay = 0,
}: {
  photo: Photo;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, rotate: photo.rotation ?? 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        zIndex: 10,
        boxShadow: '0 12px 40px rgba(139,38,53,0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="polaroid"
      style={{
        rotate: photo.rotation ?? 0,
        cursor: 'pointer',
        border: 'none',
        textAlign: 'left',
        display: 'block',
        width: '100%',
        transition: 'box-shadow 0.3s',
        position: 'relative',
      }}
      aria-label={`Open photo: ${photo.alt}`}
    >
      {/* Shine effect */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          aspectRatio: '4/5',
          overflow: 'hidden',
          marginBottom: 8,
          background: '#f0f0f0',
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>

      {photo.caption && (
        <p
          style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 13,
            color: '#555',
            paddingLeft: 4,
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {photo.caption}
        </p>
      )}
    </motion.button>
  );
}

// Chapter label
function ChapterLabel({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: 32 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ height: 1.5, width: 32, background: 'var(--gold)', opacity: 0.6, flexShrink: 0 }} />
        <div>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-main)',
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'var(--text-light)', marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePhotos, setActivePhotos] = useState<Photo[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [heartBurst, setHeartBurst] = useState<string | null>(null);

  const openLightbox = useCallback((photo: Photo, photosInGroup: Photo[]) => {
    setLightboxPhoto(photo);
    setActivePhotos(photosInGroup);
    setCurrentIndex(photosInGroup.findIndex(p => p.id === photo.id));
  }, []);

  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);
  const prevPhoto = useCallback(() => {
    setCurrentIndex(i => {
      const next = (i - 1 + activePhotos.length) % activePhotos.length;
      setLightboxPhoto(activePhotos[next]);
      return next;
    });
  }, [activePhotos]);
  const nextPhoto = useCallback(() => {
    setCurrentIndex(i => {
      const next = (i + 1) % activePhotos.length;
      setLightboxPhoto(activePhotos[next]);
      return next;
    });
  }, [activePhotos]);

  const toggleFavorite = (id: string) => {
    setFavorites(f => {
      const next = new Set(f);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        setHeartBurst(id);
        setTimeout(() => setHeartBurst(null), 800);
      }
      return next;
    });
  };

  // Group photos by chapter
  const sariPhotos = PHOTOS.filter(p => p.chapter === 'sari');
  const naturePhotos = PHOTOS.filter(p => p.chapter === 'nature');
  const versionPhotos = PHOTOS.filter(p => p.chapter === 'versions');
  const softPhotos = PHOTOS.filter(p => p.chapter === 'soft');

  return (
    <section
      id="gallery"
      style={{
        background: 'linear-gradient(180deg, #fdf6ee 0%, #f9f1e4 100%)',
        padding: '80px 24px',
        position: 'relative',
      }}
      className="noise"
      aria-labelledby="gallery-heading"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span style={{ fontFamily: 'Dancing Script', fontSize: 16, color: 'var(--gold)', opacity: 0.8, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            ✦ her chapters ✦
          </span>
          <h2
            id="gallery-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text-main)',
            }}
          >
            a memory gallery
          </h2>
        </motion.div>

        {/* ── Chapter A: Sari Day ── */}
        <div style={{ marginBottom: 80 }}>
          <ChapterLabel title='"that sari day"' subtitle="the outdoor white & red sari collection" />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            {sariPhotos.map((photo, i) => (
              <div key={photo.id} style={{ position: 'relative', margin: '-15px', zIndex: i % 3 }}>
                <div style={{ width: 'clamp(160px, 25vw, 240px)' }}>
                  <PolaroidCard
                    photo={photo}
                    onClick={() => openLightbox(photo, sariPhotos)}
                    delay={i * 0.07}
                  />
                </div>
                <button
                  onClick={() => toggleFavorite(photo.id)}
                  aria-label={`${favorites.has(photo.id) ? 'Unfavorite' : 'Favorite'} this photo`}
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 12,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    color: favorites.has(photo.id) ? '#d9806a' : '#ccc',
                    transition: 'all 0.2s',
                    padding: 4,
                    zIndex: 20,
                  }}
                >
                  {favorites.has(photo.id) ? '♥' : '♡'}
                  {heartBurst === photo.id && (
                    <span style={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      animation: 'floatHeart 0.8s ease-out forwards',
                      color: '#d9806a',
                      fontSize: 20,
                      pointerEvents: 'none',
                    }}>♥</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Chapter B: Nature/Outdoor ── */}
        <div style={{ marginBottom: 80 }}>
          <ChapterLabel title='"the outdoor era"' subtitle="fields, waterfalls, open skies" />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            {naturePhotos.map((photo, i) => (
              <div key={photo.id} style={{ margin: '-15px', zIndex: i % 3, width: 'clamp(160px, 25vw, 240px)' }}>
                <PolaroidCard
                  photo={photo}
                  onClick={() => openLightbox(photo, naturePhotos)}
                  delay={i * 0.1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Chapter C: Different Versions ── */}
        <div style={{ marginBottom: 80 }}>
          <ChapterLabel title='"different versions of her"' subtitle="black, green, purple — every look, unforgettable" />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            {versionPhotos.map((photo, i) => (
              <div key={photo.id} style={{ margin: '-15px', zIndex: i % 3, width: 'clamp(160px, 25vw, 240px)' }}>
                <PolaroidCard
                  photo={photo}
                  onClick={() => openLightbox(photo, versionPhotos)}
                  delay={i * 0.06}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Chapter D: Soft Moments ── */}
        <div style={{ marginBottom: 40 }}>
          <ChapterLabel title='"soft little moments"' subtitle="close-ups, sunlight, wine-red hair" />
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}>
            {softPhotos.map((photo, i) => (
              <div key={photo.id} style={{ margin: '-15px', zIndex: i % 3, width: 'clamp(160px, 25vw, 240px)' }}>
                <PolaroidCard
                  photo={photo}
                  onClick={() => openLightbox(photo, softPhotos)}
                  delay={i * 0.07}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <Lightbox
            photo={lightboxPhoto}
            photos={activePhotos}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
            index={currentIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
