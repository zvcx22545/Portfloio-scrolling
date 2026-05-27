"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const AmbientParticles = dynamic(
  () => import("@/components/canvas/AmbientParticles"),
  { ssr: false }
)

export default function AmbientParticlesClient() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const ram = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const cores = navigator.hardwareConcurrency || 4
    setEnabled(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        (ram === undefined || ram > 8) &&
        cores > 8
    )
  }, [])

  return enabled ? <AmbientParticles /> : null
}
