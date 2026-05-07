"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5eead4"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.08
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.12
      torusRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.2 + 1
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = state.clock.elapsedTime * 0.1
      octaRef.current.rotation.z = state.clock.elapsedTime * 0.08
      octaRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3 + 1) * 0.25 - 1
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#0d9488"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={torusRef} position={[-2.5, 1, -3]}>
        <torusGeometry args={[0.4, 0.15, 16, 32]} />
        <meshStandardMaterial
          color="#14b8a6"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh ref={octaRef} position={[-1.5, -1, -2]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  )
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0f1419"]} />
        <fog attach="fog" args={["#0f1419", 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#5eead4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0d9488" />
        <ParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
