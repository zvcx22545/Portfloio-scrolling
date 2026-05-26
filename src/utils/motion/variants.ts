import { Variants } from "framer-motion"
import { EASINGS } from "../../constants/animations/motionPresets"

export const fadeUpVariant = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASINGS.primary,
      delay,
    },
  },
})

export const blurRevealVariant = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
    y: 50,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASINGS.primary,
      delay,
    },
  },
})

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export const glassCardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: EASINGS.primary,
    },
  },
}

export const hoverGlow: Variants = {
  initial: { boxShadow: "0 0 0 rgba(139, 92, 246, 0)" },
  hover: {
    boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)",
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}
