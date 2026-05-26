"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #b100ff, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Portrait + floating cards */}
          <FadeUp>
            <div className="relative flex justify-center">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />

              {/* Portrait card */}
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-white/10"
                style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(177,0,255,0.1))", backdropFilter: "blur(20px)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🐱‍💻</div>
                    <div className="text-white font-bold text-xl">Kurorin</div>
                    <div className="text-purple-400 text-sm mt-1">Design Engineer</div>
                  </div>
                </div>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              </div>

              {/* Floating stat cards */}
              {siteConfig.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                  className="absolute glass-card px-4 py-3 rounded-xl border border-white/10 text-center shadow-lg"
                  style={{
                    backdropFilter: "blur(16px)",
                    background: "rgba(255,255,255,0.05)",
                    top: i === 0 ? "10%" : i === 1 ? "50%" : "75%",
                    left: i === 0 ? "-10%" : "auto",
                    right: i === 1 ? "-12%" : i === 2 ? "-8%" : "auto",
                  }}
                >
                  <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Right: Text + skills */}
          <StaggerReveal className="space-y-6">
            <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase">
              01 — About Me ✦
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white leading-tight">
              A Passionate{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                UI/UX Designer
              </span>{" "}
              & Frontend Developer
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed">
              {siteConfig.description}
            </motion.p>

            {/* Info grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Email", value: siteConfig.email },
                { label: "Location", value: siteConfig.location },
                { label: "Available", value: siteConfig.availability },
                { label: "Role", value: siteConfig.role },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <span className="text-purple-400 font-semibold">{item.label}</span>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-all duration-300 text-sm font-semibold"
              >
                Download CV ↓
              </a>
            </motion.div>
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
