// ── Gallery — soft scrapbook ──────────────────────────────────────
// All 26 gallery photos reachable, each with a unique caption and its
// inspected face-safe focal point. Mixed treatments: cinematic wides,
// diptychs, polaroid stacks, film strips, constellations.

import { motion } from 'framer-motion';
import { GALLERY_PHOTOS, GALLERY_ASIDES, type Photo } from '../data/content';
import { sendEggToast } from '../audio/music';
import { BlurFrame, FocalImg, Kicker, Reveal } from './ui';

const byId = (id: string): Photo => {
  const p = GALLERY_PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`photo ${id} missing`);
  return p;
};

function Tape() {
  return <span className="tape" aria-hidden="true" />;
}

function Note({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`hand-note ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function Polaroid({ photo, tilt = 0, className = '' }: { photo: Photo; tilt?: number; className?: string }) {
  return (
    <motion.figure
      className={`polaroid ${className}`}
      style={{ rotate: tilt }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ rotate: 0, scale: 1.03 }}
    >
      <Tape />
      <div className="polaroid-imgwrap" style={{ aspectRatio: `${photo.w} / ${photo.h}` }}>
        <FocalImg photo={photo} className="polaroid-img" />
      </div>
      <figcaption>{photo.caption}</figcaption>
    </motion.figure>
  );
}

function CineWide({ photo, note }: { photo: Photo; note?: string }) {
  return (
    <Reveal className="cine-wide">
      <div className="cine-wide-frame grain">
        <FocalImg photo={photo} className="cine-wide-img" />
      </div>
      <div className="cine-wide-meta">
        <p className="scrap-caption">{photo.caption}</p>
        {note && <Note>{note}</Note>}
      </div>
    </Reveal>
  );
}

function Aside({ text }: { text: string }) {
  return (
    <Reveal className="gallery-aside">
      <p>
        <span className="aside-dash">—</span> {text}
      </p>
    </Reveal>
  );
}

export function GallerySection() {
  const onStar = () => sendEggToast(["yes, I put this here just to see if you'd find it."]);

  return (
    <section id="gallery" className="gallery theme-soft">
      <div className="section-pad">
        <Reveal>
          <Kicker>the gallery</Kicker>
          <h2 className="section-title">
            proof that I <em>notice</em> things <span className="title-heart">♡</span>
          </h2>
          <p className="section-sub">twenty-six little exhibits. all her.</p>
        </Reveal>

        {/* cinematic opener */}
        <CineWide photo={byId('p01')} note="← this one stopped me mid-scroll" />

        {/* diptych */}
        <div className="scrap-row scrap-diptych">
          {[byId('p02'), byId('p03')].map((p, i) => (
            <Polaroid key={p.id} photo={p} tilt={i === 0 ? -2 : 2} />
          ))}
        </div>

        {/* polaroid stack */}
        <div className="scrap-row scrap-stack">
          <Polaroid photo={byId('p04')} tilt={-3} />
          <Polaroid photo={byId('p05')} tilt={2.5} className="stack-mid" />
          <Polaroid photo={byId('p06')} tilt={-1.5} />
          <Note className="note-float">sunlight era ☀</Note>
        </div>

        <Aside text={GALLERY_ASIDES[0]} />

        {/* tricky split image — contain over blurred duplicate, nothing cropped */}
        <Reveal className="scrap-row">
          <BlurFrame photo={byId('p13')} ratio="4 / 3" className="scrap-blurframe" />
          <div className="scrap-meta-center">
            <p className="scrap-caption">{byId('p13').caption}</p>
            <Note>too good to crop — so I didn't</Note>
          </div>
        </Reveal>

        {/* film strip — the black-outfit era */}
        <Reveal className="filmstrip-block">
          <p className="filmstrip-label">the black-outfit era, on film</p>
          <div className="filmstrip">
            {[byId('p09'), byId('p10'), byId('p11'), byId('p12')].map((p) => (
              <figure key={p.id} className="film-cell grain">
                <div className="film-imgwrap" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                  <FocalImg photo={p} className="film-img" />
                </div>
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Aside text={GALLERY_ASIDES[1]} />

        {/* tilted trio — the walk-away set */}
        <div className="scrap-row scrap-trio">
          <Polaroid photo={byId('p07')} tilt={-4} />
          <Polaroid photo={byId('p08')} tilt={3} className="trio-mid" />
          <Polaroid photo={byId('p16')} tilt={-2} />
        </div>

        {/* constellation — sideways selfies scattered like stars */}
        <div className="constellation-block">
          <div className="constellation">
            {[byId('p14'), byId('p15'), byId('p17'), byId('p19'), byId('p20'), byId('p21'), byId('p22')].map(
              (p, i) => (
                <motion.figure
                  key={p.id}
                  className={`const-photo cp${i + 1}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  whileHover={{ scale: 1.08, rotate: 0, zIndex: 5 }}
                  title={p.caption}
                >
                  <FocalImg photo={p} className="const-img" />
                  <figcaption className="const-cap">{p.caption}</figcaption>
                </motion.figure>
              ),
            )}
            <button className="doodle-star" onClick={onStar} aria-label="a tiny doodled star" title="✦">
              ✦
            </button>
          </div>
          <Note className="note-float">the sideways-selfie constellation ✦</Note>
        </div>

        <Aside text={GALLERY_ASIDES[2]} />

        {/* square polaroids — the filter era */}
        <div className="scrap-row scrap-squares">
          {[byId('p23'), byId('p25'), byId('p26')].map((p, i) => (
            <Polaroid key={p.id} photo={p} tilt={[-2.5, 2, -1][i]} />
          ))}
        </div>

        {/* hills panorama — wide finale */}
        <CineWide photo={byId('p18')} note="the hills!! (and her)" />

        <Aside text={GALLERY_ASIDES[3]} />

        {/* last one — caught mid-turn */}
        <div className="scrap-row scrap-solo">
          <Polaroid photo={byId('p24')} tilt={2.5} />
          <Note className="note-float">← caught mid-turn, obviously</Note>
        </div>

        <Aside text={GALLERY_ASIDES[4]} />
      </div>
    </section>
  );
}
