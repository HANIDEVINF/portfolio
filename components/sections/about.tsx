"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
                I specialize in building full-stack applications using modern technologies like Flutter, Python, and cloud AI tools. I believe in writing clean, maintainable code and creating user experiences that are both functional and delightful.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {"When I'm not coding, you'll find me exploring the latest developments in AI, contributing to open-source projects, or working on personal projects that push the boundaries of what's possible."}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-lg transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/20">HG</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
