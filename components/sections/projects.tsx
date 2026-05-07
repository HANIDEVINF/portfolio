"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioProjects } from "@/lib/projects-data"

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-primary font-mono text-sm">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-20">
            {portfolioProjects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 1 ? "md:text-right" : ""
                }`}
              >
                {/* Project Image/Preview */}
                <div className={`md:col-span-7 ${index % 2 === 1 ? "md:col-start-6" : ""}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-60 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="relative aspect-video bg-secondary rounded-lg overflow-hidden border border-border">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/20">{project.title.slice(0, 2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div 
                  className={`md:col-span-6 md:row-start-1 ${
                    index % 2 === 1 ? "md:col-start-1" : "md:col-start-6"
                  }`}
                >
                  <p className="text-primary font-mono text-sm mb-2">Featured Project</p>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
                  <div className="relative z-10 p-6 bg-card rounded-lg border border-border shadow-xl mb-4">
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  <div className={`flex flex-wrap gap-3 mb-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-sm font-mono text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
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
              </motion.div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">Other Noteworthy Projects</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
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
