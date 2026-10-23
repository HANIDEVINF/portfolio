"use client"

import { useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const EMAIL_ADDRESS = "hanighena4@gmail.com"
const PHONE_NUMBER = "0541 89 47 43"
const PHONE_TEL = "+213541894743"
const WHATSAPP_NUMBER = "213541894743"
const LINKEDIN_URL = "https://www.linkedin.com/in/ghena-hani-3543a3375/"
const LINKEDIN_LABEL = "linkedin.com/in/ghena-hani-3543a3375"

type FormData = { name: string; email: string; subject: string; message: string }

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [website, setWebsite] = useState("")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const subjectText = formData.subject || "Portfolio inquiry"
  const bodyText = formData.name || formData.message
    ? `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    : "Hello Hani,\n\nI would like to discuss an opportunity / project with you."

  const composeMailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`

  const composeGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(bodyText)}`

  async function copyEmail() {
    await navigator.clipboard?.writeText(EMAIL_ADDRESS)
    setCopiedEmail(true)
    window.setTimeout(() => setCopiedEmail(false), 2_000)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.error || "Your message could not be sent. Please use email instead."
        )
      }

      setFormState("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please use email instead."
      )
      setFormState("error")
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-purple-400">05.</span>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Let&apos;s work together
          </h2>
          <div className="ml-2 h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
        </div>
        <p className="mb-12 max-w-2xl text-base font-light leading-relaxed text-slate-300 sm:text-lg">
          Available for applied AI engineering, machine learning systems, and full-stack product
          work. Use the form or contact me directly.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={EMAIL_ADDRESS}
              href={`mailto:${EMAIL_ADDRESS}`}
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              label="Phone & WhatsApp"
              value={`${PHONE_NUMBER} (+213 541 89 47 43)`}
              href={`tel:${PHONE_TEL}`}
            />
            <ContactCard
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              value="github.com/HANIDEVINF"
              href="https://github.com/HANIDEVINF"
              external
            />
            <ContactCard
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              value={LINKEDIN_LABEL}
              href={LINKEDIN_URL}
              external
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={composeGmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-fuchsia-500/30 bg-fuchsia-950/40 px-3 py-2 text-xs font-semibold text-fuchsia-200 transition hover:bg-fuchsia-800/40"
              >
                <Mail className="h-3.5 w-3.5 text-fuchsia-400" />
                Send via Gmail
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/40 px-3 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-800/40 cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedEmail ? "Email copied" : "Copy email"}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-800/30"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-purple-500/20 bg-[#0e091e]/90 p-6 shadow-xl shadow-black/30 sm:p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white">Send a message</h3>
              <p className="mt-1 text-xs text-slate-400">
                You will see a confirmation only after the message is accepted.
              </p>
            </div>
            <input
              name="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Name" id="contact-name">
                <Input
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="bg-[#080511] border-purple-500/25 text-white"
                />
              </FormField>
              <FormField label="Email" id="contact-email">
                <Input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="bg-[#080511] border-purple-500/25 text-white"
                />
              </FormField>
            </div>
            <FormField label="Subject" id="contact-subject">
              <Input
                id="contact-subject"
                value={formData.subject}
                onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                placeholder="Role opportunity, project, or consultation"
                className="bg-[#080511] border-purple-500/25 text-white placeholder:text-slate-500"
              />
            </FormField>
            <FormField label="Message" id="contact-message">
              <Textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                className="bg-[#080511] border-purple-500/25 text-white"
              />
            </FormField>
            {formState === "error" && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2">
                <p role="alert" className="flex items-center gap-2 text-sm text-amber-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
                  {errorMessage}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={composeGmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-fuchsia-500 transition"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Send via Gmail directly
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={composeMailtoUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-800/40 transition"
                  >
                    Use default mail app
                  </a>
                </div>
              </div>
            )}
            {formState === "success" && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                <p role="status" className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  Thanks! Your message has been sent to hanighena4@gmail.com.
                </p>
                <p className="text-xs text-slate-300">
                  You can also open this inquiry directly in Gmail to keep a sent copy in your inbox:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={composeGmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-900/50 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-800/50 transition"
                  >
                    <Mail className="h-3 w-3" />
                    Open copy in Gmail
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/30 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-800/30 transition cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="submit"
                size="lg"
                disabled={formState === "loading"}
                className="h-11 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-white hover:from-purple-600 hover:to-indigo-600 cursor-pointer"
              >
                <Send className="mr-2 h-4 w-4" />
                {formState === "loading" ? "Sending…" : "Send message"}
              </Button>
              <a
                href={composeGmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-purple-500/35 bg-[#140d2a] px-4 text-sm font-semibold text-purple-200 transition hover:bg-[#1d133b]"
              >
                <Mail className="h-4 w-4 text-fuchsia-400" />
                Open in Gmail
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Prefer local email app?</span>
              <a
                href={composeMailtoUrl}
                className="text-purple-300 hover:text-white underline underline-offset-2 transition"
              >
                Open default mail client
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 rounded-2xl border border-purple-500/15 bg-[#0e091e]/90 p-4 transition hover:border-purple-500/40 hover:bg-[#150d2c]"
    >
      <span className="rounded-xl bg-purple-950/50 p-3 text-purple-400">{icon}</span>
      <span>
        <span className="block text-xs text-slate-400">{label}</span>
        <span className="block text-sm font-semibold text-white sm:text-base">{value}</span>
      </span>
    </a>
  )
}

function FormField({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-slate-300">
        {label}
      </label>
      {children}
    </div>
  )
}
