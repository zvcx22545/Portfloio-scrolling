"use client"

import { useEffect, useRef } from "react"

interface HeroVideoBackgroundProps {
  scrollTriggerRef: React.RefObject<HTMLElement>
}

export function HeroVideoBackground({ scrollTriggerRef: _scrollTriggerRef }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const play = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay can be blocked in some browser states; the poster still carries the scene.
      }
    }

    play()
  }, [])

  return (
    <div className="hero-scene absolute inset-0 z-[1] h-full w-full overflow-hidden bg-[#050010] pointer-events-none">
      <video
        ref={videoRef}
        className="h-full w-full object-cover opacity-[0.78] transform-gpu"
        muted
        playsInline
        autoPlay
        loop
        poster="/image_sequence_mobile/d_a_f_e_c_e_e_a_mp__000.webp"
        preload="metadata"
        src="/dafae.mp4"
      />

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#050010]/10 via-[#050010]/38 to-[#050010]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#050010]/82 via-transparent to-[#050010]/78" />
      <div className="absolute inset-0 z-[2] bg-radial-vignette" />
    </div>
  )
}

export default HeroVideoBackground
