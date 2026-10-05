"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    slug: "ai-ecg-arrhythmia-classification-mit-bih",
    title: "AI ECG Arrhythmia Classification on MIT-BIH (v7): Inter-Patient Rigor & Embedded TFLite",
    excerpt: "Why 94.56% is not the headline metric on MIT-BIH. A comprehensive breakdown of strict DS1/DS2 inter-patient evaluation, 1D-CNN + Transformer attention, and TFLite INT8 deployment.",
    date: "2026-10-05",
    readTime: "12 min read",
    tags: ["Healthcare AI", "MIT-BIH", "Transformers", "TFLite", "PyTorch"],
  },
  {
    slug: "getting-started-with-ai-engineering",
    title: "Getting Started with AI Engineering in 2026-2027",
    excerpt: "A comprehensive roadmap from foundational ML and deep learning to modern LLM engineering, RAG pipelines, agentic workflows, and production MLOps.",
    date: "2026-09-15",
    readTime: "8 min read",
    tags: ["AI Engineering", "Roadmap", "PyTorch", "LLMs"],
  },
  {
    slug: "building-intelligent-apps-with-langchain",
    title: "Building Intelligent Multi-Agent Systems & Tool Calling",
    excerpt: "Learn how to build reliable agentic workflows with ReAct, structured outputs, permission gates, and production observability.",
    date: "2026-08-10",
    readTime: "10 min read",
    tags: ["AI Agents", "ReAct", "Tool Calling", "Python"],
  },
  {
    slug: "flutter-state-management-2024",
    title: "Flutter & Real-Time IoT Sensor Streaming (MedGuardAI)",
    excerpt: "Architecting real-time mobile telemetry for medical devices with WebSockets, WebRTC, and Python microservices.",
    date: "2026-07-05",
    readTime: "9 min read",
    tags: ["Flutter", "IoT", "WebRTC", "Mobile"],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />
      
      <section className="pt-32 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Technical Research & Engineering Articles
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">Blog & Research Notes</h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light">
              Deep dives into AI engineering, medical signal processing, Transformer architectures, and lessons learned building production systems.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#0e091e]/85 border border-purple-500/15 hover:border-purple-500/45 hover:bg-[#140c2a] transition-all duration-300 backdrop-blur-sm shadow-lg shadow-black/30">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-purple-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2.5">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-slate-300 leading-relaxed mb-5 font-light">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-purple-500/10">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-0.5 bg-purple-950/50 text-purple-300 rounded-full border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <span className="text-purple-400 flex items-center gap-1 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
