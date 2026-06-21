import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Water } from "three/examples/jsm/objects/Water.js";
import * as THREE from "three";

extend({ Water });

declare module "@react-three/fiber" {
  interface ThreeElements {
    water: any;
  }
}

const GEOM = new THREE.PlaneGeometry(60, 60);
const SUN_DIR = new THREE.Vector3(8, 12, 6).normalize();
const COLOR_A = new THREE.Color("#A2D3CB");
const COLOR_B = new THREE.Color("#B0D8E1");

export function Ocean() {
  const ref = useRef<Water>(null);

  const waterNormals = useTexture(
    "https://threejs.org/examples/textures/waternormals.jpg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const u = (ref.current.material as THREE.ShaderMaterial).uniforms;
    u["time"].value += delta * 0.5;
    const t = (Math.sin(state.clock.elapsedTime * 0.4) + 1) / 2;
    u["waterColor"].value.lerpColors(COLOR_A, COLOR_B, t);
  });

  return (
    <water
      ref={ref}
      args={[
        GEOM,
        {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals,
          waterColor: COLOR_A,
          sunColor: 0xfff3c4,
          sunDirection: SUN_DIR,
          distortionScale: 3.0,
          fog: false,
          alpha: 0.75,
        },
      ]}
      rotation-x={-Math.PI / 2}
      position-y={-0.35}
      receiveShadow
    />
  );
}
