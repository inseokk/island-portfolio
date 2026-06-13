import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Island } from "./Island";
import { Avatar } from "./Avatar";
import { Bridge } from "./Bridge";
import { Ocean } from "./Ocean";
import { MAIN_ISLAND, SECTION_ISLANDS } from "../data/islands";

/**
 * Scene
 * The root Three.js canvas. Sets up:
 *   - Isometric-style camera (orthographic-feel via high FOV + far distance)
 *   - Lighting rig (ambient + warm directional sun)
 *   - All world geometry (ocean, islands, bridges, avatar)
 *
 * Props:
 *   avatarRef     — from useAvatar hook
 *   animState     — from useAvatar hook
 *   activeIsland  — currently selected island id
 *   onIslandClick — callback(id) when island is clicked
 */
export function Scene({ avatarRef, animState, activeIsland, onIslandClick }) {
  return (
    <Canvas
      shadows
      camera={{
        position: [12, 14, 12],
        fov: 38,
        near: 0.1,
        far: 200,
      }}
      style={{ background: "#a8d8ea" }}
    >
      {/* Sky stars (subtle, adds depth) */}
      <Stars radius={80} depth={30} count={800} factor={2} fade />

      {/* Lighting */}
      <ambientLight intensity={0.55} color="#fff8e7" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        color="#fff3c4"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Soft fill from opposite side */}
      <directionalLight position={[-6, 4, -8]} intensity={0.3} color="#c8e8ff" />

      {/* Ocean */}
      <Ocean />

      {/* Main (home) island */}
      <Island
        key={MAIN_ISLAND.id}
        {...MAIN_ISLAND}
        label="Inseo's World"
        emoji="🏠"
        isActive={activeIsland === MAIN_ISLAND.id}
        onSelect={onIslandClick}
      />

      {/* Section islands + bridges */}
      {SECTION_ISLANDS.map((island) => (
        <>
          <Island
            key={island.id}
            {...island}
            isActive={activeIsland === island.id}
            onSelect={onIslandClick}
          />
          <Bridge
            key={`bridge-${island.id}`}
            from={MAIN_ISLAND.position}
            to={island.position}
          />
        </>
      ))}

      {/* Avatar */}
      <Avatar avatarRef={avatarRef} animState={animState} />

      {/* Camera controls — limited to orbit so isometric feel is preserved */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={28}
        maxPolarAngle={Math.PI / 2.4}
        minPolarAngle={Math.PI / 6}
        target={[0, 0, -2]}
      />
    </Canvas>
  );
}
