import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/ui/LenisProvider"
import Navbar from "@/components/ui/Navbar"
import CustomCursor from "@/components/ui/CustomCursor"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Chisanupong Limsakul - Full Stack Developer",
  description:
    "Full Stack Developer portfolio for Chisanupong Limsakul, featuring Mybeer projects, Vue.js, React.js, Next.js, Tailwind CSS, Oracle, and MySQL experience.",
  keywords: ["Full Stack Developer", "Frontend Developer", "Vue.js", "React", "Next.js", "Oracle", "Portfolio"],
  openGraph: {
    title: "Chisanupong Limsakul - Full Stack Developer",
    description:
      "Cinematic full stack developer portfolio with production work, business web applications, and premium interface design.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#050010] text-white antialiased`}>
        <LanguageProvider>
          <CustomCursor />
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
