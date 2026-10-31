"use client"

import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import Image from "next/image"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/HANIDEVINF", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ghena-hani-3543a3375/", icon: Linkedin },
]

const headlineWords = ["AI", "systems,"]
const headlineWords2 = ["built", "with", "rigor."]

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
}

const wordItem: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: -35, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:min-h-[96svh] lg:px-10 lg:pb-20 lg:pt-28">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 -z-10 h-80 w-80 rounded-full bg-violet-500/15 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-96 w-96 rounded-full bg-sky-400/10 blur-[130px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-ghost-stroke mb-2 select-none text-xl sm:text-2xl md:text-3xl"
            aria-hidden="true"
          >
            Portfolio —
          </motion.p>

          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-slate-300 shadow-lg shadow-black/10 backdrop-blur-md sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            Hani Ghena <span className="text-slate-600">/</span> Applied AI Engineering
          </div>

          <p className="mb-4 text-sm font-medium tracking-wide text-slate-400 sm:text-base">
            Research-minded. Engineering-focused.
          </p>

          <motion.h1
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={reduceMotion ? undefined : wordContainer}
            className="hero-cinematic-text max-w-4xl font-semibold text-white"
            style={{ perspective: 800 }}
          >
            <span className="block overflow-hidden">
              {headlineWords.map((word) => (
                <motion.span
                  key={word}
                  variants={reduceMotion ? undefined : wordItem}
                  className="mr-[0.22em] inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              {headlineWords2.map((word) => (
                <motion.span
                  key={word}
                  variants={reduceMotion ? undefined : wordItem}
                  className="mr-[0.22em] inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            I&apos;m an M.Sc. AI student at USTHB with research experience at CERIST. I work across
            transformer-based NLP, deep learning for biomedical signals, and LLM/RAG applications —
            pairing experiments with careful evaluation and usable software.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["Transformers & NLP", "LLM / RAG", "Edge AI"].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-300 hover:border-cyan-300/30 hover:text-cyan-100 sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b12]"
            >
              Explore selected work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="/resume"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              View resume
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.08] pt-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Find me online</span>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white" aria-label={label}>
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Contact <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[29rem] lg:ml-auto"
        >
          <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-violet-500/20 via-sky-400/10 to-transparent blur-3xl" />
          <span aria-hidden="true" className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-cyan-200/50" />
          <span aria-hidden="true" className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-cyan-200/50" />
          <span aria-hidden="true" className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-cyan-200/50" />
          <span aria-hidden="true" className="absolute -bottom-2.5 -right-2.5 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-cyan-200/50" />

          <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/55 p-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-3">
            <div className="relative aspect-[4/4.65] overflow-hidden rounded-[1.5rem] bg-slate-900">
              <Image src="/images/profile-portrait.jpg" alt="Portrait of Hani Ghena" fill sizes="(max-width: 1024px) 88vw, 460px" className="object-cover object-center" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/10 to-[#080b12]/15" />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-300/10 via-transparent to-violet-400/20 mix-blend-screen" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#080b12]/65 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200 backdrop-blur-md sm:left-5 sm:top-5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                AI / ML Engineering
              </div>
              <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#080b12]/65 px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200 backdrop-blur-md sm:right-5 sm:top-5">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-400" /></span>
                Rec
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/90">Current focus</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">From models<br />to useful systems.</h2>
                <div className="mt-5 flex items-center gap-2 text-xs text-slate-300 sm:text-sm"><span className="h-px w-7 bg-cyan-200/80" />Research <span className="text-slate-600">/</span> Evaluation <span className="text-slate-600">/</span> Engineering</div>
              </div>
            </div>
          </div>

          <motion.div animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-3 top-[27%] rounded-2xl border border-white/10 bg-[#0b111d]/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:-left-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">Research area</p>
            <p className="mt-1 text-sm font-semibold text-white">NLP + Transformers</p>
          </motion.div>
          <motion.div animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="absolute -right-2 bottom-[20%] rounded-2xl border border-cyan-200/15 bg-[#0b111d]/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:-right-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">Engineering loop</p>
            <p className="mt-1 text-sm font-semibold text-cyan-100">Build · Measure · Refine</p>
          </motion.div>
        </motion.div>
      </div>

      <a href="#about" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-slate-300 lg:flex" aria-label="Scroll to about section">
        Scroll to explore
        <span className="h-8 w-px bg-gradient-to-b from-cyan-200/60 to-transparent" />
      </a>
    </section>
  )
}
