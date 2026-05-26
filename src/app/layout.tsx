import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/ui/LenisProvider"
import Navbar from "@/components/ui/Navbar"
import CustomCursor from "@/components/ui/CustomCursor"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Kurorin — Creative Frontend Engineer & UI/UX Designer",
  description:
    "I build digital experiences that feel alive. Award-winning futuristic portfolio showcasing cinematic web design, 3D interactions, and premium motion design.",
  keywords: ["UI/UX Design", "Frontend Developer", "Next.js", "GSAP", "Portfolio", "Web Design"],
  openGraph: {
    title: "Kurorin — Creative Frontend Engineer",
    description:
      "Futuristic interactive portfolio with cinematic storytelling and immersive 3D animations.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-[#050010] text-white antialiased cursor-none`}
      >
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
