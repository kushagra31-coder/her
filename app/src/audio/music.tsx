// ── Real local music system ─────────────────────────────────────────
// One shared HTMLAudioElement for the whole site. No <video>, no hidden
// video, no external URLs. All player UI derives from real media events:
// play, pause, ended, timeupdate, loadedmetadata, volumechange, error.

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { SONG } from '../data/content';

export interface MusicState {
  hasError: boolean;
  errorMessage: string | null;
  awaitingGesture: boolean;
  started: boolean;
  playing: boolean;
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

interface MusicContextValue {
  state: MusicState;
  /** Called DIRECTLY from the opening-screen click handler. */
  start: () => Promise<boolean>;
  toggle: () => void;
  seek: (time: number) => void;
  skip: (delta: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — playback still works */
  }
}

let shared: HTMLAudioElement | null = null;

/** The single audio element for the site. The opening click and the
 *  floating player both drive THIS element, so they can never disagree. */
export function getSharedAudio(): HTMLAudioElement {
  if (!shared) {
    const a = new Audio();
    a.src = SONG.src;
    a.loop = true;
    a.preload = 'metadata';
    const v = safeGet('musicVolume');
    if (v !== null) {
      const n = parseFloat(v);
      if (Number.isFinite(n)) a.volume = Math.min(1, Math.max(0, n));
    }
    shared = a;
    // Exposed for real QA: verify paused/currentTime/src in the browser.
    (window as unknown as { __herAudio?: HTMLAudioElement }).__herAudio = a;
  }
  return shared;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const initialState = (): MusicState => ({
  hasError: false,
  errorMessage: null,
  awaitingGesture: false,
  started: safeGet('musicStarted') === '1',
  playing: false,
  muted: false,
  volume: (() => {
    const v = safeGet('musicVolume');
    const n = v === null ? 0.8 : parseFloat(v);
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.8;
  })(),
  currentTime: 0,
  duration: 0,
});

export function MusicProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MusicState>(initialState);

  // Subscribe to the REAL media events. UI never guesses playback state.
  useEffect(() => {
    const a = getSharedAudio();
    const patch = (p: Partial<MusicState>) => setState((s) => ({ ...s, ...p }));

    const onPlay = () => {
      patch({ playing: true, started: true, awaitingGesture: false, hasError: false, errorMessage: null });
      safeSet('musicStarted', '1');
      safeSet('musicEnabled', '1');
    };
    const onPause = () => patch({ playing: false });
    const onEnded = () => patch({ playing: false });
    const onTime = () => patch({ currentTime: a.currentTime || 0 });
    const onMeta = () =>
      patch({
        duration: Number.isFinite(a.duration) ? a.duration : 0,
        currentTime: a.currentTime || 0,
      });
    const onVolume = () => {
      patch({ muted: a.muted, volume: a.volume });
      safeSet('musicVolume', String(a.volume));
    };
    const onError = () => {
      const code = a.error ? ` (code ${a.error.code})` : '';
      // Dev log of the ACTUAL audio error — never shown to the viewer.
      console.error(`[music] failed to load ${SONG.src}${code}`);
      patch({
        hasError: true,
        awaitingGesture: false,
        playing: false,
        errorMessage: 'the song is hiding ♡',
      });
    };

    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('durationchange', onMeta);
    a.addEventListener('volumechange', onVolume);
    a.addEventListener('error', onError);
    // If metadata already arrived before we subscribed.
    if (Number.isFinite(a.duration) && a.duration > 0) onMeta();
    onVolume();
    return () => {
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('durationchange', onMeta);
      a.removeEventListener('volumechange', onVolume);
      a.removeEventListener('error', onError);
    };
  }, []);

  const start = useCallback(async () => {
    const a = getSharedAudio();
    setState((s) => ({ ...s, awaitingGesture: false, hasError: false, errorMessage: null }));
    try {
      await a.play();
      return true;
    } catch {
      // Browser blocked autoplay (or file missing — the error event
      // will follow and flip this to the real error message).
      setState((s) => (s.hasError ? s : { ...s, awaitingGesture: true }));
      return false;
    }
  }, []);

  const toggle = useCallback(() => {
    const a = getSharedAudio();
    if (a.paused) {
      void start();
    } else {
      a.pause();
      safeSet('musicEnabled', '0');
    }
  }, [start]);

  const seek = useCallback((time: number) => {
    const a = getSharedAudio();
    if (Number.isFinite(a.duration) && a.duration > 0) {
      a.currentTime = Math.min(Math.max(0, time), a.duration);
    }
  }, []);

  const skip = useCallback(
    (delta: number) => {
      const a = getSharedAudio();
      seek((a.currentTime || 0) + delta);
    },
    [seek],
  );

  const setVolume = useCallback((v: number) => {
    const a = getSharedAudio();
    const clamped = Math.min(1, Math.max(0, v));
    a.volume = clamped;
    if (clamped > 0 && a.muted) a.muted = false;
  }, []);

  const toggleMute = useCallback(() => {
    const a = getSharedAudio();
    a.muted = !a.muted;
  }, []);

  return (
    <MusicContext.Provider
      value={{ state, start, toggle, seek, skip, setVolume, toggleMute }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}

/** Tiny event bus for easter-egg toasts. */
export function sendEggToast(lines: string[]) {
  window.dispatchEvent(new CustomEvent<string[]>('her:egg', { detail: lines }));
}

export function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
