"use client"

import { Navigation } from "@/components/navigation"
import { BackToTop } from "@/components/back-to-top"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { Scene3D } from "@/components/scene-3d"

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
