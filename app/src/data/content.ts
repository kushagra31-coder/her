// ─── CONTENT DATA ────────────────────────────────────────────
// Edit all text content here in one place.

export const SITE_CONTENT = {
  openingLine: "for the girl who makes ordinary days feel special ♡",
  openingSubtitle: "someone very, very dear to me", // wait, maybe change this? "someone unusually special to me"
  openingCTA: "open this ♡",

  heroTitle: "she's the kind of person you remember.",
  heroSubtitle: "my favorite collection of little moments ♡",

  letterTitle: "you feel familiar",
  letterQuote: `I haven't known you forever.\nBut somehow, talking to you doesn't feel complicated.\nThere's something oddly familiar about you.\nMaybe it's the way you think.\nMaybe it's the similarities.\nMaybe it's just your energy.\nI don't really know.\nI just know I like it.`,
  letterBody: `There's a kind of magic in noticing someone who makes you feel like you've known them longer than you actually have. You walk into a room and the whole thing shifts — not because you're loud about it, but because you're you. Quietly, warmly, impossibly you.\n\nI've been trying to find the right words. Some things just live in the space between moments — in the photos, the laughs, the way you look at the world like it owes you nothing and still find beauty in it.\n\nSo I made this. A small, imperfect, completely heartfelt little corner of the internet, just because you deserve to see yourself the way the people who notice you see you.\n\nHopefully, you smile at least once. ♡`,
  letterSignature: "with all the love ♡",

  cinemaTitle: "little pieces of her",
  cinemaSubtitle: "captured, kept, cherished",

  childhoodTitle: "tiny her ♡",
  childhoodSubtitle: "the beginning of someone extraordinary",

  timelineTitle: "her chapters",
  timelineSubtitle: "a story told in moments",

  wishButton: "make a little wish ♡",
  wishMessage: "May you always have reasons to smile.\nAnd may you always know how loved you are.",

  finalTitle: "some people are part of your story.",
  finalSubtitle: "you are one of my favorite chapters.",
  finalCredit: "made with too many memories ♡",

  musicTitle: "a little song for you ♡",
};

// ─── PHOTO CHAPTERS ─────────────────────────────────────────
export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  chapter: 'sari' | 'versions' | 'soft' | 'childhood' | 'nature';
  rotation?: number; // polaroid tilt degrees
  featured?: boolean;
}

export const PHOTOS: Photo[] = [
  // ── CHAPTER A: "that sari day" ── photos 01–08 (white/red sari, outdoor)
  {
    id: 'p01',
    src: '/assets/photos/photo_01.jpg',
    alt: 'Standing tall in white and red sari among bamboo trees',
    caption: 'how is this even real ♡',
    chapter: 'sari',
    rotation: -2,
    featured: false,
  },
  {
    id: 'p02',
    src: '/assets/photos/photo_02.jpg',
    alt: 'Looking sideways in white sari, golden jewellery catching sunlight',
    caption: 'pretty without trying',
    chapter: 'sari',
    rotation: 1.5,
    featured: true, // ← hero image candidate
  },
  {
    id: 'p03',
    src: '/assets/photos/photo_03.jpg',
    alt: 'Seated on fallen log in white sari, looking down softly',
    caption: 'one of those moments',
    chapter: 'sari',
    rotation: -1,
  },
  {
    id: 'p04',
    src: '/assets/photos/photo_04.jpg',
    alt: 'Looking down gracefully in white sari, natural garden setting',
    chapter: 'sari',
    rotation: 2,
  },
  {
    id: 'p05',
    src: '/assets/photos/photo_05.jpg',
    alt: 'Side profile in white sari, focused gaze among greenery',
    chapter: 'sari',
    rotation: -1.5,
  },
  {
    id: 'p06',
    src: '/assets/photos/photo_06.jpg',
    alt: 'Standing gracefully in white sari looking at floral details',
    chapter: 'sari',
    rotation: 0.5,
  },
  {
    id: 'p07',
    src: '/assets/photos/photo_07.jpg',
    alt: 'Back turned, red rose in hair, sari drape flowing beautifully',
    caption: 'the smile',
    chapter: 'sari',
    rotation: -2.5,
  },
  {
    id: 'p08',
    src: '/assets/photos/photo_08.jpg',
    alt: 'Back view standing among bamboo in white and red sari',
    chapter: 'sari',
    rotation: 1,
  },

  // ── CHAPTER B: "different versions of her" ── black, red/cream, filter looks
  {
    id: 'p09',
    src: '/assets/photos/photo_09.jpg',
    alt: 'Mysterious look in black outfit with tinted wavy hair, garden',
    caption: 'the dark era ✦',
    chapter: 'versions',
    rotation: -1.5,
  },
  {
    id: 'p10',
    src: '/assets/photos/photo_10.jpg',
    alt: 'Soft warm portrait in black outfit, golden-toned bokeh background',
    caption: 'soft focus era',
    chapter: 'versions',
    rotation: 2,
  },
  {
    id: 'p11',
    src: '/assets/photos/photo_11.jpg',
    alt: 'Close-up portrait in red sari with dreamy soft focus',
    caption: 'the smile ♡',
    chapter: 'soft',
    rotation: -1,
    featured: true,
  },
  {
    id: 'p12',
    src: '/assets/photos/photo_12.jpg',
    alt: 'Close-up in red sari, piercing gaze, studio-like lighting',
    chapter: 'soft',
    rotation: 1.5,
  },

  // ── CHAPTER C: "soft little moments" ── filter selfies
  {
    id: 'p13',
    src: '/assets/photos/photo_13.jpg',
    alt: 'Double-exposure filter selfie in pink, spiderweb glam art',
    caption: 'chaos and glamour ✦',
    chapter: 'versions',
    rotation: -2,
  },
  {
    id: 'p14',
    src: '/assets/photos/photo_14.jpg',
    alt: 'Burgundy wavy hair selfie in green top on metro/bus',
    caption: 'burgundy era',
    chapter: 'versions',
    rotation: 1,
  },
  {
    id: 'p15',
    src: '/assets/photos/photo_15.jpg',
    alt: 'Sideways purple outfit close-up, train vibes selfie',
    chapter: 'versions',
    rotation: -0.5,
  },
  {
    id: 'p16',
    src: '/assets/photos/photo_16.jpg',
    alt: 'Outdoor portrait with waterfall, red top and white skirt',
    caption: 'free like this ♡',
    chapter: 'nature',
    rotation: -2,
    featured: false,
  },
  {
    id: 'p17',
    src: '/assets/photos/photo_17.jpg',
    alt: 'Back-turned nature shot, misty green hills and white skirt',
    chapter: 'nature',
    rotation: 2.5,
  },
  {
    id: 'p18',
    src: '/assets/photos/photo_18.jpg',
    alt: 'Tilted close-up selfie, burgundy hair, resting on hands',
    caption: 'golden hour her',
    chapter: 'soft',
    rotation: -1.5,
  },
  {
    id: 'p19',
    src: '/assets/photos/photo_19.jpg',
    alt: 'Close-up with flower in burgundy hair and daisy necklace',
    caption: 'she wore flowers',
    chapter: 'soft',
    rotation: 1,
  },
  {
    id: 'p20',
    src: '/assets/photos/photo_20.jpg',
    alt: 'Purple outfit selfie with earrings in transit',
    chapter: 'versions',
    rotation: -1,
  },
  {
    id: 'p21',
    src: '/assets/photos/photo_21.jpg',
    alt: 'Wine-dark hair close-up on white surface, looking at camera',
    chapter: 'soft',
    rotation: 2,
  },
  {
    id: 'p22',
    src: '/assets/photos/photo_22.jpg',
    alt: 'Green top back-view doorframe portrait, hair flowing',
    caption: 'just being her',
    chapter: 'versions',
    rotation: -2.5,
  },
  {
    id: 'p23',
    src: '/assets/photos/photo_23.jpg',
    alt: 'Pouting in black saree at home, mirror filter moment',
    chapter: 'versions',
    rotation: 1.5,
  },
  {
    id: 'p24',
    src: '/assets/photos/photo_24.jpg',
    alt: 'Standing pose in black saree at home, candid filter',
    chapter: 'versions',
    rotation: -1,
  },
  {
    id: 'p25',
    src: '/assets/photos/photo_25.jpg',
    alt: 'Sun-dappled close-up portrait, green top, alien filter art',
    caption: 'sunshine face ♡',
    chapter: 'soft',
    rotation: 2,
    featured: true,
  },
  {
    id: 'p26',
    src: '/assets/photos/photo_26.jpg',
    alt: 'Reddish wine hair close-up lying down, pink lips, earrings',
    chapter: 'soft',
    rotation: -1.5,
  },

  // ── CHAPTER D: "tiny her" ── childhood photos
  {
    id: 'p27',
    src: '/assets/photos/photo_27.jpg',
    alt: 'Childhood photo — small girl with dark hair and solemn eyes',
    caption: 'tiny memory',
    chapter: 'childhood',
    rotation: -2,
  },
  {
    id: 'p28',
    src: '/assets/photos/photo_28.jpg',
    alt: 'Baby photo — tiny girl in pink with bindi, wide curious eyes',
    caption: 'where it all began ♡',
    chapter: 'childhood',
    rotation: 2,
  },
];

// ─── VIDEO GROUPS ────────────────────────────────────────────
export interface VideoItem {
  id: string;
  src: string;
  poster?: string;
  caption: string;
  group: 'sari' | 'portrait' | 'filter' | 'casual';
  aspect?: 'portrait' | 'landscape';
}

export const VIDEOS: VideoItem[] = [
  // Group A: sari/outdoor (4.55–5.01 PM)
  {
    id: 'v01',
    src: '/assets/videos/video_01.mp4',
    caption: 'the sari chapter ♡',
    group: 'sari',
    aspect: 'portrait',
  },
  {
    id: 'v02',
    src: '/assets/videos/video_02.mp4',
    caption: 'golden afternoon',
    group: 'sari',
    aspect: 'portrait',
  },
  {
    id: 'v03',
    src: '/assets/videos/video_03.mp4',
    caption: 'she moved like poetry',
    group: 'sari',
    aspect: 'portrait',
  },
  {
    id: 'v04',
    src: '/assets/videos/video_04.mp4',
    caption: 'caught in the light',
    group: 'sari',
    aspect: 'portrait',
  },
  {
    id: 'v05',
    src: '/assets/videos/video_05.mp4',
    caption: 'that day we filmed everything',
    group: 'sari',
    aspect: 'portrait',
  },
  // Group B: portrait/close-up/filter (5.28–5.36 PM)
  {
    id: 'v06',
    src: '/assets/videos/video_06.mp4',
    caption: 'close-up, unfiltered ♡',
    group: 'portrait',
    aspect: 'portrait',
  },
  {
    id: 'v07',
    src: '/assets/videos/video_07.mp4',
    caption: 'the soft focus era',
    group: 'portrait',
    aspect: 'portrait',
  },
  {
    id: 'v08',
    src: '/assets/videos/video_08.mp4',
    caption: 'just her, being her',
    group: 'portrait',
    aspect: 'portrait',
  },
  {
    id: 'v09',
    src: '/assets/videos/video_09.mp4',
    caption: 'one of those evenings',
    group: 'filter',
    aspect: 'portrait',
  },
  {
    id: 'v10',
    src: '/assets/videos/video_10.mp4',
    caption: 'tiny reel',
    group: 'filter',
    aspect: 'portrait',
  },
  {
    id: 'v11',
    src: '/assets/videos/video_11.mp4',
    caption: 'she looked like this ♡',
    group: 'casual',
    aspect: 'portrait',
  },
  {
    id: 'v12',
    src: '/assets/videos/video_12.mp4',
    caption: 'a moment kept',
    group: 'casual',
    aspect: 'portrait',
  },
  {
    id: 'v13',
    src: '/assets/videos/video_13.mp4',
    caption: 'pretty girl, pretty light',
    group: 'casual',
    aspect: 'portrait',
  },
  {
    id: 'v14',
    src: '/assets/videos/video_14.mp4',
    caption: 'and this one too ♡',
    group: 'casual',
    aspect: 'portrait',
  },
];

// ─── TIMELINE ────────────────────────────────────────────────
export const TIMELINE = [
  {
    id: 't1',
    title: 'the sari chapter',
    note: 'she dressed like a goddess and forgot to tell anyone',
    photo: '/assets/photos/photo_02.jpg',
    alt: 'the sari day portrait',
    color: '#8b2635',
  },
  {
    id: 't2',
    title: 'the nature era',
    note: 'standing in fields like she belonged to the green and the mist',
    photo: '/assets/photos/photo_17.jpg',
    alt: 'nature era portrait',
    color: '#5a7a4a',
  },
  {
    id: 't3',
    title: 'the dark aesthetic',
    note: 'black outfit, wavy hair, and absolutely zero explanations',
    photo: '/assets/photos/photo_09.jpg',
    alt: 'dark aesthetic portrait',
    color: '#2d2d3a',
  },
  {
    id: 't4',
    title: 'the burgundy hair era',
    note: 'she changed her hair and somehow became even more her',
    photo: '/assets/photos/photo_14.jpg',
    alt: 'burgundy hair selfie',
    color: '#7d2040',
  },
  {
    id: 't5',
    title: 'the soft filter days',
    note: 'close-ups taken with too much love and good lighting',
    photo: '/assets/photos/photo_11.jpg',
    alt: 'soft portrait close-up',
    color: '#c9816a',
  },
  {
    id: 't6',
    title: 'tiny her',
    note: 'once upon a time, she was this small. still had that look.',
    photo: '/assets/photos/photo_28.jpg',
    alt: 'childhood photo',
    color: '#c9a84c',
  },
];
