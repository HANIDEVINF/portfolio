"use client"

import React, { useRef, useMemo, useState, Component } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Stars } from "@react-three/drei"
import * as THREE from "three"

class SceneErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL Scene3D encountered an issue:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 -z-10 bg-[#0a0f14] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.15),rgba(255,255,255,0))]" />
      )
    }
    return this.props.children
  }
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const [hovered, setHovered] = useState(false)
  
  const particlesPosition = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Create gradient colors
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.37 // cyan
        colors[i * 3 + 1] = 0.92
        colors[i * 3 + 2] = 0.83
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.05 // teal
        colors[i * 3 + 1] = 0.58
        colors[i * 3 + 2] = 0.53
      } else {
        colors[i * 3] = 0.18 // emerald
        colors[i * 3 + 1] = 0.83
        colors[i * 3 + 2] = 0.74
      }
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.z = state.clock.elapsedTime * 0.005
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ref.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Points 
      ref={ref} 
      positions={particlesPosition.positions} 
      colors={particlesPosition.colors}
      stride={3} 
      frustumCulled={false}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <PointMaterial
        transparent
        vertexColors
        size={hovered ? 0.025 : 0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)
  const dodecaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.15
      meshRef.current.position.x = Math.sin(time * 0.3) * 2
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.5
      meshRef.current.position.z = Math.cos(time * 0.2) * 2 - 3
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.08
      torusRef.current.rotation.z = time * 0.12
      torusRef.current.position.x = Math.cos(time * 0.4) * 2.5
      torusRef.current.position.y = Math.cos(time * 0.4) * 0.3 + 1
      torusRef.current.position.z = Math.sin(time * 0.3) * 2 - 4
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = time * 0.1
      octaRef.current.rotation.z = time * 0.08
      octaRef.current.position.x = Math.sin(time * 0.25 + 1) * 1.5
      octaRef.current.position.y = Math.sin(time * 0.3 + 1) * 0.4 - 1
      octaRef.current.position.z = Math.cos(time * 0.35 + 1) * 1.5 - 2
    }
    if (dodecaRef.current) {
      dodecaRef.current.rotation.x = time * 0.05
      dodecaRef.current.rotation.y = time * 0.07
      dodecaRef.current.position.x = Math.cos(time * 0.2 + 2) * 3
      dodecaRef.current.position.y = Math.sin(time * 0.4 + 2) * 0.6 + 0.5
      dodecaRef.current.position.z = Math.sin(time * 0.25 + 2) * 2.5 - 3
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#0d9488"
          wireframe
          transparent
          opacity={0.4}
          emissive="#0d9488"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh ref={torusRef} position={[-2.5, 1, -3]}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#14b8a6"
          wireframe
          transparent
          opacity={0.35}
          emissive="#14b8a6"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh ref={octaRef} position={[-1.5, -1, -2]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#2dd4bf"
          wireframe
          transparent
          opacity={0.4}
          emissive="#2dd4bf"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh ref={dodecaRef} position={[3, 0.5, -4]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#5eead4"
          wireframe
          transparent
          opacity={0.3}
          emissive="#5eead4"
          emissiveIntensity={0.15}
        />
      </mesh>
    </>
  )
}

export function Scene3D() {
  return (
    <SceneErrorBoundary>
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={["#0a0f14"]} />
          <fog attach="fog" args={["#0a0f14", 8, 30]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[15, 15, 15]} intensity={1.5} color="#5eead4" />
          <pointLight position={[-15, -15, -15]} intensity={1} color="#0d9488" />
          <pointLight position={[10, -10, 10]} intensity={0.8} color="#14b8a6" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ParticleField />
          <FloatingGeometry />
        </Canvas>
      </div>
    </SceneErrorBoundary>
  )
}
