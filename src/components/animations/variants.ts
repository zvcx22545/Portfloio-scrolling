import type { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const rotateReveal: Variants = {
  hidden: { opacity: 0, rotateX: -30, y: 30 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const floatingLoop: Variants = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}
