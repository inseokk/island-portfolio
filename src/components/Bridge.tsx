import { useMemo } from "react";
import * as THREE from "three";
import { Vec3 } from "../data/islands";

interface BridgeProps {
  from: Vec3;
  to: Vec3;
}

/**
 * Bridge
 * Draws a simple plank bridge between two 3D points.
 * Automatically rotates and scales to connect any two island positions.
 */
export function Bridge({ from, to }: BridgeProps) {
  const { position, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const angle = Math.atan2(dir.x, dir.z);

    return {
      position: [mid.x, -0.05, mid.z] as Vec3,
      rotation: [0, angle, 0] as Vec3,
      length: len,
    };
  }, [from, to]);

  return (
    <group position={position} rotation={rotation}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[0.5, 0.06, length]} />
        <meshStandardMaterial color="#c8a96e" flatShading />
      </mesh>

      <mesh position={[-0.22, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, length]} />
        <meshStandardMaterial color="#a07840" flatShading />
      </mesh>

      <mesh position={[0.22, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, length]} />
        <meshStandardMaterial color="#a07840" flatShading />
      </mesh>
    </group>
  );
}
