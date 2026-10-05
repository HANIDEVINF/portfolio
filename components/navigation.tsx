"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail } from "lucide-react"

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Live AI Lab", href: "/lab" },
  { name: "Blog", href: "/blog" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/HANIDEVINF", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ghena-hani", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hanighena4@gmail.com", label: "Email" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07050d]/85 backdrop-blur-xl border-b border-purple-500/15 shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar matching gradient */}
      <motion.div
        style={{ scaleX }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400"
      />
      
      <nav className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Hani Ghena
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-200 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0715]/95 backdrop-blur-xl border-b border-purple-500/20"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-6 pt-4 border-t border-purple-900/40">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
