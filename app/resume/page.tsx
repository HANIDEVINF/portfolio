"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Download, Mail, Phone, Briefcase, GraduationCap, Award, FileText, CheckCircle2, MapPin, Languages, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateAndDownloadResumePdf } from "@/lib/generate-cv-pdf"

const resumeData = {
  en: {
    role: "Applied AI Engineer | NLP, Deep Learning & LLM Systems",
    location: "Algiers, Algeria",
    printBtn: "Download CV (PDF)",
    summaryTitle: "Professional Summary",
    summaryText:
      "M.Sc. Candidate in Artificial Intelligence at USTHB (Sep 2025 – Expected June 2027), Licence in Computer Science graduate from USTHB (2022–2025), with AI research appointments at CERIST (2024–2025) and commercial full-stack software delivery (Jan 2024 – Present). Proven track record designing evaluated deep learning architectures: AsthmaExpertUltra multi-task Transformer (76.0% severity acc, 92.3% severe crisis recall, <1.0s Android PyTorch Lite), MIT-BIH v7 ECG Holter (90.13% 5-fold ensemble, 155 KB INT8 TFLite), MuCAT multilingual Transformer (98.20% test acc across 6 languages), and 6 deployed commercial systems.",
    expTitle: "Professional & Research Experience",
    eduTitle: "Education",
    skillsTitle: "Technical Competencies",
    certTitle: "Certifications & Key Projects",
    langTitle: "Languages",
    experience: [
      {
        title: "AI Engineering Research Intern",
        company: "CERIST (Research Center on Scientific and Technical Information, UbiSys DTISI) · Algiers, Algeria",
        period: "2024 – 2025",
        responsibilities: [
          "Designed AsthmaExpertUltra: 4-layer Transformer Encoder predicting asthma crisis severity (76.0% acc, 92.3% severe recall) and lead-time proximity (69.0% acc) from 8 multimodal IoT streams, with Dempster-Shafer evidential fusion and Android PyTorch Lite deployment (<1.0s).",
          "Designed MuCAT (Multilingual Uncertainty-Calibrated Attention Transformer) in CERIST UbiSys (DTISI): stacked Hierarchical Attention Pooling (HAP), Language-Aware FiLM Gating (LAG), and Evidential Dirichlet Head (u = K/S) over mDeBERTa-v3 across 6 languages (98.20% test accuracy).",
          "Engineered MIT-BIH v7 ECG Arrhythmia Holter: dual-lead 1D-CNN + 2x Transformer + 8-RR temporal context on strict inter-patient DS1/DS2 split, quantized to 155.4 KB INT8 TFLite (0.32 ms/beat edge latency).",
        ],
      },
      {
        title: "Independent Applied AI & Full-Stack Engineer",
        company: "Commercial Client Consulting · Algiers, Sidi Bel Abbès & Mascara, Algeria",
        period: "Jan 2024 – Present",
        responsibilities: [
          "Architected and delivered 6 commercial production systems: Tadjmeel Clinica Algiers (Public Web + Doctor & Receptionist Electron Desktop Apps), Enterprise DZD Business ERP & G50 Fiscal Suite, ALLURE HOMME, GK STORE, CASUAL 29, and AURA Retail OS.",
          "Built full-stack AI web systems spanning Speech-to-Text ASR & Clinical SOAP Summarization, Hybrid Dense+BM25 RAG, Multi-Agent ReAct Orchestration, and LLM Safety Evaluation.",
          "Production tech stack: React, Next.js, Node.js, TypeScript, Electron, PHP, Laravel, MongoDB, PostgreSQL, and Docker.",
          "Delivered client-facing solutions with measurable business impact, 58-wilaya logistics, and production reliability.",
        ],
      },
    ],
    education: [
      {
        degree: "M.Sc. Candidate in Artificial Intelligence (SII / AI Systems Engineering)",
        institution: "University of Science and Technology Houari Boumediene (USTHB) · Algiers",
        period: "Sep 2025 – June 2027 (Expected)",
        description: "Graduate research and coursework in deep learning, multilingual NLP, computer vision, and production AI systems.",
      },
      {
        degree: "B.Sc. (Licence) in Computer Science",
        institution: "University of Science and Technology Houari Boumediene (USTHB) · Algiers",
        period: "Sep 2022 – June 2025 (Graduated)",
        description: "Undergraduate degree in Computer Science. Graduation Capstone (PFE): MedGuardAI Real-Time IoT Patient Monitoring & Telemedicine Platform.",
      },
      {
        degree: "Baccalauréat in Exact Sciences",
        institution: "Algiers, Algeria",
        period: "2022",
        description: "National secondary school graduation diploma in Exact Sciences.",
      },
    ],
    skills: {
      "AI & Machine Learning": ["Artificial Intelligence", "Machine Learning", "Deep Learning", "NLP", "Transformers", "BERT", "Generative AI", "LLM Applications", "Anomaly Detection", "Chatbots"],
      "AI Agents & LLM Systems": ["Agentic AI", "AI Agents", "ReAct", "Tool Calling", "LLM Workflows", "AI Automation", "Guardrails", "Explainability", "Trustworthy AI"],
      "Frameworks & Libraries": ["PyTorch", "TensorFlow", "Keras", "Hugging Face Transformers", "FastAPI", "WebRTC", "TFLite INT8", "PyTorch Lite (.ptl)"],
      "Programming Languages": ["TypeScript", "JavaScript", "Python", "PHP", "Java", "C#", "SQL", "HTML/CSS"],
      "Full-Stack & Desktop": ["React", "Next.js", "Node.js", "Electron", "Laravel", "REST APIs", "Real-Time Apps"],
      "Databases & Tools": ["MongoDB", "PostgreSQL", "Supabase", "SQL", "Git", "Docker", "VS Code", "Jupyter", "Google Colab"],
      "Research & AI Security": ["Uncertainty & Confidence Estimation", "Inter-Patient Evaluation (DS1/DS2)", "Prompt Injection Defense", "Policy-Based AI", "IAM Concepts", "Dempster-Shafer Fusion"],
    },
    certifications: [
      "AsthmaExpertUltra – Anticipatory Multi-Task Transformer & Android Edge Deployment (CERIST AI Research)",
      "AI ECG Arrhythmia Classification v7 – MIT-BIH DS1/DS2 Inter-Patient Study & 155 KB INT8 TFLite",
      "MuCAT – Multilingual Uncertainty-Calibrated Attention Transformer (CERIST UbiSys DTISI — 98.20% Test Acc across 6 languages)",
      "MedGuardAI – Real-Time IoT Patient Monitoring Platform (USTHB Licence Capstone / PFE 2022–2025)",
      "Deep Learning Certification – Code 213 · Final Training Capstone",
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "French", level: "Full Professional Proficiency" },
      { name: "English", level: "Professional Working Proficiency" },
    ],
  },
  fr: {
    role: "Ingénieur en IA Appliquée | NLP, Deep Learning & Systèmes LLM",
    location: "Alger, Algérie",
    printBtn: "Télécharger CV (PDF)",
    summaryTitle: "Résumé Professionnel",
    summaryText:
      "Candidat au Master en Intelligence Artificielle à l'USTHB (Sept. 2025 – Prévu Juin 2027), diplômé de la Licence en Informatique à l'USTHB (2022–2025), avec des stages de recherche en IA au CERIST (2024–2025) et 2+ ans d'expérience en ingénierie logicielle commerciale (Janv. 2024 – Présent). Conception d'architectures deep learning évaluées rigoureusement : AsthmaExpertUltra (Transformer multi-tâches, 76.0% acc, 92.3% rappel sévère, <1.0s Android PyTorch Lite), MIT-BIH v7 ECG Holter (90.13% ensemble 5-fold, 155 Ko INT8 TFLite), MuCAT Transformer multilingue (98.20% test acc sur 6 langues) et 6 systèmes commerciaux livrés.",
    expTitle: "Expérience Professionnelle",
    eduTitle: "Formation",
    skillsTitle: "Compétences Techniques",
    certTitle: "Certifications & Projets Clés",
    langTitle: "Langues",
    experience: [
      {
        title: "Stagiaire Chercheur en Ingénierie de l'IA",
        company: "CERIST (Équipe UbiSys DTISI) · Alger, Algérie",
        period: "2024 – 2025",
        responsibilities: [
          "Conception d'AsthmaExpertUltra : Transformer Multi-Tâches pour la sévérité des crises (76.0% acc, 92.3% rappel sévère) et l'anticipation temporelle (69.0% acc), fusion évidentielle de Dempster-Shafer et déploiement Android PyTorch Lite (<1.0s).",
          "Conception de MuCAT (Multilingual Uncertainty-Calibrated Attention Transformer) au CERIST UbiSys (DTISI) : mDeBERTa-v3 + HAP + FiLM Language Gating + tête évidentielle Dirichlet (u = K/S) sur 6 langues (98,20 % test accuracy).",
          "Développement du système ECG Arrhythmia v7 sur le protocole inter-patient MIT-BIH DS1/DS2 (90,13 % précision ensemble 5-fold, 155,4 Ko INT8 TFLite, 0,32 ms/battement).",
        ],
      },
      {
        title: "Ingénieur Full-Stack & IA Appliquée Indépendant",
        company: "Missions Clients Commerciales · Alger, Sidi Bel Abbès & Mascara, Algérie",
        period: "Janv. 2024 – Présent",
        responsibilities: [
          "Livraison de 6 systèmes commerciaux en production : Tadjmeel Clinica Alger (Site + applications desktop Electron Médecin & Réceptionniste), ERP Algérien DZD & Bilan Fiscal G50, ALLURE HOMME, GK STORE, CASUAL 29 et AURA.",
          "Déploiement d'applications IA interactives : Speech-to-Text ASR & Synthèse SOAP, RAG Hybride Dense+BM25, Orchestration Multi-Agents ReAct et Évaluation LLM.",
          "Stack de production : React, Next.js, Node.js, TypeScript, Electron, PHP, Laravel, MongoDB, PostgreSQL et Docker.",
        ],
      },
    ],
    education: [
      {
        degree: "Candidat au Master en Intelligence Artificielle (SII)",
        institution: "Université des Sciences et de la Technologie Houari Boumediene (USTHB) · Alger",
        period: "Sept. 2025 – Juin 2027 (Prévu)",
        description: "Cycle Master spécialisé en deep learning, NLP multilingue, vision par ordinateur et ingénierie des systèmes d'IA.",
      },
      {
        degree: "Licence en Informatique",
        institution: "Université des Sciences et de la Technologie Houari Boumediene (USTHB) · Alger",
        period: "Sept. 2022 – Juin 2025 (Diplômé)",
        description: "Diplôme de Licence en Informatique. Projet de Fin d'Études (PFE) : MedGuardAI — Plateforme IoT et IA de suivi médical en temps réel.",
      },
      {
        degree: "Baccalauréat en Sciences Exactes",
        institution: "Alger, Algérie",
        period: "2022",
        description: "Diplôme national d'études secondaires en série Sciences Exactes.",
      },
    ],
    skills: {
      "IA / ML": ["Intelligence artificielle", "Machine Learning", "Deep Learning", "NLP", "Transformers", "BERT", "IA générative", "Applications LLM", "Détection d'anomalies", "Chatbots"],
      "Agents IA / Systèmes LLM": ["IA agentique", "Agents IA", "ReAct", "Appel d'outils (Tool Calling)", "Workflows LLM", "Automatisation IA", "Guardrails", "Explicabilité", "IA de confiance"],
      "Frameworks / Bibliothèques": ["PyTorch", "TensorFlow", "Keras", "Hugging Face Transformers", "FastAPI", "WebRTC", "TFLite INT8", "PyTorch Lite (.ptl)"],
      "Programmation": ["TypeScript", "JavaScript", "Python", "PHP", "Java", "C#", "SQL", "HTML/CSS"],
      "Full-Stack / Desktop": ["React", "Next.js", "Node.js", "Electron", "Laravel", "API REST", "Applications temps réel"],
      "Bases de données / Outils": ["MongoDB", "PostgreSQL", "Supabase", "SQL", "Git", "Docker", "VS Code", "Jupyter", "Google Colab"],
      "Recherche / Sécurité": ["Estimation de l'incertitude et confiance", "Protocole inter-patient DS1/DS2", "Sensibilisation injection de prompt", "Systèmes basés sur des politiques", "IAM", "Fusion Dempster-Shafer"],
    },
    certifications: [
      "AsthmaExpertUltra – Transformer Multi-Tâches & Déploiement Edge Android (Recherche IA CERIST)",
      "Classification d'arythmies ECG par IA (v7) – MIT-BIH Inter-Patient & 155 Ko INT8 TFLite",
      "MuCAT – Multilingual Uncertainty-Calibrated Attention Transformer (CERIST UbiSys DTISI — 98,20 % Test Acc)",
      "MedGuardAI – Plateforme de suivi de patients en temps réel (PFE Licence USTHB 2022–2025)",
      "Certification en Deep Learning – Code 213 · Projet final de formation",
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
              {/* Two-row contact header to eliminate right margin clipping */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 font-light">
                <div className="flex flex-wrap items-center gap-4">
                  <a href="mailto:hanighena4@gmail.com" className="flex items-center gap-1.5 hover:text-purple-300 transition-colors">
                    <Mail className="w-4 h-4 text-purple-400" />
                    hanighena4@gmail.com
                  </a>
                  <a href="tel:+213541894743" className="flex items-center gap-1.5 hover:text-purple-300 transition-colors">
                    <Phone className="w-4 h-4 text-purple-400" />
                    +213 541 89 47 43
                  </a>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    {data.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-purple-300 font-medium">
                  <a href="https://www.linkedin.com/in/ghena-hani-3543a3375/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 text-purple-400" />
                    linkedin.com/in/ghena-hani-3543a3375
                  </a>
                  <a href="https://github.com/HANIDEVINF" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <FileText className="w-4 h-4 text-purple-400" />
                    github.com/HANIDEVINF
                  </a>
                </div>
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
