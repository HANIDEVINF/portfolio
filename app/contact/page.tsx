"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hanighena4@gmail.com",
    href: "mailto:hanighena4@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0541894743",
    href: "tel:0541894743",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/hanighena",
    href: "https://github.com/hanighena",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/hanighena",
    href: "https://linkedin.com/in/hanighena",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo purposes, always succeed
    setFormState("success")
    setFormData({ name: "", email: "", subject: "", message: "" })
    
    // Reset after 3 seconds
    setTimeout(() => setFormState("idle"), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {"I'm always open to discussing new opportunities, collaborations, or just having a chat about technology. Feel free to reach out!"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
              
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="pt-6"
              >
                <h3 className="text-sm font-semibold text-foreground mb-3">Availability</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {"I'm currently available for internships, freelance projects, and full-time opportunities. Response time is usually within 24-48 hours."}
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="p-8 rounded-xl bg-card border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Send a Message</h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={formState === "loading" || formState === "success"}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
                      Message Sent Successfully!
                    </>
                  )}
                  {formState === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Error - Try Again
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
