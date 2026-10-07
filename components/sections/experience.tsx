"use client"

const experiences = [
  {
    period: "2024 - Present",
    title: "AI Engineering Master Student",
    company: "USTHB (University of Science and Technology Houari Boumediene)",
    description:
      "Advanced studies in artificial intelligence, machine learning, deep learning, NLP, and software engineering. Focused on generative AI, agentic systems, AI security, and trustworthy AI.",
    technologies: ["Machine Learning", "Deep Learning", "NLP", "Transformers", "Computer Vision"],
  },
  {
    period: "Juin 2026 - Present",
    title: "AI Engineering Intern",
    company: "CERIST (Research Center on Scientific and Technical Information)",
    description:
      "Development and experimentation of AI, deep learning, and NLP systems with a focus on Transformer and BERT architectures. Multilingual NLP workflows (Arabic, French, English) and chatbot development.",
    technologies: ["PyTorch", "BERT / Transformers", "Multilingual NLP", "Hugging Face", "Chatbots"],
  },
  {
    period: "Previous Internships",
    title: "AI Engineering Intern (4 Previous Appointments)",
    company: "CERIST",
    description:
      "Four consecutive AI research internships in Healthcare AI and NLP. Real-time ECG and blood glucose anomaly detection, physical IoT sensor integration, and design/implementation of MUCAT (custom multilingual BERT/Transformer architecture).",
    technologies: ["Healthcare AI", "ECG Signal Processing", "MUCAT Architecture", "Anomaly Detection"],
  },
  {
    period: "2024 - Present",
    title: "ML Model Developer & Researcher",
    company: "Personal Research & Open Source",
    description:
      "Designing, training, and fine-tuning deep learning models with PyTorch & Keras. Rigorous inter-patient evaluation, RAG pipelines, LLM agent integration, Docker containerization, and embedded TFLite quantization.",
    technologies: ["PyTorch", "Keras", "LLM Agents", "RAG", "TFLite INT8", "Docker", "FastAPI"],
  },
  {
    period: "2023 - Present (~2 years)",
    title: "Freelance Full-Stack & AI Developer",
    company: "Self-Employed / Independent",
    description:
      "End-to-end web and desktop applications with integrated AI capabilities, connecting deep learning models to usable software interfaces, APIs, databases, and real-time streaming services.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Electron", "MongoDB", "SQL"],
  },
  {
    period: "2022 - 2024",
    title: "Computer Science License Degree",
    company: "USTHB",
    description:
      "Completed undergraduate computer science foundations covering algorithms, data structures, software engineering, databases, and operating systems before advancing to Master studies in AI.",
    technologies: ["Algorithms", "Data Structures", "OOP", "Databases", "Linux"],
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
              Experience & Journey
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
                    <span className="inline-block text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider mb-1.5">
                      {exp.period}
                    </span>
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
