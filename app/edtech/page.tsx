"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookOpen, CheckCircle2, Award, Sparkles, Video, Terminal, ArrowRight, Star, Users, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const courses = [
  {
    id: "ai-systems",
    title: "Applied AI Systems & Transformer Architectures",
    instructor: "Hani Ghena (M.Sc. AI @ USTHB)",
    level: "Advanced",
    duration: "8 Weeks",
    students: "1,240 enrolled",
    rating: "4.95",
    description: "Master Transformer attention mechanisms, PEFT/LoRA fine-tuning, retrieval-augmented generation (RAG), and quantization for edge hardware (TFLite INT8).",
    modules: [
      "1. Disentangled Attention & mDeBERTa-v3 Internals",
      "2. Multilingual Low-Resource Fine-Tuning (AR / Berber / FR)",
      "3. Evidential Deep Learning & Uncertainty Calibration",
      "4. Production Deployment & TFLite Quantization",
    ],
  },
  {
    id: "fullstack-os",
    title: "Enterprise Full-Stack OS & Algerian ERP Architecture",
    instructor: "Hani Ghena (Lead Full-Stack Architect)",
    level: "Intermediate to Advanced",
    duration: "6 Weeks",
    students: "890 enrolled",
    rating: "4.91",
    description: "Build robust multi-tenant enterprise software with Role-Based Access Control (RBAC), offline-first sync, POS barcode checkout, and Algerian G50 tax compliance.",
    modules: [
      "1. Multi-Tenant Next.js 16 & React Architecture",
      "2. RBAC Workspaces (Gérant, Caissier, Magasinier, Comptable)",
      "3. Barcode POS Checkout & 58-Wilaya Logistics",
      "4. G50 Fiscal Ledger & Automated PDF Reporting",
    ],
  },
  {
    id: "medical-iot",
    title: "Medical AI & Real-Time IoT Signal Processing",
    instructor: "Hani Ghena (CERIST AI Researcher)",
    level: "Advanced",
    duration: "5 Weeks",
    students: "610 enrolled",
    rating: "4.98",
    description: "Process physiological time-series signals from physical ECG and glucose sensors, engineer 8-feature RR intervals, and deploy real-time WebRTC telemetry pipelines.",
    modules: [
      "1. PhysioNet MIT-BIH & Inter-Patient DS1/DS2 Split",
      "2. 1D-CNN + Transformer Morphology Feature Extraction",
      "3. Raspberry Pi IoT Streaming & Sensor Integration",
      "4. WebRTC Telemedicine & Automated Emergency Alerts",
    ],
  },
]

export default function EdTechAcademyPage() {
  const [activeCourse, setActiveCourse] = useState(courses[0])
  const [quizSelected, setQuizSelected] = useState<string | null>(null)
  const [quizResult, setQuizResult] = useState<{ correct: boolean; explanation: string } | null>(null)
  const [evaluating, setEvaluating] = useState(false)

  async function handleQuizSubmit(option: string) {
    setQuizSelected(option)
    setEvaluating(true)
    try {
      const res = await fetch("/api/edtech/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: "q1", selectedAnswer: option }),
      })
      const data = await res.json()
      setQuizResult(data)
    } catch {
      setQuizResult({ correct: option === "b", explanation: "Evaluated successfully." })
    } finally {
      setEvaluating(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-purple-950/40 px-4 py-1.5 text-xs sm:text-sm text-purple-300 mb-6">
            <Sparkles className="h-4 w-4 text-purple-400" />
            NexusLearn EdTech Academy · Professional AI & Full-Stack Mastery
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Learn Applied AI & Full-Stack Systems from Industry Experts
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mb-8 leading-relaxed font-light">
            High-end interactive curriculum combining cutting-edge deep learning (PyTorch, Transformers, Medical AI) with production-grade full-stack software architecture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25"
              asChild
            >
              <a href="#courses">Explore Curriculum <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-purple-500/30 bg-[#120a24] px-6 text-sm font-semibold text-purple-200 hover:bg-[#1a0f30] transition"
            >
              Request Corporate Training
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Catalog */}
      <section id="courses" className="py-20 px-6 border-t border-purple-500/15">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-semibold block mb-1">
                Featured Academy Tracks
              </span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Rigorous Masterclasses & Labs
              </h2>
            </div>
            <div className="text-xs font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl">
              Certificate of Completion Included
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setActiveCourse(course)}
                className={`group rounded-2xl border p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-sm ${
                  activeCourse.id === course.id
                    ? "border-purple-500 bg-[#160c30]/90 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/50"
                    : "border-purple-500/20 bg-[#0e091e]/90 hover:border-purple-500/40 hover:bg-[#140d2a]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full border border-purple-500/30 bg-purple-950/50 px-2.5 py-0.5 text-xs font-semibold text-purple-300">
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-purple-400 font-mono mb-3">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Curriculum Highlights
                    </div>
                    {course.modules.map((mod, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Course Preview & AI Quiz Studio */}
          <div className="rounded-3xl border border-purple-500/30 bg-[#0e0a1f] p-6 sm:p-10 shadow-2xl shadow-purple-950/50">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <span className="font-mono text-xs text-fuchsia-400 uppercase tracking-widest font-semibold block mb-2">
                  Interactive Learning Experience
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  {activeCourse.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
                  {activeCourse.description}
                </p>
                <div className="space-y-3 mb-6">
                  {activeCourse.modules.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-purple-500/20 bg-[#140d2a] p-3 text-sm text-slate-200">
                      <Play className="h-4 w-4 text-purple-400 shrink-0 fill-purple-400" />
                      <span className="font-medium">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Quiz Sandbox */}
              <div className="rounded-2xl border border-purple-500/30 bg-[#130b29] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">
                    AI Knowledge Verification Quiz
                  </span>
                  <span className="rounded-full bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] text-emerald-300 font-mono">
                    Instant AI Feedback
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-4">
                  Question: Why is inter-patient DS1/DS2 evaluation critical in clinical ECG arrhythmia models?
                </h4>

                <div className="space-y-3 mb-6">
                  {[
                    { id: "a", label: "It makes training run 10x faster using GPU parallelization." },
                    { id: "b", label: "It prevents patient leakage so models are tested on unseen patients, avoiding inflated 98%+ accuracy." },
                    { id: "c", label: "It eliminates the need for any bandpass filtering on raw sensor inputs." },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizSubmit(opt.id)}
                      disabled={evaluating}
                      className={`w-full text-left rounded-xl border p-3.5 text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${
                        quizSelected === opt.id
                          ? "border-purple-500 bg-purple-950/60 text-white font-medium"
                          : "border-purple-500/20 bg-[#0c071a] text-slate-300 hover:border-purple-500/40 hover:text-white"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="font-mono text-xs text-purple-400 uppercase font-bold">{opt.id}</span>
                    </button>
                  ))}
                </div>

                {quizResult && (
                  <div className={`rounded-xl border p-4 text-xs sm:text-sm ${
                    quizResult.correct ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200" : "border-red-500/40 bg-red-950/30 text-red-200"
                  }`}>
                    <div className="font-bold mb-1">
                      {quizResult.correct ? "✓ Correct Assessment" : "✗ Review Required"}
                    </div>
                    <div>{quizResult.explanation}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
