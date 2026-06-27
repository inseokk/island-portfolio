import { SectionId } from "./islands";

export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  thumbnailColor: string;
  badges: string[];
  body: string;
}

export interface SectionContent {
  title: string;
  body: string;
  projects?: Project[];
}

export const SECTION_CONTENT: Record<SectionId, SectionContent> = {
  about: {
    title: "About Me 🥥",
    body: "Hey! I'm Inseo, a CMU student interested in PM, AR/VR, HCI, and building things that live at the intersection of design and engineering.",
  },
  swe: {
    title: "SWE Projects",
    body: "A collection of software engineering projects.",
    projects: [
      {
        slug: "project-one",
        title: "Timeline",
        description: "Short description of what this project does and why it matters.",
        thumbnailColor: "#AD82BA",
        badges: ["React", "TypeScript", "Node.js"],
        body: "Full project write-up goes here. Describe the problem, your approach, and the outcome.",
      },
      {
        slug: "project-two",
        title: "Project Two",
        description: "Short description of what this project does and why it matters.",
        thumbnailColor: "#A2D3CB",
        badges: ["Python", "Machine Learning", "FastAPI"],
        body: "Full project write-up goes here. Describe the problem, your approach, and the outcome.",
      },
      {
        slug: "project-three",
        title: "Project Three",
        description: "Short description of what this project does and why it matters.",
        thumbnailColor: "#FEDA71",
        badges: ["Unity", "C#", "AR/VR"],
        body: "Full project write-up goes here. Describe the problem, your approach, and the outcome.",
      },
    ],
  },
  pmux: {
    title: "PM / UX Projects",
    body: "Product and UX case studies.",
    projects: [
      {
        slug: "case-study-one",
        title: "Girls On The Run",
        description: "How can we better recruit coaches and volunteers to support Girls on the Run’s programs?.",
        thumbnailColor: "#FE83B1",
        badges: ["UX Research", "AB Testing", "Usability Testing"],
        body: "Full case study write-up goes here. Describe the problem space, research, ideation, and outcomes.",
      },
      {
        slug: "case-study-two",
        title: "Stick-It",
        description: "How can we make the mundane more playful?",
        thumbnailColor: "#E5BDE2",
        badges: ["Designathon", "AR", "Wireframing"],
        body: "Full case study write-up goes here. Describe the problem space, research, ideation, and outcomes.",
      },
      {
        slug: "case-study-three",
        title: "Terrier",
        description: "How can we redesign the TartanHacks user experience?",
        thumbnailColor: "#FEDA71",
        badges: ["Figma", "Prototyping", "Wireframing"],
        body: "Full case study write-up goes here. Describe the problem space, research, ideation, and outcomes.",
      },
    ],
  },
};

export const SECTION_PATHS: Record<SectionId, string> = {
  about: "/about",
  swe: "/swe",
  pmux: "/pmux",
};
