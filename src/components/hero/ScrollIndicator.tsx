"use client"

import { motion } from "framer-motion"

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3 select-none">
      {/* Label */}
      <span className="text-[10px] tracking-[0.4em] font-medium text-gray-500 uppercase font-sans">
        Scroll to Explore
      </span>

      {/* Mouse Icon with animated wheel */}
      <div className="relative w-6 h-10 rounded-full border border-purple-500/30 flex justify-center p-1 bg-[#050010]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.05)]">
        <motion.div
          className="w-1 h-2 rounded-full bg-gradient-to-b from-purple-400 to-pink-500"
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Outer glowing ambient borders */}
        <div className="absolute inset-0 rounded-full border border-pink-500/10 scale-105 pointer-events-none animate-pulse" />
      </div>

      {/* Vertical light streak */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500/30 via-pink-500/10 to-transparent relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
          animate={{
            y: [-16, 48],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  )
}
export default ScrollIndicator
