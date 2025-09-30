// components/Scene.tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Group, Box3, Vector3 } from "three";

function SwimmingClione() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/character.glb?v=6");

  const [scale, setScale] = useState(1);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // ✅ 読み込んだモデルの大きさを測ってスケーリング
  useEffect(() => {
    const bbox = new Box3().setFromObject(clonedScene);
    const size = new Vector3();
    bbox.getSize(size);

    console.log("Original size:", size);

    // 目標サイズ（例えば高さを 3 にする）
    const targetHeight = 3;
    const currentHeight = size.y;
    const s = (targetHeight / currentHeight) * 1.5; // ← さらに1.5倍
    setScale(s);
  }, [clonedScene]);

  // アニメーション（上下のみ）
  useFrame(({ clock }) => {
    if (group.current) {
      const time = clock.getElapsedTime();
      group.current.position.y = Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <group ref={group} scale={[scale, scale, scale]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", background: "transparent" }}
      camera={{ position: [0, 0, 2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <SwimmingClione />
      <OrbitControls enablePan={false} enableZoom={true} autoRotate={false} />
    </Canvas>
  );
}
