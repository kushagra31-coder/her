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
