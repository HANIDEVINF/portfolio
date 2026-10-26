"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react"

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Focus", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Contact", href: "/#contact" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/HANIDEVINF", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ghena-hani-3543a3375/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hanighena4@gmail.com", label: "Email" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 })

  useState(() => {
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > 28)
    }
  })

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "border-b border-white/[0.08] bg-[#080b12]/85 shadow-lg shadow-black/15 backdrop-blur-2xl"
          : "bg-[#080b12]/30 backdrop-blur-md")
      }
    >
      <motion.div
        style={{ scaleX }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-violet-400 via-sky-300 to-cyan-200"
        aria-hidden="true"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3.5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <Link href="/" className="group flex shrink-0 items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-sm font-bold tracking-tight text-white shadow-inner shadow-white/[0.03] transition duration-300 group-hover:border-cyan-200/30 group-hover:bg-cyan-200/[0.08]">
            HG
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-tight text-white">Hani Ghena</span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">Applied AI Engineering</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-2 text-[13px] font-medium text-slate-400 transition-colors duration-200 hover:text-white"
            >
              {link.name}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-200 to-violet-300 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:border-cyan-200/30 hover:bg-cyan-100/[0.08]"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5 text-cyan-200" />
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex lg:hidden">
          <Link href="/resume" className="rounded-lg border border-white/15 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/[0.06]">Resume</Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08] md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#080b12]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-7xl px-5 pb-5 pt-3 sm:px-8">
              <div className="grid gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion ? 0 : index * 0.025 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      {link.name}
                      <ArrowUpRight className="h-4 w-4 text-slate-600" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <Link
                  href="/resume"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950"
                >
                  View resume <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-4">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} className="text-slate-400 transition-colors hover:text-white">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
