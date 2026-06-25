"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Brain, CheckCircle2, ExternalLink, Github, RadioTower, Rocket, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioProjects } from "@/lib/projects-data"

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const featuredProjects = portfolioProjects.filter((project) => project.featured)
  const otherProjects = portfolioProjects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-primary font-mono text-sm">03.</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Live AI Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="mb-12 grid gap-4 md:grid-cols-4">
            {[
              ["9", "deployed apps", Rocket],
              ["5", "trained Keras models", Brain],
              ["100%", "user-testable demos", RadioTower],
              ["Live", "GitHub + Vercel", CheckCircle2],
            ].map(([value, label, Icon]) => (
              <div key={label} className="rounded-lg border border-primary/20 bg-card/60 p-5 shadow-lg shadow-primary/5">
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <div className="text-3xl font-black text-foreground">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 mb-20 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group overflow-hidden rounded-xl border border-border bg-card/70 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="relative min-h-52 border-b border-border bg-secondary/50 p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,234,212,0.18),transparent_35%),linear-gradient(135deg,rgba(56,189,248,0.12),transparent_55%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {project.status || "Live"}
                      </span>
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="mb-3 text-sm font-mono text-muted-foreground">{project.category}</div>
                      <h3 className="max-w-xl text-2xl font-black text-foreground md:text-3xl">{project.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-5 leading-relaxed text-muted-foreground">{project.description}</p>
                  {project.impact && (
                    <div className="mb-5 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-foreground">
                      {project.impact}
                    </div>
                  )}
                  <div className="mb-5 grid gap-2 sm:grid-cols-3">
                    {project.metrics?.map((metric) => (
                      <div key={metric} className="rounded-md border border-border bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                        {metric}
                      </div>
                    ))}
                  </div>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-secondary px-3 py-1 text-xs font-mono text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {project.demo && (
                      <Button asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Test Live <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        Code <Github className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-foreground text-center mb-8">More AI Engineering Work</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="group p-6 bg-card rounded-lg border border-border hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center border border-primary/25">
                    <span className="text-primary font-bold">{project.title.slice(0, 1)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Test live demo <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/HANIDEVINF" target="_blank" rel="noopener noreferrer">
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
