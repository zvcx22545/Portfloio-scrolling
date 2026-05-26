"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { services } from "@/config/content"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"

function MagneticCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const translateX = useSpring(x, springConfig)
  const translateY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2
    x.set(mouseX * 0.06)
    y.set(mouseY * 0.06)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-7 rounded-2xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition-[border-color,background-color] duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        transition: "border-color 0.4s ease, background-color 0.4s ease",
        x: translateX,
        y: translateY,
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-all duration-500 group-hover:scale-110"
        style={{ background: `${service.color}22`, border: `1px solid ${service.color}44` }}
      >
        <span style={{ color: service.color }}>{service.icon}</span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${service.color}08, transparent 70%)` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-20 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #b100ff, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <StaggerReveal className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            05 — Services ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white">
            What I Offer
          </motion.h2>
        </StaggerReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <FadeUp key={service.id} delay={i * 0.1}>
              <MagneticCard service={service} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
