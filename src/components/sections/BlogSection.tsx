"use client"

import { motion } from "framer-motion"
import { blogPosts } from "@/config/content"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"
import { ArrowUpRight } from "lucide-react"

export default function BlogSection() {
  return (
    <section id="blog" className="relative py-32 px-6 md:px-20 overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-64 blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00d0ff, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <StaggerReveal>
            <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
              07 — Latest Blogs ✦
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white">
              Thoughts & Ideas
            </motion.h2>
          </StaggerReveal>
          <FadeUp>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-semibold border border-purple-500/30 px-5 py-2.5 rounded-full hover:bg-purple-500/10 transition-all">
              View All Blogs →
            </a>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <FadeUp key={post.id} delay={i * 0.1}>
              <a
                href={post.href}
                className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}
              >
                {/* Image area */}
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${post.color}22, ${post.color}08)` }}
                >
                  <div className="text-6xl opacity-20">{["◈", "◉", "◆"][i % 3]}</div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${post.color}18, transparent 70%)` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs text-white font-medium"
                      style={{ background: `${post.color}44` }}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                  <h3 className="text-white font-bold mb-2 group-hover:text-purple-300 transition-colors flex items-start justify-between gap-2">
                    {post.title}
                    <ArrowUpRight size={16} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{post.description}</p>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
