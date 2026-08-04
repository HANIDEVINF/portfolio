"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const experiences = [
  {
    period: "2024 - Present",
    title: "AI Engineering Student",
    company: "University",
    description: "Pursuing advanced studies in artificial intelligence, machine learning, and software engineering. Working on research projects involving natural language processing and computer vision.",
    technologies: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
  },
  {
    period: "2024 - Present",
    title: "ML Model Developer",
    company: "Personal Research & Open Source",
    description: "Designing, training, and fine-tuning deep learning models with PyTorch for vision and language tasks. Building RAG pipelines and integrating LLMs into production-ready apps, then packaging and deploying models with Docker and REST APIs.",
    technologies: ["PyTorch", "LLM Fine-Tuning", "RAG", "Transformers", "Docker", "FastAPI"],
  },
  {
    period: "2023 - Present",
    title: "Freelance Developer",
    company: "Self-Employed",
    description: "Building custom software solutions for clients, specializing in mobile applications and AI-powered tools. Delivered multiple successful projects with high client satisfaction.",
    technologies: ["Flutter", "Python", "AI/ML", "Cloud Services"],
  },
  {
    period: "2022 - 2023",
    title: "Computer Science Student",
    company: "University",
    description: "Foundation studies in computer science covering algorithms, data structures, software engineering principles, and programming fundamentals.",
    technologies: ["Algorithms", "Data Structures", "OOP", "Databases"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-32 px-6 bg-card/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-primary font-mono text-sm">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Experience & Journey</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title + exp.company}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative grid md:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? "" : "md:text-right"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-1/2 mt-1" />

                  {/* Content */}
                  <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:order-2 md:pl-12"}`}>
                    <span className="text-sm font-mono text-primary">{exp.period}</span>
                    <h3 className="text-xl font-semibold text-foreground mt-1">{exp.title}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    <p className="text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>
                    <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block ${index % 2 === 0 ? "md:order-2" : ""}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
