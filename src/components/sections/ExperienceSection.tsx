"use client"

import { motion } from "framer-motion"
import { experiences } from "@/config/content"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-20 overflow-hidden">
      <div className="absolute left-1/2 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />

      <div className="max-w-5xl mx-auto">
        <StaggerReveal className="text-center mb-20">
          <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            04 — My Experience ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white">
            My Journey
          </motion.h2>
        </StaggerReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-purple-500/20 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <FadeUp key={exp.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div
                      className="inline-block p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-500 group"
                      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}
                    >
                      <span
                        className="text-xs font-bold tracking-widest uppercase mb-2 block"
                        style={{ color: exp.color }}
                      >
                        {exp.year}
                      </span>
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-purple-300 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-purple-400 text-sm font-medium mb-3">{exp.company}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full border-2 -translate-y-1/2 md:-translate-x-1/2 z-10 shadow-lg"
                    style={{
                      borderColor: exp.color,
                      background: "#050010",
                      boxShadow: `0 0 12px ${exp.color}88`,
                    }}
                  />

                  {/* Spacer for alternating side */}
                  <div className="hidden md:block flex-1" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
