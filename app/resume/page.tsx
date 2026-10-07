"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Download, Mail, Phone, Briefcase, GraduationCap, Award, FileText, CheckCircle2, MapPin, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateAndDownloadResumePdf } from "@/lib/generate-cv-pdf"

const resumeData = {
  en: {
    role: "AI Engineer | Deep Learning | NLP & RAG | Agentic AI | Full-Stack Systems Architect",
    location: "Algiers, Algeria",
    printBtn: "Download CV (PDF)",
    summaryTitle: "Professional Summary",
    summaryText:
      "AI Engineering Master's Researcher at USTHB with ~2 years of commercial full-stack & AI software engineering experience and 5 AI research internships at CERIST. Proven track record designing machine learning and deep learning systems, custom NLP/Transformer architectures (MUCAT), hybrid RAG pipelines, and enterprise web/desktop platforms—including a real-time patient monitoring platform connected to physical ECG and blood glucose sensors (MedGuardAI) and embedded MIT-BIH v7 arrhythmia inference. Focused on generative AI, agentic AI, trustworthy AI, and end-to-end production deployment.",
    expTitle: "Professional & Research Experience",
    eduTitle: "Education",
    skillsTitle: "Technical Competencies",
    certTitle: "Certifications & Key Projects",
    langTitle: "Languages",
    experience: [
      {
        title: "AI Engineering Intern",
        company: "CERIST (Research Center on Scientific and Technical Information) · Algiers, Algeria",
        period: "June 2026 – Present",
        responsibilities: [
          "Developing and experimenting with AI, deep learning, and NLP systems with a primary focus on Transformer/BERT architectures and practical model development.",
          "Working on multilingual NLP scenarios across Arabic, French, and English, including conversational and chatbot-oriented applications.",
          "Contributing to end-to-end AI engineering workflows covering experimentation, rigorous evaluation, model integration, and application-oriented deployment.",
        ],
      },
      {
        title: "AI Engineering Intern (4 Additional Research Internships)",
        company: "CERIST · Algiers, Algeria",
        period: "Previous Internships",
        responsibilities: [
          "Completed four additional AI research internships at CERIST spanning Healthcare AI, NLP, and Deep Learning.",
          "Developed real-time ECG and blood glucose monitoring and anomaly detection applications, including real-time hardware-to-software sensor integration and emergency alert workflows.",
          "Designed and implemented MUCAT, a custom BERT/Transformer architecture for multilingual NLP experimentation (hierarchical attention pooling, language-sensitive gating, and language-specific output heads).",
          "Built deep learning and multilingual text processing pipelines and exposed trained models through interactive software interfaces.",
        ],
      },
      {
        title: "Freelance Full-Stack & AI Developer",
        company: "Independent / Self-Employed · Algiers, Algeria",
        period: "~2 Years",
        responsibilities: [
          "End-to-end design and engineering of web and desktop applications covering frontend, backend, databases, REST APIs, deployment, and AI integration.",
          "Developed ML and deep learning models and connected them to usable software interfaces, including live web demos for real-time model testing.",
          "Built production systems using React, Next.js, Node.js, TypeScript, Electron, PHP, Laravel, MongoDB, PostgreSQL, and SQL.",
          "Focused on shipping complete AI-powered software products rather than isolated notebooks or standalone prototypes.",
        ],
      },
    ],
    education: [
      {
        degree: "Master in Artificial Intelligence (SII / AI Engineering)",
        institution: "University of Science and Technology Houari Boumediene (USTHB) · Algiers",
        period: "Sep 2022 – June 2027 (Expected)",
        description: "Graduate studies focused on artificial intelligence, deep learning, NLP, and AI systems engineering.",
      },
      {
        degree: "Bachelor's Degree (Licence) in Computer Science",
        institution: "University of Science and Technology Houari Boumediene (USTHB) · Algiers",
        period: "Completed",
        description: "Undergraduate degree completed at USTHB prior to advancing into the Master's in Artificial Intelligence. Capstone (PFE): MedGuardAI Real-Time Patient Monitoring Platform.",
      },
    ],
    skills: {
      "AI & Machine Learning": ["Artificial Intelligence", "Machine Learning", "Deep Learning", "NLP", "Transformers", "BERT", "Generative AI", "LLM Applications", "Anomaly Detection", "Chatbots"],
      "AI Agents & LLM Systems": ["Agentic AI", "AI Agents", "ReAct", "Tool Calling", "LLM Workflows", "AI Automation", "Guardrails", "Explainability", "Trustworthy AI"],
      "Frameworks & Libraries": ["PyTorch", "TensorFlow", "Keras", "Hugging Face Transformers", "FastAPI", "WebRTC", "TFLite INT8"],
      "Programming Languages": ["TypeScript", "JavaScript", "PHP", "Java", "C#", "SQL", "HTML/CSS"],
      "Full-Stack & Desktop": ["React", "Next.js", "Node.js", "Electron", "Laravel", "REST APIs", "Real-Time Apps"],
      "Databases & Tools": ["MongoDB", "PostgreSQL", "Supabase", "SQL", "Git", "Docker", "VS Code", "Jupyter", "Google Colab"],
      "Research & AI Security": ["Uncertainty & Confidence Estimation", "Inter-Patient Evaluation (DS1/DS2)", "Prompt Injection Defense", "Policy-Based AI", "IAM Concepts", "Neuro-Symbolic AI"],
    },
    certifications: [
      "Deep Learning Certification – Code 213 (November 2025 – June 2026) · Final Training Capstone",
      "MedGuardAI – Real-Time IoT Patient Monitoring Platform (USTHB Licence Capstone / PFE)",
      "MUCAT – Custom Multilingual BERT/Transformer Architecture (CERIST AI Research)",
      "AI ECG Arrhythmia Classification v7 – MIT-BIH Inter-Patient Study & TFLite Deployment",
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "French", level: "Full Professional Proficiency" },
      { name: "English", level: "Professional Working Proficiency" },
    ],
  },
  fr: {
    role: "Ingénieur IA | Machine Learning | Deep Learning | NLP | Ingénierie logicielle de l'IA",
    location: "Alger, Algérie",
    printBtn: "Télécharger CV (PDF)",
    summaryTitle: "Résumé Professionnel",
    summaryText:
      "Étudiant en ingénierie de l'IA à l'USTHB, avec environ 2 ans d'expérience en développement full-stack freelance et cinq stages en IA au CERIST. Expérience pratique dans la conception de systèmes de machine learning et de deep learning, d'applications NLP/Transformers, de chatbots et d'applications web et desktop intégrant l'IA. Développement et intégration de modèles d'IA dans des interfaces logicielles exploitables, notamment une plateforme de suivi de patients en temps réel utilisant des capteurs d'ECG et de glycémie (MedGuardAI). Conception de MUCAT, une architecture personnalisée basée sur BERT/Transformer pour l'expérimentation en NLP multilingue. Actuellement concentré sur l'IA générative, l'IA agentique, l'automatisation par l'IA, l'IA explicable et l'IA de confiance.",
    expTitle: "Expérience Professionnelle",
    eduTitle: "Formation",
    skillsTitle: "Compétences Techniques",
    certTitle: "Certifications & Projets Clés",
    langTitle: "Langues",
    experience: [
      {
        title: "Stagiaire en ingénierie de l'intelligence artificielle",
        company: "CERIST · Alger, Algérie",
        period: "Juin 2026 – Présent",
        responsibilities: [
          "Développement et expérimentation de systèmes d'IA, de deep learning et de NLP, avec un accent sur les architectures basées sur Transformer/BERT et le développement pratique de modèles.",
          "Travail sur des scénarios de NLP multilingue impliquant l'arabe, le français et l'anglais, y compris des applications orientées chatbot.",
          "Contribution aux workflows d'ingénierie de l'IA couvrant l'expérimentation, l'évaluation et l'intégration de modèles, ainsi que le développement orienté application.",
        ],
      },
      {
        title: "Stages en ingénierie de l'IA – Affectations supplémentaires (4 stages)",
        company: "CERIST · Alger, Algérie",
        period: "Stages précédents",
        responsibilities: [
          "Réalisation de quatre stages supplémentaires en IA au CERIST dans les domaines de l'IA pour la santé, du NLP et du deep learning.",
          "Travail sur des applications de suivi de l'ECG et de la glycémie et de détection d'anomalies, incluant l'intégration temps réel entre capteurs et logiciel et des fonctionnalités d'alerte.",
          "Conception et implémentation de MUCAT, une architecture personnalisée basée sur BERT/Transformer pour l'expérimentation en NLP multilingue.",
          "Travail avec le deep learning, les méthodes Transformer/BERT, le traitement de texte multilingue et le développement d'applications d'IA.",
        ],
      },
      {
        title: "Développeur Full-Stack & IA Freelance",
        company: "Indépendant / Freelance · Alger, Algérie",
        period: "Environ 2 ans",
        responsibilities: [
          "Conception de bout en bout d'applications web, de sites web et d'applications desktop, couvrant le frontend, le backend, les bases de données, les API, le déploiement et l'intégration de l'IA.",
          "Développement de modèles d'IA et de deep learning et connexion à des interfaces logicielles exploitables, y compris des interfaces web en direct pour le test et la démonstration des modèles.",
          "Travail avec React, Next.js, Node.js, TypeScript, Electron, PHP, Laravel, MongoDB, PostgreSQL et SQL.",
          "Intégration de capacités d'IA dans des applications concrètes, plutôt que de se limiter à des notebooks ou à des prototypes de modèles isolés.",
        ],
      },
    ],
    education: [
      {
        degree: "Master – Intelligence artificielle",
        institution: "Université des Sciences et de la Technologie Houari Boumediene (USTHB) · Alger",
        period: "Sep 2022 – Juin 2027 (prévu)",
        description: "Études de troisième cycle axées sur l'intelligence artificielle et l'ingénierie de l'IA.",
      },
      {
        degree: "Licence / Diplôme équivalent en Informatique",
        institution: "Université des Sciences et de la Technologie Houari Boumediene (USTHB) · Alger",
        period: "Obtenue",
        description: "Études de premier cycle achevées à l'USTHB avant de poursuivre en Master d'intelligence artificielle. PFE : MedGuardAI.",
      },
    ],
    skills: {
      "IA / ML": ["Intelligence artificielle", "Machine Learning", "Deep Learning", "NLP", "Transformers", "BERT", "IA générative", "Applications LLM", "Détection d'anomalies", "Chatbots"],
      "Agents IA / Systèmes LLM": ["IA agentique", "Agents IA", "ReAct", "Appel d'outils (Tool Calling)", "Workflows LLM", "Automatisation IA", "Guardrails", "Explicabilité", "IA de confiance"],
      "Frameworks / Bibliothèques": ["PyTorch", "TensorFlow", "Keras", "Hugging Face Transformers", "FastAPI", "WebRTC", "TFLite INT8"],
      "Programmation": ["TypeScript", "JavaScript", "PHP", "Java", "C#", "SQL", "HTML/CSS"],
      "Full-Stack / Desktop": ["React", "Next.js", "Node.js", "Electron", "Laravel", "API REST", "Applications temps réel"],
      "Bases de données / Outils": ["MongoDB", "PostgreSQL", "Supabase", "SQL", "Git", "Docker", "VS Code", "Jupyter", "Google Colab"],
      "Recherche / Sécurité": ["Estimation de l'incertitude et confiance", "Protocole inter-patient DS1/DS2", "Sensibilisation injection de prompt", "Systèmes basés sur des politiques", "IAM", "IA neuro-symbolique"],
    },
    certifications: [
      "Certification en Deep Learning – Code 213 (Novembre 2025 – Juin 2026) · Projet final de formation",
      "MedGuardAI – Plateforme de suivi de patients en temps réel (PFE Licence USTHB)",
      "MUCAT – Architecture BERT / Transformer personnalisée (Projet IA / NLP CERIST)",
      "Classification d'arythmies ECG par IA (v7) – MIT-BIH Inter-Patient & TFLite",
    ],
    languages: [
      { name: "Arabe", level: "Langue maternelle" },
      { name: "Français", level: "Maîtrise professionnelle" },
      { name: "Anglais", level: "Niveau professionnel de travail" },
    ],
  },
}

export default function ResumePage() {
  const [lang, setLang] = useState<"en" | "fr">("en")
  const data = resumeData[lang]

  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />
      
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">GHENA HANI</h1>
              <p className="text-base sm:text-lg text-purple-400 font-semibold mb-4">
                {data.role}
              </p>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300 font-light">
                <a href="mailto:hanighena4@gmail.com" className="flex items-center gap-1.5 hover:text-purple-300 transition-colors">
                  <Mail className="w-4 h-4 text-purple-400" />
                  hanighena4@gmail.com
                </a>
                <a href="tel:+213541894743" className="flex items-center gap-1.5 hover:text-purple-300 transition-colors">
                  <Phone className="w-4 h-4 text-purple-400" />
                  +213 541 894 743
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {data.location}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Language Switcher */}
              <div className="inline-flex rounded-xl border border-purple-500/30 bg-[#120a24] p-1">
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    lang === "en"
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  English CV
                </button>
                <button
                  onClick={() => setLang("fr")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    lang === "fr"
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  CV Français
                </button>
              </div>

              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 cursor-pointer"
              >
                <a
                  href={lang === "fr" ? "/Ghena_Hani_CV_FR.pdf" : "/Ghena_Hani_CV_EN.pdf"}
                  download={lang === "fr" ? "Ghena_Hani_CV_FR.pdf" : "Ghena_Hani_CV_EN.pdf"}
                  onClick={(e) => {
                    try {
                      e.preventDefault()
                      generateAndDownloadResumePdf(lang)
                    } catch {
                      // Native href handles download if jsPDF fails
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {data.printBtn}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0e091e]/90 border border-purple-500/20 backdrop-blur-sm shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              {data.summaryTitle}
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-light">
              {data.summaryText}
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">{data.expTitle}</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.title + exp.period} className="p-6 sm:p-7 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                      <p className="text-sm font-semibold text-purple-300">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-purple-400 mt-1 sm:mt-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-slate-300 text-xs sm:text-sm flex items-start gap-2.5 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">{data.eduTitle}</h2>
            </div>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.degree} className="p-6 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                      <p className="text-sm text-purple-300 font-semibold">{edu.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-purple-400 mt-1 sm:mt-0">{edu.period}</span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm font-light mt-2">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{data.skillsTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(data.skills).map(([category, items]) => (
                <div key={category} className="p-5 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span key={skill} className="text-xs px-2.5 py-1 bg-purple-950/50 border border-purple-500/20 text-slate-200 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Languages */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">{data.certTitle}</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-light">
              {data.certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e091e]/90 border border-purple-500/15">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">{data.langTitle}</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {data.languages.map((l, i) => (
                <li
                  key={l.name}
                  className={`flex justify-between items-center ${
                    i < data.languages.length - 1 ? "pb-2 border-b border-purple-500/10" : ""
                  }`}
                >
                  <span className="font-semibold text-white">{l.name}</span>
                  <span className="text-purple-300 text-xs">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
