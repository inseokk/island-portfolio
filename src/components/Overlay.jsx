import { useEffect } from "react";
import "./Overlay.css";

const CONTENT = {
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

/**
 * Overlay
 * Full-screen 2D panel that slides in when an island is selected.
 * The 3D world keeps running underneath.
 */
export function Overlay({ activeIsland, onClose }) {
  const content = CONTENT[activeIsland];

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!content) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose}>✕</button>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
      </div>
    </div>
  );
}
