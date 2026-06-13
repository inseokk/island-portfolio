import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Ocean
 * A large flat plane with an animated shader-like color shift
 * to simulate water. Replace with Drei <Water> for a fancier effect later.
 */
export function Ocean() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle color animation to simulate light on water
    const t = state.clock.elapsedTime;
    const r = 0.18 + Math.sin(t * 0.4) * 0.02;
    const g = 0.45 + Math.sin(t * 0.3) * 0.03;
    const b = 0.72 + Math.sin(t * 0.5) * 0.04;
    meshRef.current.material.color.setRGB(r, g, b);
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]} receiveShadow>
      <planeGeometry args={[60, 60, 1, 1]} />
      <meshStandardMaterial transparent opacity={0.85} />
    </mesh>
  );
}
