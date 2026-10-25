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
    spacingAfter: 4,
  })
  lines.push({
    text:
      lang === "fr"
        ? "Ingenieur en IA Appliquee | NLP, Deep Learning & Systemes LLM"
        : "Applied AI Engineer | NLP, Deep Learning & LLM Systems",
    font: "F2",
    size: 10.5,
    color: [0.42, 0.16, 0.85],
    spacingAfter: 5,
  })
  // Split contact info across 2 rows so nothing ever extends beyond page margin
  lines.push({
    text: "Algiers, Algeria   |   hanighena4@gmail.com   |   +213 541 89 47 43",
    font: "F1",
    size: 8.8,
    color: [0.32, 0.32, 0.38],
    spacingAfter: 3,
  })
  lines.push({
    text: "github.com/HANIDEVINF   |   linkedin.com/in/ghena-hani-3543a3375",
    font: "F1",
    size: 8.8,
    color: [0.32, 0.32, 0.38],
    spacingAfter: 11,
  })

  if (lang === "en") {
    addHeader("Executive Summary")
    addParagraph(
      "Applied AI Engineer & M.Sc. Candidate in Artificial Intelligence at USTHB (Sep 2025 - Expected June 2027), Licence in Computer Science graduate from USTHB (2022 - 2025), with AI research appointments at CERIST (2024 - 2025) and commercial full-stack software delivery (Jan 2024 - Present). Proven track record designing evaluated deep learning architectures (AsthmaExpertUltra Multi-Task Transformer, MuCAT 6-language Transformer, MIT-BIH v7 INT8 TFLite ECG classifier), real-time IoT clinical platforms (MedGuardAI), hybrid RAG pipelines, and 6 deployed commercial client systems."
    )

    addHeader("Professional & Research Experience")
    addParagraph(
      "AI Engineering Research Intern - CERIST (UbiSys Team DTISI), Algiers (2024 - 2025)",
      9.6,
      true,
      [0.08, 0.08, 0.15]
    )
    addBullet(
      "Designed AsthmaExpertUltra: 4-layer Transformer Encoder predicting crisis severity (76.0% acc, 92.3% severe recall) and lead-time proximity (69.0% acc) from 8 multimodal IoT streams, with Dempster-Shafer fusion & Android PyTorch Lite deployment (<1.0s)."
    )
    addBullet(
      "Designed MuCAT (Multilingual Uncertainty-Calibrated Attention Transformer) in CERIST UbiSys (DTISI): mDeBERTa-v3-base + Hierarchical Attention Pooling (HAP) + FiLM Language Gating + Evidential Dirichlet Head (u=K/S) across 6 languages (MSA, Algerian Darija, Kabyle, Chaoui, FR, EN), reaching 98.20% test accuracy."
    )
    addBullet(
      "Engineered AI ECG Arrhythmia Classification (v7) on the strict inter-patient MIT-BIH DS1/DS2 benchmark (90.13% 5-fold accuracy, 155.4 KB INT8 TFLite, 0.32 ms/beat latency)."
    )

    addParagraph(
      "Independent Full-Stack & Applied AI Engineer - Algiers, Algeria (Jan 2024 - Present)",
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
      "AsthmaExpertUltra (CERIST AI Research): Multi-Task Transformer for asthma crisis severity & lead-time with Android PyTorch Lite."
    )
    addBullet(
      "AI ECG Arrhythmia Classification (v7): 1D-CNN + 2x Multi-Head Transformer + 8 RR features on MIT-BIH DS1/DS2."
    )
    addBullet(
      "MuCAT Multilingual Transformer: mDeBERTa-v3 + HAP + FiLM Gating + Dirichlet Uncertainty (98.20% Test Acc, 6 languages)."
    )
    addBullet(
      "MedGuardAI (USTHB Capstone Distinction): Real-time IoT ECG/Glucose sensor streaming, AI anomaly alerts & WebRTC telemedicine."
    )
    addBullet(
      "Commercial Production Suite: Tadjmeel Clinica Algiers, Enterprise DZD G50 ERP, ALLURE HOMME, GK STORE & CASUAL 29."
    )

    addHeader("Education")
    addParagraph(
      "M.Sc. Candidate in Artificial Intelligence - USTHB, Algiers (Sep 2025 - June 2027 Expected)",
      9.4,
      true
    )
    addParagraph(
      "B.Sc. (Licence) in Computer Science - USTHB, Algiers (Sep 2022 - June 2025 Graduated - Capstone: MedGuardAI)",
      9.4,
      true
    )
    addParagraph(
      "Baccalaureat in Exact Sciences - Algiers (2022)",
      9.4,
      false
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
      "Ingenieur en IA Appliquee et Candidat au Master en Intelligence Artificielle a l'USTHB (Sept. 2025 - Prevu Juin 2027), diplome de la Licence en Informatique a l'USTHB (2022 - 2025), avec des stages de recherche en IA au CERIST (2024 - 2025) et 2+ ans d'experience en developpement full-stack commercial (Janv. 2024 - Present). Conception d'architectures Transformer de pointe (AsthmaExpertUltra, MuCAT 6 langues), systemes medicaux IoT & IA temps reel (MedGuardAI, ECG v7 INT8 TFLite) et 6 logiciels commerciaux en production."
    )

    addHeader("Experience Professionnelle & Recherche")
    addParagraph(
      "Stagiaire Chercheur en Ingenierie de l'IA (Equipe UbiSys DTISI) - CERIST, Alger (2024 - 2025)",
      9.6,
      true,
      [0.08, 0.08, 0.15]
    )
    addBullet(
      "Conception d'AsthmaExpertUltra : Transformer Multi-Taches pour la severite des crises (76.0% acc, 92.3% rappel severe) et l'anticipation temporelle (69.0% acc), fusion evidentielle de Dempster-Shafer et deploiement Android PyTorch Lite (<1.0s)."
    )
    addBullet(
      "Conception de MuCAT au CERIST UbiSys (DTISI) : mDeBERTa-v3 + HAP + FiLM Language Gating + tete evidentielle Dirichlet (u=K/S) sur 6 langues (Arabe, Darija, Kabyle, Chaoui, FR, EN), atteignant 98.20% de precision test."
    )
    addBullet(
      "Developpement du systeme ECG Arrhythmia v7 sur le protocole inter-patient MIT-BIH DS1/DS2 (90.13% precision ensemble 5-fold, 155.4 Ko INT8 TFLite, 0.32 ms/battement)."
    )

    addParagraph(
      "Ingenieur Full-Stack & IA Appliquee Independant - Alger, Algerie (Janv. 2024 - Present)",
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
      "Candidat au Master en Intelligence Artificielle - USTHB, Alger (Sept. 2025 - Juin 2027 prevu)",
      9.4,
      true
    )
    addParagraph(
      "Licence en Informatique - USTHB, Alger (Sept. 2022 - Juin 2025 Diplome - PFE : MedGuardAI)",
      9.4,
      true
    )
    addParagraph(
      "Baccalaureat en Sciences Exactes - Alger (2022)",
      9.4,
      false
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
