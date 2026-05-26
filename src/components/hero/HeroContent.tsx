"use client"

import React from "react"
import { motion } from "framer-motion"
import { heroConfig } from "@/configs/hero/heroConfig"
import { blurRevealVariant, fadeUpVariant, staggerContainer } from "@/utils/motion/variants"
import { MagneticButton } from "./MagneticButton"
import { MouseParallaxLayer } from "./MouseParallaxLayer"
import { FloatingGlassCards } from "./FloatingGlassCards"
import { ArrowRight, ExternalLink } from "lucide-react"

// Premium bulletproof custom SVG social icons to bypass Lucide brand export issues
const SOCIAL_ICONS = [
  {
    name: "GitHub",
    href: "https://github.com",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "https://behance.net",
    svg: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22 7h-7v1h7v-1zm-12.82 2.373c.69-.646 1.488-.867 2.502-.867 1.83 0 3.318 1.109 3.318 3.528 0 2.381-1.397 3.754-3.568 3.754-1.077 0-2.316-.381-2.915-1.073v.885h-2.517v-12.6h2.517v5.195c.579-.652 1.637-.997 2.628-.997 1.954 0 3.382 1.258 3.382 3.551 0 2.158-1.286 3.564-3.23 3.564-1.127 0-2.222-.444-2.821-1.144v-3.796zm2.463 3.666c.866 0 1.341-.531 1.341-1.365 0-.862-.475-1.376-1.341-1.376-.879 0-1.369.514-1.369 1.376 0 .834.49 1.365 1.369 1.365zm4.845-6.852c0-.853.486-1.375 1.353-1.375.859 0 1.332.522 1.332 1.375 0 .84-.473 1.366-1.332 1.366-.867 0-1.353-.526-1.353-1.366zm-9.354 6.852c.867 0 1.354-.531 1.354-1.365 0-.862-.487-1.376-1.354-1.376-.878 0-1.363.514-1.363 1.376 0 .834.485 1.365 1.363 1.365z" />
      </svg>
    ),
  },
]

export function HeroContent() {
  return (
    <div className="relative w-full min-h-screen flex items-center z-[10] px-6 md:px-12 lg:px-24">
      {/* Cinematic grid splitting left text and right floating modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full pt-20">
        
        {/* Left column storytelling heading wrapper */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center items-start text-left pointer-events-auto"
        >
          {/* Tag / Micro label */}
          <motion.div
            variants={fadeUpVariant(0.1)}
            className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/60"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-semibold text-purple-300 uppercase">
              Creative Developer ✦ Designer
            </span>
          </motion.div>

          {/* Heading with high-end typography and gradient reveal */}
          <motion.h1
            variants={blurRevealVariant(0.2)}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-6"
          >
            I Build Digital
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(168,85,247,0.15)]">
              Experiences
            </span>
            <br />
            That Feel Alive.
          </motion.h1>

          {/* Descriptive subheading */}
          <motion.p
            variants={fadeUpVariant(0.4)}
            className="text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed font-sans"
          >
            {heroConfig.subheading}
          </motion.p>

          {/* Call-to-actions wrapped with magnetic feedback */}
          <motion.div variants={fadeUpVariant(0.6)} className="flex flex-wrap gap-4 mb-12">
            <MagneticButton strength={0.25}>
              <a
                href={heroConfig.ctaPrimary.href}
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #b100ff 100%)" }}
              >
                <span className="relative z-10 text-white flex items-center gap-2">
                  {heroConfig.ctaPrimary.label}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href={heroConfig.ctaSecondary.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/10 text-white hover:border-purple-400/40 bg-[#0a0515]/60 hover:bg-[#0a0515]/80 transition-all duration-300 shadow-inner"
              >
                <span>{heroConfig.ctaSecondary.label}</span>
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </MagneticButton>
          </motion.div>

          {/* Sleek brand social items */}
          <motion.div variants={fadeUpVariant(0.8)} className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase">
              Follow Me:
            </span>
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((social, idx) => (
                <MagneticButton key={idx} strength={0.4}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center w-10 h-10 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 bg-[#0a0515]/60 hover:bg-[#0a0515]/80 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.svg}
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column: Interactive Parallax space filled dynamically by the main component */}
        <div className="lg:col-span-5 hidden lg:block pointer-events-none">
          <MouseParallaxLayer strength={-20} className="w-full h-full">
            <FloatingGlassCards />
          </MouseParallaxLayer>
        </div>

      </div>
    </div>
  )
}
export default HeroContent
