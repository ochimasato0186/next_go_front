import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Group, Color } from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function SwimmingClione() {
  const group = useRef<Group>(null)
  const { scene } = useGLTF('/models/character.glb')
  const scale = 1.8

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2
      group.current.position.x = -0.5 * (scale - 1)
    }
  })

  // モデルの色編集は一切行わない（GLB本来の色で表示）

  return <primitive ref={group} object={scene} scale={scale} />
}

export default function Scene() {
  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      {/* ライト */}
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2.0} />
      {/* モデル */}
      <SwimmingClione />
      {/* カメラ操作 */}
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
