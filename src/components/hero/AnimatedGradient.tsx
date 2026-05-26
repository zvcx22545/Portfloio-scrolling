"use client"

import { motion } from "framer-motion"

export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {/* Cinematic dark gradients to blend background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050010]/30 to-[#050010]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050010]/80 via-transparent to-[#050010]/80" />

      {/* Floating purple neon sphere */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.25]"
        style={{
          background: "radial-gradient(circle, #b100ff 0%, #8b5cf6 70%, transparent 100%)",
          top: "10%",
          right: "5%",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating electric blue sphere */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, #00d0ff 0%, #3b82f6 70%, transparent 100%)",
          bottom: "15%",
          left: "8%",
        }}
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -30, 35, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating pink highlights sphere */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.15]"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, #db2777 70%, transparent 100%)",
          top: "40%",
          left: "40%",
        }}
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  )
}
export default AnimatedGradient
