"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap/gsapSetup"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// ลงทะเบียน ScrollTrigger กับ GSAP เพื่อให้ใช้งานฟังก์ชันตรวจจับการสกรอลล์ได้
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// กำหนดประเภทของ Properties (Props) ที่ Hook ตัวนี้รองรับ
interface UseImageSequenceProps {
  canvasRef: React.RefObject<HTMLCanvasElement>     // อ้างอิงตัว Canvas Element ที่จะใช้วาดภาพ
  containerRef: React.RefObject<HTMLElement>       // อ้างอิงตัว Section Container ที่ใช้สกรอลล์
  totalFrames?: number                            // จำนวนเฟรมภาพทั้งหมด (ดีฟอลต์เป็น 102)
  highPrefix?: string                             // โฟลเดอร์เก็บภาพคุณภาพสูง (สำหรับคอมแรง)
  lowPrefix?: string                              // โฟลเดอร์เก็บภาพขนาดเล็ก (สำหรับมือถือ/คอมช้า)
  padLength?: number                              // ความยาวของตัวเลขชื่อไฟล์ เช่น 000, 001 มีค่าเป็น 3 หลัก
  onProgress?: (progress: number) => void         // ฟังก์ชัน Callback ส่งตัวเลขเปอร์เซ็นต์การโหลด (0-100) ไปแสดงบน UI Loader
  onReady?: () => void                            // ฟังก์ชัน Callback ที่จะทำงานเมื่อโหลดรูปและเตรียมโครงสร้างเสร็จแล้ว
}

export function useImageSequence({
  canvasRef,
  containerRef,
  totalFrames = 102,
  highPrefix = "/image_sequence/d_a_f_e_c_e_e_a_mp__",
  lowPrefix = "/image_sequence_mobile/d_a_f_e_c_e_e_a_mp__",
  padLength = 3,
  onProgress,
  onReady,
}: UseImageSequenceProps) {
  
  // playheadRef เป็นเสมือนเข็มหัวเล่นแผ่นเสียงที่คอยเก็บบันทึกว่า "ตอนนี้กำลังแสดงเฟรมที่เท่าไหร่"
  // ใช้ useRef แทน useState เพื่อ "ป้องกันการสั่ง Rerender ตัว Component" ซึ่งจะทำให้ประสิทธิภาพตกลงอย่างมาก (60fps จะกระตุก)
  const playheadRef = useRef({ frame: 0 })
  
  // imagesRef ใช้สำหรับเก็บกักเก็บ Array ของรูปภาพ (HTMLImageElement) ทั้งหมดที่โหลดมาเก็บไว้ในหน่วยความจำ RAM/GPU
  const imagesRef = useRef<HTMLImageElement[]>([])
  
  // ตัวแปรเช็คว่า ทุกเฟรมภาพโหลดพร้อมสำหรับการอนิเมทหรือยัง
  const isLoadedRef = useRef(false)
  
  // ตัวแปรล็อคสถานะการวาดภาพ เพื่อไม่ให้สั่งวาดซ้ำหลายครั้งเกินไปใน 1 เฟรม (Throttle ด้วย requestAnimationFrame)
  const renderRequestedRef = useRef(false)
  
  // เก็บ Instance ของ GSAP ScrollTrigger เพื่อให้สามารถปิดตัวแปรและลบออกได้ยาม Unmount (ป้องกัน Memory Leak)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  
  // เก็บสัดส่วนขนาดภาพจริงล่าสุด เพื่อคำนวณการยืดหด (Responsive Scale)
  const imgDimensionsRef = useRef({ width: 1920, height: 1080 })

  /**
   * ฟังก์ชัน detectDeviceProfile
   * ทำหน้าที่ตรวจสอบระดับความแรงของเครื่องคอมพิวเตอร์ หรือ มือถือของผู้ใช้งานแบบ Realtime
   * เพื่อส่งข้อมูลนำไปตัดเกรดปรับระดับคุณภาพภาพ (Adaptive Quality)
   */
  const detectDeviceProfile = () => {
    if (typeof window === "undefined") return { isWeak: false, frameStep: 1, prefix: highPrefix }

    const ram = (navigator as any).deviceMemory                // เช็คขนาด RAM (หน่วยเป็น GB)
    const cores = navigator.hardwareConcurrency                // เช็คจำนวน Core ของ CPU
    const connection = (navigator as any).connection           // เช็คความเร็วอินเทอร์เน็ต
    const ua = navigator.userAgent.toLowerCase()
    
    // ตรวจจับว่าเป็นอุปกรณ์มือถือหรือแท็บเล็ตหรือไม่
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
    
    // เงื่อนไขในการจัดกลุ่มเป็น "อุปกรณ์สเปคต่ำ/ปานกลาง" (แรม <= 4GB หรือ คอร์ CPU <= 4 หรือต่อเน็ต 3G ช้า หรือเปิดโหมดประหยัดเน็ต)
    const isSlowNetwork = connection && (connection.saveData || ["2g", "3g"].includes(connection.effectiveType))
    const isLowSpecs = (ram && ram <= 4) || (cores && cores <= 4)

    // เงื่อนไขในการจัดกลุ่มเป็น "อุปกรณ์รุ่นเก่ามาก/สเปคต่ำสุดๆ" (แรม <= 2GB หรือ ซีพียูมีแค่ 2 คอร์) เพื่อเปิดโหมดประหยัดสุดขีด
    const isFallbackDevice = (ram && ram <= 2) || (cores && cores <= 2)

    // การทำ Downsampling:
    // คอมแรงโหลดครบทุกรูป (frameStep = 1) -> โหลดครบ 102 รูป
    // มือถือ/คอมสเปคต่ำจะโหลดแค่รูปเว้นรูป (frameStep = 2) -> โหลดแค่ 51 รูป ช่วยประหยัด RAM/เน็ต ไปครึ่งนึง และโหลดภาพสเปคต่ำ (lowPrefix)
    const frameStep = (isMobile || isLowSpecs) ? 2 : 1
    const prefix = (isMobile || isLowSpecs) ? lowPrefix : highPrefix

    return {
      isWeak: isMobile || isLowSpecs,
      isFallback: isFallbackDevice || isSlowNetwork,
      frameStep,
      prefix,
    }
  }

  /**
   * ฟังก์ชัน drawFrame
   * ทำหน้าที่ดึงรูปภาพจาก Array ออกมาวาดลงไปในแท็ก <canvas>
   * โดยจะคำนวณอัตราส่วนภาพแบบ "cover" (คล้าย CSS object-fit: cover) เสมอ เพื่อให้ภาพฟิตพอดีจอ ไม่ยืดไม่เบี้ยว
   */
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageList = imagesRef.current
    if (imageList.length === 0) return

    // ป้องกันกรณี index เกินขอบเขตของ Array โดยดักให้อยู่ระหว่างเฟรมแรกและเฟรมสุดท้าย
    const clampedIndex = Math.min(Math.max(frameIndex, 0), imageList.length - 1)
    const img = imageList[clampedIndex]

    // ตรวจเช็คว่ารูปโหลดเสร็จจริงและมีความกว้างเหมาะสม จึงจะสั่งวาดลงไป
    if (!img || !img.complete || img.naturalWidth === 0) return

    imgDimensionsRef.current.width = img.naturalWidth
    imgDimensionsRef.current.height = img.naturalHeight

    const { width: cw, height: ch } = canvas
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // อัลกอริทึมคำนวณการฟิตภาพแบบ Cover (ขยายภาพให้ครอบคลุมขอบ Canvas ทั้งหมดโดยรักษาสัดส่วนภาพเดิม)
    const scale = Math.max(cw / iw, ch / ih)
    const x = (cw - iw * scale) / 2
    const y = (ch - ih * scale) / 2

    ctx.clearRect(0, 0, cw, ch) // ล้างเฟรมเก่าทิ้ง ป้องกันเฟรมทับซ้อนซึมทะลุ
    ctx.drawImage(img, x, y, iw * scale, ih * scale) // วาดรูปใหม่ลงไป
  }

  /**
   * ฟังก์ชัน requestFrameDraw
   * ทำหน้าที่คุมรอบการเรนเดอร์ (Throttle) ให้สอดคล้องกับขีดจำกัดของหน้าจอ (60Hz / 120Hz)
   * ป้องกันการเรียกฟังก์ชัน drawFrame ถี่เกินความจำเป็นในเฟรมเดียวกัน ซึ่งจะกินสเปคเครื่องมาก
   */
  const requestFrameDraw = (frameIndex: number) => {
    if (renderRequestedRef.current) return
    renderRequestedRef.current = true

    // ขอคิวจากเบราว์เซอร์ในการวาดรูปรอบถัดไปเมื่อหน้าจอวาดภาพเสร็จพอดี (ช่วยรักษาขีด 60fps ได้นิ่งมาก)
    requestAnimationFrame(() => {
      drawFrame(frameIndex)
      renderRequestedRef.current = false
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const trigger = containerRef.current
    if (!canvas || !trigger) return

    // 1. วิเคราะห์ข้อมูลความแรงเครื่องของผู้ใช้งาน
    const profile = detectDeviceProfile()
    const { frameStep, prefix } = profile

    // 2. สร้างลิสต์ของ index ที่ต้องดึงมาโหลด (ตามเกณฑ์ Downsampling)
    const frameIndices: number[] = []
    for (let i = 0; i < totalFrames; i += frameStep) {
      frameIndices.push(i)
    }

    const loadedFramesCount = frameIndices.length
    let loadedCount = 0
    let decodePromises: Promise<void>[] = []

    // ตรวจสอบความคืบหน้าของการดาวน์โหลดและดีโค้ดรูปภาพ
    const checkLoadingProgress = () => {
      loadedCount++
      const percentage = Math.round((loadedCount / loadedFramesCount) * 100)
      if (onProgress) onProgress(percentage)

      // เมื่อทุกเฟรมภาพถูกโหลดและประมวลผลเสร็จสิ้น
      if (loadedCount === loadedFramesCount) {
        isLoadedRef.current = true
        // วาดเฟรมแรกให้ผู้ใช้เห็นทันทีแบบไร้รอยต่อ
        requestFrameDraw(0)
        if (onReady) onReady()
      }
    }

    // ฟังก์ชันจัดการปรับขนาด Canvas ให้ตอบรับการยืดหดของหน้าจอแบบ Responsive (รวมถึงการซัพพอร์ตจอเรตินา High-DPI)
    const handleResize = () => {
      if (!canvas) return
      // dpr (devicePixelRatio) สูงสุดจำกัดที่ 2x เพื่อไม่ให้การ์ดจอมือถือทำงานหนักเกินความจำเป็น (ถ้าดึงเต็ม 3x จะกระตุกมาก)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.imageSmoothingEnabled = true          // เปิดใช้งานระบบเกลี่ยรอยภาพหยักให้เรียบเนียน
        ctx.imageSmoothingQuality = "high"       // เลือกโหมดคุณภาพสูงของการเกลี่ยขอบภาพ
      }
      
      // สั่งเรนเดอร์เฟรมปัจจุบันซ้ำทันทีเพื่อให้รูปไม่แตกหรือยืดหลังปรับขนาดจอ
      drawFrame(Math.round(playheadRef.current.frame))
    }

    window.addEventListener("resize", handleResize)
    handleResize() // เรียกใช้ครั้งแรกเพื่อจัดเตรียมไซส์เริ่มต้น

    // 3. เริ่มทำการ Preload รูปภาพทั้งหมด
    const preloadedImages = frameIndices.map((originalIndex) => {
      const img = new Image()
      
      // แปลงตัวเลข เช่น 5 ให้กลายเป็น "005" (3 หลัก) เพื่อให้ตรงกับชื่อรูปไฟล์จริง
      const paddedIndex = String(originalIndex).padStart(padLength, "0")
      img.src = `${prefix}${paddedIndex}.webp`
      
      // [ทีเด็ดลดอาการกระตุก] ใช้ฟังก์ชัน img.decode() ซึ่งจะบอกเบราว์เซอร์ให้ทำการ "ดีโค้ดภาพแปลความหมายเป็นบิตแมป"
      // บนเทรดข้างหลัง (Background Thread) ล่วงหน้าก่อนที่จะส่งไปวาด 
      // ทำให้เมื่อผู้ใช้สกรอลล์เลื่อนหน้าจอ ภาพจะวาดได้ลื่นไหล ไม่ต้องหยุดรอการถอดรหัสรูปภาพบนเทรดหลักอีกต่อไป
      const decodePromise = img.decode()
        .then(() => {
          checkLoadingProgress()
        })
        .catch((err) => {
          console.warn(`Fallback: แปลงรหัสล่วงหน้าล้มเหลวสำหรับเฟรมที่ ${originalIndex} กำลังเปลี่ยนไปโหลดแบบธรรมดา.`, err)
          // หากเบราว์เซอร์รุ่นเก่ามากไม่รองรับ ให้ถอยกลับมาใช้ onload มาตรฐาน
          img.onload = () => checkLoadingProgress()
        })

      decodePromises.push(decodePromise)
      return img
    })

    imagesRef.current = preloadedImages

    // 4. ติดตั้ง GSAP ScrollTrigger
    // ผูก ScrollTrigger เข้ากับเข็มหัวเล่นแผ่นเสียง (playheadRef) เมื่อมีแรงเลื่อนเมาส์
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",      // เริ่มขยับเฟรมแรกเมื่อด้านบนสุดของปุ่มเลื่อนมาชนด้านบนสุดของหน้าจอ
      end: "bottom bottom",  // สิ้นสุดการเล่นเฟรมสุดท้ายเมื่อเลื่อนไปลึกสุดขอบล่างของหน้ากระดาษสกรอลล์
      scrub: 0.15,           // ใส่แรงหน่วงเพื่อให้ภาพเลื่อนสมูท ไหลลื่นดูพรีเมียม (Lag Scrub)
      onUpdate: (self) => {
        if (!isLoadedRef.current) return
        
        // คำนวณหาเฟรมภาพที่ควรแสดงตามเปอร์เซ็นต์ความก้าวหน้าการเลื่อนสกรอลล์ (progress)
        const progressIndex = self.progress * (loadedFramesCount - 1)
        const frameIndex = Math.round(progressIndex)
        
        // เปลี่ยนแปลงเฟรมก็ต่อเมื่อดัชนีภาพขยับจริง เพื่อเซฟความร้อนการ์ดจอ
        if (frameIndex !== playheadRef.current.frame) {
          playheadRef.current.frame = frameIndex
          requestFrameDraw(frameIndex) // วาดภาพบน Canvas แบบจำกัดเฟรมเรต
        }
      },
    })

    // 5. Cleanup Logic (ฟังก์ชันเคลียร์เมมโมรี่ ป้องกันปัญหา Memory Leak ซึ่งเป็นจุดอ่อนใหญ่ของ Image Sequence)
    return () => {
      window.removeEventListener("resize", handleResize)

      // ปิดการใช้งาน ScrollTrigger เมื่อ Component สลายไป ป้องกันการอ้างอิงค้างคาในหน่วยความจำ
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }

      // ลบล้างข้อมูล Source ของรูปภาพเพื่อเคลียร์ขยะออกจาก RAM ทันที
      imagesRef.current.forEach((img) => {
        img.onload = null
        img.onerror = null
        img.src = ""
      })
      imagesRef.current = []

      // บังคับเคลียร์ขยะหน่วยความจำบนการ์ดจอ (VRAM) โดยเปลี่ยนไซส์ Canvas ให้เป็นศูนย์
      if (canvas) {
        canvas.width = 0
        canvas.height = 0
      }
    }
  }, [totalFrames, highPrefix, lowPrefix, padLength])

  return {
    playhead: playheadRef,
    isLoaded: isLoadedRef,
    drawFrame,
  }
}
export default useImageSequence
