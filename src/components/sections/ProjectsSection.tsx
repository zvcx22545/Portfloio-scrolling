"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { projects } from "@/config/projects"
import { FadeUp, StaggerReveal } from "@/components/animations/Reveal"
import { fadeUp } from "@/components/animations/variants"
import { ExternalLink, Code } from "lucide-react"

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const s = useMotionValue(1)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const rotX = useSpring(y, springConfig)
  const rotY = useSpring(x, springConfig)
  const scale = useSpring(s, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotXValue = ((mouseY - cy) / cy) * -8
    const rotYValue = ((mouseX - cx) / cx) * 8
    
    x.set(rotYValue)
    y.set(rotXValue)
    s.set(1.02)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    s.set(1)
  }

  return (
    <FadeUp delay={index * 0.1}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-500 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          transformStyle: "preserve-3d",
          transition: "border-color 0.4s ease, background-color 0.4s ease",
          rotateX: rotX,
          rotateY: rotY,
          scale: scale,
          perspective: 1000,
        }}
      >
        {/* Image placeholder with gradient */}
        <div
          className="relative h-56 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}11)` }}
        >
          <div className="text-6xl opacity-20">{["◈", "◉", "◆", "✦"][index % 4]}</div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: `${project.color}44`, border: `1px solid ${project.color}66` }}
            >
              {project.category}
            </span>
          </div>
          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at center, ${project.color}22, transparent 70%)` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-300 border border-white/10"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white font-medium transition-colors"
            >
              <Code size={14} /> GitHub
            </a>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />
      </motion.div>
    </FadeUp>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-20 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #ff0080, transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <StaggerReveal>
            <motion.p variants={fadeUp} className="text-purple-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
              03 — Featured Projects ✦
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white">
              Things I&apos;ve Built
            </motion.h2>
          </StaggerReveal>
          <FadeUp>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-semibold border border-purple-500/30 px-5 py-2.5 rounded-full hover:bg-purple-500/10 transition-all">
              View All Projects →
            </a>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
