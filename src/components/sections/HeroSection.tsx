"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap/gsapSetup"
import HeroVideoBackground from "../hero/HeroVideoBackground"
import AnimatedGradient from "../hero/AnimatedGradient"
import ParticleLayer from "../hero/ParticleLayer"
import ScrollIndicator from "../hero/ScrollIndicator"
import HeroContent from "../hero/HeroContent"
import { ImageSequenceProvider } from "@/contexts/ImageSequenceContext"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [enableParticles, setEnableParticles] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tightBudget = reducedMotion || (ram !== undefined && ram <= 8) || cores <= 8

    setEnableParticles(!tightBudget)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const trigger = containerRef.current
    const indicator = indicatorRef.current
    const scene = trigger?.querySelector(".hero-scene")
    if (!trigger || !indicator || !scene) return

    const ctx = gsap.context(() => {
      gsap.set(".hero-reveal", { autoAlpha: 0, y: 32, filter: "blur(10px)" })
      gsap.set(".hero-hologram", { autoAlpha: 0, y: 44, scale: 0.96, filter: "blur(12px)" })

      gsap
        .timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "+=190%",
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
          },
        })
        .fromTo(".hero-scene", {
          scale: 1.08,
          autoAlpha: 0.88,
        }, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: "none",
        }, 0)
        .to(".hero-reveal", {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.32,
          ease: "power2.out",
        }, 0.42)
        .to(".hero-hologram", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.36,
          ease: "power2.out",
        }, 0.56)

      gsap.to(indicator, {
        opacity: 0,
        y: 24,
        ease: "power2.out",
          scrollTrigger: {
            trigger,
            start: "top top",
          end: "+=25%",
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isClient])

  return (
    <ImageSequenceProvider>
      <section
        ref={containerRef}
        id="hero"
        className="relative h-screen w-full overflow-hidden bg-[#050010] select-none z-10"
      >
        {isClient && <HeroVideoBackground scrollTriggerRef={containerRef} />}

        <AnimatedGradient />
        {enableParticles && <ParticleLayer />}
        <HeroContent />

        <div
          ref={indicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <ScrollIndicator />
        </div>
      </section>
    </ImageSequenceProvider>
  )
}

export type { HeroSection }
