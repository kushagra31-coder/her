import { useEffect } from 'react';

// Heart cursor trail + floating particles
export function HeartCursorTrail() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return; // skip on touch devices

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 120) return; // throttle
      lastTime = now;

      const heart = document.createElement('div');
      heart.className = 'heart-cursor-trail';
      heart.style.left = `${e.clientX - 6}px`;
      heart.style.top = `${e.clientY - 6}px`;
      heart.textContent = ['♡', '♥', '✦', '✿'][Math.floor(Math.random() * 4)];
      heart.style.color = ['#d9806a', '#c9a84c', '#8b2635', '#f0dcd4'][Math.floor(Math.random() * 4)];
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}

// Floating hearts background particles
export function FloatingHearts({ count = 8 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${4 + Math.random() * 4}s`,
    size: `${10 + Math.random() * 14}px`,
    char: ['♡', '♥', '✦', '✿', '❀'][Math.floor(Math.random() * 5)],
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map(h => (
        <span
          key={h.id}
          style={{
            position: 'absolute',
            left: h.left,
            bottom: '-10px',
            fontSize: h.size,
            opacity: h.opacity,
            color: '#d9806a',
            animation: `floatHeart ${h.duration} ${h.delay} infinite linear`,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
}

// Sparkle dot
export function Sparkle({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--gold)',
        boxShadow: '0 0 6px 2px rgba(201,168,76,0.5)',
        animation: 'sparkle 2s infinite',
        ...style,
      }}
    />
  );
}

// Lily divider — her favorite flower, drawn as a delicate ornament
export function LilyDivider() {
  return (
    <div className="lily-divider" aria-hidden="true">
      <span className="lily-divider-rule" />
      <svg className="lily-divider-bloom" viewBox="0 0 64 44" fill="none">
        <path d="M32 3 C 26.5 13, 26.5 25, 32 35 C 37.5 25, 37.5 13, 32 3 Z"
          stroke="var(--gold)" strokeWidth="1.6" fill="rgba(255,159,189,0.10)" />
        <path d="M29 9 C 20 11, 12.5 18.5, 10.5 30 C 20 26.5, 27 19, 29 9 Z"
          stroke="var(--gold)" strokeWidth="1.4" fill="rgba(255,159,189,0.07)" />
        <path d="M35 9 C 44 11, 51.5 18.5, 53.5 30 C 44 26.5, 37 19, 35 9 Z"
          stroke="var(--gold)" strokeWidth="1.4" fill="rgba(255,159,189,0.07)" />
        <path d="M32 35 L32 41" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="32" cy="22" r="1.6" fill="var(--gold)" opacity="0.85" />
      </svg>
      <span className="lily-divider-rule" />
    </div>
  );
}

// Drifting lily petals — soft SVG petals floating upward, like the hearts
export function FloatingLilyPetals({ count = 10 }: { count?: number }) {
  if (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 9}s`,
    duration: `${11 + Math.random() * 8}s`,
    size: 12 + Math.random() * 16,
    sway: `${(Math.random() - 0.5) * 90}px`,
    opacity: 0.18 + Math.random() * 0.3,
    tint: ['#f6e3e8', '#f3cdd8', '#eec3d3', '#faf0f2'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="lily-petals" aria-hidden="true">
      {petals.map(p => (
        <svg
          key={p.id}
          className="lily-petal"
          viewBox="0 0 20 28"
          style={{
            left: p.left,
            width: p.size,
            ['--sway' as string]: p.sway,
            ['--petal-op' as string]: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          <path d="M10 1.5 C 4.5 8, 3.5 17.5, 10 26.5 C 16.5 17.5, 15.5 8, 10 1.5 Z"
            fill={p.tint} />
          <path d="M10 4 L10 24" stroke="rgba(190,120,140,0.45)" strokeWidth="0.8" />
        </svg>
      ))}
    </div>
  );
}

// Petal divider
export function PetalDivider() {
  return (
    <div className="petal-divider" aria-hidden>
      <span>✿</span>
      <span style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', display: 'inline-block' }} />
      <span>♡</span>
      <span style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', display: 'inline-block' }} />
      <span>✿</span>
    </div>
  );
}

// Confetti burst
export function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    color: ['#d9806a', '#c9a84c', '#8b2635', '#f0dcd4', '#ffffff'][Math.floor(Math.random() * 5)],
    char: ['✦', '♡', '✿', '·', '★'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-20px',
            color: p.color,
            fontSize: `${10 + Math.random() * 10}px`,
            animation: `confetti-fall ${1.5 + Math.random()}s ${p.delay} forwards`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
