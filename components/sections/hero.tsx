"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 animate-pulse" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-primary/20 to-cyan-400/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-gradient-to-l from-cyan-400/15 to-primary/15 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-spin-slow" />
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-1/4 h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-cyan-400/30 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-1/3 h-24 w-24 rounded-full bg-gradient-to-tl from-cyan-400/25 to-primary/25 blur-2xl"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-full border border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
            Available for opportunities
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight mb-8"
        >
          <span className="text-balance">
            {"Hi, I'm "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                Hani Ghena
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              />
            </span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed text-pretty font-light">
            An <span className="text-primary font-semibold">AI Engineering student</span> building{" "}
            <span className="text-cyan-400 font-semibold">intelligent full-stack apps</span> with{" "}
            <span className="text-emerald-400 font-semibold">Flutter</span>,{" "}
            <span className="text-primary font-semibold">Python</span>, and{" "}
            <span className="text-cyan-400 font-semibold">cloud AI tools</span>.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 font-light"
        >
          Building modern AI products and deploying them end-to-end with cutting-edge technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="rounded-full border border-primary/30 bg-gradient-to-r from-card/60 to-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md shadow-lg shadow-primary/5">
            <span className="text-primary font-semibold">16+</span> GitHub Projects
          </div>
          <div className="rounded-full border border-cyan-400/30 bg-gradient-to-r from-card/60 to-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md shadow-lg shadow-cyan-400/5">
            <span className="text-cyan-400 font-semibold">AI</span> Engineering Portfolio
          </div>
          <div className="rounded-full border border-emerald-400/30 bg-gradient-to-r from-card/60 to-card/40 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md shadow-lg shadow-emerald-400/5">
            <span className="text-emerald-400 font-semibold">Open</span> to Opportunities
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-500/90 px-10 py-4 text-lg shadow-lg shadow-primary/25 backdrop-blur-sm border border-primary/20"
            asChild
          >
            <a href="#contact">
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 bg-card/20 hover:bg-card/30 px-10 py-4 text-lg backdrop-blur-md shadow-lg shadow-primary/5 border-primary/20"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="w-5 h-5 mr-2" />
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
          <motion.a
            href="#about"
            className="block text-muted-foreground/60 hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
