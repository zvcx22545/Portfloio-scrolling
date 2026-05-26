"use client"

import { motion } from "framer-motion"
import { navLinks, siteConfig } from "@/config/site"
import { Code, Link2, Globe, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative py-16 px-6 md:px-20 border-t border-white/5 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 w-96 h-32 blur-3xl opacity-20 pointer-events-none -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse, #b100ff, transparent)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">K</div>
              <span className="text-white font-bold text-lg">Kurorin ♡</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Designing and developing digital experiences that make an impact.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Quick Links</p>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Let&apos;s Connect</p>
            <div className="flex gap-3">
              {[
                { icon: Code, href: "#", label: "GitHub" },
                { icon: Link2, href: "#", label: "LinkedIn" },
                { icon: Globe, href: "#", label: "Behance" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2024 Kurorin. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40 text-sm transition-all"
          >
            <ArrowUp size={14} /> Back To Top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
