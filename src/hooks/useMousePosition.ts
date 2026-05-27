"use client"

import { useEffect } from "react"
import { useMotionValue, useSpring } from "framer-motion"

export function useMousePosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Use springs to smooth the raw movement directly in the motion value, 
  // bypassing React's render cycle completely.
  const springConfig = { stiffness: 120, damping: 25, mass: 0.5 }
  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)

  useEffect(() => {
    let animationFrameId: number
    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    const shouldTrack =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (ram === undefined || ram > 8) &&
      cores > 8

    if (!shouldTrack) return

    const handler = (e: MouseEvent) => {
      // Throttle via requestAnimationFrame to avoid firing multiple times per frame
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => {
        // Normalize between -1 and 1
        x.set((e.clientX / window.innerWidth - 0.5) * 2)
        y.set((e.clientY / window.innerHeight - 0.5) * 2)
      })
    }

    window.addEventListener("mousemove", handler, { passive: true })
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handler)
    }
  }, [x, y])

  return { x: smoothX, y: smoothY }
}
