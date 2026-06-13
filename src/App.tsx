import { useState, useCallback } from "react";
import { Scene } from "./components/Scene";
import { Overlay } from "./components/Overlay";
import { useAvatar } from "./hooks/useAvatar";
import { IslandId, SectionId } from "./data/islands";
import "./App.css";

const SECTION_IDS: SectionId[] = ["about", "swe", "pmux"];

function isSectionId(id: IslandId): id is SectionId {
  return SECTION_IDS.includes(id as SectionId);
}

export default function App() {
  const { avatarRef, animState, activeIsland, walkTo } = useAvatar();
  const [openOverlay, setOpenOverlay] = useState<SectionId | null>(null);

  const handleIslandClick = useCallback(
    (id: IslandId) => {
      walkTo(id);
      if (isSectionId(id)) {
        const distance = getApproxDistance(id);
        setTimeout(() => setOpenOverlay(id), distance);
      }
    },
    [walkTo]
  );

  const handleClose = useCallback(() => {
    setOpenOverlay(null);
  }, []);

  return (
    <div className="app">
      <div className="hint">Click an island to explore ✨</div>

      <Scene
        avatarRef={avatarRef}
        animState={animState}
        activeIsland={activeIsland}
        onIslandClick={handleIslandClick}
      />

      {openOverlay && (
        <Overlay activeIsland={openOverlay} onClose={handleClose} />
      )}
    </div>
  );
}

function getApproxDistance(id: SectionId): number {
  const distances: Record<SectionId, number> = {
    about: 1400,
    swe: 1300,
    pmux: 1800,
  };
  return distances[id];
}
