"use client"

import dynamic from "next/dynamic"

const AmbientParticles = dynamic(
  () => import("@/components/canvas/AmbientParticles"),
  { ssr: false }
)

export default function AmbientParticlesClient() {
  return <AmbientParticles />
}
