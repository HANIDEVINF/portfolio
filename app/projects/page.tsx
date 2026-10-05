"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Activity, ArrowRight, CheckCircle2, ExternalLink, FileText, Filter, Github, Layers, Sparkles, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { portfolioProjects, type PortfolioProject } from "@/lib/projects-data"
import Link from "next/link"

const categories = ["All", "Healthcare AI", "Client & Commercial", "AI/ML", "MLOps", "Computer Vision", "Full Stack"]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  
  const filteredProjects = activeCategory === "All" 
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />
      
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs sm:text-sm text-purple-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Live demos, PyTorch/Keras models & research evidence
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              AI Project Portfolio
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mb-8 leading-relaxed font-light">
              Deployed AI applications, medical signal processing (ECG Arrhythmia classification & MedGuardAI),
              multilingual Transformers (MUCAT), browser inference engines, agentic systems, and MLOps evaluation frameworks.
            </p>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400 mr-1" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none rounded-xl"
                      : "border-purple-500/20 bg-[#120a22] text-slate-300 hover:text-white hover:bg-[#1a0f30] rounded-xl"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className="group"
              >
                <div className="h-full overflow-hidden rounded-2xl bg-[#0e091d]/90 border border-purple-500/15 hover:border-purple-500/45 hover:shadow-2xl hover:shadow-purple-950/30 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-purple-950/60 via-[#140b28] to-[#0e091d] overflow-hidden p-5 border-b border-purple-500/15">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(168,85,247,0.2),transparent_40%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs px-2.5 py-1 bg-purple-950/80 border border-purple-500/30 text-purple-300 rounded-full font-medium">
                          {project.category}
                        </span>
                        {project.status && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/20 px-2.5 py-0.5 text-xs text-purple-200 font-semibold">
                            <Activity className="h-3 w-3" />
                            {project.status}
                          </span>
                        )}
                      </div>
                      <span className="text-3xl font-black text-purple-500/40">
                        {project.title.slice(0, 2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 flex-grow font-light">
                      {project.description}
                    </p>

                    {project.metrics && (
                      <div className="mb-4 grid gap-1.5">
                        {project.metrics.slice(0, 3).map((metric) => (
                          <div
                            key={metric}
                            className="rounded-lg border border-purple-500/15 bg-purple-950/30 px-3 py-1.5 text-xs text-purple-200"
                          >
                            {metric}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[11px] font-mono text-slate-400 bg-purple-950/40 px-2 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] text-purple-400 font-medium px-1">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-purple-500/15">
                      {project.githubReady !== false ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-mono text-purple-300/80">
                          <Github className="w-3.5 h-3.5" />
                          Repo Soon
                        </span>
                      )}

                      {project.caseStudy && (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-1.5 text-xs sm:text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-medium ml-auto"
                        >
                          <FileText className="w-4 h-4" />
                          Architecture & Report
                        </button>
                      )}

                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium ml-auto"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && selectedProject.caseStudy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-purple-500/35 bg-[#0e091d] p-6 sm:p-8 shadow-2xl shadow-purple-950/60 z-10">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-purple-500/20">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-0.5 text-xs font-semibold text-purple-300">
                    {selectedProject.status}
                  </span>
                  <span className="text-xs font-mono text-purple-400">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-purple-300 mt-1">
                  {selectedProject.caseStudy.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-full bg-purple-950/60 border border-purple-500/30 p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="rounded-xl border border-purple-500/20 bg-purple-950/25 p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-1">
                  Dataset / Scope & Protocol
                </div>
                <div className="text-sm text-slate-200 font-medium">
                  {selectedProject.caseStudy.datasetOrScope}
                </div>
              </div>

              {selectedProject.architecture && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-purple-400" />
                    System & Model Architecture
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.architecture.map((step, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-purple-500/15 bg-[#140c2a]/70 px-4 py-2.5 text-xs sm:text-sm font-mono text-slate-200"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3">
                  Key Quantitative & Engineering Findings
                </h4>
                <ul className="space-y-2">
                  {selectedProject.caseStudy.keyFindings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {selectedProject.caseStudy.sections.map((sec) => (
                  <div key={sec.heading} className="rounded-xl border border-purple-500/15 bg-[#120b24] p-4">
                    <h5 className="text-base font-bold text-white mb-1.5">{sec.heading}</h5>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">{sec.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-500/20">
              <div className="flex flex-wrap gap-3">
                {selectedProject.caseStudyUrl && (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl"
                    asChild
                  >
                    <Link href={selectedProject.caseStudyUrl}>
                      Read Full Technical Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}
                {selectedProject.githubReady !== false && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 bg-[#140d29] text-white rounded-xl"
                    asChild
                  >
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      View Repository <Github className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProject(null)}
                className="border-purple-500/20 bg-transparent text-slate-300 hover:text-white rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
