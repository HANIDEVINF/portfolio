"use client"

import { 
  Brain, 
  Smartphone, 
  Cloud, 
  Terminal,
  ShieldCheck,
  Bot,
} from "lucide-react"

const skills = [
  {
    category: "Deep Learning & Transformers",
    proof: "Applied in CERIST MuCAT (98.20% Test Acc) & MIT-BIH ECG v7",
    icon: Brain,
    items: [
      "PyTorch & TensorFlow / Keras → Trained 97K-param CNN-Transformer (90.13% DS2 ensemble)",
      "mDeBERTa-v3 / XLM-R → Engineered MuCAT (HAP + FiLM Language Gating + Dirichlet u=K/S)",
      "1D/2D CNNs & Multi-Head Attention → Dual-lead ECG morphology + 8 RR interval fusion",
      "6-Language Low-Resource NLP → MSA, Algerian Darija, Kabyle, Chaoui, French & English",
      "Medical Signal Processing → 0.5–45 Hz zero-phase Butterworth & Pan-Tompkins R-peaks",
      "Evidential Deep Learning & LLRD → Single-pass Dirichlet uncertainty & layer-wise decay (ξ=0.95)",
    ],
  },
  {
    category: "Agentic AI, RAG & LLM Systems",
    proof: "Applied in VeriCite RAG & ResolveAI Orchestrator",
    icon: Bot,
    items: [
      "Hybrid Dense + BM25 RAG → Built VeriCite Studio with Reciprocal Rank Fusion (RRF)",
      "Agentic AI & ReAct Routing → Built 4-agent orchestrator (Triage, Billing, Tech, Retention)",
      "Structured JSON Extraction → Trained 9-class Keras schema router with OOD abstention",
      "Speech-to-Text & Diarization → Built VoxScribe trilingual ASR + SOAP clinical summarizer",
      "Citation & Faithfulness Gates → Automatic abstention on ungrounded LLM claims",
      "Hugging Face & Token Attribution → Deployed in-browser Keras safety moderation (99.1%)",
    ],
  },
  {
    category: "AI Security & Research Rigor",
    proof: "Applied in CERIST Benchmarks & CodeRefactor AST",
    icon: ShieldCheck,
    items: [
      "Strict Inter-Patient Splits → Enforced DS1/DS2 zero-patient-leakage on 49,668 test beats",
      "Out-of-Fold Logit Calibration → DS1-only prior temperature scaling without test leakage",
      "AST Security & Leakage Audit → Built CodeRefactor detector for OWASP & ML data leakage",
      "LLM Regression & Safety Gates → Built EvalGate Pareto latency/cost/safety workbench",
      "Prompt Injection & Policy Guardrails → Deterministic pre-execution tool validation",
      "Human-in-the-Loop SRE Gates → Built OpsPilot incident copilot with approval workflows",
    ],
  },
  {
    category: "Edge AI, IoT & MLOps Deployment",
    proof: "Applied in MedGuardAI & Embedded TFLite",
    icon: Cloud,
    items: [
      "TFLite INT8 Quantization → Compressed ECG Transformer to 155.4 KB (0.32 ms/beat)",
      "Hardware Fidelity Verification → Verified 99.82% Keras-to-TFLite decision agreement",
      "Physical Medical IoT → Connected ECG & blood glucose sensors to Raspberry Pi in MedGuardAI",
      "Computer Vision Tensor Engine → Exported CIFAR-10 Keras weights to browser runtime",
      "Docker & Containerized Inference → Packaged reproducible microservice APIs",
      "Zero-Dependency Production Deploys → Shipped 17+ live Vercel & GitHub Pages systems",
    ],
  },
  {
    category: "Full-Stack & Commercial Client Systems",
    proof: "Delivered for 6 Commercial Clients in Algeria",
    icon: Smartphone,
    items: [
      "React, Next.js & TypeScript → Built multi-role SaaS, clinical, and e-commerce platforms",
      "Electron Desktop Applications → Shipped Doctor & Receptionist stations for Tadjmeel Clinica",
      "Enterprise ERP, POS & G50 Ledger → Built 4-role Algerian DZD accounting & stock suite",
      "WebRTC Telemedicine & Live Chat → Built real-time doctor-patient video & alert streams",
      "58-Wilaya Retail & Manager OS → Deployed ALLURE HOMME, GK STORE & CASUAL 29",
      "Multi-Vertical Commerce OS → Built AURA 5-vertical retail & PDF reporting system",
    ],
  },
  {
    category: "Backend, Databases & System Architecture",
    proof: "Applied Across Clinical & Enterprise Platforms",
    icon: Terminal,
    items: [
      "Real-Time REST & WebSocket APIs → Low-latency physiological & POS event streaming",
      "Role-Based Access Control (RBAC) → Multi-tenant Gérant / Caissier / Médecin permissions",
      "PostgreSQL, MongoDB & Supabase → Clinical telemetry & enterprise inventory persistence",
      "Vector Embeddings & Cosine Ranking → Built Aurelia 4D affinity recommendation engine",
      "Bilingual PDF & Fiscal Engines → Zero-dependency ISO PDF 1.4 & G50 report generators",
      "End-to-End Architecture → From raw sensor / dataset curation to live client handoff",
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div>
          {/* Section Header with 02. */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-purple-400 font-mono text-sm font-semibold">02.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Applied Capabilities &amp; Engineering Proof
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>
          <p className="text-slate-400 text-sm sm:text-base mb-12 max-w-3xl font-light">
            Every technical capability listed below is backed by a deployed production system, trained neural checkpoint, or CERIST research benchmark in this portfolio.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="group p-6 bg-[#0f0a1d]/80 rounded-2xl border border-purple-500/15 hover:border-purple-500/45 hover:shadow-xl hover:shadow-purple-950/30 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-2">
                    <div className="p-2.5 rounded-xl bg-purple-950/50 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                      <skill.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{skill.category}</h3>
                      <p className="text-[11px] font-mono text-cyan-300/90 mt-0.5">{skill.proof}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mt-4">
                    {skill.items.map((item) => (
                      <li key={item} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 font-light leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
