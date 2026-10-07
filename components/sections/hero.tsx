"use client"

import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { generateAndDownloadResumePdf } from "@/lib/generate-cv-pdf"

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-fuchsia-600/10 via-purple-600/12 to-cyan-500/10 blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Clean Portrait Avatar */}
        <div className="mb-7 flex justify-center">
          <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-cyan-400 shadow-2xl shadow-purple-500/25">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#07050d]">
              <Image
                src="/images/profile-square.jpg"
                alt="Hani Ghena"
                fill
                sizes="128px"
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* First-5-Second Executive AI Specialization Kicker */}
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-purple-300 mb-3">
          AI Engineer | Deep Learning • NLP • Computer Vision | Building Production AI Systems
        </p>

        {/* Big Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-4">
          <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-200 bg-clip-text text-transparent">
            Hani Ghena
          </span>
        </h1>

        {/* Freelance & Software Positioning Strip */}
        <p className="text-xs sm:text-sm font-mono text-cyan-300/90 tracking-wide mb-5">
          AI Engineering &amp; Software Development — AI Systems • Web Applications • Desktop Suites • Intelligent Automation
        </p>

        {/* Concise Value Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light mb-9">
          5× CERIST AI Research Intern (BERT / Transformers &amp; Healthcare AI) and Full-Stack Systems Architect shipping real neural models and commercial software platforms.
        </p>

        {/* Primary Recruiter & Client Conversion Bar: CV -> LinkedIn -> GitHub -> Contact -> Projects */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-12">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3.5 text-sm sm:text-base shadow-lg shadow-purple-500/25 border-none rounded-xl"
            asChild
          >
            <a href="#projects">
              Explore Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>

          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold px-6 py-3.5 text-sm sm:text-base shadow-lg shadow-fuchsia-500/20 border-none rounded-xl cursor-pointer"
          >
            <a
              href="/Ghena_Hani_CV_EN.pdf"
              download="Ghena_Hani_CV_EN.pdf"
              onClick={(e) => {
                try {
                  e.preventDefault()
                  generateAndDownloadResumePdf("en")
                } catch {
                  // Native href="/Ghena_Hani_CV_EN.pdf" handles download
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV (PDF)
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-purple-500/30 bg-[#120c22]/70 hover:bg-[#1a1233] text-white font-medium px-5 py-3.5 text-sm sm:text-base backdrop-blur-md rounded-xl"
            asChild
          >
            <a href="https://www.linkedin.com/in/hani-ghena-797a29269/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2 text-cyan-400" />
              LinkedIn
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-purple-500/30 bg-[#120c22]/70 hover:bg-[#1a1233] text-white font-medium px-5 py-3.5 text-sm sm:text-base backdrop-blur-md rounded-xl"
            asChild
          >
            <a href="https://github.com/HANIDEVINF" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2 text-purple-300" />
              GitHub
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-purple-500/30 bg-[#120c22]/70 hover:bg-[#1a1233] text-white font-medium px-5 py-3.5 text-sm sm:text-base backdrop-blur-md rounded-xl"
            asChild
          >
            <a href="#contact">
              <Mail className="w-4 h-4 mr-2 text-fuchsia-400" />
              Contact Me
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <a
            href="#projects"
            className="inline-flex p-2 text-slate-500 hover:text-purple-400 transition-colors"
            aria-label="Scroll to projects"
          >
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
