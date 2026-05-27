"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues with ESM package
    let lenisInstance: any = null
    let updateLenis: (time: number) => void
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4

    if (prefersReducedMotion || (ram !== undefined && ram <= 4) || cores <= 4) {
      return
    }

    import("@studio-freight/lenis").then((mod) => {
      const LenisClass = mod.default ?? (mod as unknown as { Lenis: any }).Lenis
      if (!LenisClass) return

      const lenis = new LenisClass({
        lerp: (ram !== undefined && ram <= 8) || cores <= 8 ? 0.16 : 0.1,
        duration: (ram !== undefined && ram <= 8) || cores <= 8 ? 0.8 : 1.1,
        smoothWheel: true,
        syncTouch: false,
      })

      lenisInstance = lenis

      // Integrate Lenis directly into the GSAP ticker loop for synchronized frame updates
      updateLenis = (time: number) => {
        lenis.raf(time * 1000) // GSAP ticker uses seconds, Lenis uses milliseconds
      }
      gsap.ticker.add(updateLenis)

      gsap.ticker.lagSmoothing(500, 33)

      // Sync scroll position with ScrollTrigger
      lenis.on("scroll", () => {
        ScrollTrigger.update()
      })
    })

    return () => {
      if (updateLenis) {
        gsap.ticker.remove(updateLenis)
      }
      if (lenisInstance) {
        lenisInstance.destroy()
      }
    }
  }, [])

  return <>{children}</>
}
