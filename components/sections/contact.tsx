"use client"

import { useState } from "react"
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertCircle, Copy, ExternalLink, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

const EMAIL_ADDRESS = "hanighena4@gmail.com"
const PHONE_NUMBER = "+213 541 894 743"

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [deliveryMethod, setDeliveryMethod] = useState<"direct" | "email-client">("direct")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [lastSubmitted, setLastSubmitted] = useState<{
    name: string
    email: string
    subject: string
    message: string
  } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(EMAIL_ADDRESS)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const getGmailComposeUrl = (data: { name: string; email: string; subject: string; message: string }) => {
    const su = encodeURIComponent(data.subject || `Inquiry from ${data.name || "Portfolio Visitor"}`)
    const body = encodeURIComponent(
      data.message
        ? `From: ${data.name} (${data.email})\n\n${data.message}`
        : "Hello Hani,\n\nI reviewed your AI & Full-Stack portfolio and would like to connect regarding..."
    )
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${su}&body=${body}`
  }

  const getMailtoUrl = (data: { name: string; email: string; subject: string; message: string }) => {
    const su = encodeURIComponent(data.subject || `Inquiry from ${data.name || "Portfolio Visitor"}`)
    const body = encodeURIComponent(
      data.message
        ? `From: ${data.name} (${data.email})\n\n${data.message}`
        : "Hello Hani,\n\nI reviewed your portfolio and would like to connect."
    )
    return `mailto:${EMAIL_ADDRESS}?subject=${su}&body=${body}`
  }

  const getWhatsAppUrl = (data: { name: string; email: string; subject: string; message: string }) => {
    const text = encodeURIComponent(
      data.message
        ? `Hello Hani, I am ${data.name} (${data.email}). Subject: ${data.subject || "Portfolio Inquiry"}\n\n${data.message}`
        : "Hello Hani, I reviewed your portfolio and would like to connect."
    )
    return `https://wa.me/213541894743?text=${text}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")
    const payload = { ...formData }
    let deliveredServerOrRelay = false

    try {
      // 1. Browser-side FormSubmit AJAX relay (deliver directly to hanighena4@gmail.com)
      const fsRes = await fetch("https://formsubmit.co/ajax/hanighena4@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _subject: payload.subject || `New Portfolio Message from ${payload.name}`,
          message: payload.message,
          _captcha: "false",
        }),
      })
      if (fsRes.ok) {
        const fsJson = await fsRes.json().catch(() => null)
        if (fsJson && (fsJson.success === "true" || fsJson.success === true)) {
          deliveredServerOrRelay = true
        }
      }
    } catch {
      // Continue to server API route
    }

    try {
      // 2. Server API route (Supabase + server-side relay)
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (apiRes.ok) {
        const apiData = await apiRes.json().catch(() => null)
        if (apiData?.storedInDb || apiData?.relayedViaEmail) {
          deliveredServerOrRelay = true
        }
      }

      // 3. Client Supabase fallback if configured
      const supabase = createClient()
      if (supabase) {
        const { error } = await supabase.from("contact_messages").insert({
          name: payload.name,
          email: payload.email,
          subject: payload.subject || "Portfolio Contact Form",
          message: payload.message,
        })
        if (!error) deliveredServerOrRelay = true
      }
    } catch {
      // Non-blocking fallback
    }

    setLastSubmitted(payload)
    setFormState("success")
    setFormData({ name: "", email: "", subject: "", message: "" })

    // If neither Supabase nor automated email relay is active yet, automatically trigger pre-filled email client so the user's message is guaranteed to reach hanighena4@gmail.com
    if (!deliveredServerOrRelay) {
      setDeliveryMethod("email-client")
      try {
        window.location.href = getMailtoUrl(payload)
      } catch {
        // Fallback links are shown in the confirmation card below
      }
    } else {
      setDeliveryMethod("direct")
    }
  }

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div>
          {/* Section Header with 05. */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-purple-400 font-mono text-sm font-semibold">05.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Get In Touch
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-12 font-light leading-relaxed">
            Available for AI Engineering, Deep Learning, NLP/RAG, and Full-Stack Software Engineering roles or commercial consulting. Reach out via the direct message form or any channel below.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Direct Contact Channels</h3>

              {/* Email Card with Copy + Gmail Web + Mail App actions */}
              <div className="p-4 rounded-2xl bg-[#0e091e]/90 border border-purple-500/20 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-purple-950/60 text-purple-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Direct Email</p>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        className="text-white hover:text-purple-300 font-semibold text-sm sm:text-base transition-colors"
                      >
                        {EMAIL_ADDRESS}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/50 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-800/50 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedEmail ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-purple-500/10">
                  <a
                    href={getGmailComposeUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 px-3 py-1.5 text-xs font-medium text-purple-200 hover:bg-purple-500/25 transition"
                  >
                    Compose in Gmail Web
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getMailtoUrl(formData)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
                  >
                    Open Email App
                  </a>
                </div>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="p-4 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15 backdrop-blur-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-purple-950/50 text-purple-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone & WhatsApp</p>
                    <a
                      href="tel:+213541894743"
                      className="text-white hover:text-purple-300 font-semibold text-sm sm:text-base mt-0.5 font-mono tabular-nums block transition-colors"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>
                <a
                  href="https://wa.me/213541894743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/HANIDEVINF"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15 hover:border-purple-500/40 hover:bg-[#150d2c] transition-all group backdrop-blur-sm"
              >
                <div className="p-3 rounded-xl bg-purple-950/50 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">GitHub</p>
                  <p className="text-white font-semibold text-sm sm:text-base mt-0.5">github.com/HANIDEVINF</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/hani-ghena-797a29269/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15 hover:border-purple-500/40 hover:bg-[#150d2c] transition-all group backdrop-blur-sm"
              >
                <div className="p-3 rounded-xl bg-purple-950/50 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">LinkedIn</p>
                  <p className="text-white font-semibold text-sm sm:text-base mt-0.5">linkedin.com/in/hani-ghena-797a29269</p>
                </div>
              </a>
            </div>

            {/* Contact Form column */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1 mb-5">
                  Delivers directly to <span className="text-purple-300 font-mono">hanighena4@gmail.com</span>.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name or organization"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#0e091e]/90 border-purple-500/20 focus:border-purple-400 rounded-xl text-white placeholder:text-slate-500 h-11"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0e091e]/90 border-purple-500/20 focus:border-purple-400 rounded-xl text-white placeholder:text-slate-500 h-11"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Role opportunity, AI project, or consultation"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-[#0e091e]/90 border-purple-500/20 focus:border-purple-400 rounded-xl text-white placeholder:text-slate-500 h-11"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-[#0e091e]/90 border-purple-500/20 focus:border-purple-400 rounded-xl text-white placeholder:text-slate-500 resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <Button
                  type="submit"
                  size="lg"
                  disabled={formState === "loading"}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl h-11 shadow-lg shadow-purple-500/25 cursor-pointer"
                >
                  {formState === "idle" && (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                  {formState === "loading" && "Sending..."}
                  {formState === "success" && (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Message Sent
                    </>
                  )}
                  {formState === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Try Again
                    </>
                  )}
                </Button>

                <a
                  href={getGmailComposeUrl(formData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/35 bg-[#140d2a] hover:bg-[#1d133b] text-purple-200 font-semibold text-sm h-11 px-4 transition"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  Send via Gmail
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {formState === "success" && lastSubmitted && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs text-emerald-200 space-y-2.5">
                  <div className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {deliveryMethod === "direct"
                      ? "Your message has been delivered to hanighena4@gmail.com."
                      : "Your message is ready! Click any option below if your email app didn't open automatically:"}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={getGmailComposeUrl(lastSubmitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/30"
                    >
                      Send in Gmail Web <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={getMailtoUrl(lastSubmitted)}
                      className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                    >
                      Open Default Email App
                    </a>
                    <a
                      href={getWhatsAppUrl(lastSubmitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600/30 border border-emerald-400/30 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-600/40"
                    >
                      Send via WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
