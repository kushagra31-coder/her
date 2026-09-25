import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { VIDEOS } from '../data/content';
import type { VideoItem } from '../data/content';
import { useVideoInView } from '../hooks/useInView';
import { SITE_CONTENT } from '../data/content';

// Film hole decoration
function FilmHoles() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            width: 10,
            height: 16,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      ))}
    </div>
  );
}

// Individual video card
function VideoCard({ video, onExpand }: { video: VideoItem; onExpand: (v: VideoItem) => void }) {
  const videoRef = useVideoInView();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [videoRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        background: '#1a0f0a',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        border: '1px solid rgba(201,168,76,0.1)',
        flexShrink: 0,
        width: 'clamp(180px, 28vw, 240px)',
      }}
    >
      {/* Left film strip */}
      <div style={{ background: '#111', padding: '4px 6px', display: 'flex', alignItems: 'center' }}>
        <FilmHoles />
      </div>

      {/* Video */}
      <div style={{ flex: 1, position: 'relative', aspectRatio: '9/16', minHeight: 300 }}>
        <video
          ref={videoRef}
          src={video.src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'contrast(1.05) saturate(1.1) sepia(15%) brightness(1.05)',
          }}
          aria-label={video.caption}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Overlay controls */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          }}
        />

        {/* Caption */}
        <p
          style={{
            position: 'absolute',
            bottom: 36,
            left: 10,
            right: 10,
            fontFamily: 'Dancing Script, cursive',
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {video.caption}
        </p>

        {/* Controls row */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 8,
            right: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>

          <button
            onClick={() => setMuted(m => !m)}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          <button
            onClick={() => onExpand(video)}
            aria-label="Expand video"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Right film strip */}
      <div style={{ background: '#111', padding: '4px 6px', display: 'flex', alignItems: 'center' }}>
        <FilmHoles />
      </div>
    </motion.div>
  );
}

// Full-screen video modal
function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  const muted = false;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,2,2,0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`Video: ${video.caption}`}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
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
          zIndex: 1,
        }}
      >
        <X size={18} />
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 400, width: '100%' }}
      >
        <video
          src={video.src}
          controls
          autoPlay
          muted={muted}
          playsInline
          style={{
            width: '100%',
            borderRadius: 16,
            boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
            filter: 'contrast(1.05) saturate(1.1) sepia(15%) brightness(1.05)',
          }}
        />
        <p style={{
          textAlign: 'center',
          marginTop: 12,
          fontFamily: 'Dancing Script, cursive',
          fontSize: 18,
          color: 'rgba(255,255,255,0.7)',
        }}>
          {video.caption}
        </p>
      </div>
    </motion.div>
  );
}

export function CinemaSection() {
  const [expandedVideo, setExpandedVideo] = useState<VideoItem | null>(null);

  const sariVideos = VIDEOS.filter(v => v.group === 'sari');
  const portraitVideos = VIDEOS.filter(v => v.group === 'portrait');
  const filterVideos = VIDEOS.filter(v => v.group === 'filter');
  const casualVideos = VIDEOS.filter(v => v.group === 'casual');

  const groups = [
    { label: 'the sari chapter', videos: sariVideos },
    { label: 'close-ups & portraits', videos: portraitVideos },
    { label: 'filter moments', videos: filterVideos },
    { label: 'just her', videos: casualVideos },
  ];

  return (
    <section
      id="cinema"
      style={{
        background: 'linear-gradient(180deg, #1a0f0a 0%, #2d1a10 40%, #1a0f0a 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="cinema-heading"
    >
      {/* Gold grain overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 70%), radial-gradient(ellipse at 80% 50%, rgba(217,128,106,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: 16, color: 'rgba(201,168,76,0.7)', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
            ✦ a little cinema ✦
          </span>
          <h2
            id="cinema-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#fdf6ee',
            }}
          >
            {SITE_CONTENT.cinemaTitle}
          </h2>
          <p style={{ fontFamily: 'DM Sans', fontSize: 15, color: 'rgba(253,246,238,0.5)', marginTop: 8 }}>
            {SITE_CONTENT.cinemaSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Video groups */}
      {groups.map(group => group.videos.length > 0 && (
        <div key={group.label} style={{ marginBottom: 48 }}>
          {/* Group label */}
          <div style={{ padding: '0 24px', maxWidth: 1200, margin: '0 auto 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ height: 1, width: 24, background: 'rgba(201,168,76,0.4)' }} />
              <span style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 18,
                color: 'rgba(201,168,76,0.75)',
              }}>
                {group.label}
              </span>
            </div>
          </div>

          {/* Horizontal scroll strip */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              overflowX: 'auto',
              padding: '8px 24px 16px',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
            }}
          >
            {group.videos.map(video => (
              <div key={video.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <VideoCard video={video} onExpand={setExpandedVideo} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Video modal */}
      <AnimatePresence>
        {expandedVideo && (
          <VideoModal video={expandedVideo} onClose={() => setExpandedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
