"use client"

import { motion } from "framer-motion"
import { skills } from "@/config/skills"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-20 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d0ff, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <StaggerReveal className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            02 — My Skills ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white">
            What I&apos;m Good At
          </motion.h2>
        </StaggerReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <FadeUp key={skill.name} delay={i * 0.08}>
              <div
                className="group p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" style={{ color: skill.color }}>{skill.icon}</span>
                    <span className="text-white font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm font-mono">{skill.level}%</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
