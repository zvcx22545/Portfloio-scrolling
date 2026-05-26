"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { testimonials } from "@/config/content"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="testimonials" className="relative py-32 px-6 md:px-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto">
        <StaggerReveal className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            06 — What Clients Say ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white">
            Client Testimonials
          </motion.h2>
        </StaggerReveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="p-10 rounded-2xl border border-white/10 text-center"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl border-2 border-purple-500/40"
                style={{ background: "rgba(139,92,246,0.2)" }}>
                👤
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: testimonials[current].stars }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div>
                <p className="text-white font-bold">{testimonials[current].name}</p>
                <p className="text-purple-400 text-sm">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-400/50 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === current ? "#b100ff" : "rgba(255,255,255,0.2)",
                    width: i === current ? "24px" : "8px",
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-400/50 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
