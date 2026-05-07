"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ExternalLink, Github, Filter } from "lucide-react"
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Portfolio projects from my GitHub focused on AI engineering, MLOps, and intelligent product development.
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
                <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col">
                  {/* Project Preview */}
                  <div className="relative aspect-video mb-4 rounded-lg bg-secondary overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/5 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary/30">{project.title.slice(0, 2)}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block text-xs px-2 py-1 bg-primary/10 text-primary rounded-full w-fit mb-3">
                    {project.category}
                  </span>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
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

                  {/* Links */}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
