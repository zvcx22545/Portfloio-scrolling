"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

function shouldUseCustomCursor() {
  const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency || 4

  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    (ram === undefined || ram > 8) &&
    cores > 8
  )
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const springX = useSpring(mx, { damping: 26, stiffness: 220, mass: 0.4 })
  const springY = useSpring(my, { damping: 26, stiffness: 220, mass: 0.4 })

  useEffect(() => {
    const useCustomCursor = shouldUseCustomCursor()
    setEnabled(useCustomCursor)
    document.body.classList.toggle("custom-cursor-enabled", useCustomCursor)

    if (!useCustomCursor) {
      document.body.style.cursor = "auto"
      return () => {
        document.body.classList.remove("custom-cursor-enabled")
        document.body.style.cursor = ""
      }
    }

    let rafId = 0
    const move = (event: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        mx.set(event.clientX)
        my.set(event.clientY)
      })
    }

    const hoverQuery = "a, button, [role='button'], input, textarea"
    const onPointerOver = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest(hoverQuery)) {
        setIsHovering(true)
      }
    }
    const onPointerOut = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest(hoverQuery)) {
        setIsHovering(false)
      }
    }

    window.addEventListener("pointermove", move, { passive: true })
    document.addEventListener("pointerover", onPointerOver)
    document.addEventListener("pointerout", onPointerOut)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.classList.remove("custom-cursor-enabled")
      window.removeEventListener("pointermove", move)
      document.removeEventListener("pointerover", onPointerOver)
      document.removeEventListener("pointerout", onPointerOut)
    }
  }, [mx, my])

  if (!enabled) return null

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{ scale: isHovering ? 1.55 : 1, opacity: isHovering ? 0.7 : 0.45 }}
        transition={{ duration: 0.18 }}
        className="h-7 w-7 rounded-full border border-white"
      />
    </motion.div>
  )
}
