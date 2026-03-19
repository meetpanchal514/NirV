import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NailMesh({ position, rotation, scale, speed, phase }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime * speed + phase
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.3
    groupRef.current.rotation.x = rotation[0] + t * 0.2
    groupRef.current.rotation.z = rotation[2] + t * 0.15
  })

  // Nail geometry: cylinder body + cone tip
  const bodyGeo = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8), [])
  const tipGeo = useMemo(() => new THREE.ConeGeometry(0.04, 0.12, 8), [])
  const headGeo = useMemo(() => new THREE.CylinderGeometry(0.09, 0.09, 0.04, 12), [])

  const shaftMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c0c0c0',
        metalness: 0.9,
        roughness: 0.15,
        envMapIntensity: 1,
      }),
    []
  )
  const headMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        metalness: 0.8,
        roughness: 0.2,
        emissive: '#f59e0b',
        emissiveIntensity: 0.15,
      }),
    []
  )

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Nail head */}
      <mesh geometry={headGeo} material={headMat} position={[0, 0.32, 0]} />
      {/* Nail shaft */}
      <mesh geometry={bodyGeo} material={shaftMat} position={[0, 0, 0]} />
      {/* Nail tip */}
      <mesh geometry={tipGeo} material={shaftMat} position={[0, -0.36, 0]} rotation={[Math.PI, 0, 0]} />
    </group>
  )
}

export default function FloatingNails({ count = 22 }) {
  const nails = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 5,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: 0.6 + Math.random() * 0.8,
      speed: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  return (
    <group>
      {nails.map((nail) => (
        <NailMesh key={nail.id} {...nail} scale={[nail.scale, nail.scale, nail.scale]} />
      ))}
    </group>
  )
}
