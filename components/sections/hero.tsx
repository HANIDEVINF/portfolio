"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-24 left-1/4 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight mb-6"
        >
          <span className="text-balance">
            {"Hi, I'm "}
            <span className="bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
              Hani Ghena
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed text-pretty"
        >
          An AI Engineering student building intelligent full-stack apps with Flutter, Python, and cloud AI tools.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-10"
        >
          Building modern AI products and deploying them end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="rounded-full border border-primary/30 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            16+ GitHub Projects
          </span>
          <span className="rounded-full border border-primary/30 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            AI Engineering Portfolio
          </span>
          <span className="rounded-full border border-primary/30 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            Open to Opportunities
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            asChild
          >
            <a href="#contact">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary px-8"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="block animate-bounce">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
