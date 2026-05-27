"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { navLinks } from "@/config/site"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#hero")
  const navRef = useRef<HTMLElement>(null)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    let rafId = 0

    const updateNavState = () => {
      const scrollY = window.scrollY
      const offset = (navRef.current?.offsetHeight ?? 72) + 24
      setScrolled(scrollY > 50)

      let current = navLinks[0]?.href ?? "#hero"
      for (const link of navLinks) {
        const id = link.href.replace("#", "")
        const section = document.getElementById(id)
        if (section && section.offsetTop - offset <= scrollY) {
          current = link.href
        }
      }

      setActiveHref(current)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateNavState)
    }

    updateNavState()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-black/60 border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white font-black text-sm">C</div>
          <span className="text-white font-bold text-lg tracking-wide group-hover:text-cyan-300 transition-colors">Chisanupong</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeHref === link.href ? "page" : undefined}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-200 font-medium ${
                  activeHref === link.href
                    ? "text-white bg-white/10 shadow-[0_0_20px_rgba(139,92,246,0.18)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {t.nav[link.label as keyof typeof t.nav] ?? link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(["en", "th"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                  language === lang ? "bg-cyan-300 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={language === lang}
              >
                {lang}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #b100ff, #8b5cf6)" }}
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-black/90 border-b border-white/10 p-6"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    activeHref === link.href
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t.nav[link.label as keyof typeof t.nav] ?? link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(["en", "th"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`flex-1 rounded-full px-3 py-2 text-xs font-bold uppercase transition-colors ${
                  language === lang ? "bg-cyan-300 text-slate-950" : "text-slate-400"
                }`}
                aria-pressed={language === lang}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}
