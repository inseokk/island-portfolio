import { useRef, useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { AVATAR_TARGETS, AnimState, IslandId } from "../data/islands";

const MOVEMENT_KEYS = new Set([
  "w", "a", "s", "d",
  "arrowup", "arrowdown", "arrowleft", "arrowright",
]);

export function useAvatar() {
  const avatarRef = useRef<THREE.Group>(null);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [activeIsland, setActiveIsland] = useState<IslandId>("home");
  const keysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!MOVEMENT_KEYS.has(key)) return;
      e.preventDefault();
      keysRef.current.add(key);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const walkTo = useCallback(
    (islandId: IslandId, onComplete?: () => void) => {
      if (!avatarRef.current) return;
      if (activeIsland === islandId) return;

      const target = AVATAR_TARGETS[islandId];
      if (!target) return;

      setAnimState("running");
      setActiveIsland(islandId);

      const current = avatarRef.current.position;
      const angle = Math.atan2(target[0] - current.x, target[2] - current.z);
      avatarRef.current.rotation.y = angle;

      const dx = target[0] - current.x;
      const dz = target[2] - current.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      const duration = Math.max(0.8, distance * 0.18);

      gsap.to(avatarRef.current.position, {
        x: target[0],
        y: target[1],
        z: target[2],
        duration,
        ease: "power1.inOut",
        onComplete: () => {
          onComplete?.();
          setAnimState("celebrating");
          setTimeout(() => setAnimState("idle"), 800);
        },
      });
    },
    [activeIsland]
  );

  return { avatarRef, animState, setAnimState, activeIsland, walkTo, keysRef };
}
