"use client"

import React, { useRef, useState, useEffect } from "react"

export function Scene3D() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    const starCount = prefersReducedMotion ? 24 : isMobile ? 35 : 70
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.65 + 0.2,
      speed: Math.random() * 0.25 + 0.08,
      color:
        Math.random() < 0.45
          ? "rgba(192, 132, 252, " // purple
          : Math.random() < 0.75
            ? "rgba(244, 114, 182, " // pink
            : "rgba(34, 211, 238, ", // cyan
    }))

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        ctx.fillStyle = `${star.color}${star.alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (prefersReducedMotion) {
      drawStatic()
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        star.y -= star.speed
        if (star.y < 0) {
          star.y = height
          star.x = Math.random() * width
        }

        ctx.fillStyle = `${star.color}${star.alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#07050d] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-15%,rgba(168,85,247,0.18),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
