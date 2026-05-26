"use client"

import { useEffect } from "react"
import { gsap } from "@/lib/gsap/gsapSetup"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function useVideoScrub(
  videoRef: React.RefObject<HTMLVideoElement>,
  triggerRef: React.RefObject<HTMLElement>,
  lerpFactor = 0.05
) {
  useEffect(() => {
    const video = videoRef.current
    const trigger = triggerRef.current
    if (!video || !trigger) return

    let targetTime = 0
    let currentTime = 0
    let animationFrameId: number
    let scrollTriggerInstance: ScrollTrigger | null = null
    let isUpdating = false
    let lastUpdateTime = 0

    const updateScrub = () => {
      const duration = video.duration
      if (duration && !isNaN(duration)) {
        const diff = targetTime - currentTime
        // Stop the animation frame loop when stationary (diff <= 0.04s)
        if (Math.abs(diff) > 0.04) {
          const now = performance.now()
          // Throttle seeking to 30 FPS to protect the hardware decoder from choking
          if (now - lastUpdateTime > 33) {
            currentTime += diff * lerpFactor
            video.currentTime = Math.min(duration - 0.02, Math.max(0.01, currentTime))
            lastUpdateTime = now
          }
          animationFrameId = requestAnimationFrame(updateScrub)
        } else {
          isUpdating = false
        }
      } else {
        isUpdating = false
      }
    }

    const triggerUpdate = () => {
      if (!isUpdating) {
        isUpdating = true
        animationFrameId = requestAnimationFrame(updateScrub)
      }
    }

    const initScrollTrigger = () => {
      const duration = video.duration
      if (!duration || isNaN(duration)) return

      // Ensure video is paused so we can scrub it manually
      video.pause()

      // Create ScrollTrigger pinning and tracking
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: "+=350%",         // แมทช์กับความยาวสกรอลล์เฟรมใน hook ภาพนิ่ง
        pin: true,             // ปักหมุดตรึงหน้าจอ Hero
        pinSpacing: true,      // ดันส่วนเนื้อหาอื่นๆ ลงไปด้านล่าง
        scrub: true,
        onUpdate: (self) => {
          // Calculate the target time based on scroll progress
          targetTime = self.progress * duration
          triggerUpdate()
        },
      })

      // Initial frame draw
      triggerUpdate()
    }

    const onLoaded = () => {
      initScrollTrigger()
    }

    // If metadata is already loaded, initialize directly
    if (video.readyState >= 1) {
      initScrollTrigger()
    } else {
      video.addEventListener("loadedmetadata", onLoaded)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (video) {
        video.removeEventListener("loadedmetadata", onLoaded)
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill()
      }
    }
  }, [videoRef, triggerRef, lerpFactor])
}
export default useVideoScrub
