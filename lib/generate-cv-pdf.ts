"use client"

import { jsPDF } from "jspdf"

export function generateAndDownloadResumePdf(lang: "en" | "fr" = "en") {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 44
  const contentWidth = pageWidth - margin * 2
  let y = 46

  const addSectionHeader = (title: string) => {
    if (y > 740) {
      doc.addPage()
      y = 46
    }
    y += 10
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10.5)
    doc.setTextColor(88, 28, 135)
    doc.text(title.toUpperCase(), margin, y)
    y += 5
    doc.setDrawColor(168, 85, 247)
    doc.setLineWidth(0.8)
    doc.line(margin, y, pageWidth - margin, y)
    y += 14
  }

  const addWrappedParagraph = (text: string, fontSize = 9.5, isBold = false, color: [number, number, number] = [35, 35, 45]) => {
    doc.setFont("helvetica", isBold ? "bold" : "normal")
    doc.setFontSize(fontSize)
    doc.setTextColor(color[0], color[1], color[2])
    const lines = doc.splitTextToSize(text, contentWidth)
    for (const line of lines) {
      if (y > 780) {
        doc.addPage()
        y = 46
      }
      doc.text(line, margin, y)
      y += fontSize * 1.38
    }
  }

  const addBullet = (text: string) => {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9.2)
    doc.setTextColor(40, 40, 50)
    const lines = doc.splitTextToSize(text, contentWidth - 14)
    if (y > 780) {
      doc.addPage()
      y = 46
    }
    doc.text("•", margin + 2, y)
    for (let i = 0; i < lines.length; i++) {
      if (y > 780) {
        doc.addPage()
        y = 46
      }
      doc.text(lines[i], margin + 12, y)
      y += 12.5
    }
  }

  // Header
  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.setTextColor(15, 10, 30)
  doc.text("GHENA HANI", margin, y)
  y += 18

  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(109, 40, 217)
  doc.text(
    lang === "fr"
      ? "Ingenieur IA & Architecte Full-Stack | Deep Learning · NLP · RAG · IA Agentique"
      : "AI Engineer & Full-Stack Systems Architect | Deep Learning · NLP · RAG · Agentic AI",
    margin,
    y
  )
  y += 15

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 95)
  doc.text(
    "Algiers, Algeria  |  hanighena4@gmail.com  |  +213 541 894 743  |  github.com/HANIDEVINF  |  linkedin.com/in/ghena-hani",
    margin,
    y
  )
  y += 8

  if (lang === "en") {
    addSectionHeader("Executive Summary")
    addWrappedParagraph(
      "AI Engineer & Master's Researcher in Artificial Intelligence at USTHB with 5 AI research internships at CERIST and ~2 years of commercial full-stack software delivery. Proven track record designing custom Transformer/BERT architectures (MUCAT), embedded medical AI & real-time IoT patient monitoring platforms (MedGuardAI, MIT-BIH v7 INT8 TFLite), hybrid RAG pipelines, multi-agent systems, and multi-role commercial ERP/clinic software."
    )

    addSectionHeader("Professional & Research Experience")
    addWrappedParagraph("AI Engineering Researcher (5 Research Internships) — CERIST, Algiers, Algeria (2024 – Present)", 10, true, [20, 20, 30])
    addBullet("Designed and implemented MUCAT, a custom Multilingual Attention Transformer for Arabic, French, and English NLP with hierarchical subword attention pooling and language-sensitive gating.")
    addBullet("Engineered AI ECG Arrhythmia Classification (v7) on the strict inter-patient MIT-BIH DS1/DS2 benchmark (90.13% 5-fold accuracy, 155.4 KB INT8 TFLite, 0.32 ms/beat latency).")
    addBullet("Developed real-time ECG & blood glucose anomaly detection pipelines connected to physical medical sensors and emergency clinical alert workflows.")
    y += 4

    addWrappedParagraph("Independent Full-Stack & AI Systems Engineer — Algiers, Algeria (~2 Years)", 10, true, [20, 20, 30])
    addBullet("Architected and delivered production commercial systems including Tadjmeel Clinica Algiers (Web + Doctor & Receptionist Electron apps), Algerian Enterprise DZD ERP & G50 Fiscal Suite, and 4 multi-wilaya retail operating systems (ALLURE HOMME, GK STORE, CASUAL 29, AURA).")
    addBullet("Built and deployed 11+ interactive AI web applications spanning Speech-to-Text ASR & Clinical SOAP Summarization, Hybrid Dense+BM25 RAG, Multi-Agent ReAct Orchestration, and LLM Safety Evaluation.")

    addSectionHeader("Key Deployed Systems & Research")
    addBullet("AI ECG Arrhythmia Classification (v7): 1D-CNN + 2x Multi-Head Transformer + 8 RR features on MIT-BIH DS1/DS2.")
    addBullet("MedGuardAI (USTHB Capstone Distinction): Real-time IoT ECG/Glucose sensor streaming, AI anomaly alerts & WebRTC telemedicine.")
    addBullet("MUCAT Multilingual Transformer: Hierarchical attention & language gating across Arabic, French, and English.")
    addBullet("Commercial Production Suite: Tadjmeel Clinica Algiers, Enterprise DZD G50 ERP, ALLURE HOMME, GK STORE & CASUAL 29.")

    addSectionHeader("Education")
    addWrappedParagraph("Master in Artificial Intelligence — USTHB, Algiers (Sep 2022 – June 2027 Expected)", 9.8, true)
    addWrappedParagraph("Bachelor's Degree (Licence) in Computer Science — USTHB, Algiers (Completed, PFE: MedGuardAI)", 9.8, true)

    addSectionHeader("Technical Competencies & Languages")
    addWrappedParagraph("AI & Deep Learning: PyTorch, TensorFlow, Keras, Transformers, BERT, RAG, Agentic AI (ReAct / Tool Calling), LLM Evaluation, TFLite INT8, Computer Vision.")
    addWrappedParagraph("Full-Stack & Cloud: TypeScript, React, Next.js, Node.js, Electron, PostgreSQL, MongoDB, Supabase, REST/WebSockets, Docker, Git.")
    addWrappedParagraph("Languages: Arabic (Native) · French (Full Professional Proficiency) · English (Professional Working Proficiency).")
  } else {
    addSectionHeader("Resume Exécutif")
    addWrappedParagraph(
      "Ingénieur en Intelligence Artificielle et chercheur en Master IA à l'USTHB avec 5 stages de recherche en IA au CERIST et ~2 ans d'expérience en développement full-stack commercial. Conception d'architectures Transformer/BERT multilingues (MUCAT), systèmes médicaux IoT & IA temps réel (MedGuardAI, ECG v7 INT8 TFLite), pipelines RAG hybrides, systèmes multi-agents et logiciels ERP/cliniques en production."
    )

    addSectionHeader("Expérience Professionnelle & Recherche")
    addWrappedParagraph("Chercheur en Ingénierie de l'IA (5 Stages) — CERIST, Alger, Algérie (2024 – Présent)", 10, true, [20, 20, 30])
    addBullet("Conception et implémentation de MUCAT, architecture Transformer/BERT multilingue (Arabe, Français, Anglais) avec pooling d'attention hiérarchique et routage linguistique.")
    addBullet("Développement du système ECG Arrhythmia v7 sur le protocole inter-patient MIT-BIH DS1/DS2 (90.13% précision ensemble 5-fold, 155.4 Ko INT8 TFLite, 0.32 ms/battement).")
    addBullet("Développement de pipelines de détection d'anomalies ECG et glycémie en temps réel connectés à des capteurs médicaux.")
    y += 4

    addWrappedParagraph("Ingénieur Full-Stack & Systèmes IA Freelance — Alger, Algérie (~2 Ans)", 10, true, [20, 20, 30])
    addBullet("Livraison de systèmes commerciaux en production : Tadjmeel Clinica Alger (Site + applications desktop Electron Médecin & Réceptionniste), ERP Algérien DZD & Bilan Fiscal G50, et 4 systèmes e-commerce/gestion (ALLURE HOMME, GK STORE, CASUAL 29, AURA).")
    addBullet("Déploiement de 11+ applications IA interactives : Speech-to-Text ASR & Synthèse SOAP, RAG Hybride Dense+BM25, Orchestration Multi-Agents ReAct et Évaluation LLM.")

    addSectionHeader("Formation")
    addWrappedParagraph("Master en Intelligence Artificielle — USTHB, Alger (Sep 2022 – Juin 2027 prévu)", 9.8, true)
    addWrappedParagraph("Licence en Informatique — USTHB, Alger (Obtenue · PFE : MedGuardAI)", 9.8, true)

    addSectionHeader("Compétences & Langues")
    addWrappedParagraph("IA & Deep Learning : PyTorch, TensorFlow, Keras, Transformers, BERT, RAG, IA Agentique, TFLite INT8, Vision par Ordinateur.")
    addWrappedParagraph("Full-Stack : TypeScript, React, Next.js, Node.js, Electron, PostgreSQL, MongoDB, Supabase, Docker, Git.")
    addWrappedParagraph("Langues : Arabe (Maternel) · Français (Maîtrise professionnelle) · Anglais (Professionnel).")
  }

  try {
    doc.save(lang === "fr" ? "Ghena_Hani_CV_FR.pdf" : "Ghena_Hani_CV_EN.pdf")
  } catch {
    window.location.assign(`/api/cv?lang=${lang}`)
  }
}
