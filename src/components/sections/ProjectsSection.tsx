"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Code, ExternalLink } from "lucide-react"
import { projects } from "@/config/projects"
import { StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"
import { useLanguage } from "@/contexts/LanguageContext"

function wrapIndex(index: number) {
  return (index + projects.length) % projects.length
}

function getOffset(index: number, activeIndex: number) {
  const raw = index - activeIndex
  const half = projects.length / 2
  if (raw > half) return raw - projects.length
  if (raw < -half) return raw + projects.length
  return raw
}

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const wheelLockRef = useRef(false)
  const { t } = useLanguage()
  const activeProject = projects[activeIndex]

  const goTo = (direction: number) => {
    setActiveIndex((current) => wrapIndex(current + direction))
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 18 || wheelLockRef.current) return
    wheelLockRef.current = true
    goTo(event.deltaY > 0 ? 1 : -1)
    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 520)
  }

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28 md:px-20">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[640px] bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <StaggerReveal>
            <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t.projects.eyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className="max-w-3xl text-4xl font-black text-white md:text-5xl">
              {t.projects.title}
            </motion.h2>
          </StaggerReveal>

          <div className="hidden text-right md:block">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Selected Case</p>
            <p className="mt-2 text-lg font-bold text-white">{activeProject.title}</p>
          </div>
        </div>

        <div
          className="relative mx-auto h-[550px] max-w-6xl touch-pan-y overflow-hidden"
          style={{ perspective: "1400px" }}
          onWheel={handleWheel}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[430px] w-[min(84vw,345px)] -translate-x-1/2 -translate-y-1/2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {projects.map((project, index) => {
              const offset = getOffset(index, activeIndex)
              const abs = Math.abs(offset)
              const isActive = offset === 0
              const visible = abs <= 2

              return (
                <motion.article
                  key={project.id}
                  className="group absolute inset-0 overflow-hidden rounded-[24px] border border-white/[0.08] bg-slate-950/85 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300"
                  animate={{
                    x: `${offset * 78}%`,
                    z: isActive ? 120 : 20 - abs * 120,
                    rotateY: offset * -22,
                    scale: isActive ? 1 : 0.78 - abs * 0.04,
                    opacity: visible ? (isActive ? 1 : 0.45) : 0,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    zIndex: 20 - abs,
                    pointerEvents: isActive ? "auto" : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Subtle inner grid pattern background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* Glowing background light matches project glow */}
                  <div
                    className="absolute -top-16 -left-16 h-36 w-36 rounded-full blur-[60px] opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Header Row */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-2 relative z-10">
                    <div 
                      className="flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-black tracking-wide text-white transition-colors duration-300"
                      style={{ 
                        borderColor: isActive ? `${project.color}35` : 'rgba(255,255,255,0.1)', 
                        backgroundColor: isActive ? `${project.color}15` : 'rgba(255,255,255,0.02)',
                        boxShadow: isActive ? `0 0 10px ${project.glow}` : 'none'
                      }}
                    >
                      {String(project.id).padStart(2, "0")}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 max-w-[200px] truncate">
                      {project.category}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="px-6 pt-2 pb-1 relative z-10">
                    <h3 className="text-base font-extrabold uppercase tracking-wide text-white bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Futuristic Interactive / Illustration Area */}
                  <div className="relative my-3 flex h-40 items-center justify-center overflow-hidden px-6">
                    {/* Glowing radial backdrop inside visual box */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent)]" />
                    
                    {/* Interactive pedestal */}
                    <div 
                      className="absolute bottom-2 left-1/2 h-7 w-40 -translate-x-1/2 rounded-full border border-white/[0.08] bg-black/40 transition-all duration-500"
                      style={{ 
                        transform: 'translateX(-50%) rotateX(65deg)',
                        boxShadow: isActive ? `0 0 25px 2px ${project.glow}` : '0 0 10px rgba(255,255,255,0.05)'
                      }}
                    >
                      <div className="absolute inset-1 rounded-full border border-dashed border-white/10 animate-[spin_12s_linear_infinite]" />
                      <div className="absolute inset-2.5 rounded-full border border-white/5" />
                    </div>

                    {/* Glowing vertical column beam */}
                    <div 
                      className="absolute bottom-2 left-1/2 h-24 w-12 -translate-x-1/2 bg-gradient-to-t from-transparent via-white/[0.02] to-transparent blur-[8px] pointer-events-none transition-all duration-500"
                      style={{ 
                        background: `linear-gradient(to top, transparent, ${project.color}05, transparent)`,
                        opacity: isActive ? 1 : 0
                      }} 
                    />

                    {/* Vector / SVG Mockup Image */}
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={project.image}
                        alt=""
                        className="h-24 w-auto object-contain transition-all duration-500"
                        style={{
                          filter: isActive 
                            ? `drop-shadow(0 0 15px ${project.glow}) drop-shadow(0 8px 16px rgba(0,0,0,0.3))` 
                            : 'grayscale(30%) drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                        }}
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Tech Stack Horizontal Layout */}
                  <div className="px-6 py-2 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="flex items-center gap-1 rounded-[6px] bg-white/[0.02] border border-white/[0.04] px-2 py-1 text-[9px] font-semibold tracking-wide text-slate-300 hover:border-white/15 hover:bg-white/5 transition-all"
                        >
                          <span 
                            className="h-1 w-1 rounded-full animate-pulse-glow" 
                            style={{ backgroundColor: project.color }} 
                          />
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="flex items-center rounded-[6px] bg-white/[0.01] border border-white/[0.02] px-1.5 py-1 text-[9px] font-semibold text-slate-500">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions / Interactive Footer */}
                  <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.06] bg-slate-950/40 backdrop-blur-md px-6 py-3.5 flex items-center justify-between z-20">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      <Code size={13} className="text-slate-500" />
                      <span>Code</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      className="group/btn flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-950 hover:bg-slate-100 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    >
                      <span>{project.caseLabel}</span>
                      <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(-1)}
            className="grid h-9 w-11 place-items-center rounded-full bg-lime-400 text-slate-950 transition-transform hover:scale-105"
            aria-label="Previous project"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="grid h-9 w-11 place-items-center rounded-full bg-lime-300 text-slate-950 transition-transform hover:scale-105"
            aria-label="Next project"
          >
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-cyan-300" : "w-2 bg-white/20"
              }`}
              aria-label={`Show ${project.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
