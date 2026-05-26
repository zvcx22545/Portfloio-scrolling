import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ExperienceSection from "@/components/sections/ExperienceSection"
import ServicesSection from "@/components/sections/ServicesSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import BlogSection from "@/components/sections/BlogSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/sections/Footer"
import AmbientParticlesClient from "@/components/canvas/AmbientParticlesClient"

export default function Home() {
  return (
    <>
      {/* Global ambient particle background */}
      <AmbientParticlesClient />

      {/* Cinematic grain overlay for film-like premium feel */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <main className="relative z-10 overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
