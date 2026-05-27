"use client"

import { useEffect } from "react"
import { gsap } from "@/lib/gsap/gsapSetup"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useVideoScrub(
  videoRef: React.RefObject<HTMLVideoElement>,
  triggerRef: React.RefObject<HTMLElement>,
  lerpFactor = 0.12
) {
  useEffect(() => {
    const video = videoRef.current
    const trigger = triggerRef.current
    if (!video || !trigger) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    const tightBudget = reducedMotion || (ram !== undefined && ram <= 8) || cores <= 8
    const minSeekInterval = tightBudget ? 110 : 66
    const scrollLength = tightBudget ? "+=190%" : "+=280%"

    let targetTime = 0
    let currentTime = 0
    let animationFrameId = 0
    let scrollTriggerInstance: ScrollTrigger | null = null
    let isUpdating = false
    let lastSeekTime = 0
    let lastCommittedTime = -1

    const commitVideoTime = (time: number, duration: number) => {
      const nextTime = Math.min(duration - 0.04, Math.max(0.04, time))
      if (Math.abs(nextTime - lastCommittedTime) < (tightBudget ? 0.12 : 0.06)) return

      video.currentTime = nextTime
      lastCommittedTime = nextTime
    }

    const updateScrub = () => {
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) {
        isUpdating = false
        return
      }

      const diff = targetTime - currentTime
      if (Math.abs(diff) <= 0.035) {
        commitVideoTime(targetTime, duration)
        isUpdating = false
        return
      }

      const now = performance.now()
      if (now - lastSeekTime >= minSeekInterval) {
        currentTime += diff * lerpFactor
        commitVideoTime(currentTime, duration)
        lastSeekTime = now
      }

      animationFrameId = requestAnimationFrame(updateScrub)
    }

    const requestScrub = () => {
      if (isUpdating) return
      isUpdating = true
      animationFrameId = requestAnimationFrame(updateScrub)
    }

    const initScrollTrigger = () => {
      const duration = video.duration
      if (!duration || Number.isNaN(duration) || scrollTriggerInstance) return

      video.pause()

      scrollTriggerInstance = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: scrollLength,
        pin: true,
        pinSpacing: true,
        scrub: tightBudget ? 0.04 : 0.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          targetTime = self.progress * duration
          requestScrub()
        },
      })

      requestScrub()
    }

    if (video.readyState >= 1) {
      initScrollTrigger()
    } else {
      video.addEventListener("loadedmetadata", initScrollTrigger)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      video.removeEventListener("loadedmetadata", initScrollTrigger)
      scrollTriggerInstance?.kill()
    }
  }, [videoRef, triggerRef, lerpFactor])
}

export default useVideoScrub
