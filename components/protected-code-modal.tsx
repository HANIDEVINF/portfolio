"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle2, Copy, Database, FileCode, Github, Lock, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type ProtectedRepoData = {
  title: string
  github: string
  technologies: string[]
  trainedDataset?: string
  modelType?: string
  category?: string
  metrics?: string[]
}

export function ProtectedCodeModal({
  repo,
  onClose,
}: {
  repo: ProtectedRepoData | null
  onClose: () => void
}) {
  const [copiedPath, setCopiedPath] = useState(false)

  if (!repo) return null

  const repoPath = repo.github.replace("https://github.com/", "")

  function copyPath() {
    navigator.clipboard?.writeText(`github.com/${repoPath}`)
    setCopiedPath(true)
    setTimeout(() => setCopiedPath(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-purple-500/35 bg-[#0d071d] shadow-2xl shadow-purple-950/70 z-10 text-white">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-purple-500/20 bg-[#120a27] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/50 p-2.5 text-amber-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">
                  Verified GitHub Repository
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  <ShieldCheck className="h-3 w-3" />
                  Protected Code
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono mt-0.5">
                {repoPath}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-purple-950/60 border border-purple-500/30 p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Repository Path Box */}
          <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-[#160d33]/80 p-3.5 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300 truncate">
              <Github className="h-4 w-4 text-purple-400 shrink-0" />
              <span className="text-purple-300 select-all truncate">
                https://github.com/{repoPath}
              </span>
            </div>
            <button
              onClick={copyPath}
              className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-950/60 px-2.5 py-1 text-purple-200 hover:bg-purple-800/40 text-[11px] transition shrink-0 ml-2 cursor-pointer"
            >
              <Copy className="h-3 w-3" />
              {copiedPath ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Trained Dataset if available */}
          {repo.trainedDataset && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <Database className="h-3.5 w-3.5" />
                Training Dataset & Protocol
              </div>
              <div className="text-sm font-medium text-emerald-200">
                {repo.trainedDataset}
              </div>
              {repo.modelType && (
                <div className="mt-2 text-xs text-emerald-300/80 font-mono">
                  Model: {repo.modelType}
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
              Technology Stack & Architecture
            </div>
            <div className="flex flex-wrap gap-1.5">
              {repo.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-purple-500/20 bg-[#180e38] px-2.5 py-1 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Protection Policy Notice */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/25 p-4 text-xs sm:text-sm leading-relaxed text-amber-200/95 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
              Download & Direct Open Restriction Notice
            </div>
            <p className="text-xs text-amber-200/85">
              Direct ZIP downloads, raw repository cloning, and unauthorized code distribution are restricted to safeguard proprietary commercial client systems (medical clinics, POS/ERP suites) and academic research intellectual property (CERIST / USTHB).
            </p>
            <p className="text-xs text-amber-200/85">
              <strong className="text-amber-100">For Recruiters & Evaluators:</strong> If you are a technical recruiter, engineering hiring manager, or academic collaborator wishing to review the full codebase or schedule a live code walkthrough, you may request access directly below.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-500/20 bg-[#100824] px-6 py-4">
          <Link
            href={`/contact?subject=${encodeURIComponent(`Code Review Request: ${repo.title}`)}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:from-purple-600 hover:to-indigo-600 transition"
          >
            <FileCode className="h-4 w-4" />
            Request Code Walkthrough / Access
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="border-purple-500/20 bg-transparent text-slate-300 hover:text-white rounded-xl"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
