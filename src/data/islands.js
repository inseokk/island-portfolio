// Central config — all island positions, labels, and section metadata live here.
// When you add/remove sections, this is the only file you need to touch.

export const MAIN_ISLAND = {
  id: "home",
  position: [0, 0, 0],
  color: "#5a9e6f",
  size: 2.2,
};

export const SECTION_ISLANDS = [
  {
    id: "about",
    label: "About",
    emoji: "🌴",
    position: [-5, 0, -4],
    color: "#4a8c5c",
    size: 1.4,
    bridgeFrom: [0, 0, 0],
  },
  {
    id: "swe",
    label: "SWE Projects",
    emoji: "💻",
    position: [5, 0, -3],
    color: "#3d7a52",
    size: 1.4,
    bridgeFrom: [0, 0, 0],
  },
  {
    id: "pmux",
    label: "PM / UX Projects",
    emoji: "🎨",
    position: [0, 0, -8],
    color: "#4a8c5c",
    size: 1.4,
    bridgeFrom: [0, 0, 0],
  },
];

// Where the avatar starts on the main island
export const AVATAR_START = [0, 0.5, 1.2];

// Per-section: where the avatar should walk TO on each island
export const AVATAR_TARGETS = {
  about:  [-5,   0.5, -3.2],
  swe:    [ 5,   0.5, -2.2],
  pmux:   [ 0,   0.5, -7.2],
  home:   [ 0,   0.5,  1.2],
};
