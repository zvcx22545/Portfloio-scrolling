export interface HeroConfig {
  tagline: string
  subheading: string
  ctaPrimary: {
    label: string
    href: string
  }
  ctaSecondary: {
    label: string
    href: string
  }
  terminalLogs: string[]
  floatingStats: {
    label: string
    value: string
    color: string
  }[]
}

export const heroConfig: HeroConfig = {
  tagline: "I Build Digital Experiences That Feel Alive",
  subheading: "Crafting immersive digital products through code, motion, and cinematic storytelling.",
  ctaPrimary: {
    label: "Explore My Work",
    href: "#projects",
  },
  ctaSecondary: {
    label: "View Case Studies",
    href: "#about",
  },
  terminalLogs: [
    "Initializing Core.Engine v4.2.1...",
    "Connecting to neural digital web interface...",
    "Compiling shaders & dynamic motion vectors...",
    "Status: STABLE // FPS: 120 // GPU: ACCELERATED",
    "Loaded digital universe grid matrix successfully.",
  ],
  floatingStats: [
    { label: "Design System Status", value: "ONLINE", color: "text-green-400" },
    { label: "GPU Acceleration", value: "ENABLED", color: "text-purple-400" },
    { label: "Rendering Core", value: "CINEMATIC LERP", color: "text-blue-400" },
  ],
}
