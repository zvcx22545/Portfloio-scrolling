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

    import("@studio-freight/lenis").then((mod) => {
      const LenisClass = mod.default ?? (mod as unknown as { Lenis: any }).Lenis
      if (!LenisClass) return

      const lenis = new LenisClass({
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        syncTouch: false,
      })

      lenisInstance = lenis

      // Integrate Lenis directly into the GSAP ticker loop for synchronized frame updates
      updateLenis = (time: number) => {
        lenis.raf(time * 1000) // GSAP ticker uses seconds, Lenis uses milliseconds
      }
      gsap.ticker.add(updateLenis)

      // Disable lagSmoothing during scrolling to prevent scroll jumping and timeline lags
      gsap.ticker.lagSmoothing(0)

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
