"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap/gsapSetup"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseImageSequenceProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLElement>
  totalFrames?: number
  highPrefix?: string
  lowPrefix?: string
  padLength?: number
  onProgress?: (progress: number) => void
  onReady?: () => void
}

interface DeviceProfile {
  isWeak: boolean
  frameStep: number
  prefix: string
  dpr: number
  quality: ImageSmoothingQuality
  concurrency: number
  scrollLength: string
}

export function useImageSequence({
  canvasRef,
  containerRef,
  totalFrames = 102,
  highPrefix = "/image_sequence/d_a_f_e_c_e_e_a_mp__",
  lowPrefix = "/image_sequence_mobile/d_a_f_e_c_e_e_a_mp__",
  padLength = 3,
  onProgress,
  onReady,
}: UseImageSequenceProps) {
  const playheadRef = useRef({ frame: 0 })
  const imagesRef = useRef<HTMLImageElement[]>([])
  const isLoadedRef = useRef(false)
  const renderRequestedRef = useRef(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const lastDrawnFrameRef = useRef(-1)
  const onProgressRef = useRef(onProgress)
  const onReadyRef = useRef(onReady)

  useEffect(() => {
    onProgressRef.current = onProgress
    onReadyRef.current = onReady
  }, [onProgress, onReady])

  const detectDeviceProfile = (): DeviceProfile => {
    if (typeof window === "undefined") {
      return {
        isWeak: false,
        frameStep: 1,
        prefix: highPrefix,
        dpr: 1,
        quality: "high",
        concurrency: 6,
        scrollLength: "+=350%",
      }
    }

    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = Boolean(connection?.saveData)
    const slowNetwork = ["2g", "3g"].includes(connection?.effectiveType || "")
    const isWeak = isMobile || prefersReducedMotion || saveData || slowNetwork || (ram !== undefined && ram <= 8) || cores <= 8

    if (prefersReducedMotion || saveData || slowNetwork || (ram !== undefined && ram <= 4) || cores <= 4) {
      return {
        isWeak: true,
        frameStep: 5,
        prefix: lowPrefix,
        dpr: 1,
        quality: "low",
        concurrency: 2,
        scrollLength: "+=220%",
      }
    }

    if (isWeak) {
      return {
        isWeak: true,
        frameStep: 3,
        prefix: lowPrefix,
        dpr: Math.min(window.devicePixelRatio || 1, 1.25),
        quality: "medium",
        concurrency: 3,
        scrollLength: "+=280%",
      }
    }

    return {
      isWeak: false,
      frameStep: 1,
      prefix: highPrefix,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      quality: "high",
      concurrency: 5,
      scrollLength: "+=350%",
    }
  }

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    const imageList = imagesRef.current
    if (!canvas || imageList.length === 0) return

    const clampedIndex = Math.min(Math.max(frameIndex, 0), imageList.length - 1)
    if (lastDrawnFrameRef.current === clampedIndex) return

    const img = imageList[clampedIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width: cw, height: ch } = canvas
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const x = (cw - iw * scale) / 2
    const y = (ch - ih * scale) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, x, y, iw * scale, ih * scale)
    lastDrawnFrameRef.current = clampedIndex
  }

  const requestFrameDraw = (frameIndex: number) => {
    if (renderRequestedRef.current) return
    renderRequestedRef.current = true

    requestAnimationFrame(() => {
      drawFrame(frameIndex)
      renderRequestedRef.current = false
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const trigger = containerRef.current
    if (!canvas || !trigger) return

    let cancelled = false
    const profile = detectDeviceProfile()
    const frameIndices = Array.from(
      { length: Math.ceil(totalFrames / profile.frameStep) },
      (_, index) => Math.min(index * profile.frameStep, totalFrames - 1)
    )

    if (frameIndices[frameIndices.length - 1] !== totalFrames - 1) {
      frameIndices.push(totalFrames - 1)
    }

    imagesRef.current = new Array(frameIndices.length)
    isLoadedRef.current = false
    lastDrawnFrameRef.current = -1

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width * profile.dpr))
      const height = Math.max(1, Math.floor(rect.height * profile.dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = profile.quality
      }

      lastDrawnFrameRef.current = -1
      drawFrame(Math.round(playheadRef.current.frame))
    }

    const loadImage = (originalIndex: number, targetIndex: number) => {
      const paddedIndex = String(originalIndex).padStart(padLength, "0")
      const src = `${profile.prefix}${paddedIndex}.webp`
      const fallbackSrc = `${highPrefix}${paddedIndex}.webp`

      return new Promise<void>((resolve) => {
        const img = new Image()
        let triedFallback = false

        img.decoding = "async"
        img.onload = async () => {
          try {
            await img.decode?.()
          } catch {
            // The image is already loaded; drawImage can still use it.
          }

          if (cancelled) return resolve()
          imagesRef.current[targetIndex] = img

          if (targetIndex === 0) {
            requestFrameDraw(0)
          }

          resolve()
        }

        img.onerror = () => {
          if (!triedFallback && src !== fallbackSrc) {
            triedFallback = true
            img.src = fallbackSrc
            return
          }

          resolve()
        }

        img.src = src
      })
    }

    const preload = async () => {
      let nextIndex = 0
      let completed = 0
      const workers = Array.from({ length: profile.concurrency }, async () => {
        while (!cancelled && nextIndex < frameIndices.length) {
          const targetIndex = nextIndex
          const frameIndex = frameIndices[nextIndex]
          nextIndex += 1
          await loadImage(frameIndex, targetIndex)
          completed += 1
          onProgressRef.current?.(Math.round((completed / frameIndices.length) * 100))
        }
      })

      await Promise.all(workers)
      if (cancelled) return

      const loadedImages = imagesRef.current.filter(Boolean)
      imagesRef.current = loadedImages
      isLoadedRef.current = loadedImages.length > 0
      playheadRef.current.frame = 0
      requestFrameDraw(0)
      onReadyRef.current?.()
    }

    window.addEventListener("resize", handleResize, { passive: true })
    handleResize()
    preload()

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: profile.scrollLength,
      pin: true,
      pinSpacing: true,
      scrub: profile.isWeak ? 0.05 : 0.15,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (!isLoadedRef.current) return

        const frameIndex = Math.round(self.progress * (Math.max(imagesRef.current.length, 1) - 1))
        if (frameIndex !== playheadRef.current.frame) {
          playheadRef.current.frame = frameIndex
          requestFrameDraw(frameIndex)
        }
      },
    })

    return () => {
      cancelled = true
      window.removeEventListener("resize", handleResize)
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
      imagesRef.current.forEach((img) => {
        img.onload = null
        img.onerror = null
        img.src = ""
      })
      imagesRef.current = []
      canvas.width = 0
      canvas.height = 0
    }
  }, [canvasRef, containerRef, totalFrames, highPrefix, lowPrefix, padLength])

  return {
    playhead: playheadRef,
    isLoaded: isLoadedRef,
    drawFrame,
  }
}

export default useImageSequence
