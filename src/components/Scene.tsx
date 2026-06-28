import { Fragment, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Stars } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { Island } from "./Island";
import { Avatar } from "./Avatar";
import { Bridge } from "./Bridge";
import { Ocean } from "./Ocean";
import { MAIN_ISLAND, SECTION_ISLANDS, AnimState, IslandId, Vec3 } from "../data/islands";

const MOVE_SPEED = 3.5;
const X_MIN = -7, X_MAX = 7, Z_MIN = -9.5, Z_MAX = 3;

interface KeyboardControllerProps {
  avatarRef: React.RefObject<THREE.Group | null>;
  keysRef: React.RefObject<Set<string>>;
  onAnimStateChange: (state: AnimState) => void;
}

function KeyboardController({ avatarRef, keysRef, onAnimStateChange }: KeyboardControllerProps) {
  const { camera } = useThree();
  const prevAnimState = useRef<AnimState>("idle");

  useFrame((_, delta) => {
    if (!avatarRef.current) return;

    const keys = keysRef.current;

    if (keys.size === 0) {
      if (prevAnimState.current !== "idle") {
        prevAnimState.current = "idle";
        onAnimStateChange("idle");
      }
      return;
    }

    // Keyboard movement takes priority — cancel any active GSAP position tween
    gsap.killTweensOf(avatarRef.current.position);

    // Camera-relative XZ directions
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.length() < 0.001) return;
    forward.normalize();

    const right = new THREE.Vector3()
      .crossVectors(forward, new THREE.Vector3(0, 1, 0))
      .normalize();

    const vel = new THREE.Vector3();
    if (keys.has("w") || keys.has("arrowup")) vel.add(forward);
    if (keys.has("s") || keys.has("arrowdown")) vel.sub(forward);
    if (keys.has("d") || keys.has("arrowright")) vel.add(right);
    if (keys.has("a") || keys.has("arrowleft")) vel.sub(right);

    if (vel.length() < 0.001) return;

    vel.normalize().multiplyScalar(MOVE_SPEED * delta);

    const pos = avatarRef.current.position;
    pos.x = Math.max(X_MIN, Math.min(X_MAX, pos.x + vel.x));
    pos.z = Math.max(Z_MIN, Math.min(Z_MAX, pos.z + vel.z));

    // Face movement direction
    avatarRef.current.rotation.y = Math.atan2(vel.x, vel.z);

    if (prevAnimState.current !== "running") {
      prevAnimState.current = "running";
      onAnimStateChange("running");
    }
  });

  return null;
}

interface SceneProps {
  avatarRef: React.RefObject<THREE.Group | null>;
  animState: AnimState;
  activeIsland: IslandId;
  onIslandClick: (id: IslandId) => void;
  keysRef: React.RefObject<Set<string>>;
  onSetAnimState: (state: AnimState) => void;
}

export function Scene({
  avatarRef,
  animState,
  activeIsland,
  onIslandClick,
  keysRef,
  onSetAnimState,
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

      <KeyboardController
        avatarRef={avatarRef}
        keysRef={keysRef}
        onAnimStateChange={onSetAnimState}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.4}
        minPolarAngle={Math.PI / 6}
        target={[0, 0, -2]}
      />
    </Canvas>
  );
}
