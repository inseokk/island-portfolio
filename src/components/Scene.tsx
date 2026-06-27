import { Fragment, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Island } from "./Island";
import { Avatar } from "./Avatar";
import { Bridge } from "./Bridge";
import { Ocean } from "./Ocean";
import { MAIN_ISLAND, SECTION_ISLANDS, AnimState, IslandId, Vec3 } from "../data/islands";

interface SceneProps {
  avatarRef: React.RefObject<THREE.Group | null>;
  animState: AnimState;
  activeIsland: IslandId;
  onIslandClick: (id: IslandId) => void;
}

/**
 * Scene
 * The root Three.js canvas. Sets up:
 *   - Isometric-style camera (orthographic-feel via high FOV + far distance)
 *   - Lighting rig (ambient + warm directional sun)
 *   - All world geometry (ocean, islands, bridges, avatar)
 */
export function Scene({
  avatarRef,
  animState,
  activeIsland,
  onIslandClick,
}: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{
        position: [12, 14, 12],
        fov: 38,
        near: 0.1,
        far: 200,
      }}
      style={{ background: "var(--color-sky-blue)" }}
    >
      <Sky
        distance={450000}
        sunPosition={[8, 12, 6]}
        turbidity={8}
        rayleigh={0.2}
        mieCoefficient={0.003}
        mieDirectionalG={0.7}
      />
      <Stars radius={80} depth={30} count={800} factor={2} fade />

      <ambientLight intensity={0.55} color="#fff8e7" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        color="#fff3c4"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-6, 4, -8]}
        intensity={0.3}
        color="#c8e8ff"
      />

      <Suspense fallback={null}>
        <Ocean />
      </Suspense>

      <Island
        key={MAIN_ISLAND.id}
        {...MAIN_ISLAND}
        label="Inseo's World"
        emoji="🏠"
        isActive={activeIsland === MAIN_ISLAND.id}
        onSelect={onIslandClick}
      />

      {SECTION_ISLANDS.map((island) => {
        const mainPos = new THREE.Vector3(...MAIN_ISLAND.position);
        const islandPos = new THREE.Vector3(...island.position);
        const dir = new THREE.Vector3().subVectors(islandPos, mainPos).normalize();
        const bridgeFrom: Vec3 = [
          mainPos.x + dir.x * (MAIN_ISLAND.size - 0.2),
          0,
          mainPos.z + dir.z * (MAIN_ISLAND.size - 0.2),
        ];
        const bridgeTo: Vec3 = [
          islandPos.x - dir.x * (island.size - 0.2),
          0,
          islandPos.z - dir.z * (island.size - 0.2),
        ];
        return (
          <Fragment key={island.id}>
            <Island
              {...island}
              isActive={activeIsland === island.id}
              onSelect={onIslandClick}
            />
            <Bridge from={bridgeFrom} to={bridgeTo} />
          </Fragment>
        );
      })}

      <Avatar avatarRef={avatarRef} animState={animState} />

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
