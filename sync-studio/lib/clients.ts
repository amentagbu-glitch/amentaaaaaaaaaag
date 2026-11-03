// Real clients shown on the site. Add new ones here (logo in /public/work/<client>/).
export const clients = [
  {
    id: "mous",
    name: "Mou's Doner Kabab",
    logo: "/work/mous/mous-logo.png",
    logoSize: { width: 480, height: 363 },
    links: {
      website: "https://mous.ma",
      instagram: "https://www.instagram.com/mousdonerkabab/",
      tiktok: "https://www.tiktok.com/@mousdonerkabab",
    },
    // Slideshow order. "key" matches work.featured.slides.<key> in the message files.
    reels: [
      { key: "launch", src: "/work/mous/launch-reel.mp4", poster: "/work/mous/launch-reel.jpg" },
      { key: "intro", src: "/work/mous/logo-intro.mp4", poster: "/work/mous/logo-intro.jpg" },
    ],
  },
];
