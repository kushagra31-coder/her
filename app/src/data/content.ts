// ── her · content data ──────────────────────────────────────────────
// Every photo below was inspected individually. posX/posY are the face-safe
// focal point of the image (percent), applied via CSS `object-position`.
// Captions are unique per photo and describe the actual photograph.

// Asset paths respect the Vite base: '/' locally, '/her/' on GitHub Pages.
// (Vite only rewrites imported URLs — these runtime strings need it manual.)
const B = import.meta.env.BASE_URL;
const asset = (p: string) => `${B}${p.replace(/^\/+/, '')}`;

export interface Photo {
  id: string;
  src: string;
  caption: string;
  posX: number; // face-safe focal x (%)
  posY: number; // face-safe focal y (%)
  w: number;
  h: number;
}

export interface Video {
  id: string;
  src: string;
  poster: string;
  caption: string;
  duration: number; // seconds (measured from the actual file)
}

export const SONG = {
  src: asset('audio/our-song.mp3'),
  title: 'our song',
  artist: 'for her ♡',
  art: asset('assets/photos/photo_25.jpg'),
};

export const PHOTOS: Photo[] = [
  { id: 'p01', src: asset('assets/photos/photo_01.jpg'), caption: 'you look like you wandered into a film set.', posX: 55, posY: 18, w: 838, h: 1280 },
  { id: 'p02', src: asset('assets/photos/photo_02.jpg'), caption: 'the camera has favorites. obviously.', posX: 52, posY: 20, w: 904, h: 1280 },
  { id: 'p03', src: asset('assets/photos/photo_03.jpg'), caption: "some photographs don't need a reason.", posX: 50, posY: 20, w: 1089, h: 1280 },
  { id: 'p04', src: asset('assets/photos/photo_04.jpg'), caption: 'you make quiet look beautiful.', posX: 50, posY: 18, w: 716, h: 1040 },
  { id: 'p05', src: asset('assets/photos/photo_05.jpg'), caption: "this one feels like a moment I'd replay.", posX: 55, posY: 16, w: 752, h: 1040 },
  { id: 'p06', src: asset('assets/photos/photo_06.jpg'), caption: 'sunlight, flowers, you. unfair combination.', posX: 55, posY: 15, w: 755, h: 1040 },
  { id: 'p07', src: asset('assets/photos/photo_07.jpg'), caption: "the kind of pretty that doesn't ask permission.", posX: 45, posY: 16, w: 690, h: 1040 },
  { id: 'p08', src: asset('assets/photos/photo_08.jpg'), caption: 'even walking away, somehow the prettiest one here.', posX: 48, posY: 15, w: 616, h: 1040 },
  { id: 'p09', src: asset('assets/photos/photo_09.jpg'), caption: 'okay. this one is unfair.', posX: 45, posY: 14, w: 867, h: 1600 },
  { id: 'p10', src: asset('assets/photos/photo_10.jpg'), caption: 'the chaos era suits you, unfortunately.', posX: 50, posY: 24, w: 899, h: 1599 },
  { id: 'p11', src: asset('assets/photos/photo_11.jpg'), caption: 'pretty is an understatement here.', posX: 55, posY: 25, w: 899, h: 1599 },
  { id: 'p12', src: asset('assets/photos/photo_12.jpg'), caption: "this expression. that's the whole caption.", posX: 55, posY: 25, w: 899, h: 1599 },
  { id: 'p13', src: asset('assets/photos/photo_13.jpg'), caption: 'glamour and chaos — somehow both.', posX: 68, posY: 25, w: 899, h: 1599 },
  { id: 'p14', src: asset('assets/photos/photo_14.jpg'), caption: 'the burgundy era was a good decision.', posX: 50, posY: 40, w: 899, h: 1599 },
  { id: 'p15', src: asset('assets/photos/photo_15.jpg'), caption: 'even sideways, you make it work.', posX: 62, posY: 42, w: 899, h: 1599 },
  { id: 'p16', src: asset('assets/photos/photo_16.jpg'), caption: 'free like this. I like this version.', posX: 58, posY: 15, w: 899, h: 1599 },
  { id: 'p17', src: asset('assets/photos/photo_17.jpg'), caption: 'golden-hour hair, honestly.', posX: 70, posY: 40, w: 738, h: 1600 },
  { id: 'p18', src: asset('assets/photos/photo_18.jpg'), caption: 'you, the hills, no particular reason.', posX: 30, posY: 35, w: 1051, h: 1600 },
  { id: 'p19', src: asset('assets/photos/photo_19.jpg'), caption: 'flowers in your hair, like you planned it.', posX: 65, posY: 45, w: 738, h: 1600 },
  { id: 'p20', src: asset('assets/photos/photo_20.jpg'), caption: 'tilted, laughing, perfect.', posX: 65, posY: 50, w: 738, h: 1600 },
  { id: 'p21', src: asset('assets/photos/photo_21.jpg'), caption: "there's something about this one.", posX: 55, posY: 50, w: 738, h: 1600 },
  { id: 'p22', src: asset('assets/photos/photo_22.jpg'), caption: "just being her — my favorite version.", posX: 60, posY: 55, w: 738, h: 1600 },
  { id: 'p23', src: asset('assets/photos/photo_23.jpg'), caption: 'the pout. the aliens. the audacity.', posX: 60, posY: 18, w: 1440, h: 1440 },
  { id: 'p24', src: asset('assets/photos/photo_24.jpg'), caption: 'caught mid-turn, obviously.', posX: 48, posY: 28, w: 899, h: 1599 },
  { id: 'p25', src: asset('assets/photos/photo_25.jpg'), caption: 'sun-dappled and completely unaware of the effect.', posX: 55, posY: 35, w: 1440, h: 1440 },
  { id: 'p26', src: asset('assets/photos/photo_26.jpg'), caption: 'the alien-filter era — a personal favorite.', posX: 58, posY: 16, w: 1440, h: 1440 },
  { id: 'p27', src: asset('assets/photos/photo_27.jpg'), caption: 'before I knew you — tiny, curious, already iconic.', posX: 50, posY: 40, w: 899, h: 1599 },
  { id: 'p28', src: asset('assets/photos/photo_28.jpg'), caption: "that look. she's had it forever.", posX: 55, posY: 40, w: 899, h: 1599 },
];

export const GALLERY_PHOTOS = PHOTOS.filter((p) => !['p27', 'p28'].includes(p.id));
export const CHILDHOOD_PHOTOS = PHOTOS.filter((p) => ['p27', 'p28'].includes(p.id));

export const VIDEOS: Video[] = [
  { id: 'v01', src: asset('assets/videos/video_01.mp4'), poster: asset('assets/videos/posters/video_01.jpg'), caption: 'the roses knew what they were doing.', duration: 23 },
  { id: 'v02', src: asset('assets/videos/video_02.mp4'), poster: asset('assets/videos/posters/video_02.jpg'), caption: "she dances like nobody's watching. (everyone is.)", duration: 12 },
  { id: 'v03', src: asset('assets/videos/video_03.mp4'), poster: asset('assets/videos/posters/video_03.jpg'), caption: "the twirl. that's it. that's the caption.", duration: 6 },
  { id: 'v04', src: asset('assets/videos/video_04.mp4'), poster: asset('assets/videos/posters/video_04.jpg'), caption: 'that getting-ready glow.', duration: 7 },
  { id: 'v05', src: asset('assets/videos/video_05.mp4'), poster: asset('assets/videos/posters/video_05.jpg'), caption: 'this laugh. this exact one.', duration: 10 },
  { id: 'v06', src: asset('assets/videos/video_06.mp4'), poster: asset('assets/videos/posters/video_06.jpg'), caption: 'that sideways look again.', duration: 10 },
  { id: 'v07', src: asset('assets/videos/video_07.mp4'), poster: asset('assets/videos/posters/video_07.jpg'), caption: 'main character, no script.', duration: 11 },
  { id: 'v08', src: asset('assets/videos/video_08.mp4'), poster: asset('assets/videos/posters/video_08.jpg'), caption: 'the jhumkas. the smile. done.', duration: 12 },
  { id: 'v09', src: asset('assets/videos/video_09.mp4'), poster: asset('assets/videos/posters/video_09.jpg'), caption: 'golden hour, bottled.', duration: 7 },
  { id: 'v10', src: asset('assets/videos/video_10.mp4'), poster: asset('assets/videos/posters/video_10.jpg'), caption: 'four seconds of pure chaos.', duration: 4 },
  { id: 'v11', src: asset('assets/videos/video_11.mp4'), poster: asset('assets/videos/posters/video_11.jpg'), caption: 'peaceful, but make it aliens.', duration: 8 },
  { id: 'v12', src: asset('assets/videos/video_12.mp4'), poster: asset('assets/videos/posters/video_12.jpg'), caption: 'that laugh, caught.', duration: 6 },
  { id: 'v13', src: asset('assets/videos/video_13.mp4'), poster: asset('assets/videos/posters/video_13.jpg'), caption: 'dramatic. obviously.', duration: 10 },
  { id: 'v14', src: asset('assets/videos/video_14.mp4'), poster: asset('assets/videos/posters/video_14.jpg'), caption: 'even walking away looks good. rude.', duration: 7 },
];

// ── "why you? ♡" ────────────────────────────────────────────────────
export const WHY_YOU = [
  { title: 'your mind', text: 'The way you think — quick, sharp, a little unexpected. Every conversation with you feels like finding a door I didn\u2019t know was there.' },
  { title: 'your presence', text: 'Talking to you never feels like effort. It feels like the easiest part of my day, the part I keep scrolling back to.' },
  { title: 'your smile', text: 'I\u2019ve thought about this a lot, and I\u2019ve decided it\u2019s slightly unfair. It rearranges my whole mood in about two seconds.' },
  { title: 'your randomness', text: 'The random things you say out of nowhere — somehow that\u2019s one of my favourite parts. You keep the world interesting.' },
  { title: 'your energy', text: 'You have this way of making everything feel lighter. Bad days get softer. Good days get brighter. It\u2019s a gift.' },
  { title: 'the combination', text: 'Pretty.\nSmart.\nFunny.\nA little chaotic.\nAnd somehow, impossibly, familiar — like my heart recognised you before I did.' },
];

// ── "strangely familiar" ────────────────────────────────────────────
export const FAMILIAR_LINES = [
  "I haven't known you forever.",
  'But somehow...',
  'you feel familiar.',
  "Maybe it's the way you think.",
  "Maybe it's how similarly our minds work.",
  "Maybe it's the random things we both notice.",
  "Maybe it's just your energy.",
  "I don't really know.",
];

// ── hidden confession ───────────────────────────────────────────────
export const CONFESSION_LINES = [
  'Okay.',
  'tiny confession.',
  'I think I like you a little.',
  'Maybe more than a little.',
  'Maybe the kind of more that rearranges a whole day around a single notification.',
];

// ── the letter ──────────────────────────────────────────────────────
export const LETTER_LINES = [
  "I don't think you realize how noticeable you are.",
  '',
  "Not just because you're pretty.",
  '',
  "It's the way you think.",
  'The way you talk.',
  'The little things you notice.',
  'The fact that somehow, you feel familiar.',
  '',
  'And yes...',
  '',
  'I absolutely notice when you\'re being cute.',
  '',
  'Probably more than I should. ♡',
];

// ── gallery asides (one every 4–5 photos) ───────────────────────────
export const GALLERY_ASIDES = [
  "and then there's this version of you.",
  'another angle. same problem.',
  'you make this look effortless.',
  "okay, I get it. you're pretty.",
  'moving on before I stare too long. ♡',
];

// ── childhood ───────────────────────────────────────────────────────
export const CHILDHOOD_LINES = [
  "I wasn't there for these moments.",
  "I don't know the stories behind them.",
  'But I like knowing that this little version of you existed.',
  'somehow, she grew into this person.',
];

// ── final scene ─────────────────────────────────────────────────────
export const FINAL_LINES = [
  'so...',
  'after all these pictures...',
  'all these little things I noticed...',
  "and everything I still don't know about you...",
  "there's only one thing I'm fairly sure about.",
];

// Lilies — her favorite flower. A single cute lily, sprinkled through the site.
export const SINGLE_LILY = {
  src: asset('assets/lilies/lily-single.png'),
  alt: 'a single lily',
};

// A closing gift in the final scene.
export const LILIES = {
  src: asset('assets/lilies/lily-single.png'),
  alt: 'a single lily for her',
};
