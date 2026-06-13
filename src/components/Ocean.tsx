import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ocean
 * A large flat plane with an animated shader-like color shift
 * to simulate water. Replace with Drei <Water> for a fancier effect later.
 */
export function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material;
    if (!(material instanceof THREE.MeshStandardMaterial)) return;

    const t = state.clock.elapsedTime;
    const r = 0.18 + Math.sin(t * 0.4) * 0.02;
    const g = 0.45 + Math.sin(t * 0.3) * 0.03;
    const b = 0.72 + Math.sin(t * 0.5) * 0.04;
    material.color.setRGB(r, g, b);
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.35, 0]}
      receiveShadow
    >
      <planeGeometry args={[60, 60, 1, 1]} />
      <meshStandardMaterial transparent opacity={0.85} />
    </mesh>
  );
}
