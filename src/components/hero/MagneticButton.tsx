"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number // Power of the pull effect
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const translateX = useSpring(x, springConfig)
  const translateY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    
    // Coordinates relative to the center of the button
    const mouseX = clientX - (left + width / 2)
    const mouseY = clientY - (top + height / 2)

    // Apply strength pull
    x.set(mouseX * strength)
    y.set(mouseY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: translateX, y: translateY }}
    >
      {children}
    </motion.div>
  )
}
export default MagneticButton
