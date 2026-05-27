export type ProjectCarouselItem = {
  id: number
  title: string
  displayTitle: string
  category: string
  description: string
  stack: string[]
  image: string
  liveUrl: string
  githubUrl: string
  color: string
  glow: string
  caseLabel: string
}

export const projects: ProjectCarouselItem[] = [
  {
    id: 1,
    title: "Mybeer Reward Exchange",
    displayTitle: "REWARD",
    category: "Full Stack Web Application",
    description:
      "A reward exchange website where customers collect points from Mybeer purchases and redeem products through a guided web flow.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery", "LINE LIFF"],
    image: "/projects/mybeer-reward.svg",
    liveUrl: "#",
    githubUrl: "https://github.com/zvcx22545",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.38)",
    caseLabel: "View Case",
  },
  {
    id: 2,
    title: "Mybeer Campaign Landing",
    displayTitle: "MYBEER",
    category: "Frontend Development",
    description:
      "Promotional landing pages for Mybeer games and products, built with responsive UI, lightweight motion, and campaign-focused structure.",
    stack: ["HTML", "CSS", "JavaScript", "jQuery", "Tailwind CSS"],
    image: "/projects/mybeer-campaign.svg",
    liveUrl: "https://myworld-virtual-store.com/present/",
    githubUrl: "https://github.com/zvcx22545",
    color: "#00d0ff",
    glow: "rgba(0,208,255,0.34)",
    caseLabel: "Open Site",
  },
  {
    id: 3,
    title: "Enterprise System Support",
    displayTitle: "ORACLE",
    category: "Requirement-Based Fixes",
    description:
      "Analyzed and fixed issues from internal requirements while coordinating with Senior developers, Project Managers, and System Analysts.",
    stack: ["Vue.js", "CSS", "Oracle", "Agile"],
    image: "/projects/enterprise-support.svg",
    liveUrl: "#experience",
    githubUrl: "https://github.com/zvcx22545",
    color: "#10b981",
    glow: "rgba(16,185,129,0.32)",
    caseLabel: "View Role",
  },
  {
    id: 4,
    title: "Interactive Portfolio System",
    displayTitle: "PORTFOLIO",
    category: "Next.js Interface",
    description:
      "A cinematic portfolio interface optimized for low-spec devices with scroll storytelling, video-based motion, and glassmorphism components.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    image: "/projects/portfolio-system.svg",
    liveUrl: "#hero",
    githubUrl: "https://github.com/zvcx22545",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.32)",
    caseLabel: "View Build",
  },
]
