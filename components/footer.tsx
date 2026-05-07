"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/hanighena", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/hanighena", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hanighena4@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center">
              Designed & Built with <Heart className="w-4 h-4 text-primary" /> by Hani Ghena
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
