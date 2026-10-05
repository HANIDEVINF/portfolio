"use client"

import { useState } from "react"
import { ArrowRight, Brain, CheckCircle2, ExternalLink, FileText, Github, Layers, RadioTower, Rocket, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioProjects, type PortfolioProject } from "@/lib/projects-data"
import Link from "next/link"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const categories = ["All", "Healthcare AI", "Client & Commercial", "AI/ML", "MLOps", "Computer Vision"]

  const featuredProjects = portfolioProjects.filter(
    (project) => project.featured && (activeCategory === "All" || project.category === activeCategory)
  )
  const otherProjects = portfolioProjects.filter(
    (project) => !project.featured && (activeCategory === "All" || project.category === activeCategory)
  )

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Section Header with 03. */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-purple-400 font-mono text-sm font-semibold">03.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              AI Research, Live Apps & Client Systems
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>

          {/* 4 Stat Overview Cards */}
          <div className="mb-10 grid gap-4 grid-cols-2 md:grid-cols-4">
            {(
              [
                ["9+", "deployed live AI workbenches", Rocket],
                ["6", "commercial client systems", Layers],
                ["8+", "trained PyTorch/Keras models", Brain],
                ["5", "CERIST AI research internships", CheckCircle2],
              ] as const
            ).map(([value, label, Icon]) => (
              <div
                key={label}
                className="rounded-2xl border border-purple-500/20 bg-[#0f0a1e]/80 p-5 shadow-lg shadow-purple-950/20 backdrop-blur-sm"
              >
                <Icon className="mb-3 h-5 w-5 text-purple-400" />
                <div className="text-3xl sm:text-4xl font-black text-white">{value}</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400 font-light">{label}</div>
              </div>
            ))}
          </div>

          {/* Category Filter Bar */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25"
                      : "border border-purple-500/20 bg-[#120a24]/80 text-slate-300 hover:border-purple-500/45 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-500/15 px-4 py-2 text-xs sm:text-sm font-semibold text-purple-200 hover:bg-purple-500/25 transition whitespace-nowrap"
            >
              <Sparkles className="h-4 w-4 text-purple-300" />
              Open Full-Stack Interactive AI & Commercial Lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid gap-8 mb-20 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0d081a]/90 shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-purple-950/30 flex flex-col justify-between"
              >
                {/* Card Banner Header */}
                <div className="relative min-h-44 border-b border-purple-500/15 bg-gradient-to-br from-purple-950/40 via-[#130b26] to-[#0d081a] p-6 sm:p-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.15),transparent_40%),linear-gradient(135deg,rgba(236,72,153,0.1),transparent_60%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1 text-xs font-semibold text-purple-300">
                          {project.status || "Live"}
                        </span>
                        <span className="text-xs font-mono text-purple-400/80">
                          {project.category}
                        </span>
                      </div>
                      <Sparkles className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <p className="mb-5 leading-relaxed text-slate-300 text-sm sm:text-base font-light">
                      {project.description}
                    </p>

                    {project.impact && (
                      <div className="mb-5 rounded-xl border border-purple-500/20 bg-purple-950/20 p-4 text-xs sm:text-sm leading-relaxed text-slate-200">
                        {project.impact}
                      </div>
                    )}

                    {project.metrics && (
                      <div className="mb-5 grid gap-2 sm:grid-cols-3">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="rounded-lg border border-purple-500/15 bg-[#140c2a]/60 px-3 py-2 text-xs text-purple-200 text-center font-medium"
                          >
                            {metric}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-[#180f33] border border-purple-500/15 px-2.5 py-1 text-xs font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-purple-500/15">
                    {project.demo && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium rounded-xl shadow-md shadow-purple-500/20"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Test Live <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}

                    {project.caseStudy && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium rounded-xl shadow-md shadow-purple-500/20"
                      >
                        Architecture & Report <FileText className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    )}

                    {project.githubReady !== false ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500/30 bg-[#140d29] hover:bg-[#1f143d] text-white font-medium rounded-xl"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Code <Github className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/25 bg-[#140d29]/60 px-3 py-1.5 text-xs font-mono text-purple-300/90">
                        <Github className="h-3.5 w-3.5" />
                        Repo Publishing Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More AI Engineering Work Grid */}
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            More AI Engineering Work
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.title}
                className="group p-6 bg-[#0e091d]/85 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center border border-purple-500/30 text-purple-300 font-bold text-base">
                      {project.title.slice(0, 1)}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label="GitHub repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-purple-300 transition-colors"
                          aria-label="Live demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 font-light">
                    {project.description}
                  </p>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
                    >
                      Test live demo <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-500/10">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-slate-400 bg-purple-950/40 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/30 bg-[#120a24] hover:bg-[#1a0f33] text-white font-medium rounded-xl px-8"
              asChild
            >
              <a href="https://github.com/HANIDEVINF" target="_blank" rel="noopener noreferrer">
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Technical Case Study & Architecture Modal */}
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
    </section>
  )
}
