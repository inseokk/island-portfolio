// Central config — all island positions, labels, and section metadata live here.
// When you add/remove sections, this is the only file you need to touch.

export type IslandId = "home" | "about" | "swe" | "pmux";
export type SectionId = Exclude<IslandId, "home">;
export type AnimState = "idle" | "running" | "celebrating";
export type Vec3 = [number, number, number];

export interface MainIslandConfig {
  id: "home";
  position: Vec3;
  color: string;
  size: number;
}

export interface SectionIslandConfig {
  id: SectionId;
  label: string;
  emoji: string;
  position: Vec3;
  color: string;
  size: number;
  bridgeFrom: Vec3;
}

export const MAIN_ISLAND: MainIslandConfig = {
  id: "home",
  position: [0, 0, 0],
  color: "#9FB054",
  size: 2.2,
};

export const SECTION_ISLANDS: SectionIslandConfig[] = [
  {
    id: "about",
    label: "About",
    emoji: "🌴",
    position: [-5, 0, -4],
    color: "#5F873E",
    size: 1.4,
    bridgeFrom: [0, 0, 0],
  },
  {
    id: "swe",
    label: "SWE Projects",
    emoji: "💻",
    position: [5, 0, -3],
    color: "#5F873E",
    size: 1.4,
    bridgeFrom: [0, 0, 0],
  },
  {
    id: "pmux",
    label: "PM / UX Projects",
    emoji: "🎨",
    position: [0, 0, -8],
    color: "#5F873E",
    size: 1.4,
    bridgeFrom: [0, 0, 0],
  },
];

export const AVATAR_START: Vec3 = [0, 0.5, 1.2];

export const AVATAR_TARGETS: Record<IslandId, Vec3> = {
  about: [-5, 0.5, -3.2],
  swe: [5, 0.5, -2.2],
  pmux: [0, 0.5, -7.2],
  home: [0, 0.5, 1.2],
};
