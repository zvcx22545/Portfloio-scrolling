"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useGsapFadeUp(selector: string, options?: object) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          ...options,
        }
      )
    })
    return () => ctx.revert()
  }, [selector, options])
}

export function useGsapReveal(ref: React.RefObject<HTMLElement>, options?: object) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          ...options,
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [ref, options])
}

export function useGsapParallax(ref: React.RefObject<HTMLElement>, speed = 0.5) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [ref, speed])
}

export function useGsapHorizontalScroll(containerRef: React.RefObject<HTMLElement>, panelsSelector: string) {
  useEffect(() => {
    if (!containerRef.current) return
    const panels = containerRef.current.querySelectorAll(panelsSelector)
    const ctx = gsap.context(() => {
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (containerRef.current?.offsetWidth ?? 0) * (panels.length - 1),
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [containerRef, panelsSelector])
}
