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
  tagline: "Full Stack Developer for business-ready web systems",
  subheading:
    "I turn requirements into reliable web applications, campaign landing pages, and database-connected workflows with a clean, cinematic interface layer.",
  ctaPrimary: {
    label: "View My Work",
    href: "#projects",
  },
  ctaSecondary: {
    label: "Read Resume Story",
    href: "#about",
  },
  terminalLogs: [
    "Profile: Chisanupong Limsakul",
    "Role: Programmer / Full Stack Developer",
    "Frontend: Vue.js / React.js / Next.js / Tailwind CSS",
    "Database: Oracle / MySQL",
    "Workflow: Agile, Git, Postman, requirement-based fixes",
  ],
  floatingStats: [
    { label: "Production Focus", value: "Mybeer", color: "text-emerald-300" },
    { label: "Frontend Stack", value: "Vue / React", color: "text-cyan-300" },
    { label: "Database Layer", value: "Oracle", color: "text-violet-300" },
  ],
}
