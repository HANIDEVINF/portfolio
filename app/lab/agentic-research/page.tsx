"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Bot, Sparkles, Send, CheckCircle2, Download, RefreshCw, FileText, Cpu, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Markdown from "react-markdown"

export default function AgenticResearchStudioPage() {
  const [query, setQuery] = useState("State-of-the-Art in Multilingual RAG and Evidential Uncertainty for Low-Resource Maghreb Languages")
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState<{
    query: string
    report: string
    timestamp: string
    source: string
    executionMode: string
    latencyMs: number
  } | null>(null)

  async function handleRunResearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/agents/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      if (data.ok) {
        setReportData(data)
      } else {
        throw new Error(data.error || "Failed to generate research report.")
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Agentic research failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />

      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18),transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-purple-950/40 px-4 py-1.5 text-xs sm:text-sm text-purple-300 mb-6">
            <Bot className="h-4 w-4 text-purple-400" />
            Autonomous Multi-Agent Research & Report Studio
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            AI-Assisted Research Synthesis Prototype
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mb-8 leading-relaxed font-light">
            Generate a structured technical draft with one Gemini model call. This prototype does not browse external sources, run independent agents, or verify citations. Treat outputs as a starting point and check factual claims and sources independently.
          </p>

          {/* Research Prompt Form */}
          <form
            onSubmit={handleRunResearch}
            className="rounded-2xl border border-purple-500/30 bg-[#0e091e]/90 p-4 sm:p-6 shadow-2xl shadow-purple-950/50 mb-12"
          >
            <label className="block text-xs font-mono uppercase tracking-wider text-purple-300 mb-2 font-semibold">
              Enter Complex Research Topic or Technical Query
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Architecting Real-Time LLM Guardrails for Clinical RAG Pipelines..."
                className="bg-[#070511] border-purple-500/30 text-white placeholder:text-slate-500 h-12 rounded-xl text-sm sm:text-base flex-1"
                required
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="h-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold rounded-xl px-8 shadow-lg shadow-purple-500/25 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Swarms Executing…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Research Draft
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Honest execution metadata: one model call, no fabricated per-agent telemetry */}
          {reportData && (
            <div className="mb-10 rounded-2xl border border-purple-500/25 bg-[#120a26]/90 p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-purple-300 mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-400" />
                Execution details
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-purple-500/20 bg-[#0c071a] p-3.5">
                  <div className="text-xs text-slate-400 mb-1">Execution mode</div>
                  <div className="text-sm font-semibold text-white">Single model call</div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-[#0c071a] p-3.5">
                  <div className="text-xs text-slate-400 mb-1">Model provider</div>
                  <div className="text-sm font-semibold text-white">{reportData.source}</div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-[#0c071a] p-3.5">
                  <div className="text-xs text-slate-400 mb-1">Server-side elapsed time</div>
                  <div className="text-sm font-semibold text-white">{reportData.latencyMs} ms</div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Elapsed time covers the model API call on the server. No external retrieval, independent reviewer, or multi-agent execution is performed.
              </p>
            </div>
          )}

          {/* Generated Research Report Output */}
          {reportData && (
            <div className="rounded-3xl border border-purple-500/30 bg-[#0e0a1f] p-6 sm:p-10 shadow-2xl shadow-purple-950/60">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-purple-500/20 flex-wrap gap-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-1">
                    Generated Executive Synthesis
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {reportData.query}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const blob = new Blob([reportData.report], { type: "text/markdown" })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = `Research_Report_${Date.now()}.md`
                      a.click()
                    }}
                    className="border-purple-500/30 bg-[#160e33] text-purple-200 hover:bg-[#201445] rounded-xl"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Markdown
                  </Button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-slate-200 font-light leading-relaxed space-y-4">
                <Markdown>{reportData.report}</Markdown>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
