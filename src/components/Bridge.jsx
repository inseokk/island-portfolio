import { useMemo } from "react";
import * as THREE from "three";

/**
 * Bridge
 * Draws a simple plank bridge between two 3D points.
 * Automatically rotates and scales to connect any two island positions.
 */
export function Bridge({ from, to }) {
  const { position, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end   = new THREE.Vector3(...to);

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const angle = Math.atan2(dir.x, dir.z);

    return {
      position: [mid.x, -0.05, mid.z],
      rotation: [0, angle, 0],
      length: len,
    };
  }, [from, to]);

  return (
    <group position={position} rotation={rotation}>
      {/* Main deck */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[0.5, 0.06, length]} />
        <meshStandardMaterial color="#c8a96e" flatShading />
      </mesh>

      {/* Left railing */}
      <mesh position={[-0.22, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, length]} />
        <meshStandardMaterial color="#a07840" flatShading />
      </mesh>

      {/* Right railing */}
      <mesh position={[0.22, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, length]} />
        <meshStandardMaterial color="#a07840" flatShading />
      </mesh>
    </group>
  );
}
