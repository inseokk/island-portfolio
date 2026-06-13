import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Scene } from "../components/Scene";
import { useAvatar } from "../hooks/useAvatar";
import { IslandId, SectionId } from "../data/islands";
import { SECTION_PATHS } from "../data/sections";
import "../App.css";

const SECTION_IDS: SectionId[] = ["about", "swe", "pmux"];

function isSectionId(id: IslandId): id is SectionId {
  return SECTION_IDS.includes(id as SectionId);
}

export default function HomePage() {
  const navigate = useNavigate();
  const { avatarRef, animState, activeIsland, walkTo } = useAvatar();

  const handleIslandClick = useCallback(
    (id: IslandId) => {
      if (isSectionId(id)) {
        walkTo(id, () => navigate(SECTION_PATHS[id]));
      } else {
        walkTo(id);
      }
    },
    [walkTo, navigate]
  );

  return (
    <div className="app">
      <div className="hint">Click an island to explore ✨</div>

      <Scene
        avatarRef={avatarRef}
        animState={animState}
        activeIsland={activeIsland}
        onIslandClick={handleIslandClick}
      />
    </div>
  );
}
