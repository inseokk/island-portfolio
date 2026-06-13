import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { AVATAR_TARGETS, AnimState, IslandId } from "../data/islands";

/**
 * useAvatar
 * Manages avatar position, animation state, and GSAP-powered movement.
 *
 * Returns:
 *   avatarRef      — attach to the avatar <group> in the scene
 *   animState      — "idle" | "running" | "celebrating"
 *   activeIsland   — which island id the avatar is on (or heading to)
 *   walkTo(id)     — call with an island id to trigger movement
 */
export function useAvatar() {
  const avatarRef = useRef<THREE.Group>(null);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [activeIsland, setActiveIsland] = useState<IslandId>("home");

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

  return { avatarRef, animState, activeIsland, walkTo };
}
