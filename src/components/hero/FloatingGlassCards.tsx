"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { heroConfig } from "@/configs/hero/heroConfig"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function HoverTiltCard({ children, className = "" }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15 }
  const rotateX = useSpring(y, springConfig)
  const rotateY = useSpring(x, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5

    x.set(mouseX * 16)
    y.set(-mouseY * 16)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl border border-white/10 p-5 bg-[#0a0515]/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden transition-[border-color,background-color] duration-300 hover:border-purple-500/40 hover:bg-[#0f0720]/95 ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glowing reflection flare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      
      {/* Content wrapper with Z depth */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export function FloatingGlassCards() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col justify-center items-end gap-6 pr-4 lg:pr-12 pointer-events-auto">
      {/* Card 1: Available for Work Status */}
      <HoverTiltCard className="w-[240px] md:w-[260px] select-none border border-emerald-500/20 shadow-[0_8px_32px_rgba(16,185,129,0.05)]">
        <div className="flex items-center gap-3 mb-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400 font-sans">
            Status: Available
          </span>
        </div>
        <h4 className="text-white text-sm font-semibold mb-1">Open for Contracts</h4>
        <p className="text-gray-400 text-xs font-medium">Mon – Fri | 10AM – 6PM</p>
      </HoverTiltCard>

      {/* Card 2: Code telemetry snippet */}
      <HoverTiltCard className="w-[280px] md:w-[320px] font-mono text-xs border border-purple-500/20 shadow-[0_8px_32px_rgba(139,92,246,0.05)]">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[9px] text-gray-500 tracking-wider">CREATIVITY.TS</span>
        </div>
        <p className="leading-relaxed">
          <span className="text-pink-400">const</span> <span className="text-blue-400">creativity</span> = <span className="text-green-300">&quot;limitless&quot;</span>;
        </p>
        <p className="leading-relaxed mt-1">
          <span className="text-pink-400">const</span> <span className="text-blue-400">stack</span> = [<span className="text-green-300">&quot;Next.js&quot;</span>, <span className="text-green-300">&quot;GSAP&quot;</span>];
        </p>
      </HoverTiltCard>

      {/* Card 3: Dynamic telemetry stats */}
      <HoverTiltCard className="w-[250px] md:w-[280px] border border-blue-500/20 shadow-[0_8px_32px_rgba(59,130,246,0.05)]">
        <h4 className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold mb-3 font-sans">
          Core Engine Info
        </h4>
        <div className="flex flex-col gap-2.5">
          {heroConfig.floatingStats.map((stat, i) => (
            <div key={i} className="flex justify-between items-center text-[11px] border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
              <span className="text-gray-400 font-medium">{stat.label}</span>
              <span className={`font-mono font-bold tracking-wider ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </HoverTiltCard>
    </div>
  )
}
export default FloatingGlassCards
