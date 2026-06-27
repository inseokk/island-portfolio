import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AVATAR_START, AnimState } from "../data/islands";

interface AvatarProps {
  avatarRef: React.RefObject<THREE.Group | null>;
  animState: AnimState;
}

/**
 * Avatar
 * Placeholder low-poly avatar (a little capsule + sphere "person").
 * Replace the geometry here with a loaded GLTF from Mixamo later.
 */
export function Avatar({ avatarRef, animState }: AvatarProps) {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (!bodyRef.current || !headRef.current) return;

    if (animState === "running") {
      bodyRef.current.position.y = Math.abs(Math.sin(t * 10)) * 0.08;
      bodyRef.current.rotation.x = 0.15;
    } else if (animState === "celebrating") {
      bodyRef.current.position.y = Math.abs(Math.sin(t * 14)) * 0.2;
      bodyRef.current.rotation.x = 0;
    } else {
      bodyRef.current.position.y = Math.sin(t * 1.5) * 0.02;
      bodyRef.current.rotation.x = 0;
      headRef.current.rotation.y = Math.sin(t * 0.7) * 0.15;
    }
  });

  return (
    <group ref={avatarRef} position={AVATAR_START}>
      <group ref={bodyRef}>
        {/* Body */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.2, 4, 8]} />
          <meshStandardMaterial color="#AD82BA" flatShading />
        </mesh>

        <group ref={headRef}>
          {/* Head */}
          <mesh position={[0, 0.72, 0]} castShadow>
            <sphereGeometry args={[0.16, 6, 5]} />
            <meshStandardMaterial color="#FDFBEC" flatShading />
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
          {/* Eye highlights */}
          <mesh position={[-0.05, 0.75, 0.15]}>
            <sphereGeometry args={[0.009, 4, 4]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          <mesh position={[0.07, 0.75, 0.15]}>
            <sphereGeometry args={[0.009, 4, 4]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
          {/* Smile */}
          <mesh position={[0, 0.686, 0.135]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.025, 0.009, 4, 8, Math.PI]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        </group>
        {/* Arms */}
        <mesh position={[-0.22, 0.36, 0]} rotation={[0, 0, -0.4]} castShadow>
          <capsuleGeometry args={[0.06, 0.2, 4, 6]} />
          <meshStandardMaterial color="#FDFBEC" flatShading />
        </mesh>
        <mesh position={[0.22, 0.36, 0]} rotation={[0, 0, 0.4]} castShadow>
          <capsuleGeometry args={[0.06, 0.2, 4, 6]} />
          <meshStandardMaterial color="#FDFBEC" flatShading />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.09, 0.02, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.2, 4, 6]} />
          <meshStandardMaterial color="#FDFBEC" flatShading />
        </mesh>
        <mesh position={[0.09, 0.02, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.2, 4, 6]} />
          <meshStandardMaterial color="#FDFBEC" flatShading />
        </mesh>
      </group>
    </group>
  );
}
