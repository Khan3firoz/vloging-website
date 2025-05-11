"use client"

import { useRef } from "react"
import type * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

function Logo() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.7, 0.2, 64, 8]} />
      <meshStandardMaterial color="#0070f3" roughness={0.3} metalness={0.8} />
    </mesh>
  )
}

export function ThreeScene() {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Logo />
      <Environment preset="city" />
    </Canvas>
  )
}
