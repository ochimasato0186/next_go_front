import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Group, Box3, Vector3 } from "three";

function SwimmingClione2() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/character.glb");
  const scale = 2500.0;  // 1.5倍さらに大きくしました！

  console.log("Component loaded with scale:", scale);

  // 色変更を一度だけ実行
  const processedScene = useMemo(() => {
    const clonedScene = scene.clone();
    
    // デバッグ: モデルのバウンディングボックスを確認
    const bbox = new Box3().setFromObject(clonedScene);
    const size = new Vector3();
    const center = new Vector3();
    bbox.getSize(size);
    bbox.getCenter(center);
    console.log("Model bounding box size:", size);
    console.log("Model center:", center);
    
    clonedScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: any) => {
            if (mat.color) {
              const r = mat.color.r;
              const g = mat.color.g;  
              const b = mat.color.b;
              
              const isBlueEye = (b > 0.7 && b > r && b > g);
              const isPinkHeart = (r > 0.7 && r > g && r > b && g > 0.3);
              
              const isBodyColor = (
                (Math.abs(r - g) < 0.2 && Math.abs(g - b) < 0.2 && Math.abs(r - b) < 0.2 && r > 0.3) ||
                (r > 0.6 && g > 0.4 && b > 0.3 && r > g && g > b && (r - b) > 0.1) ||
                (r > 0.25 && g > 0.2 && b > 0.15 && r > g && g > b) ||
                (r > 0.2 && r < 0.6 && Math.abs(r - g) < 0.15 && Math.abs(g - b) < 0.15)
              );
              
              if (isBodyColor && !isBlueEye && !isPinkHeart) {
                mat.color.setRGB(1, 1, 1);
                mat.transparent = true;
                mat.opacity = 0.95;
                if (mat.emissive) {
                  mat.emissive.setRGB(0.2, 0.2, 0.2);
                }
              }
            }
          });
        } else {
          if (child.material.color) {
            const r = child.material.color.r;
            const g = child.material.color.g;
            const b = child.material.color.b;
            
            const isBlueEye = (b > 0.7 && b > r && b > g);
            const isPinkHeart = (r > 0.7 && r > g && r > b && g > 0.3);
            
            const isBodyColor = (
              (Math.abs(r - g) < 0.2 && Math.abs(g - b) < 0.2 && Math.abs(r - b) < 0.2 && r > 0.3) ||
              (r > 0.6 && g > 0.4 && b > 0.3 && r > g && g > b && (r - b) > 0.1) ||  
              (r > 0.25 && g > 0.2 && b > 0.15 && r > g && g > b) ||
              (r > 0.2 && r < 0.6 && Math.abs(r - g) < 0.15 && Math.abs(g - b) < 0.15)
            );
            
            if (isBodyColor && !isBlueEye && !isPinkHeart) {
              child.material.color.setRGB(1, 1, 1);
              child.material.transparent = true;  
              child.material.opacity = 0.95;
              if (child.material.emissive) {
                child.material.emissive.setRGB(0.2, 0.2, 0.2);
              }
            }
          }
        }
      }
    });
    
    return clonedScene;
  }, [scene]);

  // 自然なアニメーション（一時停止）
  useFrame(({ clock }) => {
    if (group.current) {
      const time = clock.getElapsedTime();
      // group.current.position.y = Math.sin(time * 2) * 0.2 - 20;  // 位置設定を一時停止
      group.current.rotation.y = Math.sin(time * 0.8) * 0.1;  // 回転のみ維持
      
      // デバッグ用：実際のスケールと位置をログ出力
      if (Math.floor(time) % 5 === 0 && Math.floor(time * 10) % 10 === 0) {
        console.log("Actual scale:", group.current.scale);
        console.log("Actual position:", group.current.position);
      }
    }
  });

  return (
    <group ref={group} scale={[scale, scale, scale]} position={[0, -4, 0]} key={`model-new-${Date.now()}`}>
      <primitive object={processedScene} />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "400px", // 明示的に高さを指定
        background: "transparent",
        pointerEvents: "auto",
      }}
      camera={{ position: [0, 0, 1], fov: 90, near: 0.1, far: 1000 }}
      gl={{
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
        antialias: true,
        toneMapping: 0,
        toneMappingExposure: 2.2,
      }}
      linear={true}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <pointLight position={[-10, 10, 10]} intensity={0.8} />
      <SwimmingClione2 />
      <OrbitControls enablePan={true} enableZoom={true} />
    </Canvas>
  );
}