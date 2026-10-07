"use client"

const experiences = [
  {
    period: "June 2026 - Present & 4 Previous Appointments",
    title: "AI Engineering Research Intern (5× Consecutive Appointments)",
    company: "CERIST — Research Center on Scientific and Technical Information (Algiers)",
    highlight: "Flagship Research & Deep Learning Track",
    description:
      "Selected for five consecutive AI research internships at Algeria's national scientific research center. Designed and implemented MUCAT (Multilingual Custom Attention Transformer with hierarchical pooling and language-sensitive gating for Arabic, French, and English NLP), developed clinical ECG & blood glucose anomaly detection pipelines, and built domain-grounded conversational AI workflows.",
    technologies: [
      "PyTorch",
      "BERT / Transformers",
      "MUCAT Architecture",
      "Multilingual NLP (AR/FR/EN)",
      "Healthcare AI & ECG",
      "Hugging Face",
    ],
  },
  {
    period: "2024 - Present",
    title: "Master in Artificial Intelligence Engineering",
    company: "USTHB — University of Science and Technology Houari Boumediene",
    highlight: "Graduate AI Specialization",
    description:
      "Graduate research and engineering in Deep Learning, Transformer Architectures, Natural Language Processing, Computer Vision, Multi-Agent Systems, Knowledge Representation, and AI Security / Trustworthy AI.",
    technologies: ["Deep Learning", "Transformers", "NLP", "Computer Vision", "Agentic AI", "Trustworthy AI"],
  },
  {
    period: "2024 - Present",
    title: "Deep Learning & Applied AI Systems Researcher",
    company: "Independent AI Research & Open-Source Engineering",
    highlight: "Production & Edge Model Deployment",
    description:
      "Engineered MIT-BIH ECG Arrhythmia Classification v7 (97,045-parameter 1D-CNN + Multi-Head Transformer + 8 RR features, strict DS1/DS2 inter-patient split, 90.13% 5-fold ensemble, quantized to 155.4 KB INT8 TFLite at 0.32 ms/beat), hybrid Dense+BM25 RAG pipelines, and multi-agent ReAct orchestrators.",
    technologies: ["PyTorch", "TensorFlow / Keras", "TFLite INT8", "Hybrid RAG", "LLM Evaluation", "Docker"],
  },
  {
    period: "2023 - Present (~2 Years)",
    title: "Freelance AI & Full-Stack Systems Architect",
    company: "Independent Commercial Delivery (Algiers, Sidi Bel Abbès, Mascara)",
    highlight: "6 Deployed Client Production Platforms",
    description:
      "Architected and delivered complete commercial systems for real businesses: Tadjmeel Clinica (Algiers medical aesthetic platform + Doctor & Receptionist Electron desktop apps), Enterprise DZD ERP/POS & G50 Fiscal Suite, ALLURE HOMME, GK STORE, CASUAL 29, and AURA Multi-Vertical Retail OS.",
    technologies: ["React", "Next.js", "TypeScript", "Electron Desktop", "Node.js", "PostgreSQL / MongoDB"],
  },
  {
    period: "2022 - 2024",
    title: "B.Sc. (Licence) in Computer Science — PFE Distinction (MedGuardAI)",
    company: "USTHB — University of Science and Technology Houari Boumediene",
    highlight: "Capstone: Real-Time Medical IoT + AI",
    description:
      "Graduated with distinction on MedGuardAI: an end-to-end medical IoT and telemedicine platform connecting physical ECG and blood glucose sensors via Raspberry Pi to real-time AI anomaly detection, emergency alerts, and WebRTC doctor-patient consultations.",
    technologies: ["Medical IoT", "Raspberry Pi", "WebRTC", "Real-Time Telemetry", "Algorithms & Systems"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div>
          {/* Section Header with 04. */}
          <div className="flex items-center gap-4 mb-14">
            <span className="text-purple-400 font-mono text-sm font-semibold">04.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              CERIST Research &amp; Engineering Experience
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-2" />
          </div>

          <div className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/40 via-fuchsia-500/30 to-purple-500/10 md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.title + exp.company}
                  className={`relative grid md:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? "" : "md:text-right"
                  }`}
                >
                  {/* Timeline Glowing Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-400 border-4 border-[#07050d] shadow-[0_0_12px_rgba(192,132,252,0.9)] mt-1.5 z-10" />

                  {/* Content Box */}
                  <div className={`pl-10 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:order-2 md:pl-12"}`}>
                    <div className={`flex flex-wrap items-center gap-2 mb-1.5 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      <span className="inline-block text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                        {exp.period}
                      </span>
                      {exp.highlight && (
                        <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 text-[10px] font-mono text-cyan-300">
                          {exp.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-sm font-medium text-purple-300/90 mt-0.5">{exp.company}</p>
                    <p className="text-slate-300 mt-3 leading-relaxed text-sm sm:text-base font-light">
                      {exp.description}
                    </p>
                    <div className={`flex flex-wrap gap-1.5 mt-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2.5 py-1 bg-purple-950/40 border border-purple-500/20 text-purple-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden md:block ${index % 2 === 0 ? "md:order-2" : ""}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
