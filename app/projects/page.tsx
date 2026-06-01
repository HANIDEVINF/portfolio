"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Activity, ExternalLink, Github, Filter, Sparkles } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { portfolioProjects } from "@/lib/projects-data"

const categories = ["All", "AI/ML", "MLOps", "Computer Vision", "Full Stack"]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  
  const filteredProjects = activeCategory === "All" 
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Live demos, code, model evidence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">AI Project Portfolio</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8 leading-8">
              Deployed projects focused on real user input, Keras model training, browser inference, AI product workflows,
              and MLOps-style evaluation. Each live demo is connected to its GitHub repository.
            </p>

            {/* Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
                className="group"
              >
                <div className="h-full overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-video bg-secondary overflow-hidden p-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(94,234,212,0.22),transparent_35%),linear-gradient(135deg,rgba(56,189,248,0.12),transparent_60%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs px-2 py-1 bg-primary/10 text-primary rounded-full w-fit">
                          {project.category}
                        </span>
                        {project.status && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                            <Activity className="h-3 w-3" />
                            {project.status}
                          </span>
                        )}
                      </div>
                      <span className="text-3xl font-black text-primary/40">{project.title.slice(0, 2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    {project.metrics && (
                      <div className="mb-4 grid gap-2">
                        {project.metrics.slice(0, 3).map((metric) => (
                          <div key={metric} className="rounded-md border border-border bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                            {metric}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
