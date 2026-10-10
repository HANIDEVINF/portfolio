/**
 * Zero-dependency ISO 32000-1 PDF 1.4 Generator for Hani Ghena's Executive CV.
 * Works identically on Node.js Server Routes and Client Browsers without external libraries.
 */

type PdfLine = {
  text: string
  font: "F1" | "F2" // F1 = Helvetica, F2 = Helvetica-Bold
  size: number
  color: [number, number, number] // RGB 0..1
  indent?: number
  spacingAfter?: number
}

function sanitizeWinAnsi(str: string): string {
  return str
    .replace(/—|–/g, "-")
    .replace(/·|•/g, "-")
    .replace(/’|‘/g, "'")
    .replace(/“|”/g, '"')
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ""

  for (const word of words) {
    if (!current) {
      current = word
    } else if (current.length + 1 + word.length <= maxChars) {
      current += " " + word
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

export function buildResumePdfBytes(lang: "en" | "fr" = "en"): Uint8Array {
  const lines: PdfLine[] = []

  const addHeader = (title: string) => {
    lines.push({
      text: title.toUpperCase(),
      font: "F2",
      size: 10.5,
      color: [0.38, 0.12, 0.65],
      spacingAfter: 6,
    })
  }

  const addParagraph = (
    text: string,
    size = 9.3,
    bold = false,
    color: [number, number, number] = [0.15, 0.15, 0.2]
  ) => {
    const wrapped = wrapText(text, bold ? 88 : 95)
    wrapped.forEach((w, idx) => {
      lines.push({
        text: w,
        font: bold ? "F2" : "F1",
        size,
        color,
        spacingAfter: idx === wrapped.length - 1 ? 5 : 2.5,
      })
    })
  }

  const addBullet = (text: string) => {
    const wrapped = wrapText(text, 90)
    wrapped.forEach((w, idx) => {
      lines.push({
        text: idx === 0 ? `-  ${w}` : `    ${w}`,
        font: "F1",
        size: 9.1,
        color: [0.18, 0.18, 0.24],
        indent: 8,
        spacingAfter: idx === wrapped.length - 1 ? 4 : 2,
      })
    })
  }

  // Title Block
  lines.push({
    text: "GHENA HANI",
    font: "F2",
    size: 21,
    color: [0.06, 0.04, 0.14],
    spacingAfter: 5,
  })
  lines.push({
    text:
      lang === "fr"
        ? "Ingenieur IA & Architecte Full-Stack | Deep Learning - NLP - RAG - IA Agentique"
        : "AI Engineer & Full-Stack Systems Architect | Deep Learning - NLP - RAG - Agentic AI",
    font: "F2",
    size: 10.5,
    color: [0.42, 0.16, 0.85],
    spacingAfter: 5,
  })
  lines.push({
    text: "Algiers, Algeria  |  hanighena4@gmail.com  |  +213 557 42 06 11  |  github.com/HANIDEVINF  |  linkedin.com/in/hani-ghena-797a29269",
    font: "F1",
    size: 8.8,
    color: [0.32, 0.32, 0.38],
    spacingAfter: 12,
  })

  if (lang === "en") {
    addHeader("Executive Summary")
    addParagraph(
      "AI Engineer & Master's Researcher in Artificial Intelligence at USTHB with 5 AI research internships at CERIST and ~2 years of commercial full-stack software delivery. Proven track record designing custom Transformer/BERT architectures (MUCAT), embedded medical AI & real-time IoT patient monitoring platforms (MedGuardAI, MIT-BIH v7 INT8 TFLite), hybrid RAG pipelines, multi-agent systems, and multi-role commercial ERP and clinical software."
    )

    addHeader("Professional & Research Experience")
    addParagraph(
      "AI Engineering Researcher (5 Research Internships) - CERIST, Algiers, Algeria (2024 - Present)",
      9.6,
      true,
      [0.08, 0.08, 0.15]
    )
    addBullet(
      "Designed MuCAT (Multilingual Uncertainty-Calibrated Attention Transformer) in CERIST UbiSys (DTISI): mDeBERTa-v3-base + Hierarchical Attention Pooling (HAP) + FiLM Language Gating + Evidential Dirichlet Head (u=K/S) across 6 languages (MSA, Algerian Darija, Kabyle, Chaoui, FR, EN), reaching 98.20% test accuracy vs 23.74% mDeBERTa-v3 ablation."
    )
    addBullet(
      "Engineered AI ECG Arrhythmia Classification (v7) on the strict inter-patient MIT-BIH DS1/DS2 benchmark (90.13% 5-fold accuracy, 155.4 KB INT8 TFLite, 0.32 ms/beat latency)."
    )
    addBullet(
      "Developed real-time ECG and blood glucose anomaly detection pipelines connected to physical medical sensors and emergency clinical alert workflows."
    )

    addParagraph(
      "Independent Full-Stack & AI Systems Engineer - Algiers, Algeria (~2 Years)",
      9.6,
      true,
      [0.08, 0.08, 0.15]
    )
    addBullet(
      "Architected and delivered 6 commercial production systems: Tadjmeel Clinica Algiers (Public Web + Doctor & Receptionist Electron Desktop Apps), Enterprise DZD Business ERP & G50 Fiscal Suite, ALLURE HOMME, GK STORE, CASUAL 29, and AURA Retail OS."
    )
    addBullet(
      "Built and deployed 11+ interactive AI web applications spanning Speech-to-Text ASR & Clinical SOAP Summarization, Hybrid Dense+BM25 RAG, Multi-Agent ReAct Orchestration, and LLM Safety Evaluation."
    )

    addHeader("Key Deployed Systems & Research")
    addBullet(
      "AI ECG Arrhythmia Classification (v7): 1D-CNN + 2x Multi-Head Transformer + 8 RR features on MIT-BIH DS1/DS2."
    )
    addBullet(
      "MedGuardAI (USTHB Capstone Distinction): Real-time IoT ECG/Glucose sensor streaming, AI anomaly alerts & WebRTC telemedicine."
    )
    addBullet(
      "MuCAT Multilingual Transformer: mDeBERTa-v3 + HAP + FiLM Gating + Dirichlet Uncertainty (98.20% Test Acc, 6 languages)."
    )
    addBullet(
      "Commercial Production Suite: Tadjmeel Clinica Algiers, Enterprise DZD G50 ERP, ALLURE HOMME, GK STORE & CASUAL 29."
    )

    addHeader("Education")
    addParagraph(
      "Master in Artificial Intelligence - USTHB, Algiers (Sep 2022 - June 2027 Expected)",
      9.4,
      true
    )
    addParagraph(
      "Bachelor's Degree (Licence) in Computer Science - USTHB, Algiers (Completed - Capstone: MedGuardAI)",
      9.4,
      true
    )

    addHeader("Technical Competencies & Languages")
    addParagraph(
      "AI & Deep Learning: PyTorch, TensorFlow, Keras, Transformers, BERT, RAG, Agentic AI (ReAct / Tool Calling), LLM Evaluation, TFLite INT8, Computer Vision."
    )
    addParagraph(
      "Full-Stack & Cloud: TypeScript, React, Next.js, Node.js, Electron, PostgreSQL, MongoDB, Supabase, REST/WebSockets, Docker, Git."
    )
    addParagraph(
      "Languages: Arabic (Native) - French (Full Professional Proficiency) - English (Professional Working Proficiency)."
    )
  } else {
    addHeader("Resume Executif")
    addParagraph(
      "Ingenieur en Intelligence Artificielle et chercheur en Master IA a l'USTHB avec 5 stages de recherche en IA au CERIST et ~2 ans d'experience en developpement full-stack commercial. Conception d'architectures Transformer/BERT multilingues (MUCAT), systemes medicaux IoT & IA temps reel (MedGuardAI, ECG v7 INT8 TFLite), pipelines RAG hybrides, systemes multi-agents et logiciels ERP/cliniques en production."
    )

    addHeader("Experience Professionnelle & Recherche")
    addParagraph(
      "Chercheur en Ingenierie de l'IA (5 Stages) - CERIST, Alger, Algerie (2024 - Present)",
      9.6,
      true,
      [0.08, 0.08, 0.15]
    )
    addBullet(
      "Conception de MuCAT (Multilingual Uncertainty-Calibrated Attention Transformer) au CERIST UbiSys (DTISI) : mDeBERTa-v3 + HAP + FiLM Language Gating + tete evidentielle Dirichlet (u=K/S) sur 6 langues (Arabe, Darija, Kabyle, Chaoui, FR, EN), atteignant 98.20% test accuracy contre 23.74% en ablation."
    )
    addBullet(
      "Developpement du systeme ECG Arrhythmia v7 sur le protocole inter-patient MIT-BIH DS1/DS2 (90.13% precision ensemble 5-fold, 155.4 Ko INT8 TFLite, 0.32 ms/battement)."
    )
    addBullet(
      "Developpement de pipelines de detection d'anomalies ECG et glycemie en temps reel connectes a des capteurs medicaux."
    )

    addParagraph(
      "Ingenieur Full-Stack & Systemes IA Freelance - Alger, Algerie (~2 Ans)",
      9.6,
      true,
      [0.08, 0.08, 0.15]
    )
    addBullet(
      "Livraison de 6 systemes commerciaux en production : Tadjmeel Clinica Alger (Site + applications desktop Electron Medecin & Receptionniste), ERP Algerien DZD & Bilan Fiscal G50, ALLURE HOMME, GK STORE, CASUAL 29 et AURA."
    )
    addBullet(
      "Deploiement de 11+ applications IA interactives : Speech-to-Text ASR & Synthese SOAP, RAG Hybride Dense+BM25, Orchestration Multi-Agents ReAct et Evaluation LLM."
    )

    addHeader("Formation")
    addParagraph(
      "Master en Intelligence Artificielle - USTHB, Alger (Sep 2022 - Juin 2027 prevu)",
      9.4,
      true
    )
    addParagraph(
      "Licence en Informatique - USTHB, Alger (Obtenue - PFE : MedGuardAI)",
      9.4,
      true
    )

    addHeader("Competences & Langues")
    addParagraph(
      "IA & Deep Learning : PyTorch, TensorFlow, Keras, Transformers, BERT, RAG, IA Agentique, TFLite INT8, Vision par Ordinateur."
    )
    addParagraph(
      "Full-Stack : TypeScript, React, Next.js, Node.js, Electron, PostgreSQL, MongoDB, Supabase, Docker, Git."
    )
    addParagraph(
      "Langues : Arabe (Maternel) - Francais (Maitrise professionnelle) - Anglais (Professionnel)."
    )
  }

  // Build PDF content stream
  const margin = 44
  let y = 792 // A4 height = 841.89 pt
  const ops: string[] = []

  for (const line of lines) {
    if (y < 48) break
    const x = margin + (line.indent || 0)
    const [r, g, b] = line.color
    const safeText = sanitizeWinAnsi(line.text)

    if (line.font === "F2" && line.size === 10.5 && line.color[0] === 0.38) {
      y -= 6
    }

    ops.push(
      `BT /${line.font} ${line.size.toFixed(1)} Tf ${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} rg ${x.toFixed(1)} ${y.toFixed(1)} Td (${safeText}) Tj ET`
    )

    if (line.font === "F2" && line.size === 10.5 && line.color[0] === 0.38) {
      const ruleY = y - 4
      ops.push(
        `0.65 0.33 0.96 RG 0.7 w ${margin} ${ruleY.toFixed(1)} m ${(595.28 - margin).toFixed(1)} ${ruleY.toFixed(1)} l S`
      )
      y -= 6
    }

    y -= line.size * 1.15 + (line.spacingAfter ?? 3)
  }

  const contentStream = ops.join("\n")

  const objects: string[] = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n",
    `6 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ]

  let pdf = "%PDF-1.4\n"
  const offsets: number[] = [0]

  for (const obj of objects) {
    offsets.push(pdf.length)
    pdf += obj
  }

  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += "0000000000 65535 f \n"
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

  const encoder = new TextEncoder()
  return encoder.encode(pdf)
}
