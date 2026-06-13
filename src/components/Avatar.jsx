import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AVATAR_START } from "../data/islands";

/**
 * Avatar
 * Placeholder low-poly avatar (a little capsule + sphere "person").
 * Replace the geometry here with a loaded GLTF from Mixamo later.
 *
 * animState: "idle" | "running" | "celebrating"
 */
export function Avatar({ avatarRef, animState }) {
  const bodyRef = useRef();
  const headRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (!bodyRef.current || !headRef.current) return;

    if (animState === "running") {
      // Bounce up/down while running
      bodyRef.current.position.y = Math.abs(Math.sin(t * 10)) * 0.08;
      // Slight lean forward
      bodyRef.current.rotation.x = 0.15;
    } else if (animState === "celebrating") {
      // Jump!
      bodyRef.current.position.y = Math.abs(Math.sin(t * 14)) * 0.2;
      bodyRef.current.rotation.x = 0;
    } else {
      // Idle breathing sway
      bodyRef.current.position.y = Math.sin(t * 1.5) * 0.02;
      bodyRef.current.rotation.x = 0;
      headRef.current.rotation.y = Math.sin(t * 0.7) * 0.15;
    }
  });

  return (
    <group ref={avatarRef} position={AVATAR_START}>
      {/* Body */}
      <group ref={bodyRef}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.3, 4, 8]} />
          <meshStandardMaterial color="#e8855a" flatShading />
        </mesh>

        {/* Head */}
        <group ref={headRef}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <sphereGeometry args={[0.16, 6, 5]} />
            <meshStandardMaterial color="#f5c5a3" flatShading />
          </mesh>

          {/* Eyes */}
          <mesh position={[-0.06, 0.74, 0.13]}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[0.06, 0.74, 0.13]}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        </group>

        {/* Left arm */}
        <mesh position={[-0.22, 0.32, 0]} rotation={[0, 0, 0.4]} castShadow>
          <capsuleGeometry args={[0.06, 0.22, 4, 6]} />
          <meshStandardMaterial color="#e8855a" flatShading />
        </mesh>

        {/* Right arm */}
        <mesh position={[0.22, 0.32, 0]} rotation={[0, 0, -0.4]} castShadow>
          <capsuleGeometry args={[0.06, 0.22, 4, 6]} />
          <meshStandardMaterial color="#e8855a" flatShading />
        </mesh>

        {/* Left leg */}
        <mesh position={[-0.09, 0.02, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.2, 4, 6]} />
          <meshStandardMaterial color="#5a7ec8" flatShading />
        </mesh>

        {/* Right leg */}
        <mesh position={[0.09, 0.02, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.2, 4, 6]} />
          <meshStandardMaterial color="#5a7ec8" flatShading />
        </mesh>
      </group>
    </group>
  );
}
