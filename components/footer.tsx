"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/HANIDEVINF", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/hani-ghena-797a29269/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hanighena4@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-purple-500/15 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400 flex items-center gap-1.5 justify-center">
              Designed & Built with <Heart className="w-4 h-4 text-purple-400 fill-purple-400" /> by Hani Ghena
            </p>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              2026-2027 · All rights reserved · USTHB & CERIST
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
