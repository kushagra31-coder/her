import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── 1. "there's something about you ♡" (Traits) ──
export function TraitsSection() {
  const traits = ['smart', 'beautiful', 'cute', 'funny', 'familiar', 'same wavelength'];
  return (
    <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: 1000, margin: '0 auto' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 40 }}>
        "there's something about you ♡"
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        {traits.map((trait, i) => (
          <motion.div
            key={trait}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, rotate: (i % 2 === 0 ? 2 : -2) }}
            className="glass"
            style={{
              padding: '12px 24px',
              borderRadius: 20,
              fontFamily: 'DM Sans, sans-serif',
              color: 'var(--rose)',
              cursor: 'default',
            }}
          >
            {trait}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── 2. "same brain, different person" (Diagram) ──
export function DiagramSection() {
  const connections = [
    'same humor', 'same chaos', 'same curiosity', 
    'same energy', 'similar way of thinking', 'different personalities'
  ];
  return (
    <section style={{ padding: '100px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, transparent, rgba(235, 203, 200, 0.2), transparent)' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 60 }}>
        "same brain, different person"
      </h3>
      <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{
            background: 'var(--cream)',
            padding: '24px 32px',
            borderRadius: '50%',
            boxShadow: '0 10px 40px rgba(139,38,53,0.1)',
            zIndex: 10,
            fontFamily: 'Dancing Script, cursive',
            fontSize: '24px',
            color: 'var(--burgundy)',
          }}
        >
          somehow, you feel familiar.
        </motion.div>
        
        {connections.map((conn, i) => {
          const angle = (i / connections.length) * Math.PI * 2;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.div
              key={conn}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3 }}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: 'var(--text-soft)',
                background: 'rgba(255,255,255,0.6)',
                padding: '6px 12px',
                borderRadius: 12,
                whiteSpace: 'nowrap',
              }}
            >
              {conn}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── 3. "pretty face. scary brain." & "not just pretty" ──
export function SmartSection() {
  const [step, setStep] = useState(0);
  const reveals = [
    'smart', 'funny', 'curious', 'kind', 'interesting', 'unpredictable', 'familiar'
  ];

  return (
    <section style={{ padding: '100px 20px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 20 }}>
        "pretty face. scary brain."
      </h3>
      
      <div style={{ marginBottom: 60, fontSize: 18, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-soft)' }}>
        <motion.span whileHover={{ scale: 1.1, color: 'var(--rose)' }}>cute</motion.span> →{' '}
        <motion.span whileHover={{ scale: 1.1, color: 'var(--rose)' }}>cute</motion.span> →{' '}
        <motion.span whileHover={{ scale: 1.1, color: 'var(--rose)' }}>cute</motion.span> →{' '}
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontWeight: 500, color: 'var(--burgundy)' }}>
          wait... she's actually really smart.
        </motion.span>
      </div>

      <div className="glass" style={{ padding: 40, borderRadius: 24, textAlign: 'left' }}>
        <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: 'var(--burgundy)', marginBottom: 16 }}>
          "not just pretty"
        </h4>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'var(--text-main)', lineHeight: 1.6, marginBottom: 24 }}>
          You're beautiful. That's obvious.<br/>
          But that's not even the interesting part.
        </p>
        
        <button 
          onClick={() => setStep(s => s + 1)}
          disabled={step >= reveals.length}
          style={{
            background: 'none',
            border: '1px solid var(--rose)',
            padding: '8px 16px',
            borderRadius: 20,
            color: 'var(--rose)',
            cursor: step >= reveals.length ? 'default' : 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            opacity: step >= reveals.length ? 0.5 : 1,
            marginBottom: 20,
            transition: 'all 0.2s',
          }}
        >
          {step >= reveals.length ? 'that\'s all ♡' : 'reveal more'}
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <AnimatePresence>
            {reveals.slice(0, step).map((word) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--cream)',
                  padding: '6px 12px',
                  borderRadius: 12,
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: 20,
                  color: 'var(--text-main)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                {word}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ── 4. Profile Section ──
export function ProfileSection() {
  const stats = [
    { label: 'Energy', value: 'dangerously good' },
    { label: 'Cuteness', value: 'suspiciously high' },
    { label: 'Intelligence', value: 'unfair' },
    { label: 'Smile', value: 'distracting' },
    { label: 'Chaos', value: 'concerning' },
    { label: 'Vibe', value: 'impossible to explain' },
    { label: 'Similarity to me', value: 'slightly alarming' },
    { label: 'Impact', value: 'unexpectedly significant' },
  ];

  return (
    <section style={{ padding: '60px 20px', maxWidth: 600, margin: '0 auto' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 40, textAlign: 'center' }}>
        "if I had to describe you"
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '1px dashed rgba(201,168,76,0.3)',
              paddingBottom: 8,
            }}
          >
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {stat.label}
            </span>
            <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: 22, color: 'var(--burgundy)' }}>
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── 5. Effect & Noticing (Floating annotations & lines) ──
export function EffectSection() {
  const lines = [
    "You make me smile at my screen.",
    "You make conversations feel shorter.",
    "You stay in my thoughts longer than expected.",
    "You make 'just talking' feel less like just talking.",
    "You have an annoying talent for being memorable."
  ];

  return (
    <section style={{ padding: '100px 20px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 60 }}>
        "things you don't know about your effect on me"
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: 'var(--text-soft)',
              fontWeight: 300,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

// ── 6. Confession & Secret Envelope ──
export function SecretConfession() {
  const [open, setOpen] = useState(false);
  
  return (
    <section style={{ padding: '100px 20px', textAlign: 'center', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {!open ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: '1px solid var(--rose)',
            padding: '16px 32px',
            borderRadius: 30,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            letterSpacing: '0.05em',
            color: 'var(--rose)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(217,128,106,0.1)'
          }}
        >
          open something I probably shouldn't say ♡
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass"
          style={{ padding: '40px', borderRadius: 24, maxWidth: 500, margin: '0 auto', textAlign: 'center' }}
        >
          <h4 style={{ fontFamily: 'Dancing Script, cursive', fontSize: 28, color: 'var(--burgundy)', marginBottom: 24 }}>
            Okay, tiny confession.
          </h4>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: 'var(--text-main)', lineHeight: 1.8, marginBottom: 24 }}>
            Somewhere between noticing how smart you are,<br/>
            realizing how strangely similar we are,<br/>
            and seeing how ridiculously cute you can be...<br/><br/>
            I may have developed a little soft spot for you.
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--text-soft)', fontStyle: 'italic' }}>
            That's all. Pretend you didn't read that. ♡
          </p>
        </motion.div>
      )}
    </section>
  );
}

// ── 7. Compliment Machine ──
export function ComplimentMachine() {
  const [compliment, setCompliment] = useState<string | null>(null);
  
  const compliments = [
    "Your brain is genuinely attractive.",
    "You are ridiculously cute sometimes.",
    "You make ordinary conversations interesting.",
    "You have an oddly comforting presence.",
    "You are much more special than you probably realize.",
    "This is unfair how pretty you are.",
    "You somehow make doing nothing look good.",
    "Your energy is my favorite.",
    "You're dangerously easy to talk to.",
    "You have the kind of smile that makes people forget what they were saying.",
    "You're a very rare combination of smart, funny, and beautiful.",
    "I could listen to you talk about absolutely nothing.",
    "You make my days noticeably better.",
    "You are exactly my kind of chaos.",
    "There's nobody quite like you."
  ];

  const generate = () => {
    let next;
    do {
      next = compliments[Math.floor(Math.random() * compliments.length)];
    } while (next === compliment);
    setCompliment(next);
  };

  return (
    <section style={{ padding: '80px 20px', textAlign: 'center' }}>
      <button
        onClick={generate}
        style={{
          background: 'linear-gradient(135deg, var(--rose), var(--burgundy))',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: 30,
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(139,38,53,0.3)',
          transition: 'transform 0.2s',
          marginBottom: 32,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        tell me something nice ♡
      </button>
      
      <div style={{ minHeight: 60 }}>
        <AnimatePresence mode="wait">
          {compliment && (
            <motion.div
              key={compliment}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 'clamp(24px, 4vw, 32px)',
                color: 'var(--burgundy)',
              }}
            >
              "{compliment}"
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 8. Infinite Scroll (Things I could talk about forever) ──
export function InfiniteScrollSection() {
  const items = [
    'random theories', 'stupid jokes', 'deep thoughts at 2am', 'nothing at all', 'how your day was', 'the future', 'music', 'everything'
  ];
  const duplicated = [...items, ...items, ...items];

  return (
    <section style={{ padding: '60px 0', overflow: 'hidden', background: 'rgba(255,255,255,0.3)' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: 30, textAlign: 'center' }}>
        "things I could talk about with you forever"
      </h3>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', width: '200%' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          style={{ display: 'flex', gap: 40, paddingRight: 40 }}
        >
          {duplicated.map((item, i) => (
            <div key={i} style={{ 
              fontFamily: 'DM Sans, sans-serif', 
              fontSize: 16, 
              color: 'var(--rose)',
              padding: '12px 24px',
              border: '1px solid rgba(217,128,106,0.3)',
              borderRadius: 30,
              background: 'var(--cream)'
            }}>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 9. Future Section ──
export function FutureSection() {
  const items = [
    "more random conversations",
    "more stupid jokes",
    "more pictures",
    "more inside jokes",
    "more unexpected moments",
    "more reasons to smile",
    "more versions of you",
    "more things neither of us planned"
  ];

  return (
    <section style={{ padding: '100px 20px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '36px', color: 'var(--burgundy)', marginBottom: 40 }}>
        "more of this, someday ♡"
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 18,
              color: 'var(--text-main)',
            }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── 10. Secret Envelope ──
export function SecretEnvelope() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 2) {
      const t1 = setTimeout(() => setStep(3), 2000);
      const t2 = setTimeout(() => setStep(4), 5000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [step]);

  return (
    <section style={{ padding: '100px 20px', textAlign: 'center', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {step === 0 && (
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(1)}
          style={{
            background: 'var(--bg-dark)',
            color: 'var(--cream)',
            padding: '20px 40px',
            borderRadius: 8,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          do not open
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: 'var(--burgundy)' }}
        >
          <p>You were warned.</p>
          <button 
            onClick={() => setStep(2)}
            style={{ marginTop: 20, background: 'none', border: '1px solid var(--burgundy)', padding: '8px 16px', borderRadius: 20, color: 'var(--burgundy)', cursor: 'pointer', fontFamily: 'DM Sans' }}
          >
            continue anyway
          </button>
        </motion.div>
      )}

      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 20, color: 'var(--text-main)' }}
        >
          You're really cute, you know that?
          
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: 20, fontFamily: 'Dancing Script, cursive', fontSize: 24, color: 'var(--rose)' }}
            >
              okay bye ♡
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  );
}
