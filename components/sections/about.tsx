"use client"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Plus, X, Github, GraduationCap, Sparkles, Coffee } from "lucide-react"

const quickFacts = [
  { icon: GraduationCap, label: "Focus", value: "AI Engineering & Full-Stack Development" },
  { icon: Github, label: "Open source", value: "16+ public projects on GitHub" },
  { icon: Sparkles, label: "Currently", value: "Building & fine-tuning ML models with PyTorch" },
  { icon: Coffee, label: "Off the clock", value: "Exploring new AI research & side projects" },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isCardOpen, setIsCardOpen] = useState(false)

  // Tilt effect for the photo
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-primary font-mono text-sm">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {"I'm a passionate Computer Science and AI Engineering student with a deep interest in building intelligent applications that solve real-world problems. My journey in tech started with curiosity and has evolved into a dedicated pursuit of excellence in software development and artificial intelligence."}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                I specialize in building full-stack applications and training deep learning models with tools like PyTorch, Flutter, Python, and cloud AI infrastructure. I believe in writing clean, maintainable code and creating experiences that are both intelligent and delightful.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {"When I'm not coding, you'll find me exploring the latest developments in AI, contributing to open-source projects, or working on personal projects that push the boundaries of what's possible."}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={() => setIsCardOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary shadow-lg shadow-primary/10 backdrop-blur-sm transition-colors hover:bg-primary/20"
              >
                <Plus className="h-4 w-4" />
                Quick facts about me
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group [perspective:1000px]"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 via-cyan-400/20 to-emerald-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-primary/20 rounded-lg transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />

              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative aspect-square bg-secondary rounded-lg overflow-hidden border border-border shadow-2xl shadow-black/30"
              >
                <Image
                  src="/images/profile-square.jpg"
                  alt="Hani Ghena"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-primary/10 pointer-events-none" />
                <div
                  style={{ transform: "translateZ(40px)" }}
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent"
                >
                  <p className="text-sm font-semibold text-foreground">Hani Ghena</p>
                  <p className="text-xs text-muted-foreground">AI Engineering Student</p>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                className="absolute -top-4 -right-4 rounded-xl border border-primary/30 bg-card/90 px-3 py-2 shadow-xl shadow-primary/10 backdrop-blur-md"
              >
                <div className="text-lg font-black text-primary leading-none">16+</div>
                <div className="text-[10px] text-muted-foreground">Projects</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Quick facts popup */}
      <AnimatePresence>
        {isCardOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsCardOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl shadow-primary/10"
            >
              <div className="relative h-32 bg-gradient-to-br from-primary/20 via-cyan-400/10 to-emerald-400/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.25),transparent_45%)]" />
                <button
                  onClick={() => setIsCardOpen(false)}
                  className="absolute top-4 right-4 rounded-full bg-background/60 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute -bottom-10 left-6 h-20 w-20 overflow-hidden rounded-2xl border-4 border-card shadow-lg">
                  <Image src="/images/profile-square.jpg" alt="Hani Ghena" fill className="object-cover" />
                </div>
              </div>
              <div className="px-6 pt-14 pb-6">
                <h3 className="text-lg font-bold text-foreground">Hani Ghena</h3>
                <p className="mb-5 text-sm text-muted-foreground">AI Engineering Student & Full-Stack Developer</p>
                <div className="space-y-4">
                  {quickFacts.map((fact, i) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 rounded-lg bg-primary/10 p-1.5 text-primary">
                        <fact.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-primary">{fact.label}</div>
                        <div className="text-sm text-foreground">{fact.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
