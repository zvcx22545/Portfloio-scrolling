# Project Context: Portfloio-scrolling (3D Portfolio)

This document is compiled to provide concise, high-density context for future AI agents working on this project. Reviewing this document first will eliminate the need to scan multiple large files, drastically saving token consumption.

---

## 🚀 Technical Stack & Architecture

- **Core**: Next.js (App Router, Client components where interactive), React 18, TypeScript.
- **Styling**: Tailwind CSS + custom theme tokens (configured in `tailwind.config.ts`).
- **Animations**: Framer Motion (for 3D layout, cards offsets, fade-ups, and interactive states) + GSAP (for scroll-trigger storytelling in other pages).
- **Icons**: `lucide-react` for rich SVG icons.

---

## 📁 Key File Map

- 🔑 **Configuration / Projects Database**: `src/config/projects.ts`
  - Defines the `ProjectCarouselItem` schema.
  - Hosts the `projects` list (4 curated projects with specific colors, glowing shadows, category, description, stack, images, and live links).
- 🎨 **Projects Carousel Component**: `src/components/sections/ProjectsSection.tsx`
  - Handles the 3D-wheel scrolling logic (mouse wheel delta listeners + swipe events).
  - Displays a high-tech card deck that moves in a 3D perspective space using raw inline translation and rotative transforms with Framer Motion.
- 🌐 **Global Styles & Tailwind Theme**: `tailwind.config.ts`
  - Custom neon accent colors (`neon.purple`, `neon.blue`, `neon.pink`, `neon.violet`).
  - Custom animation presets (`animate-float`, `animate-pulse-glow`).

---

## 💎 Redesigned Projects Carousel Aesthetic

The projects section features a custom dark glassmorphic presentation deck inspired by futuristic AI dashboard aesthetics:

1. **Card Frame (`motion.article`)**:
   - `bg-slate-950/85` with heavy backdrop blur (`backdrop-blur-xl`).
   - Glowing gradient borders (`border-white/[0.08]`) and deep shadow dropouts.
   - An subtle inner digital network grid layout (`bg-[linear-gradient(...)]` with `16px` sizes).
2. **Dynamic Glowing Radiance**:
   - Top-left glow matching the individual project's theme color (`project.color`).
   - Glowing circle badge at the header displaying double-digit IDs (e.g. `01`, `02`).
3. **High-Tech 3D Pedestal**:
   - Concentric ellipses rotated at `65deg` on the X-axis (`rotateX(65deg)`) simulating a glowing physical platform underneath the mockups.
   - A dashed circular vector ring animated infinitely to rotate (`animate-[spin_12s_linear_infinite]`).
   - Interactive column beams that reactively light up when the card becomes active.
4. **Interactive Action Bar**:
   - High contrast sticky bottom action bar with quick access to GitHub code and clean live actions featuring custom animated hover offsets.

---

## 🛠️ Developer Guidance (Saving Tokens)

- **Do not read files recursively**: If you need to tweak project properties, go directly to `src/config/projects.ts`.
- **Custom Glow Colors**: Each project has its hex color (`project.color`) and alpha glow properties (`project.glow`). Use these directly as tailwind style values or CSS inline overrides for rich neon effects.
- **Card Perspectives**: The 3D effect of the carousel uses an anchor width `w-[min(84vw,345px)]` and height `h-[430px]` centered inside the perspective container. When tweaking, preserve `transformStyle: "preserve-3d"` and `z-index` levels configured in the React loop.
