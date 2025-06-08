"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MarchingCubes } from "@react-three/drei";
import * as THREE from "three";

export default function RockForms() {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.reset();

      for (let i = 0; i < 15; i++) {
        const x = Math.sin(t + i) * 0.5 + 0.5;
        const y = Math.cos(t * 0.3 + i) * 0.5 + 0.5;
        const z = Math.sin(t * 0.2 + i * 1.5) * 0.5 + 0.5;
        ref.current.addBall(x, y, z, 0.1, 12);
      }
    }
  });

  return (
    <MarchingCubes
      ref={ref}
      resolution={32}
      maxPolyCount={20000}
      enableUvs={false}
      enableColors={false}
      position={[0, 0, 0]}
    >
      {/* ここで色を白に設定 */}
      <meshStandardMaterial color="white" roughness={1} />
    </MarchingCubes>
  );
}
