"use client"

import React, { useRef, useEffect } from "react"
import { useVideoScrub } from "@/hooks/animation/useVideoScrub"
import { gsap } from "@/lib/gsap/gsapSetup"

interface HeroVideoBackgroundProps {
  scrollTriggerRef: React.RefObject<HTMLElement>
}

export function HeroVideoBackground({ scrollTriggerRef }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Bind the video element to our linear-interpolated scrolling timeline scrub
  useVideoScrub(videoRef, scrollTriggerRef, 0.06)

  useEffect(() => {
    const video = videoRef.current
    const trigger = scrollTriggerRef.current
    if (!video || !trigger) return

    // Cinematic zoom-out scaling linked directly to the scrollbar timeline
    const ctx = gsap.context(() => {
      gsap.fromTo(
        video,
        { scale: 1.35 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      )
    }, scrollTriggerRef)

    return () => ctx.revert()
  }, [scrollTriggerRef])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] bg-[#050010]">
      {/* Cinematic HTML5 video */}
      <video
        ref={videoRef}
        src="/dafae.mp4"
        className="w-full h-full object-cover transform-gpu will-change-transform opacity-[0.82]"
        muted
        playsInline
        autoPlay
        preload="metadata"
      />

      {/* Cinematic vignettes and blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050010]/30 to-[#050010] z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050010]/70 via-transparent to-[#050010]/70 z-[2]" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[2]" />

      {/* CRT overlay scan lines for subtle holographic screen texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-[3]"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.8) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  )
}
export default HeroVideoBackground
