"use client"

import React from "react"
import { motion, useTransform } from "framer-motion"
import { useMousePosition } from "@/hooks/useMousePosition"

interface MouseParallaxLayerProps {
  children: React.ReactNode
  strength?: number // Pixel shift amplitude
  className?: string
}

export function MouseParallaxLayer({
  children,
  strength = 15,
  className = "",
}: MouseParallaxLayerProps) {
  const { x, y } = useMousePosition()

  // Directly map the -1 to 1 normalized motion value to pixel coordinates
  const translateX = useTransform(x, [-1, 1], [-strength, strength])
  const translateY = useTransform(y, [-1, 1], [-strength, strength])

  return (
    <motion.div
      className={className}
      style={{ x: translateX, y: translateY }}
    >
      {children}
    </motion.div>
  )
}
export default MouseParallaxLayer
