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
    category: "Deep Learning & Research Methods",
    proof: "Evidence: ECG v7, MCTNet reproduction, MuCAT modules",
    icon: Brain,
    items: [
      "PyTorch & TensorFlow / Keras → ECG v7 (97K-parameter CNN–Transformer, 90.13% 5-fold ensemble accuracy, 0.529 macro-F1)",
      "CNN–Transformer–BiGRU for time series → MCTNet reproduction and extension on Sentinel-2 (OA 0.966 Arkansas / 0.846 California, single runs)",
      "Multilingual NLP architecture design → MuCAT heads (HAP, FiLM gating, evidential head) over mDeBERTa-v3; end-to-end reproduction pending",
      "Ablation studies → covariate ablations with documented negative results (negative transfer, California topography drop)",
      "Class-imbalance handling → balanced class weights, label smoothing, per-class and macro-F1 reporting",
      "Experiment hygiene → fixed seeds, train-only normalisation, patient-independent splits",
    ],
  },
  {
    category: "Biomedical Signals & Edge AI",
    proof: "Evidence: ECG v7, MedGuardAI (architecture case study)",
    icon: Cloud,
    items: [
      "Strict inter-patient DS1/DS2 evaluation → 49,668 held-out MIT-BIH test beats, zero patient overlap",
      "Signal processing → 0.5–45 Hz zero-phase Butterworth filtering, per-beat z-score, RR-interval features",
      "TFLite INT8 quantization → 155.4 KB model, 0.32 ms/beat, 99.82% decision agreement with the float model",
      "Medical IoT architecture → sensor → Raspberry Pi → Flask/MongoDB → Flutter design (capstone; source not public)",
      "Honest minority-class reporting → S-class sensitivity of 16.2% is published, not hidden behind accuracy",
      "Simulation vs clinical evidence → AsthmaExpertUltra is labelled synthetic-data research, not clinical validation",
    ],
  },
  {
    category: "LLM & Agent Prototypes",
    proof: "Prototype level — each project card states what actually runs",
    icon: Bot,
    items: [
      "Retrieval UI prototype → seeded-corpus keyword retrieval; a real embedding + vector-store pipeline is the next build",
      "Agent workflow simulators → ResolveAI and OpsPilot use keyword routing and mock tools, not live LLM agents",
      "LLM evaluation harness → EvalGate smoke-test runner with unit tests and CI (four sample cases)",
      "Single-call LLM drafting → Research Draft Studio sends one Gemini request, no retrieval or verification",
      "In-browser Keras inference → SMS spam classifier (99.1% on the small UCI SMS Spam benchmark)",
      "Speech → browser Web Speech dictation plus an FFT/Keras spoken-digit classifier",
    ],
  },
  {
    category: "Software Engineering & Delivery",
    proof: "Evidence: portfolio CI, EvalGate tests, client deployments",
    icon: ShieldCheck,
    items: [
      "TypeScript, React & Next.js → this portfolio, with type-check and production-build CI",
      "Python tooling → EvalGate runner with unit tests and GitHub Actions",
      "Safe input handling → restricted arithmetic parser replacing eval() in the tool-calling demo",
      "Responsible disclosure in UI → simulated tools and heuristic outputs are labelled as such",
      "Git & GitHub workflow → pull requests, CI checks, documented limitations in READMEs",
      "Static analysis demo → CodeRefactor workbench flags SQL injection and ML data-leakage patterns",
    ],
  },
  {
    category: "Full-Stack & Commercial Client Systems",
    proof: "Delivered for 6 commercial clients in Algeria",
    icon: Smartphone,
    items: [
      "React, Next.js & TypeScript → multi-role SaaS, clinical and e-commerce platforms",
      "Electron desktop applications → Doctor & Receptionist stations for Tadjmeel Clinica",
      "Enterprise ERP, POS & G50 ledger → 4-role Algerian DZD accounting and stock suite",
      "58-wilaya retail & manager systems → ALLURE HOMME, GK STORE & CASUAL 29",
      "Multi-vertical commerce → AURA 5-vertical retail system with PDF reporting",
      "WebRTC telehealth → doctor–patient video consultation flows (MedGuardAI design)",
    ],
  },
  {
    category: "Backend, Databases & Architecture",
    proof: "Applied across clinical and enterprise platforms",
    icon: Terminal,
    items: [
      "REST & WebSocket APIs → physiological-data and POS event flows",
      "Role-based access control → Gérant / Caissier / Médecin permissions",
      "PostgreSQL, MongoDB & Supabase → clinical data and inventory persistence",
      "Vector similarity → 4-dimensional preference-vector cosine ranking (Aurelia demo)",
      "PDF & fiscal reporting → G50 report generators and bilingual PDFs",
      "End-to-end delivery → from dataset or sensor requirements to client handoff",
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
            Each item names the project that backs it. Items marked prototype are interface or heuristic demos rather than production AI systems; every project card states exactly what runs and what does not.
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
