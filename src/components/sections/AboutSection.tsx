"use client"

import { motion } from "framer-motion"
import { Database, GraduationCap, Mail, MapPin, Phone } from "lucide-react"
import { resumeHighlights, resumeProfile, resumeStack } from "@/config/resume"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"
import { useLanguage } from "@/contexts/LanguageContext"

const stackGroups = [
  { label: "Frontend", items: resumeStack.frontend },
  { label: "Backend", items: resumeStack.backend },
  { label: "Database", items: resumeStack.database },
  { label: "Tools", items: resumeStack.tools },
]

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:px-20">
      <div className="absolute right-0 top-16 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <FadeUp>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Resume Signal</p>
                  <h2 className="mt-3 text-3xl font-black text-white">{resumeProfile.name}</h2>
                  <p className="mt-2 text-sm font-medium text-violet-200">{resumeProfile.role}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <Database className="text-cyan-200" size={28} />
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-3"><Mail size={16} className="text-cyan-300" /> {resumeProfile.email}</p>
                <p className="flex items-center gap-3"><Phone size={16} className="text-cyan-300" /> {resumeProfile.phone}</p>
                <p className="flex items-center gap-3"><MapPin size={16} className="text-cyan-300" /> {resumeProfile.location}</p>
                <p className="flex items-start gap-3">
                  <GraduationCap size={16} className="mt-0.5 text-cyan-300" />
                  <span>{resumeProfile.education.degree}<br />{resumeProfile.education.school}</span>
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {stackGroups.map((group) => (
                  <div key={group.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <StaggerReveal className="space-y-6">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t.about.eyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-black leading-tight text-white md:text-5xl">
              {t.about.titleA}{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                {t.about.titleB}
              </span>{" "}
              {t.about.titleC}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-slate-400">
              {resumeProfile.summary}
            </motion.p>

            <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-3">
              {resumeHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">{item.eyebrow}</p>
                  <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </StaggerReveal>
        </div>
      </div>
    </section>
  )
}
