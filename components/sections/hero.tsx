"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-fuchsia-600/10 via-purple-600/15 to-cyan-500/10 blur-[130px]" />
        <div className="absolute top-12 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute bottom-16 right-1/4 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Profile Avatar with Neon Ring */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32 md:h-36 md:w-36">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, #ec4899, #a855f7, #06b6d4, #a855f7, #ec4899)",
              }}
              className="absolute -inset-1 rounded-full blur-[3px] opacity-90"
            />
            <div className="absolute inset-0.5 rounded-full bg-[#07050d]" />
            <div className="absolute inset-1 overflow-hidden rounded-full border border-purple-400/30 shadow-2xl shadow-purple-500/30">
              <Image
                src="/images/profile-square.jpg"
                alt="Hani Ghena"
                fill
                sizes="144px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Available for opportunities badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 text-xs md:text-sm font-medium text-purple-300 bg-purple-950/40 rounded-full border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-900/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Available for opportunities</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
        </div>

        {/* Big Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-8">
          {"Hi, I'm "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Hani Ghena
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 rounded-full" />
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-5">
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            An <span className="text-purple-400 font-semibold">AI Engineering student</span> building{" "}
            <span className="text-cyan-400 font-semibold">intelligent full-stack apps</span> with{" "}
            <span className="text-fuchsia-400 font-semibold">Flutter</span>,{" "}
            <span className="text-purple-400 font-semibold">Python</span>, and{" "}
            <span className="text-cyan-400 font-semibold">cloud AI tools</span>.
          </p>
        </div>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-normal">
          Building modern AI products and deploying them end-to-end with cutting-edge technologies.
        </p>

        {/* Stat badges */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 text-xs sm:text-sm text-slate-300 backdrop-blur-md">
            <span className="text-purple-400 font-bold">5×</span> CERIST AI Internships
          </div>
          <div className="rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-2 text-xs sm:text-sm text-slate-300 backdrop-blur-md">
            <span className="text-cyan-400 font-bold">17+</span> AI & Full-Stack Projects
          </div>
          <div className="rounded-full border border-pink-500/30 bg-pink-950/30 px-4 py-2 text-xs sm:text-sm text-slate-300 backdrop-blur-md">
            <span className="text-pink-400 font-bold">USTHB</span> Master in AI
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-8 py-3.5 text-base shadow-lg shadow-purple-500/25 border-none rounded-xl"
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
            className="w-full sm:w-auto border-purple-500/30 bg-[#120c22]/70 hover:bg-[#1a1233] text-white font-medium px-8 py-3.5 text-base backdrop-blur-md rounded-xl"
            asChild
          >
            <a href="/resume">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </Button>
        </div>

        {/* Scroll indicator arrow */}
        <div className="flex justify-center">
          <motion.a
            href="#about"
            className="inline-flex p-2 text-slate-500 hover:text-purple-400 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
