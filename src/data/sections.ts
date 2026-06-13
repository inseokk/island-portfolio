import { SectionId } from "./islands";

export interface SectionContent {
  title: string;
  body: string;
}

export const SECTION_CONTENT: Record<SectionId, SectionContent> = {
  about: {
    title: "About Me 🌴",
    body: "Hey! I'm Inseo — a CMU student interested in AR/VR, HCI, and building things that live at the intersection of design and engineering. Fill this in with your story!",
  },
  swe: {
    title: "SWE Projects 💻",
    body: "A collection of software engineering projects. Add your GitHub links, descriptions, and tech stacks here.",
  },
  pmux: {
    title: "PM / UX Projects 🎨",
    body: "Product and UX case studies. Add your process work, Figma links, and outcomes here.",
  },
};

export const SECTION_PATHS: Record<SectionId, string> = {
  about: "/about",
  swe: "/swe",
  pmux: "/pmux",
};
