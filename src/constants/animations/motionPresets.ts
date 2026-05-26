// Motion duration and easing presets for consistent UI animations

export const DURATIONS = {
  fast: 0.25,
  medium: 0.5,
  slow: 0.8,
  cinematic: 1.2,
}

export const EASINGS = {
  // Cubic Bezier easings for CSS & Framer Motion
  primary: [0.16, 1, 0.3, 1] as [number, number, number, number], // easeOutExpo / sleek cubic
  smooth: [0.6, 0.05, -0.01, 0.9] as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
  magnetic: [0.25, 1, 0.5, 1] as [number, number, number, number],
  
  // GSAP ease strings
  gsapEase: "power4.out",
  gsapSmooth: "power3.out",
  gsapLinear: "none",
}

export const TRANSITIONS = {
  spring: {
    type: "spring",
    stiffness: 150,
    damping: 15,
  },
  hoverSpring: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
  fadeUp: {
    duration: DURATIONS.medium,
    ease: EASINGS.primary,
  },
  reveal: {
    duration: DURATIONS.cinematic,
    ease: EASINGS.primary,
  },
}
