"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"
import { Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputClass = (name: string) =>
    `w-full bg-transparent border rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none transition-all duration-300 text-sm font-mono ${
      focused === name
        ? "border-purple-500/80 shadow-[0_0_20px_rgba(177,0,255,0.15)]"
        : "border-white/10 hover:border-white/20"
    }`

  return (
    <section id="contact" className="relative py-32 px-6 md:px-20 overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(177,0,255,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto">
        <StaggerReveal className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            08 — Get In Touch ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-4">
            Let&apos;s Work Together
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg">
            Have a project in mind? Let&apos;s build something extraordinary.
          </motion.p>
        </StaggerReveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <FadeUp>
            <div className="space-y-6">
              {[
                { label: "Email", value: siteConfig.email, icon: "✉" },
                { label: "Location", value: siteConfig.location, icon: "📍" },
                { label: "Availability", value: siteConfig.availability, icon: "🕐" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/10"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-gray-300 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.1}>
            <div
              className="relative p-8 rounded-2xl border border-white/10"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-gray-500 text-xs font-mono">contact.terminal</span>
              </div>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="// Your Name"
                      value={fields.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputClass("name")}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="// Your Email"
                      value={fields.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputClass("email")}
                    />
                    <textarea
                      name="message"
                      placeholder="// Your Message..."
                      value={fields.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      rows={5}
                      className={inputClass("message")}
                    />
                    <button
                      type="submit"
                      className="group w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #b100ff, #8b5cf6)" }}
                    >
                      <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Send Message →
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.5)" }}>
                      <CheckCircle size={32} className="text-purple-400" />
                    </div>
                    <p className="text-white font-bold text-xl">Message Sent!</p>
                    <p className="text-gray-400 text-sm">I&apos;ll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSent(false); setFields({ name: "", email: "", message: "" }) }}
                      className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
                    >
                      Send another →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
