"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeUp, staggerContainer } from "./variants"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeUp({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerReveal({ children, className }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}
