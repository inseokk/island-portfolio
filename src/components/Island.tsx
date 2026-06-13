import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { IslandId, Vec3 } from "../data/islands";

interface IslandProps {
  id: IslandId;
  position: Vec3;
  color: string;
  size: number;
  label?: string;
  emoji?: string;
  onSelect: (id: IslandId) => void;
  isActive: boolean;
}

/**
 * Island
 * Renders a single low-poly island as a flattened cylinder (the land)
 * sitting above a slightly larger, darker cylinder (the cliff face).
 * Clicking it calls onSelect(id) to trigger avatar movement.
 */
export function Island({
  id,
  position,
  color,
  size,
  label,
  emoji,
  onSelect,
  isActive,
}: IslandProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.04;
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <mesh position={[0, -0.18, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[size * 0.95, size, 0.35, 7]} />
        <meshStandardMaterial color="#7a5c3a" flatShading />
      </mesh>

      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[size, size * 0.95, 0.22, 7]} />
        <meshStandardMaterial
          color={hovered || isActive ? "#7ecf8e" : color}
          flatShading
        />
      </mesh>

      {emoji && (
        <Text
          position={[0, 1.1, 0]}
          fontSize={0.55}
          anchorX="center"
          anchorY="middle"
        >
          {emoji}
        </Text>
      )}

      {label && (
        <Text
          position={[0, 0.55, 0]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#333"
        >
          {label}
        </Text>
      )}
    </group>
  );
}
