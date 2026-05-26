"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const springX = useSpring(mx, { damping: 22, stiffness: 280, mass: 0.5 })
  const springY = useSpring(my, { damping: 22, stiffness: 280, mass: 0.5 })

  useEffect(() => {
    // Detect touch device — hide cursor on mobile/tablet
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true)
      return
    }

    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest("a, button, [role='button'], input, textarea")) {
        setIsHovering(true)
      }
    }
    const onLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseover", onEnter)
    document.addEventListener("mouseout", onLeave)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", onEnter)
      document.removeEventListener("mouseout", onLeave)
    }
  }, [mx, my])

  if (isTouch) return null

  return (
    <>
      {/* Outer ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: isHovering ? 1.8 : 1, opacity: isHovering ? 0.6 : 0.5 }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-white"
          style={{ width: "32px", height: "32px" }}
        />
      </motion.div>

      {/* Inner dot — follows exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ scale: isHovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 rounded-full bg-purple-400"
        />
      </motion.div>
    </>
  )
}
