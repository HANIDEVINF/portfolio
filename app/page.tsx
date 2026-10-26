"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
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

function RevealSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-clip">
      <Scene3D />
      <Navigation />
      <HeroSection />
      <RevealSection>
        <AboutSection />
      </RevealSection>
      <RevealSection delay={0.02}>
        <SkillsSection />
      </RevealSection>
      <RevealSection delay={0.02}>
        <ProjectsSection />
      </RevealSection>
      <RevealSection delay={0.02}>
        <ExperienceSection />
      </RevealSection>
      <RevealSection delay={0.02}>
        <ContactSection />
      </RevealSection>
      <Footer />
      <BackToTop />
    </main>
  )
}
