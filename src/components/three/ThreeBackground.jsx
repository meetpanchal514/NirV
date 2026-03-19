import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import FloatingNails from './FloatingNails'
import NailParticles from './NailParticles'

function Scene() {
  return (
    <>
      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.3} color="#1a2044" />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-8, -5, -3]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[0, 5, 3]} intensity={1.2} color="#f59e0b" distance={20} />
      <pointLight position={[-10, -5, 5]} intensity={0.6} color="#3b82f6" distance={20} />

      <FloatingNails count={20} />
      <NailParticles count={500} />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
