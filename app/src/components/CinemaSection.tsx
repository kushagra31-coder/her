// ── Cinema — "little pieces of you" ───────────────────────────────
// 14 real posters, real durations, unique captions. Posters only until
// clicked; the fullscreen modal never autoplays — she presses play, with
// sound, entirely on her terms. Videos never touch the background music.

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { VIDEOS, type Video } from '../data/content';
import { formatTime } from '../audio/music';
import { Kicker, Reveal } from './ui';

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock body scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // On unmount: stop playback and drop the source entirely.
  useEffect(() => {
    const el = videoRef.current;
    return () => {
      if (el) {
        el.pause();
        el.removeAttribute('src');
        el.load();
      }
    };
  }, []);

  return (
    <motion.div
      className="video-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-label={video.caption}
    >
      <button className="video-modal-close" onClick={onClose} aria-label="close video">
        <X size={22} />
      </button>
      <motion.div
        className="video-modal-frame grain"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* No autoPlay: the viewer presses play explicitly. */}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          className="video-modal-el"
        />
        <p className="video-modal-cap">{video.caption}</p>
      </motion.div>
    </motion.div>
  );
}

export function CinemaSection() {
  const [active, setActive] = useState<Video | null>(null);

  return (
    <section id="cinema" className="cinema theme-cinematic-deep">
      <div className="section-pad">
        <Reveal>
          <Kicker dark>little pieces of you</Kicker>
          <h2 className="section-title">
            moving pictures <span className="title-heart">♡</span>
          </h2>
          <p className="section-sub">tap one. press play when you're ready.</p>
        </Reveal>

        <div className="cinema-grid">
          {VIDEOS.map((v, i) => (
            <motion.button
              key={v.id}
              className="cinema-card grain"
              onClick={() => setActive(v)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              aria-label={`play: ${v.caption}`}
            >
              <span className="cinema-poster-wrap">
                <img src={v.poster} alt={v.caption} loading="lazy" draggable={false} className="cinema-poster" />
                <span className="cinema-play" aria-hidden="true">
                  <Play size={20} />
                </span>
                <span className="cinema-duration">{formatTime(v.duration)}</span>
              </span>
              <span className="cinema-cap">{v.caption}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <VideoModal video={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
