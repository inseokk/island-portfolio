import { useState, useCallback } from "react";
import { Scene } from "./components/Scene";
import { Overlay } from "./components/Overlay";
import { useAvatar } from "./hooks/useAvatar";
import "./App.css";

const SECTION_IDS = ["about", "swe", "pmux"];

export default function App() {
  const { avatarRef, animState, activeIsland, walkTo } = useAvatar();
  const [openOverlay, setOpenOverlay] = useState(null);

  const handleIslandClick = useCallback((id) => {
    walkTo(id);
    // Open the overlay after the avatar finishes walking
    // Duration is approximate — matches the GSAP tween in useAvatar
    if (SECTION_IDS.includes(id)) {
      const distance = getApproxDistance(id);
      setTimeout(() => setOpenOverlay(id), distance);
    }
  }, [walkTo]);

  const handleClose = useCallback(() => {
    setOpenOverlay(null);
  }, []);

  return (
    <div className="app">
      {/* Hint text */}
      <div className="hint">Click an island to explore ✨</div>

      {/* 3D World */}
      <Scene
        avatarRef={avatarRef}
        animState={animState}
        activeIsland={activeIsland}
        onIslandClick={handleIslandClick}
      />

      {/* 2D Overlay panel */}
      {openOverlay && (
        <Overlay activeIsland={openOverlay} onClose={handleClose} />
      )}
    </div>
  );
}

// Rough travel time in ms per island so overlay opens when avatar arrives
function getApproxDistance(id) {
  const distances = { about: 1400, swe: 1300, pmux: 1800 };
  return distances[id] ?? 1400;
}
