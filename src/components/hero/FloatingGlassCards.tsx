"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Database, GitBranch, Layers3, Terminal } from "lucide-react"
import { heroConfig } from "@/configs/hero/heroConfig"

interface CardProps {
  children: React.ReactNode
  className?: string
}

function HoverTiltCard({ children, className = "" }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 130, damping: 18 })
  const rotateY = useSpring(x, { stiffness: 130, damping: 18 })

  useEffect(() => {
    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        (ram === undefined || ram > 8) &&
        cores > 8
    )
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5
    x.set(mouseX * 10)
    y.set(-mouseY * 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...(enabled ? { rotateX, rotateY } : {}),
      }}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export function FloatingGlassCards() {
  return (
    <div className="relative flex min-h-[440px] w-full flex-col justify-center gap-5 pr-4 lg:pr-8">
      <HoverTiltCard className="ml-auto w-[320px] border-cyan-300/20">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-200">
            <Layers3 size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">System Layer</span>
          </div>
          <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
            READY
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-white">Mybeer Reward Exchange</h3>
        <p className="text-sm leading-relaxed text-slate-400">
          Customer points, redeemable products, and requirement-focused business flow.
        </p>
      </HoverTiltCard>

      <HoverTiltCard className="w-[360px] border-violet-300/20">
        <div className="mb-4 flex items-center gap-2 text-violet-200">
          <Terminal size={18} />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Runtime Profile</span>
        </div>
        <div className="space-y-2 font-mono text-xs">
          {heroConfig.terminalLogs.slice(1).map((log) => (
            <p key={log} className="text-slate-300">
              <span className="text-cyan-300">&gt;</span> {log}
            </p>
          ))}
        </div>
      </HoverTiltCard>

      <HoverTiltCard className="ml-auto w-[300px] border-emerald-300/20">
        <div className="mb-4 flex items-center gap-2 text-emerald-200">
          <Database size={18} />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Capability Matrix</span>
        </div>
        <div className="space-y-3">
          {heroConfig.floatingStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
              <span className="text-xs text-slate-400">{stat.label}</span>
              <span className={`font-mono text-xs font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </HoverTiltCard>

      <div className="absolute -right-2 bottom-8 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-400 backdrop-blur-md">
        <GitBranch size={14} />
        Agile / Git / Postman
      </div>
    </div>
  )
}

export default FloatingGlassCards
