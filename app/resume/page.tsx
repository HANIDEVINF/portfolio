"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Download, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const education = [
  {
    degree: "AI Engineering",
    institution: "University",
    period: "2024 - Present",
    description: "Advanced studies in artificial intelligence, machine learning, and deep learning.",
  },
  {
    degree: "Computer Science",
    institution: "University",
    period: "2022 - 2024",
    description: "Foundation in algorithms, data structures, and software engineering.",
  },
]

const experience = [
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    responsibilities: [
      "Developed custom mobile applications using Flutter",
      "Built AI-powered tools and automation solutions",
      "Delivered 10+ successful projects for clients",
    ],
  },
]

const skills = {
  "Programming Languages": ["Python", "Dart", "JavaScript", "TypeScript", "SQL"],
  "Frameworks & Libraries": ["Flutter", "React", "Next.js", "Flask", "FastAPI"],
  "AI & ML": ["TensorFlow", "LangChain", "OpenAI API", "Hugging Face", "Vector DBs"],
  "Databases": ["PostgreSQL", "Firebase", "Supabase", "MongoDB", "Redis"],
  "Tools & Platforms": ["Git", "Docker", "AWS", "Vercel", "Linux"],
}

const certifications = [
  "Google Cloud Professional",
  "TensorFlow Developer Certificate",
  "Flutter Development Bootcamp",
]

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Hani Ghena</h1>
              <p className="text-xl text-primary font-medium mb-4">AI Engineering Student & Full-Stack Developer</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  hanighena4@gmail.com
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  0541894743
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  hanighena.dev
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Print / Save PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h2 className="text-lg font-semibold text-foreground mb-3">Professional Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              Passionate AI Engineering student with strong expertise in building intelligent full-stack applications. 
              Experienced in developing mobile apps with Flutter, creating AI-powered tools with Python, and leveraging 
              cloud services for scalable solutions. Committed to writing clean, maintainable code and delivering 
              exceptional user experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.title} className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-primary">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Education</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.degree} className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-primary">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">Technical Skills</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="p-4 rounded-xl bg-card border border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Certifications</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <span key={cert} className="px-4 py-2 rounded-lg bg-card border border-border text-foreground">
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
