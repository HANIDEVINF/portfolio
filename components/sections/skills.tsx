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
    category: "AI & Deep Learning",
    icon: Brain,
    items: [
      "PyTorch & TensorFlow / Keras",
      "Transformers & Custom BERT (MUCAT)",
      "1D/2D CNNs & Multi-Head Attention",
      "Multilingual NLP (Arabic / French / English)",
      "Anomaly Detection & ECG Signal Processing",
      "Focal Loss & Imbalanced Learning",
    ],
  },
  {
    category: "AI Agents & LLM Systems",
    icon: Bot,
    items: [
      "Agentic AI & ReAct Workflows",
      "Tool Calling & Function Schemas",
      "RAG Pipelines & Vector Retrieval",
      "Hugging Face Transformers",
      "Guardrails & Policy-Based AI",
      "Explainability & Trustworthy AI",
    ],
  },
  {
    category: "AI Security & Research Rigor",
    icon: ShieldCheck,
    items: [
      "Inter-Patient Evaluation (DS1/DS2)",
      "Uncertainty & Confidence Estimation",
      "Out-of-Fold Logit Calibration",
      "Prompt Injection Defense",
      "IAM Concepts & Policy Enforcement",
      "Neuro-Symbolic AI Concepts",
    ],
  },
  {
    category: "Edge AI, MLOps & Deployment",
    icon: Cloud,
    items: [
      "TFLite INT8 Quantization (155 KB)",
      "Keras-to-TFLite Fidelity Verification",
      "Raspberry Pi & Medical IoT Sensors",
      "Docker & Containerized AI APIs",
      "LLM Regression & Safety Gates",
      "Vercel & Cloud Deployment",
    ],
  },
  {
    category: "Full-Stack & Client Systems",
    icon: Smartphone,
    items: [
      "React, Next.js & TypeScript",
      "Electron Desktop Applications",
      "WebRTC Real-Time Video & Telemetry",
      "Node.js & Laravel",
      "Tailwind CSS & Responsive UI",
      "Real-Time Clinical & ERP Dashboards",
    ],
  },
  {
    category: "Backend, Databases & Architecture",
    icon: Terminal,
    items: [
      "High-Performance REST & WebSocket APIs",
      "TypeScript, JavaScript, PHP, C#, Java",
      "PostgreSQL, MongoDB & Supabase",
      "SQL & Relational Schema Design",
      "Git, Linux & Docker Containers",
      "End-to-End System Architecture",
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div>
          {/* Section Header with 02. */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-purple-400 font-mono text-sm font-semibold">02.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Skills & Technologies
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="group p-6 bg-[#0f0a1d]/80 rounded-2xl border border-purple-500/15 hover:border-purple-500/45 hover:shadow-xl hover:shadow-purple-950/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 rounded-xl bg-purple-950/50 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <skill.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">{skill.category}</h3>
                </div>
                <ul className="space-y-2.5">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-slate-300 flex items-center gap-2.5 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
