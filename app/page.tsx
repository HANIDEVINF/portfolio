"use client"

import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { BackToTop } from "@/components/back-to-top"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import("@/components/scene-3d").then(mod => ({ default: mod.Scene3D })), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-background" />
  ),
})

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Scene3D />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  )
}
