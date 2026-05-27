"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, ExternalLink, Mail } from "lucide-react"
import { heroConfig } from "@/configs/hero/heroConfig"
import { resumeProfile } from "@/config/resume"
import { fadeUpVariant, staggerContainer } from "@/utils/motion/variants"
import { MagneticButton } from "./MagneticButton"
import { MouseParallaxLayer } from "./MouseParallaxLayer"
import { FloatingGlassCards } from "./FloatingGlassCards"
import { useLanguage } from "@/contexts/LanguageContext"

export function HeroContent() {
  const { t } = useLanguage()

  return (
    <div className="relative z-[10] flex min-h-screen w-full items-center px-6 md:px-12 lg:px-24">
      <div className="grid w-full grid-cols-1 gap-10 pt-20 lg:grid-cols-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-reveal pointer-events-auto flex flex-col items-start justify-center text-left lg:col-span-7"
        >
          <motion.div
            variants={fadeUpVariant(0.1)}
            className="mb-4 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-950/30 px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 md:text-xs">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant(0.2)}
            className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-normal text-white sm:text-5xl md:text-7xl"
          >
            {t.hero.line1}
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              {t.hero.line2}
            </span>
            <br />
            {t.hero.line3}
          </motion.h1>

          <motion.p
            variants={fadeUpVariant(0.35)}
            className="mb-8 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            {t.hero.subheading}
          </motion.p>

          <motion.div variants={fadeUpVariant(0.48)} className="mb-10 flex flex-wrap gap-4">
            <MagneticButton strength={0.2}>
              <a
                href={heroConfig.ctaPrimary.href}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 font-semibold text-white shadow-[0_0_32px_rgba(6,182,212,0.18)] transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 56%, #ec4899 100%)" }}
              >
                {t.hero.primary}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href={heroConfig.ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                {t.hero.secondary}
                <ExternalLink size={14} className="opacity-70" />
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUpVariant(0.6)} className="flex flex-wrap items-center gap-3">
            <a
              href={resumeProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <Code size={18} />
            </a>
            <a
              href={`mailto:${resumeProfile.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:text-white"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              {t.hero.role}
            </span>
          </motion.div>
        </motion.div>

        <div className="hero-hologram pointer-events-none hidden lg:col-span-5 lg:block">
          <MouseParallaxLayer strength={-12} className="h-full w-full">
            <FloatingGlassCards />
          </MouseParallaxLayer>
        </div>
      </div>
    </div>
  )
}

export default HeroContent
