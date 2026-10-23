"use client"

import { useState } from "react"
import { ALL_GITHUB_REPOSITORIES, type GithubRepoInfo } from "@/lib/github-repos"
import { ProtectedCodeModal, type ProtectedRepoData } from "@/components/protected-code-modal"
import { Brain, Database, Filter, FolderGit2, Github, Lock, Search, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"

export function GithubReposDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [activeRepo, setActiveRepo] = useState<ProtectedRepoData | null>(null)

  const categories = [
    "All",
    "Healthcare Deep Learning",
    "NLP & Speech AI",
    "Computer Vision",
    "MLOps & Agents",
    "Commercial Software",
    "Academic & Systems",
  ]

  const filteredRepos = ALL_GITHUB_REPOSITORIES.filter((repo) => {
    const matchesCategory =
      selectedCategory === "All" || repo.category === selectedCategory
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.trainedDataset &&
        repo.trainedDataset.toLowerCase().includes(searchTerm.toLowerCase())) ||
      repo.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const trainedModelsCount = ALL_GITHUB_REPOSITORIES.filter((r) => r.isTrainedModel).length

  return (
    <section className="mt-20 pt-16 border-t border-purple-500/20">
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-purple-500/30 bg-purple-950/50 p-2.5 text-purple-400">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Complete GitHub Repositories Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                All 36 repositories across deep learning research, healthcare AI, and client production systems.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Brain className="h-3.5 w-3.5" />
              {trainedModelsCount} Trained Neural Models
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300">
              <Lock className="h-3.5 w-3.5" />
              Code Visible · Download Disabled
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by repo name, dataset, or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0d071a] border-purple-500/25 text-white placeholder:text-slate-500 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-slate-400 mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30"
                    : "border border-purple-500/20 bg-[#120a22]/80 text-slate-300 hover:text-white hover:bg-[#1a0f30]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRepos.map((repo) => (
          <div
            key={repo.name}
            className="group rounded-2xl border border-purple-500/20 bg-[#0c071a]/90 p-5 shadow-lg shadow-black/30 hover:border-purple-500/45 hover:-translate-y-0.5 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] text-purple-400 truncate">
                  {repo.category}
                </span>
                <span className="rounded-md border border-purple-500/20 bg-purple-950/40 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                  {repo.language}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white font-mono group-hover:text-purple-300 transition-colors mb-2 break-all">
                {repo.name}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-light mb-3 line-clamp-3">
                {repo.description}
              </p>

              {/* Trained Dataset Badge if available */}
              {repo.trainedDataset && (
                <div className="mb-3 rounded-lg border border-emerald-500/25 bg-emerald-950/20 p-2 text-[11px] text-emerald-200">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-0.5">
                    <Database className="h-3 w-3" />
                    Trained Dataset:
                  </div>
                  <div className="line-clamp-2 text-emerald-200/90 font-mono text-[10.5px]">
                    {repo.trainedDataset}
                  </div>
                </div>
              )}

              {/* Topics */}
              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-slate-400 bg-purple-950/30 px-2 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <span className="text-[10px] text-purple-400 font-mono self-center">
                    +{repo.topics.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Action Bar: Visible Code Source with Download Disabled */}
            <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveRepo({
                    title: repo.name,
                    github: `https://github.com/${repo.fullName}`,
                    technologies: [repo.language, ...repo.topics],
                    trainedDataset: repo.trainedDataset,
                    modelType: repo.modelType,
                    category: repo.category,
                  })
                }
                className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-purple-500/25 bg-[#140b2a] px-3 py-2 text-xs font-mono text-purple-200 hover:border-purple-400/40 hover:bg-[#1d103d] transition cursor-pointer"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Github className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span className="truncate text-slate-300">
                    {repo.fullName.replace("HANIDEVINF/", "")}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 shrink-0 text-[10px] text-amber-300 bg-amber-950/50 border border-amber-500/20 px-1.5 py-0.5 rounded font-sans">
                  <Lock className="h-2.5 w-2.5 text-amber-400" />
                  Protected
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="rounded-2xl border border-purple-500/20 bg-[#0e081e] p-12 text-center text-slate-400">
          No repositories found matching your search.
        </div>
      )}

      {/* Protected Code Modal */}
      <ProtectedCodeModal
        repo={activeRepo}
        onClose={() => setActiveRepo(null)}
      />
    </section>
  )
}
