// ── Music player ────────────────────────────────────────────────
// Drives the ONE shared <audio> element. Every bit of UI — progress,
// elapsed/duration, the waveform, mute — reflects the real element state.

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react';
import { formatTime, sendEggToast, useMusic } from '../audio/music';
import { SONG } from '../data/content';

// Deterministic faux-waveform heights (pure decoration — its *motion*
// is gated on the real `playing` state, never faked).
const BARS = [34, 58, 44, 72, 52, 88, 64, 40, 76, 56, 92, 48, 66, 38, 80, 54, 70, 42, 84, 60, 46, 74, 50, 68, 36, 78, 62, 44];

function Waveform({ playing }: { playing: boolean }) {
  return (
    <div className="waveform" aria-hidden="true">
      {BARS.map((h, i) => (
        <span
          key={i}
          className="waveform-bar"
          style={{
            height: `${h}%`,
            animationDelay: `${(i % 9) * 0.12}s`,
            animationPlayState: playing ? 'running' : 'paused',
            opacity: playing ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

export function MusicPlayer() {
  const { state, toggle, seek, skip, setVolume, toggleMute, start } = useMusic();
  const [open, setOpen] = useState(false);
  const artClicks = useRef(0);
  const artTimer = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const progress = state.duration > 0 ? Math.min(1, state.currentTime / state.duration) : 0;

  const onTrackClick = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el || state.duration <= 0) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    seek(ratio * state.duration);
  };

  // Easter egg: investigate the album art.
  const onArtClick = () => {
    artClicks.current += 1;
    if (artTimer.current) window.clearTimeout(artTimer.current);
    artTimer.current = window.setTimeout(() => {
      artClicks.current = 0;
    }, 2500);
    if (artClicks.current >= 5) {
      artClicks.current = 0;
      sendEggToast(["okay, you're really investigating this."]);
    }
  };

  return (
    <div className="music-player" data-open={open}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="player-card"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button className="player-close" onClick={() => setOpen(false)} aria-label="collapse player">
              <X size={15} />
            </button>

            {state.hasError ? (
              <div className="player-error">
                <p className="player-error-main">the song is hiding ♡</p>
                <p className="player-error-sub">drop the music file into /public/audio/our-song.mp3</p>
              </div>
            ) : state.awaitingGesture ? (
              <button className="player-tap" onClick={() => void start()}>
                tap to play ♡
              </button>
            ) : (
              <>
                <div className="player-top">
                  <img
                    src={SONG.art}
                    alt="album art"
                    className="player-art"
                    onClick={onArtClick}
                    title="our song"
                  />
                  <div className="player-meta">
                    <p className="player-now">♡ now playing</p>
                    <p className="player-title">{SONG.title}</p>
                    <p className="player-artist">{SONG.artist}</p>
                  </div>
                </div>

                <Waveform playing={state.playing} />

                <div
                  className="player-progress"
                  ref={trackRef}
                  onClick={onTrackClick}
                  role="slider"
                  aria-label="seek"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(state.duration)}
                  aria-valuenow={Math.round(state.currentTime)}
                >
                  <div className="player-progress-fill" style={{ width: `${progress * 100}%` }} />
                  <div className="player-progress-knob" style={{ left: `${progress * 100}%` }} />
                </div>
                <div className="player-times">
                  <span>{formatTime(state.currentTime)}</span>
                  <span>{formatTime(state.duration)}</span>
                </div>

                <div className="player-controls">
                  <button onClick={() => skip(-10)} aria-label="back 10 seconds"><SkipBack size={19} /></button>
                  <button className="player-play" onClick={toggle} aria-label={state.playing ? 'pause' : 'play'}>
                    {state.playing ? <Pause size={21} /> : <Play size={21} />}
                  </button>
                  <button onClick={() => skip(10)} aria-label="forward 10 seconds"><SkipForward size={19} /></button>
                  <button onClick={toggleMute} aria-label={state.muted ? 'unmute' : 'mute'}>
                    {state.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>

                <label className="player-volume">
                  <Volume2 size={13} />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={state.muted ? 0 : state.volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label="volume"
                  />
                </label>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* mini pill */}
      <button
        className="player-pill"
        onClick={() => (open ? toggle() : setOpen(true))}
        aria-label={state.playing ? 'pause music' : 'play music'}
      >
        <span className={`pill-eq ${state.playing ? 'on' : ''}`} aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="pill-label">
          {state.hasError ? 'the song is hiding ♡' : state.playing ? '♡ now playing' : state.started ? 'paused ♡' : 'our song ♡'}
        </span>
        <span className="pill-icon">{state.playing ? <Pause size={14} /> : <Play size={14} />}</span>
      </button>
    </div>
  );
}
