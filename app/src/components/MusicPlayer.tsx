import { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = '/assets/music.m4a';

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [beat, setBeat] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const beatTimer = useRef<any>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handleEnded = () => setPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startBeat = useCallback(() => {
    beatTimer.current = setInterval(() => {
      setBeat(b => (b + 1) % 3);
    }, 600);
  }, []);

  const stopBeat = useCallback(() => {
    clearInterval(beatTimer.current);
    setBeat(0);
  }, []);

  useEffect(() => {
    if (playing) startBeat();
    else stopBeat();
    return stopBeat;
  }, [playing, startBeat, stopBeat]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(err => {
        console.error("Audio play failed", err);
      });
    }
  }, [playing]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    
    if (muted) {
      audioRef.current.muted = false;
      setMuted(false);
    } else {
      audioRef.current.muted = true;
      setMuted(true);
    }
  }, [muted]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      {/* Label card */}
      {expanded && (
        <div
          className="glass"
          style={{
            padding: '10px 16px',
            borderRadius: 16,
            fontSize: 12,
            color: 'var(--text-soft)',
            fontFamily: 'Dancing Script, cursive',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(139,38,53,0.1)',
          }}
        >
          🎵 a song for you ♡
        </div>
      )}

      {/* Main button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-label={playing ? 'Pause music' : 'Play music'}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: playing
            ? 'linear-gradient(135deg, var(--burgundy), var(--rose))'
            : 'linear-gradient(135deg, var(--cream), var(--ivory))',
          border: '2px solid rgba(201,168,76,0.3)',
          boxShadow: playing
            ? '0 0 20px rgba(217,128,106,0.4), 0 4px 16px rgba(0,0,0,0.15)'
            : '0 4px 16px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: playing ? 'white' : 'var(--burgundy)',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {playing ? (
          <>
            <Pause size={18} />
            {/* Mini equalizer */}
            <div style={{ display: 'flex', gap: 2, height: 8 }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.8)',
                    height: beat === i ? 8 : 3,
                    transition: 'height 0.15s ease',
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <Play size={20} />
        )}
      </button>

      {/* Mute button */}
      {playing && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--cream)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--rose)',
            transition: 'all 0.2s',
          }}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}
    </div>
  );
}
