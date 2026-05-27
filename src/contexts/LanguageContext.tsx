"use client"

import { createContext, useContext, useMemo, useState } from "react"

export type Language = "en" | "th"

const dictionary = {
  en: {
    nav: {
      Home: "Home",
      About: "About",
      Skills: "Skills",
      Projects: "Projects",
      Experience: "Experience",
      Blog: "Blog",
      Contact: "Contact",
      cta: "Let's Talk",
    },
    hero: {
      eyebrow: "Full Stack Developer for business-ready web systems",
      line1: "Practical systems.",
      line2: "Premium interfaces.",
      line3: "Built to ship.",
      subheading:
        "I turn requirements into reliable web applications, campaign landing pages, and database-connected workflows with a clean, cinematic interface layer.",
      primary: "View My Work",
      secondary: "Read Resume Story",
      role: "Programmer / Full Stack Developer",
    },
    about: {
      eyebrow: "01 - About Me",
      titleA: "A developer who bridges",
      titleB: "business requirements",
      titleC: "and polished web interfaces.",
    },
    projects: {
      eyebrow: "03 - Project Carousel",
      title: "Glassmorphism case cards from real production work.",
      cta: "Discuss a role",
      live: "Live / Detail",
    },
  },
  th: {
    nav: {
      Home: "หน้าแรก",
      About: "เกี่ยวกับ",
      Skills: "ทักษะ",
      Projects: "ผลงาน",
      Experience: "ประสบการณ์",
      Blog: "บทความ",
      Contact: "ติดต่อ",
      cta: "คุยกัน",
    },
    hero: {
      eyebrow: "Full Stack Developer สำหรับระบบเว็บที่ใช้งานจริง",
      line1: "ระบบใช้งานจริง.",
      line2: "อินเทอร์เฟซพรีเมียม.",
      line3: "พร้อมส่งมอบ.",
      subheading:
        "ผมเปลี่ยน requirement ให้เป็นเว็บแอปที่เชื่อถือได้ หน้า campaign ที่ responsive และ workflow ที่เชื่อมต่อฐานข้อมูล พร้อมเลเยอร์ UI ที่ดูสะอาดและ cinematic.",
      primary: "ดูผลงาน",
      secondary: "อ่านจากเรซูเม่",
      role: "Programmer / Full Stack Developer",
    },
    about: {
      eyebrow: "01 - เกี่ยวกับฉัน",
      titleA: "นักพัฒนาที่เชื่อม",
      titleB: "ความต้องการธุรกิจ",
      titleC: "เข้ากับเว็บอินเทอร์เฟซที่ดูดี.",
    },
    projects: {
      eyebrow: "03 - ผลงานแบบ Carousel",
      title: "การ์ด glassmorphism จากงาน production จริง.",
      cta: "คุยเรื่องงาน",
      live: "ดูรายละเอียด",
    },
  },
} as const

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (typeof dictionary)[Language]
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "th" : "en")),
      t: dictionary[language],
    }
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return context
}
