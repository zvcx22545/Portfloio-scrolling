"use client"

import { useRef, useState, useEffect } from "react"
import { useImageSequence } from "@/hooks/animation/useImageSequence"
import { gsap } from "@/lib/gsap/gsapSetup"
import { useImageSequenceContext } from "@/contexts/ImageSequenceContext"

// กำหนดประเภท Props ที่รับมาจากตัว Parent (HeroSection)
interface ImageSequenceCanvasProps {
  scrollTriggerRef: React.RefObject<HTMLElement> // รับตัวแปรอ้างอิง Section เพื่อผูกกับการลากหน้าเว็บลงล่าง
  onProgress?: (progress: number) => void        // ฟังก์ชันเสริมส่งกลับเมื่อมีการเพิ่มขึ้นของความถี่การดาวน์โหลดรูปภาพ
  onReady?: () => void                           // ฟังก์ชันแจ้ง Parent ว่าโหลดเสร็จแล้ว
}

export default function ImageSequenceCanvas({
  scrollTriggerRef,
  onProgress,
  onReady,
}: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // โหลดเก็บสถานะความคืบหน้า (เปอร์เซ็นต์โหลด 0-100) เพื่อนำไปป้อนลงใน UI หลอดประมวลผล
  const [loadPercentage, setLoadPercentage] = useState(0)
  
  // สถานะพร้อมเรนเดอร์ (จะเซ็ตเป็น true เมื่อดาวน์โหลดและถอดรหัสรูปเฟรมแรกพร้อมแสดงผล)
  const [isReady, setIsReady] = useState(false)

  // ดึงค่าการตั้งค่าลำดับภาพมาจาก Context (ทำให้เปลี่ยนรูปหรือเปลี่ยนโฟลเดอร์ได้ง่ายจากจุดเดียว)
  const { config } = useImageSequenceContext()

  // เรียกใช้ Custom Hook เพื่อควบคุมลอจิกวาดภาพและจัดการสเปคมือถือแบบเบ็ดเสร็จ
  useImageSequence({
    canvasRef,
    containerRef: scrollTriggerRef,
    totalFrames: config.totalFrames,
    highPrefix: `/${config.folderName}/${config.fileNamePrefix}`,      // เส้นทางโฟลเดอร์สำหรับคอมแรง
    lowPrefix: `/${config.mobileFolderName}/${config.fileNamePrefix}`, // เส้นทางโฟลเดอร์มือถือและคอมช้า
    padLength: config.padLength,
    onProgress: (progress) => {
      setLoadPercentage(progress)
      if (onProgress) onProgress(progress)
    },
    onReady: () => {
      // ตั้งเวลาหน่วงเบาๆ 300ms เพื่อความแน่ใจว่า Canvas เฟรมแรกถูกประมวลผลลงบน GPU ทันก่อนลบจอโหลด
      setTimeout(() => {
        setIsReady(true)
        if (onReady) onReady()
      }, 300)
    },
  })

  // ระบบ Scale เอฟเฟกต์ถอยหลังซูมออกแบบโรงภาพยนตร์ (Cinematic Zoom-Out)
  // ใช้ CSS Transform Scale ผ่าน GSAP ในการจัดหน้าจอ ยกระดับความลื่นไหลเพราะเป็นการทำงานบน Hardware GPU ล้วนๆ
  useEffect(() => {
    const canvas = canvasRef.current
    const trigger = scrollTriggerRef.current
    if (!canvas || !trigger || !isReady) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        canvas,
        { scale: 1.15 }, // เริ่มต้นจากซูมเข้าเล็กน้อยที่ 1.15
        {
          scale: 1,      // เมื่อเลื่อนขยับสกรอลล์ลงล่างสุดขอบ จะค่อยๆ ถอยห่างกลับมาที่สเกลจริง 1.0 เสมอหน้าเว็บปกติ
          ease: "none",  // รักษาแรงสปีดตามสกรอลล์บาร์แบบเชิงเส้น
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "+=350%", // แมทช์ตรงกันตามสกรอลล์พิน
            scrub: true, // ผูกตรงตามการเลื่อนเมาส์
          },
        }
      )
    }, scrollTriggerRef)

    // คืนค่าปิดการจำลองเมื่อผู้ใช้ย้ายหน้า ป้องกันเมมรั่ว
    return () => ctx.revert()
  }, [scrollTriggerRef, isReady])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050010] z-[1]">
      
      {/* 1. แผ่น Canvas วาดรูปภาพลำดับ sequence */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out will-change-transform z-[1] ${
          isReady ? "opacity-[0.85]" : "opacity-0"
        }`}
        style={{ background: "#050010" }}
      />

      {/* 2. ฟิลเตอร์ Cinematic Vignette และเฉดสีเพื่อจำลองแสงและมิติความลึก (เสมือนเลนส์ภาพยนตร์ระดับพรีเมียม) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050010]/30 to-[#050010] z-[2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050010]/70 via-transparent to-[#050010]/70 z-[2] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[2]" />

      {/* 3. ลายเส้นมอนิเตอร์ CRT ละเอียดบางๆ เพื่อเพิ่มฟีลลิ่งล้ำยุคแบบ Sci-Fi */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-[3]"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.8) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* 4. หน้าจอ Cinematic Loading ไฮโซล้ำสมัย (Glassmorphism & Neon Design) */}
      {/* จะเลือนหายและขยายสเกลเฟดออกไปเมื่อดาวน์โหลดรูปภาพและดีโค้ดเสร็จ (isReady = true) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-[#050010] z-50 transition-all duration-1000 ease-in-out ${
          isReady ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
        }`}
      >
        {/* แสงนีออนสะท้อนด้านหลังสร้างความหรูหรานุ่มนวล (ใช้ Radial Gradient แทน CSS blur filter เพื่อป้องกันอาการกระตุกตอนขยับเมาส์) */}
        <div 
          className="absolute w-[350px] h-[350px] rounded-full pointer-events-none" 
          style={{ background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)" }}
        />
        <div 
          className="absolute w-[250px] h-[250px] rounded-full pointer-events-none" 
          style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)" }}
        />

        {/* คอนเทนต์หลักสำหรับผู้ควบคุมการโหลด */}
        <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6">
          
          {/* ป้ายสติกเกอร์กำกับระบุขั้นตอนล้ำๆ */}
          <div className="text-[10px] tracking-[0.3em] text-purple-400 font-medium mb-1 uppercase opacity-80">
            Initializing Cinematic Pipeline
          </div>
          
          <h2 className="text-xl font-bold tracking-[0.1em] text-white/95 mb-6 text-center font-sans">
            RETINA IMAGERY
          </h2>

          {/* หลอดแสดงเกณฑ์ความเสร็จสิ้นแบบนีออนเงาแอนิเมท */}
          <div className="relative w-full h-[2px] bg-white/[0.05] rounded-full overflow-hidden mb-4">
            {/* สีเรนเดอร์ขอบหลอด */}
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300 ease-out will-change-[width]"
              style={{ width: `${loadPercentage}%` }}
            />
            {/* เลเยอร์เรืองแสง (Neon Glow) */}
            <div 
              className="absolute top-0 h-full bg-cyan-400 blur-[4px] transition-all duration-300 ease-out will-change-[width]"
              style={{ width: `${loadPercentage}%` }}
            />
          </div>

          {/* ตัวเลขนับเปอร์เซ็นต์ดิจิตอลโมโน */}
          <div className="flex justify-between w-full text-[10px] font-mono tracking-widest text-white/40">
            <span>BUFFERS</span>
            <span className="text-cyan-400 font-bold transition-all duration-150">
              {String(loadPercentage).padStart(3, "0")}%
            </span>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export type { ImageSequenceCanvasProps }
