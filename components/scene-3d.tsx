"use client"

import { useEffect, useRef, useState } from "react"

type Node = { x: number; y: number; vx: number; vy: number; radius: number }

export function Scene3D() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isSmallScreen = window.innerWidth < 768
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = window.innerWidth
    let height = window.innerHeight
    let animationFrame = 0
    let running = false

    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    setCanvasSize()

    const nodeCount = reduceMotion ? 22 : isSmallScreen ? 24 : 38
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.14,
      radius: Math.random() * 1.25 + 0.55,
    }))

    const draw = (animate: boolean) => {
      context.clearRect(0, 0, width, height)

      if (animate) {
        for (const node of nodes) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < -8) node.x = width + 8
          if (node.x > width + 8) node.x = -8
          if (node.y < -8) node.y = height + 8
          if (node.y > height + 8) node.y = -8
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 145) {
            const alpha = (1 - distance / 145) * 0.12
            context.strokeStyle = "rgba(125, 211, 252, " + alpha + ")"
            context.lineWidth = 0.7
            context.beginPath()
            context.moveTo(node.x, node.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }
      }

      for (const node of nodes) {
        context.beginPath()
        context.fillStyle = "rgba(167, 187, 255, 0.42)"
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const render = () => {
      draw(true)
      if (running) animationFrame = window.requestAnimationFrame(render)
    }

    const start = () => {
      if (running || reduceMotion || document.hidden) return
      running = true
      animationFrame = window.requestAnimationFrame(render)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(animationFrame)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        stop()
      } else {
        start()
      }
    }

    const handleResize = () => {
      setCanvasSize()
      if (reduceMotion) draw(false)
    }

    window.addEventListener("resize", handleResize, { passive: true })
    document.addEventListener("visibilitychange", handleVisibility)

    if (reduceMotion) {
      draw(false)
    } else {
      start()
    }

    return () => {
      stop()
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#080b12]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(94,114,228,0.16),transparent_75%)]" />
      <div className="absolute -left-56 top-[12%] h-[30rem] w-[30rem] rounded-full bg-violet-600/[0.08] blur-[130px]" />
      <div className="absolute -right-48 top-[42%] h-[32rem] w-[32rem] rounded-full bg-sky-400/[0.06] blur-[150px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080b12]/10 to-[#080b12]/70" />
      <canvas
        ref={canvasRef}
        className={"absolute inset-0 h-full w-full transition-opacity duration-700 " + (mounted ? "opacity-100" : "opacity-0")}
      />
    </div>
  )
}
