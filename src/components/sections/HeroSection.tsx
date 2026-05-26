"use client"

import React, { useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { gsap } from "@/lib/gsap/gsapSetup"
import HeroVideoBackground from "../hero/HeroVideoBackground"
import AnimatedGradient from "../hero/AnimatedGradient"
import ParticleLayer from "../hero/ParticleLayer"
import ScrollIndicator from "../hero/ScrollIndicator"
import HeroContent from "../hero/HeroContent"
import { ImageSequenceProvider } from "@/contexts/ImageSequenceContext"

// โหลดคอมโพเนนท์ ImageSequenceCanvas แบบไดนามิก (Lazy Load + ssr: false)
// เพื่อแก้ปัญหาความไม่สอดคล้องกับฝั่ง Server-Side Rendering (SSR) ของ Next.js เสมอ
// เนื่องจาก Canvas และลอจิกวิเคราะห์ขีดจำกัดสเปคต้องการใช้งาน Web APIs (window, navigator) ซึ่งไม่มีในเซิร์ฟเวอร์
const ImageSequenceCanvas = dynamic(
  () => import("../canvas/ImageSequenceCanvas"),
  { ssr: false }
)

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null) // อ้างอิงกรอบนอกสุดสีกระดาษความสูงสกรอลล์ (Scroll Trigger)
  const indicatorRef = useRef<HTMLDivElement>(null) // อ้างอิงตัวลูกศรบอกใบ้ว่าให้เลื่อนจอลงด้านล่าง
  
  // สถานะเปิดใช้งานโหมดวิดีโอทดแทน (Fallback Video) สำหรับเครื่องสเปคต่ำมาก
  const [useVideoFallback, setUseVideoFallback] = useState(false)
  
  // สถานะตรวจสอบเพื่อให้แน่ใจว่าลอจิกทำฝั่ง Client-Side เรียบร้อยแล้ว (Hydration Safety)
  const [isClient, setIsClient] = useState(false)

  // 1. ส่วนวิเคราะห์และคัดกรองฮาร์ดแวร์ประมวลผล (Hardware Capabilities Profiler)
  useEffect(() => {
    setIsClient(true)

    const checkFallbackCapability = () => {
      if (typeof window === "undefined") return

      const ram = (navigator as any).deviceMemory         // ขนาดแรมของเครื่อง (GB)
      const cores = navigator.hardwareConcurrency         // จำนวนเธรด/คอร์ของซีพียู
      const connection = (navigator as any).connection    // คุณภาพเครือข่ายเน็ต

      // ดักกรณีเครื่องช้ามาก เช่น ต่อเน็ตช้า (3G ช้ามาก) หรือคอมเครื่องเก่ารุ่นโบราณ (แรม <= 2GB หรือคอร์ <= 2)
      const isSlowNetwork = connection && (connection.saveData || ["2g", "3g"].includes(connection.effectiveType))
      const isExtremelyWeak = (ram && ram <= 2) || (cores && cores <= 2)

      if (isExtremelyWeak || isSlowNetwork) {
        console.log("สเปคอุปกรณ์ช้าเกินเกณฑ์: เปิดใช้งานโหมดวิดีโอแอนิเมทลดทอนภาระ (Hardware Video Fallback)")
        setUseVideoFallback(true) // สั่งสลับไปใช้วิดีโอทดแทน ป้องกันเบราว์เซอร์ล่ม
      } else {
        console.log(`สเปคอุปกรณ์แรงปกติ (CPU Cores: ${cores}, RAM: ${ram}GB): เปิดอนิเมชั่น Canvas Sequence เต็มรูปแบบ`)
      }
    }

    checkFallbackCapability()
  }, [])

  // 2. แอนิเมชันสั่งเฟดลูกศร Scroll cue ค่อยๆ เลือนหายไปอย่างพรีเมียมเมื่อผู้ใช้เริ่มสกรอลล์ลงด้านล่าง
  useEffect(() => {
    const trigger = containerRef.current
    const indicator = indicatorRef.current
    if (!trigger || !indicator) return

    const ctx = gsap.context(() => {
      gsap.to(indicator, {
        opacity: 0,
        y: 30,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",      // จุดเริ่มนับเมาส์เลื่อน
          end: "+=30%",          // ค่อยๆ หายไปในระยะทางสั้นๆ 30% ของพื้นที่สกรอลล์ตรึงหน้าจอ
          scrub: true,           // ขยับเลือนตามหน้าเมาส์ลากจริง
        },
      })
    }, containerRef)

    // ปิดและล้างข้อมูลเมื่อลบ Component ป้องกันบั๊กข้ามหน้า
    return () => ctx.revert()
  }, [])

  return (
    <ImageSequenceProvider>
      <section 
        ref={containerRef} 
        id="hero" 
        // กำหนดความสูงให้เป็น h-screen (100% viewport) ตามต้องการ โดย ScrollTrigger จะทำหน้าที่ล็อคปักหมุดตรึงเนื้อหาหน้าจอแบบ Native เอง
        className="relative h-screen w-full overflow-hidden bg-[#050010] select-none z-10"
      >
        {/* เลือกเรนเดอร์ภาพพื้นหลังตามสเปคความแรงเครื่อง */}
        {isClient && (
          useVideoFallback ? (
            // หากเครื่องช้ามาก โหลด HTML5 Video ที่ดีโค้ดลื่นง่ายผ่านชิปฮาร์ดแวร์มือถือโดยตรง
            <HeroVideoBackground scrollTriggerRef={containerRef} />
          ) : (
            // หากเครื่องสเปคปกติ/แรงปกติ เปิด Canvas Sequence ทรงพลังที่โหลดและสลับรูปบน RAM ลื่นๆ 
            <ImageSequenceCanvas scrollTriggerRef={containerRef} />
          )
        )}

        {/* ชั้นแสงนีออนไล่เฉดหรูหราด้านหลัง */}
        <AnimatedGradient />

        {/* ชั้นอนุภาคเอฟเฟกต์ละอองเคลื่อนไหว (Particle Layer) */}
        <ParticleLayer />

        {/* ตัวอักษรและคอนเทนต์จั่วหัวหลักของพอร์ตฟอลิโอ */}
        <HeroContent />

        {/* ตัวนำทาง Scroll cue ค่อยๆ เด้งลอยลอยเรียกร้องให้เลื่อนหน้าลง */}
        <div 
          ref={indicatorRef} 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <ScrollIndicator />
        </div>
      </section>
    </ImageSequenceProvider>
  )
}
export type { HeroSection }
