import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function DetailedNail() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
  })

  const shaftMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4d4d4',
        metalness: 0.95,
        roughness: 0.1,
        envMapIntensity: 1.5,
      }),
    []
  )
  const headMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        metalness: 0.85,
        roughness: 0.15,
        emissive: '#b45309',
        emissiveIntensity: 0.2,
      }),
    []
  )
  const tipMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#a8a8a8',
        metalness: 0.98,
        roughness: 0.08,
      }),
    []
  )

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Head */}
      <mesh material={headMat} position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.12, 24]} />
      </mesh>
      {/* Head bevel */}
      <mesh material={headMat} position={[0, 1.27, 0]}>
        <cylinderGeometry args={[0.28, 0.18, 0.08, 24]} />
      </mesh>
      {/* Shaft */}
      <mesh material={shaftMat} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 2.4, 16]} />
      </mesh>
      {/* Ring grooves */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => (
        <mesh key={i} material={shaftMat} position={[0, y, 0]}>
          <torusGeometry args={[0.125, 0.018, 8, 24]} />
        </mesh>
      ))}
      {/* Tip */}
      <mesh material={tipMat} position={[0, -1.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.3, 16]} />
      </mesh>
    </group>
  )
}

export default function ProductViewer({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`} style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [3, 1, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
        <pointLight position={[-4, 3, -3]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[4, -2, 3]} intensity={0.6} color="#f59e0b" />

        <DetailedNail />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={8} blur={2} />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  )
}
