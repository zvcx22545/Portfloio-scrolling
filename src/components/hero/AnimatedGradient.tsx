"use client"

import { useEffect, useState, type CSSProperties } from "react"
import { motion } from "framer-motion"
import type { TargetAndTransition, Transition } from "framer-motion"

type LightLayer = {
  className: string
  style: CSSProperties
  animate: TargetAndTransition
  transition: Transition
}

const lightLayers: LightLayer[] = [
  {
    className: "absolute inset-x-[-20%] top-[8%] h-[34%] opacity-35",
    style: {
      background:
        "linear-gradient(105deg, transparent 8%, rgba(177,0,255,0.24) 34%, rgba(0,208,255,0.16) 52%, transparent 78%)",
      filter: "saturate(1.2)",
    },
    animate: { x: ["-4%", "3%", "-2%"], opacity: [0.26, 0.38, 0.26] },
    transition: { duration: 16, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className: "absolute inset-x-[-12%] bottom-[18%] h-[28%] opacity-30",
    style: {
      background:
        "linear-gradient(75deg, transparent 4%, rgba(236,72,153,0.16) 30%, rgba(139,92,246,0.22) 58%, transparent 86%)",
    },
    animate: { x: ["3%", "-3%", "2%"], opacity: [0.2, 0.32, 0.2] },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 },
  },
]

export function AnimatedGradient() {
  const [animateLight, setAnimateLight] = useState(false)

  useEffect(() => {
    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    setAnimateLight(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        (ram === undefined || ram > 8) &&
        cores > 8
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050010]/10 via-[#050010]/35 to-[#050010]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050010]/85 via-transparent to-[#050010]/80" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.12) 45%, transparent 58%)",
          transform: "translateX(-28%)",
        }}
      />

      {lightLayers.map((layer, index) =>
        animateLight ? (
          <motion.div
            key={index}
            className={layer.className}
            style={layer.style}
            animate={layer.animate}
            transition={layer.transition}
          />
        ) : (
          <div key={index} className={layer.className} style={layer.style} />
        )
      )}
    </div>
  )
}

export default AnimatedGradient
