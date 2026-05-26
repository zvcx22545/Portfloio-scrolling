"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const particleCount = 40 // Optimized low particle count
    const colors = ["rgba(177, 0, 255, 0.4)", "rgba(0, 208, 255, 0.4)", "rgba(236, 72, 153, 0.3)"]

    const resize = () => {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: -Math.random() * 0.4 - 0.1, // Floating upwards slowly
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p) => {
        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = canvas.height
          p.x = Math.random() * canvas.width
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -1
        }

        // Draw soft glow (larger circle, low opacity)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2)
        const glowColor = p.color.replace("0.4", "0.1").replace("0.3", "0.08")
        ctx.fillStyle = glowColor
        ctx.fill()

        // Draw core particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[4] will-change-transform transform-gpu opacity-[0.8]"
    />
  )
}
export default ParticleLayer
