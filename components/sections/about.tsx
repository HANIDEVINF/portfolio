"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X, GraduationCap, Building2, Stethoscope, Brain, ShieldCheck, Globe2, Cpu } from "lucide-react"

const quickFacts = [
  { icon: GraduationCap, label: "Academic Track", value: "Master in Artificial Intelligence at USTHB (Sep 2022 – June 2027) + CS Licence" },
  { icon: Building2, label: "Research Track", value: "5 AI Engineering Internships at CERIST (Healthcare AI, Multilingual NLP, Transformers)" },
  { icon: Stethoscope, label: "Medical AI & IoT", value: "MedGuardAI (Real-Time ECG/Glucose + WebRTC) & MIT-BIH v7 (155 KB INT8 TFLite)" },
  { icon: Brain, label: "Custom Architectures", value: "Designed MUCAT (Hierarchical Attention + Language Gating for Arabic/French/English)" },
  { icon: Globe2, label: "Trilingual Engineer", value: "Arabic (Native) · French (Full Professional) · English (Professional Working)" },
]

const recruiterPillars = [
  {
    icon: Cpu,
    title: "Models That Ship to Production & Edge",
    description:
      "Not just isolated Jupyter notebooks: trained PyTorch/Keras models quantized to 155 KB INT8 TFLite (0.32 ms/beat) and deployed into live web, Flutter, and Raspberry Pi IoT systems.",
  },
  {
    icon: Building2,
    title: "5× CERIST Research + ~2 Yrs Full-Stack",
    description:
      "Rare combination of 5 national research center internships (custom BERT/Transformer architectures, clinical signal processing) and 2 years delivering full-stack freelance products.",
  },
  {
    icon: ShieldCheck,
    title: "Scientific Rigor & Trustworthy AI",
    description:
      "Strict patient-grouped cross-validation (zero data leakage), out-of-fold probability calibration, uncertainty estimation, and prompt-injection / policy guardrails.",
  },
]

export function AboutSection() {
  const [isCardOpen, setIsCardOpen] = useState(false)

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div>
          {/* Section Header with 01. */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-purple-400 font-mono text-sm font-semibold">01.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              About Me
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-start mb-14">
            {/* Biography text */}
            <div className="md:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg font-light">
              <p>
                {"I am an AI Engineering Master's student at USTHB (Algiers) with ~2 years of freelance full-stack & AI development experience and five AI research internships at CERIST (Research Center on Scientific and Technical Information)."}
              </p>

              <p>
                My work bridges <span className="text-purple-300 font-medium">deep learning research</span> and <span className="text-cyan-300 font-medium">production software engineering</span>: I have designed <strong className="text-white font-semibold">MUCAT</strong> (a custom multilingual BERT/Transformer architecture for Arabic, French, and English NLP), built <strong className="text-white font-semibold">MedGuardAI</strong> (a real-time patient monitoring platform connected to physical ECG and blood glucose sensors), and engineered <strong className="text-white font-semibold">v7 Embedded ECG Arrhythmia Classification</strong> on MIT-BIH.
              </p>

              <p>
                {"Currently, I focus on generative AI, agentic workflows (ReAct, tool calling, guardrails), explainable & trustworthy AI, and deploying models end-to-end across Python, PyTorch, TensorFlow/Keras, React/Next.js, and Flutter."}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsCardOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-5 py-2.5 text-xs sm:text-sm font-medium text-purple-300 shadow-lg shadow-purple-900/30 backdrop-blur-sm transition-all hover:bg-purple-900/50 hover:border-purple-400"
                >
                  <Plus className="h-4 w-4" />
                  Quick facts about me
                </button>
                <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-full border border-purple-500/15 bg-[#110b22]">
                  AR · FR · EN
                </span>
              </div>
            </div>

            {/* Profile Photo Card */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 bg-[#120b22] p-1.5 shadow-2xl shadow-purple-950/40">
                <div className="relative aspect-[4/4.8] w-full rounded-xl overflow-hidden bg-slate-900">
                  <Image
                    src="/images/profile-portrait.jpg"
                    alt="Hani Ghena"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07050d] via-transparent to-transparent opacity-85" />
                  
                  {/* Name badge at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white leading-tight">Hani Ghena</h3>
                    <p className="text-xs sm:text-sm text-purple-300">AI Engineer · USTHB & CERIST</p>
                  </div>
                </div>

                {/* 17+ Projects Pill badge */}
                <div className="absolute top-4 right-4 rounded-xl border border-purple-400/40 bg-[#160c2c]/90 px-3 py-1.5 shadow-xl shadow-black/50 backdrop-blur-md text-center">
                  <div className="text-base font-black text-purple-300 leading-none">17+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Hire Me / Engineering Differentiation Strip */}
          <div className="grid sm:grid-cols-3 gap-5 pt-4">
            {recruiterPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-purple-500/20 bg-[#0e091d]/90 p-5 shadow-lg shadow-black/30"
              >
                <div className="mb-3 inline-flex rounded-xl bg-purple-950/60 border border-purple-500/25 p-2.5 text-purple-300">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick facts popup modal */}
      {isCardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsCardOpen(false)}
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-purple-500/30 bg-[#100a20] shadow-2xl shadow-purple-900/40">
            <div className="relative h-28 bg-gradient-to-r from-fuchsia-600/30 via-purple-600/30 to-cyan-500/30 p-6 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Hani Ghena</h3>
                <p className="text-xs text-purple-300">AI Engineering Master · USTHB & CERIST</p>
              </div>
              <button
                onClick={() => setIsCardOpen(false)}
                className="rounded-full bg-black/40 p-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3.5 p-3 rounded-xl bg-purple-950/25 border border-purple-500/15">
                  <div className="mt-0.5 rounded-lg bg-purple-500/20 p-2 text-purple-300">
                    <fact.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{fact.label}</div>
                    <div className="text-sm text-slate-200 mt-0.5">{fact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
