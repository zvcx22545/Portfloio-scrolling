"use client"

import React, { createContext, useContext, useState } from "react"

// กำหนดโครงสร้างข้อมูล (Type) สำหรับการตั้งค่า Image Sequence
export interface ImageSequenceConfig {
  folderName: string          // ชื่อโฟลเดอร์หลักใน /public เช่น "image_sequence"
  mobileFolderName: string    // ชื่อโฟลเดอร์มือถือใน /public เช่น "image_sequence_mobile"
  fileNamePrefix: string      // คำนำหน้าชื่อไฟล์รูปภาพ เช่น "d_a_f_e_c_e_e_a_mp__"
  totalFrames: number         // จำนวนรูปภาพทั้งหมด
  padLength: number           // จำนวนหลักของตัวเลข เช่น 3 (001, 002)
  extension: string           // นามสกุลไฟล์ เช่น "webp"
}

// ค่าตั้งต้น (Default) สำหรับ Image Sequence
const defaultConfig: ImageSequenceConfig = {
  folderName: "image_sequence",
  mobileFolderName: "image_sequence_mobile",
  fileNamePrefix: "d_a_f_e_c_e_e_a_mp__",
  totalFrames: 102,
  padLength: 3,
  extension: "webp",
}

interface ImageSequenceContextType {
  config: ImageSequenceConfig
  setConfig: React.Dispatch<React.SetStateAction<ImageSequenceConfig>>
}

// สร้าง Context
const ImageSequenceContext = createContext<ImageSequenceContextType | undefined>(undefined)

// สร้าง Provider สำหรับห่อหุ้มแอปพลิเคชันหรือคอมโพเนนต์
export function ImageSequenceProvider({ children, initialConfig = defaultConfig }: { children: React.ReactNode, initialConfig?: ImageSequenceConfig }) {
  const [config, setConfig] = useState<ImageSequenceConfig>(initialConfig)

  return (
    <ImageSequenceContext.Provider value={{ config, setConfig }}>
      {children}
    </ImageSequenceContext.Provider>
  )
}

// Custom Hook สำหรับเรียกใช้ Context ได้ง่ายๆ
export function useImageSequenceContext() {
  const context = useContext(ImageSequenceContext)
  if (context === undefined) {
    throw new Error("useImageSequenceContext ต้องถูกเรียกใช้ภายใน ImageSequenceProvider")
  }
  return context
}
