/* =====================================================================
   YOUR CONTENT — this is the only file you need to edit.
   ---------------------------------------------------------------------
   1. Put your photos in the /photos folder (e.g. photos/city-walk/01.jpg)
   2. Point "src" at them below: src: "photos/city-walk/01.jpg"
   3. Dates use the format "YYYY-MM-DD". Everything sorts itself by date.
   4. Save, commit to GitHub, and your site updates in a minute or two.

   The picsum.photos links below are placeholders. Replace them.
   ===================================================================== */

const SITE = {
  name: "Your Name",                 // shown in the header and homepage
  tagline: "iPhone photography, everyday light, and the road to my first camera.",

  // Homepage intro (your own words)
  intro:
    "I'm in my twenties and I love taking photos for fun. I don't own a camera yet, " +
    "so almost everything here is shot on my iPhone while I save up for a preowned one.",

  // About page. Blank lines start new paragraphs.
  about: `Hi everyone! I'm in my twenties and love taking photos for fun. Since I don't own a camera and can't currently afford one, I mostly shoot on my iPhone, but I'm hoping to buy a preowned camera someday.

Along the way, people have started telling me I often take good photos, so I decided to create this page to document my journey. I'd be thrilled to receive your support and feedback. Thanks so much for sticking around!`,

  gear: ["iPhone (add your model)", "Lightroom Mobile (or your editing app)"],

  // Camera fund tracker on the About page. Set to null to hide it.
  cameraFund: {
    goal: 600,
    saved: 140,
    currency: "$",
    note: "Saving for a preowned mirrorless camera, whichever good deal shows up first.",
  },

  // Links in the footer. Delete any you don't use.
  links: [
    { label: "Instagram", url: "https://instagram.com/yourhandle" },
    { label: "Email", url: "mailto:you@example.com" },
  ],
};

/* ---------------------------------------------------------------------
   ALBUMS
   Each album has a cover, a story, and a list of photos.
   Each photo can have its own caption and date (optional).
   --------------------------------------------------------------------- */
const ALBUMS = [
  {
    id: "golden-hour-walks",               // used in the link, no spaces
    title: "Golden hour walks",
    date: "2026-10-12",
    location: "My neighbourhood",
    cover: "https://picsum.photos/seed/gh1/1600/1100",
    story: `Most evenings in October I took the long way home just to catch the last of the light. Nothing planned, just whatever the sun happened to land on.

These were all shot on my phone, edited lightly. I'm learning that waiting ten more minutes usually beats taking ten more photos.`,
    photos: [
      { src: "https://picsum.photos/seed/gh1/1600/1100", caption: "The light only stayed on this wall for about five minutes.", date: "2026-10-02" },
      { src: "https://picsum.photos/seed/gh2/1100/1500", caption: "Same corner, different day.", date: "2026-10-05" },
      { src: "https://picsum.photos/seed/gh3/1600/1000", caption: "Walking home the long way.", date: "2026-10-09" },
      { src: "https://picsum.photos/seed/gh4/1200/1500", caption: "Shadows doing all the work.", date: "2026-10-12" },
      { src: "https://picsum.photos/seed/gh5/1600/1100", caption: "Last frame before the streetlights came on.", date: "2026-10-12" },
    ],
  },
  {
    id: "weekend-in-the-city",
    title: "A weekend in the city",
    date: "2026-08-23",
    location: "Downtown",
    cover: "https://picsum.photos/seed/city2/1600/1100",
    story: `Two days, one phone, way too much walking. I tried to shoot only things I'd normally walk past without noticing.`,
    photos: [
      { src: "https://picsum.photos/seed/city1/1200/1500", caption: "Morning coffee, before anyone else was up.", date: "2026-08-22" },
      { src: "https://picsum.photos/seed/city2/1600/1100", caption: "Reflections after the rain.", date: "2026-08-22" },
      { src: "https://picsum.photos/seed/city3/1600/1000", caption: "Crossing the bridge at noon.", date: "2026-08-23" },
      { src: "https://picsum.photos/seed/city4/1100/1500", caption: "My favourite window in the whole city.", date: "2026-08-23" },
    ],
  },
  {
    id: "first-roll",
    title: "Where it started",
    date: "2026-05-30",
    location: "Home",
    cover: "https://picsum.photos/seed/first3/1600/1100",
    story: `The first photos people told me were good. Looking back, I'd edit them differently now, but I'm keeping them as they were.`,
    photos: [
      { src: "https://picsum.photos/seed/first1/1600/1100", caption: "The one that started it.", date: "2026-05-11" },
      { src: "https://picsum.photos/seed/first2/1200/1500", caption: "Window light on a slow Sunday.", date: "2026-05-18" },
      { src: "https://picsum.photos/seed/first3/1600/1100", caption: "Still one of my favourites.", date: "2026-05-30" },
    ],
  },
];

/* ---------------------------------------------------------------------
   JOURNAL
   Write in plain text. Blank lines make new paragraphs.
   Formatting you can use:
     **bold**   *italic*   ## A subheading   > A quote
     ![Caption for the photo](photos/your-photo.jpg)   (on its own line)
   --------------------------------------------------------------------- */
const JOURNAL = [
  {
    id: "why-i-started",
    title: "Why I started this page",
    date: "2026-11-01",
    cover: "https://picsum.photos/seed/journal1/1600/1000",
    body: `A few friends kept saying my photos were good, and at some point I started believing them a little.

I don't have a camera. I have a phone, a lot of walks, and a habit of stopping in the middle of the sidewalk when the light hits something. This page is where I'm going to keep all of it.

## What I'm working on

Patience, mostly. And *noticing* things before I reach for my phone.

> Take fewer photos. Look longer.

If you've got feedback, I'd genuinely love to hear it.`,
  },
  {
    id: "camera-fund-update",
    title: "Camera fund, month one",
    date: "2026-10-20",
    body: `Small update: I've started putting a bit aside every week for a preowned camera. It's slow, but it's moving.

I've been reading about which older models still hold up. For now, the iPhone is teaching me **composition** without any distractions, and honestly that might be the best thing for me right now.`,
  },
  {
    id: "editing-on-my-phone",
    title: "How I edit on my phone",
    date: "2026-09-08",
    body: `I keep it simple: straighten, crop, lower the highlights, a little warmth. If a photo needs more than that, it usually wasn't the right photo.

![The before and after that convinced me less is more](https://picsum.photos/seed/edit1/1600/1100)

I'll write a proper breakdown once I've settled on a style.`,
  },
];
