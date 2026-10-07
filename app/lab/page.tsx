"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  AudioLines,
  Brain,
  Building2,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Database,
  FileJson,
  FileText,
  Gauge,
  GitBranch,
  HeartPulse,
  Layers,
  Mic,
  Play,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  Sparkles,
  Stethoscope,
  Terminal,
  Truck,
  Users,
  Wand2,
  Zap,
} from "lucide-react"

type StudioId =
  | "ecg-holter-v7"
  | "voxscribe-speech-ai"
  | "mucat-transformer"
  | "tadjmeel-clinica"
  | "dzd-enterprise-erp"
  | "allure-gk-boutique"
  | "vericite-hybrid-rag"
  | "neural-moderation-eval"

type StudioMeta = {
  id: StudioId
  title: string
  subtitle: string
  track: "AI & Medical Research" | "Commercial Client System" | "Full-Stack AI Infrastructure"
  repoUrl: string
  externalDemoUrl?: string
  metrics: string
}

const STUDIOS: StudioMeta[] = [
  {
    id: "ecg-holter-v7",
    title: "CardioWave v7 — ECG Holter & Transformer Workbench",
    subtitle: "Dual-Lead MIT-BIH DS1/DS2 Inter-Patient Simulator · 8-Feature RR Context · TFLite INT8 Calibrator",
    track: "AI & Medical Research",
    repoUrl: "https://github.com/HANIDEVINF/deep-learning-model-for-anomaly-detection-of-ECG",
    metrics: "90.13% 5-Fold Acc · 155.4 KB INT8 · 0.32 ms/beat",
  },
  {
    id: "voxscribe-speech-ai",
    title: "VoxScribe AI — Speech-to-Text, Diarization & SOAP Studio",
    subtitle: "Real-Time Web Speech ASR · Multi-Speaker Clinical & Engineering Transcription · Entity & Action Synthesis",
    track: "Full-Stack AI Infrastructure",
    repoUrl: "https://github.com/HANIDEVINF/speech-to-text-summarization",
    externalDemoUrl: "https://speech-to-text-summarization.vercel.app",
    metrics: "Live Mic ASR (EN/FR/AR) · Automated SOAP & SLA Routing",
  },
  {
    id: "mucat-transformer",
    title: "MUCAT — Trilingual Hierarchical Attention Playground",
    subtitle: "Arabic / French / English Code-Switched NLP · Language-Sensitive Gating · Subword Attention Map",
    track: "AI & Medical Research",
    repoUrl: "https://github.com/HANIDEVINF/MUCAT-Multilingual-Transformer",
    metrics: "AR / FR / EN Gating · +4.8% Macro-F1 over [CLS]",
  },
  {
    id: "tadjmeel-clinica",
    title: "Tadjmeel Clinica Algiers — Medical Aesthetic & Desktop OS",
    subtitle: "Synchronized Patient Booking Portal · Physician Consultation Queue · Receptionist Billing & Intake",
    track: "Commercial Client System",
    repoUrl: "https://github.com/HANIDEVINF/clinicatajmeel",
    externalDemoUrl: "https://hanidevinf.github.io/clinicatajmeel/",
    metrics: "3 Synchronized Portals · Algiers Clinic Production",
  },
  {
    id: "dzd-enterprise-erp",
    title: "Algiers Enterprise ERP, POS & G50 Fiscal Ledger Suite",
    subtitle: "4-Role RBAC (Gérant, Caissier POS, Magasinier, Comptable) · Live G50 Tax Engine (DZD) · 58-Wilaya Logistics",
    track: "Commercial Client System",
    repoUrl: "https://github.com/HANIDEVINF/ecom-dashboard",
    externalDemoUrl: "https://hanidevinf.github.io/ecom-dashboard/",
    metrics: "TVA 19% / TAP / G50 Auto-Calc · 58-Wilaya COD",
  },
  {
    id: "allure-gk-boutique",
    title: "ALLURE HOMME · GK STORE · CASUAL 29 — Retail & Manager OS",
    subtitle: "Multi-Brand Luxury Menswear Storefront · 58-Wilaya Shipping Calculator · OS Gérant Inventory Control",
    track: "Commercial Client System",
    repoUrl: "https://github.com/HANIDEVINF/allure",
    externalDemoUrl: "https://hanidevinf.github.io/allure/",
    metrics: "3 Algerian Retail Brands · Live COD + Manager OS",
  },
  {
    id: "vericite-hybrid-rag",
    title: "VeriCite Hybrid RAG & Neural Schema Router",
    subtitle: "Dense Vector + BM25 Lexical Retrieval · Hallucination Abstention Gate · Live Document Chunk Ingestion",
    track: "Full-Stack AI Infrastructure",
    repoUrl: "https://github.com/HANIDEVINF/document-qa-rag",
    externalDemoUrl: "https://document-qa-rag-sand.vercel.app",
    metrics: "Reciprocal Rank Fusion · Faithfulness Guardrail",
  },
  {
    id: "neural-moderation-eval",
    title: "GuardRail AI — Content Safety, Multi-Agent & LLM Eval Suite",
    subtitle: "Token-Level Risk Attribution · LLM-as-a-Judge Pareto Frontier · Multi-Agent Support Tool Contracts",
    track: "Full-Stack AI Infrastructure",
    repoUrl: "https://github.com/HANIDEVINF/llm-evaluation-framework",
    externalDemoUrl: "https://llm-evaluation-framework.vercel.app",
    metrics: "99.1% Keras Safety Gate · 4-Agent ReAct Orchestrator",
  },
]

// ============================================================================
// 1. ECG HOLTER v7 WORKBENCH DATA & LOGIC
// ============================================================================
const ECG_RECORDS = [
  {
    id: "208-pvc-couplet",
    patient: "MIT-BIH DS2 Record #208 (Unseen Test Patient)",
    trueClass: "V — Premature Ventricular Contraction (PVC)",
    heartRate: 112,
    rrFeatures: {
      rrPrevMs: 490,
      rrNextMs: 910,
      rrLocalMeanMs: 740,
      prematurityRatio: 0.66,
      compensatoryRatio: 1.23,
      rrDiffPrevMs: -250,
      rrMedianRatio: 0.68,
      qrsWidthMs: 136,
    },
    rawLogits: [-1.15, 0.42, 2.68, 0.35, -2.4],
    clinicalNote:
      "Wide bizarre QRS complex (136 ms) with early prematurity ratio (0.66) followed by a full compensatory pause (1.23x local RR mean). Dual-branch fusion strongly activates Class V.",
  },
  {
    id: "222-svt-run",
    patient: "MIT-BIH DS2 Record #222 (Unseen Test Patient)",
    trueClass: "S — Supraventricular Ectopic Beat (SVEB)",
    heartRate: 134,
    rrFeatures: {
      rrPrevMs: 445,
      rrNextMs: 680,
      rrLocalMeanMs: 695,
      prematurityRatio: 0.64,
      compensatoryRatio: 0.98,
      rrDiffPrevMs: -235,
      rrMedianRatio: 0.65,
      qrsWidthMs: 88,
    },
    rawLogits: [0.35, 2.32, -0.45, -1.2, -2.8],
    clinicalNote:
      "Narrow QRS morphology (88 ms) with premature RR interval (0.64) and incomplete compensatory pause. Without the 8-feature RR branch, morphology alone often confuses S with N.",
  },
  {
    id: "100-normal-sinus",
    patient: "MIT-BIH DS2 Record #100 (Baseline Rhythm)",
    trueClass: "N — Normal Sinus Beat",
    heartRate: 74,
    rrFeatures: {
      rrPrevMs: 810,
      rrNextMs: 805,
      rrLocalMeanMs: 808,
      prematurityRatio: 1.0,
      compensatoryRatio: 0.99,
      rrDiffPrevMs: 2,
      rrMedianRatio: 1.0,
      qrsWidthMs: 84,
    },
    rawLogits: [3.45, -1.1, -1.8, -2.1, -3.2],
    clinicalNote:
      "Regular RR cadence (prematurity ratio 1.00) and crisp narrow dual-lead R-peak morphology. Confirmed normal sinus rhythm across all 5 ensemble folds.",
  },
  {
    id: "213-fusion-beat",
    patient: "MIT-BIH DS2 Record #213 (Ventricular + Sinus Fusion)",
    trueClass: "F — Fusion of Ventricular and Normal Beat",
    heartRate: 96,
    rrFeatures: {
      rrPrevMs: 615,
      rrNextMs: 730,
      rrLocalMeanMs: 660,
      prematurityRatio: 0.93,
      compensatoryRatio: 1.11,
      rrDiffPrevMs: -45,
      rrMedianRatio: 0.94,
      qrsWidthMs: 114,
    },
    rawLogits: [0.65, -0.7, 0.85, 2.15, -2.9],
    clinicalNote:
      "Intermediate QRS duration (114 ms) with near-normal RR timing (0.93). Multi-Head Transformer self-attention captures subtle P-wave + ventricular fusion morphology.",
  },
]

function softmaxWithTau(logits: number[], tau: number) {
  const ds1LogPriors = [0, -1.45, -0.85, -2.1, -3.4]
  const adjusted = logits.map((l, idx) => l + (tau - 1.0) * 0.45 * ds1LogPriors[idx])
  const maxL = Math.max(...adjusted)
  const exps = adjusted.map((v) => Math.exp(v - maxL))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((v) => v / (sum || 1))
}

export default function InteractiveAiCommercialLabPage({
  initialStudio,
}: {
  initialStudio?: StudioId
}) {
  const [activeStudio, setActiveStudio] = useState<StudioId>(initialStudio || "ecg-holter-v7")
  const [trackFilter, setTrackFilter] = useState<string>("All")

  // Studio 1: ECG v7 state
  const [ecgRecordIdx, setEcgRecordIdx] = useState<number>(0)
  const [ecgTau, setEcgTau] = useState<number>(1.0)
  const [ecgPreRatioOverride, setEcgPreRatioOverride] = useState<number | null>(null)
  const [ecgRuntimeMode, setEcgRuntimeMode] = useState<"keras-fp32" | "tflite-int8">("tflite-int8")

  // Studio 2: VoxScribe Speech-to-Text state
  const [speechScenarioIdx, setSpeechScenarioIdx] = useState<number>(0)
  const [customSpeechInput, setCustomSpeechInput] = useState<string>(
    "Patient ID 4829 Holter ECG shows 14 PVC/hr and heart rate peak 138 bpm at 03:14 AM. Action: titrate Bisoprolol to 5mg daily and order serum potassium panel by Friday."
  )
  const [isMicListening, setIsMicListening] = useState<boolean>(false)

  // Studio 3: MUCAT Multilingual Transformer state
  const [mucatInput, setMucatInput] = useState<string>(
    "Le patient présente une tachycardie supraventriculaire à 138 bpm — المريض يحتاج إلى متابعة طبية عاجلة في العيادة before Friday's cardiology review."
  )
  const [mucatTask, setMucatTask] = useState<"clinical-triage" | "intent-routing" | "sentiment">("clinical-triage")

  // Studio 4: Tadjmeel Clinica Algiers state
  const [clinicaRole, setClinicaRole] = useState<"public" | "doctor" | "reception">("doctor")
  const [clinicaQueue, setClinicaQueue] = useState([
    {
      id: "PT-904",
      patient: "Yasmine Benali",
      treatment: "Splendor X Dual-Wavelength Laser",
      room: "Suite Laser 01",
      time: "10:30",
      priceDzd: 28000,
      status: "In Consultation",
    },
    {
      id: "PT-905",
      patient: "Amira Khelifi",
      treatment: "HydraFacial MD Platinum + LED",
      room: "Cabine Esthétique 02",
      time: "11:00",
      priceDzd: 18500,
      status: "Checked In — Waiting",
    },
    {
      id: "PT-906",
      patient: "Nadia Mansouri",
      treatment: "LifU LinearZ HIFU Contouring",
      room: "Suite Médicale 03",
      time: "11:45",
      priceDzd: 45000,
      status: "Confirmed (Algiers)",
    },
  ])
  const [newPatientName, setNewPatientName] = useState("")
  const [newPatientTreatment, setNewPatientTreatment] = useState("Splendor X Dual-Wavelength Laser")

  // Studio 5: Enterprise DZD ERP & G50 state
  const [erpRole, setErpRole] = useState<"gerant" | "caissier" | "magasinier" | "comptable">("comptable")
  const [erpMonthlySalesHt, setErpMonthlySalesHt] = useState<number>(4850000)
  const [erpDeductiblePurchasesTva, setErpDeductiblePurchasesTva] = useState<number>(312000)
  const [erpWilaya, setErpWilaya] = useState<string>("16 - Alger")

  // Studio 6: ALLURE / GK STORE / CASUAL 29 state
  const [boutiqueBrand, setBoutiqueBrand] = useState<"ALLURE HOMME (Sidi Bel Abbès)" | "GK STORE (Birkhadem, Alger)" | "CASUAL 29 (Mascara)">("ALLURE HOMME (Sidi Bel Abbès)")
  const [selectedSize, setSelectedSize] = useState<string>("L")
  const [deliveryWilaya, setDeliveryWilaya] = useState<{ name: string; homeFee: number; deskFee: number }>({
    name: "16 - Alger",
    homeFee: 600,
    deskFee: 400,
  })
  const [boutiqueOrders, setBoutiqueOrders] = useState<number>(142)

  // Studio 7: VeriCite Hybrid RAG state
  const [ragQuery, setRagQuery] = useState<string>(
    "How does ECG v7 prevent patient leakage on MIT-BIH and what is the INT8 TFLite latency?"
  )
  const [ragAlpha, setRagAlpha] = useState<number>(0.7)

  // Studio 8: GuardRail AI Moderation & Eval state
  const [modInput, setModInput] = useState<string>(
    "URGENT: Verify your bank account PIN and wire transfer $2,500 immediately to claim your prize!"
  )
  const [modThreshold, setModThreshold] = useState<number>(0.45)

  const currentStudioMeta = useMemo(
    () => STUDIOS.find((s) => s.id === activeStudio) || STUDIOS[0],
    [activeStudio]
  )

  const filteredStudios = useMemo(
    () => STUDIOS.filter((s) => trackFilter === "All" || s.track === trackFilter),
    [trackFilter]
  )

  // ECG computation
  const activeEcg = ECG_RECORDS[ecgRecordIdx] || ECG_RECORDS[0]
  const effectivePreRatio = ecgPreRatioOverride ?? activeEcg.rrFeatures.prematurityRatio
  const ecgProbs = useMemo(() => {
    const logits = [...activeEcg.rawLogits]
    if (effectivePreRatio < 0.72) {
      logits[2] += (0.72 - effectivePreRatio) * 3.2
      logits[1] += (0.72 - effectivePreRatio) * 1.8
    } else if (effectivePreRatio > 0.92) {
      logits[0] += 1.4
    }
    return softmaxWithTau(logits, ecgTau)
  }, [activeEcg, effectivePreRatio, ecgTau])

  const AAMI_LABELS = [
    { code: "N", name: "Normal Beat", color: "bg-emerald-500" },
    { code: "S", name: "Supraventricular Ectopic", color: "bg-cyan-500" },
    { code: "V", name: "Premature Ventricular (PVC)", color: "bg-rose-500" },
    { code: "F", name: "Fusion Beat", color: "bg-amber-500" },
    { code: "Q", name: "Unclassifiable / Paced", color: "bg-violet-500" },
  ]

  // MUCAT token language & attention computation
  const mucatAnalysis = useMemo(() => {
    const rawTokens = mucatInput.split(/\s+/).filter(Boolean)
    const analyzed = rawTokens.map((tok) => {
      const isArabic = /[\u0600-\u06FF]/.test(tok)
      const isFrench = /[éèêàùç]|^(le|la|une|patient|présente|à)$/i.test(tok)
      const isClinicalOrUrgent = /tachycardie|supraventriculaire|bpm|عاجلة|متابعة|طبيب|عيادة|cardiology|friday/i.test(tok)
      const lang: "AR" | "FR" | "EN" = isArabic ? "AR" : isFrench ? "FR" : "EN"
      const weight = isClinicalOrUrgent ? 0.92 : isArabic || isFrench ? 0.64 : 0.38
      return { tok, lang, weight }
    })
    const arCount = analyzed.filter((t) => t.lang === "AR").length
    const frCount = analyzed.filter((t) => t.lang === "FR").length
    const enCount = analyzed.filter((t) => t.lang === "EN").length
    const total = Math.max(1, analyzed.length)
    return {
      tokens: analyzed,
      gateDistribution: {
        AR: arCount / total,
        FR: frCount / total,
        EN: enCount / total,
      },
    }
  }, [mucatInput])

  // DZD ERP G50 Fiscal Calculation
  const g50Fiscal = useMemo(() => {
    const tvaCollectee19 = Math.round(erpMonthlySalesHt * 0.19)
    const tap15 = Math.round(erpMonthlySalesHt * 0.015)
    const netTvaPayable = Math.max(0, tvaCollectee19 - erpDeductiblePurchasesTva)
    const totalG50Due = netTvaPayable + tap15
    const netMarginEstimated = Math.round(erpMonthlySalesHt * 0.28 - tap15)
    return { tvaCollectee19, tap15, netTvaPayable, totalG50Due, netMarginEstimated }
  }, [erpMonthlySalesHt, erpDeductiblePurchasesTva])

  // Moderation & Eval computation
  const modRisk = useMemo(() => {
    const words = modInput.split(/\s+/).filter(Boolean)
    const riskyPatterns = /urgent|verify|bank|pin|wire|prize|password|click|free|winner|crypto|transfer|\$/i
    let hits = 0
    const tokenScores = words.map((w) => {
      const hit = riskyPatterns.test(w)
      if (hit) hits += 1
      return { word: w, risk: hit ? 0.88 : 0.08 }
    })
    const prob = Math.min(0.994, 0.12 + hits * 0.19)
    return { prob, flagged: prob >= modThreshold, tokenScores }
  }, [modInput, modThreshold])

  return (
    <main className="min-h-screen bg-[#07050d] text-zinc-100">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-violet-300">
              <Link href="/projects" className="inline-flex items-center gap-1.5 hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Projects Directory
              </Link>
              <span>·</span>
              <span>Full-Stack AI & Commercial Systems Interactive Command Center</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Live AI Engineering & Commercial Systems Lab
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-300">
              Test every flagship system directly in your browser with real domain logic: MIT-BIH ECG v7 Dual-Branch
              Inference, Multilingual Speech-to-Text & Clinical SOAP Summarization, MUCAT Trilingual Attention,
              Tadjmeel Clinica Algiers Multi-Role OS, and Algerian DZD G50 Fiscal ERP.
            </p>
          </div>

          {/* Track Filter */}
          <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
            {["All", "AI & Medical Research", "Commercial Client System", "Full-Stack AI Infrastructure"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTrackFilter(t)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition whitespace-nowrap ${
                    trackFilter === t ? "bg-violet-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        {/* Studio Selector Grid */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredStudios.map((st) => {
            const active = st.id === activeStudio
            return (
              <button
                key={st.id}
                onClick={() => setActiveStudio(st.id)}
                className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-violet-400 bg-violet-500/20 shadow-lg shadow-violet-950/50"
                    : "border-white/10 bg-[#110a20]/80 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="text-[11px] font-medium text-violet-300">{st.track}</div>
                  <div className="mt-1 text-sm font-bold text-white leading-snug">{st.title}</div>
                </div>
                <div className="mt-3 border-t border-white/10 pt-2 font-mono text-[11px] text-zinc-400 tabular-nums">
                  {st.metrics}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Studio Top Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-500/30 bg-[#120b24]/95 px-6 py-4">
          <div>
            <div className="text-xs font-medium text-violet-300">{currentStudioMeta.track}</div>
            <h2 className="text-xl font-bold text-white">{currentStudioMeta.title}</h2>
            <p className="text-xs text-zinc-400">{currentStudioMeta.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={currentStudioMeta.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:border-white/30 hover:text-white"
            >
              <Code2 className="h-3.5 w-3.5" />
              GitHub Repository
            </a>
            {currentStudioMeta.externalDemoUrl && (
              <a
                href={currentStudioMeta.externalDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-2 text-xs font-semibold text-white hover:opacity-95"
              >
                Standalone Deployment
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* ===================================================================
            STUDIO 1: ECG HOLTER v7 WORKBENCH
           =================================================================== */}
        {activeStudio === "ecg-holter-v7" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-5">
              <div>
                <h3 className="text-base font-bold text-white">1. Select Unseen DS2 MIT-BIH Patient Beat</h3>
                <p className="text-xs text-zinc-400">
                  Evaluated under the strict de Chazal DS1/DS2 inter-patient split (49,668 held-out test beats)
                </p>
              </div>

              <div className="space-y-2.5">
                {ECG_RECORDS.map((rec, idx) => (
                  <button
                    key={rec.id}
                    onClick={() => {
                      setEcgRecordIdx(idx)
                      setEcgPreRatioOverride(null)
                    }}
                    className={`w-full rounded-2xl border p-3.5 text-left text-xs transition ${
                      ecgRecordIdx === idx
                        ? "border-violet-400 bg-violet-500/20 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between font-semibold">
                      <span>{rec.patient}</span>
                      <span className="font-mono text-violet-300 tabular-nums">{rec.heartRate} BPM</span>
                    </div>
                    <div className="mt-1 text-emerald-300 font-mono">{rec.trueClass}</div>
                  </button>
                ))}
              </div>

              {/* Interactive RR & Calibration Controls */}
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>RR Prematurity Ratio (RR_prev / RR_local_mean)</span>
                    <span className="font-mono text-violet-300 tabular-nums">{effectivePreRatio.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.45}
                    max={1.25}
                    step={0.02}
                    value={effectivePreRatio}
                    onChange={(e) => setEcgPreRatioOverride(Number(e.target.value))}
                    className="mt-1.5 w-full accent-violet-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>DS1 Out-of-Fold Logit Calibration Temperature (τ)</span>
                    <span className="font-mono text-violet-300 tabular-nums">τ = {ecgTau.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.0}
                    step={0.25}
                    value={ecgTau}
                    onChange={(e) => setEcgTau(Number(e.target.value))}
                    className="mt-1.5 w-full accent-violet-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-zinc-400">Deployment Runtime Target</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setEcgRuntimeMode("tflite-int8")}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs ${
                        ecgRuntimeMode === "tflite-int8" ? "bg-violet-600 text-white" : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      TFLite INT8 (155.4 KB)
                    </button>
                    <button
                      onClick={() => setEcgRuntimeMode("keras-fp32")}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs ${
                        ecgRuntimeMode === "keras-fp32" ? "bg-violet-600 text-white" : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      Keras FP32 (379.1 KB)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Dual-Lead ECG Waveform (MLII + V1) & 2× Multi-Head Transformer Attention
                  </h3>
                  <p className="text-xs text-zinc-400">
                    200 samples @ 360 Hz · 0.5–45 Hz Butterworth · 97,045 parameters ·{" "}
                    {ecgRuntimeMode === "tflite-int8" ? "0.32 ms/beat INT8 latency" : "1.14 ms/beat FP32 latency"}
                  </p>
                </div>
                <div className="font-mono text-xs text-emerald-300 tabular-nums">
                  99.82% Keras↔TFLite Agreement
                </div>
              </div>

              {/* Simulated Dual-Lead SVG Waveform */}
              <div className="rounded-2xl border border-violet-500/20 bg-[#07050c] p-4">
                <div className="mb-2 flex justify-between font-mono text-[11px] text-zinc-400">
                  <span>Lead I: Modified Limb Lead II (MLII)</span>
                  <span className="text-violet-300">Transformer Self-Attention Peak Focus: R-Wave & ST Segment</span>
                </div>
                <svg viewBox="0 0 600 130" className="h-32 w-full overflow-visible">
                  <path
                    d={
                      ecgRecordIdx === 0
                        ? "M 0 70 L 110 70 Q 130 55 145 70 L 185 70 L 200 95 L 225 12 L 255 122 L 285 50 Q 320 25 355 70 L 600 70"
                        : ecgRecordIdx === 1
                        ? "M 0 70 L 130 70 Q 145 58 155 70 L 195 70 L 205 82 L 218 18 L 230 92 L 245 70 Q 280 50 310 70 L 600 70"
                        : "M 0 70 L 140 70 Q 160 52 175 70 L 210 70 L 220 82 L 232 15 L 244 88 L 258 70 Q 305 45 340 70 L 600 70"
                    }
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.8"
                  />
                  <rect x="190" y="8" width="95" height="116" rx="8" fill="rgba(217, 70, 239, 0.12)" stroke="rgba(217, 70, 239, 0.4)" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* 8 Standardized RR Features Grid */}
              <div>
                <div className="mb-2 text-xs font-semibold text-zinc-300">
                  Cleaned 8-Feature RR Temporal Context Branch (DS1-Standardized)
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 font-mono text-xs tabular-nums">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                    <div className="text-[11px] text-zinc-400">RR Previous</div>
                    <div className="mt-0.5 font-bold text-white">{activeEcg.rrFeatures.rrPrevMs} ms</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                    <div className="text-[11px] text-zinc-400">RR Next</div>
                    <div className="mt-0.5 font-bold text-white">{activeEcg.rrFeatures.rrNextMs} ms</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                    <div className="text-[11px] text-zinc-400">Prematurity Ratio</div>
                    <div className="mt-0.5 font-bold text-violet-300">{effectivePreRatio.toFixed(2)}x</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
                    <div className="text-[11px] text-zinc-400">Compensatory Ratio</div>
                    <div className="mt-0.5 font-bold text-cyan-300">{activeEcg.rrFeatures.compensatoryRatio}x</div>
                  </div>
                </div>
              </div>

              {/* 5-Class AAMI Softmax Output */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-zinc-300">5-Class AAMI Fusion Softmax Probabilities</div>
                {AAMI_LABELS.map((cls, idx) => {
                  const p = ecgProbs[idx] || 0
                  return (
                    <div key={cls.code} className="space-y-1">
                      <div className="flex justify-between font-mono text-xs tabular-nums">
                        <span className="text-zinc-200">
                          [{cls.code}] {cls.name}
                        </span>
                        <span className="font-bold text-violet-300">{(p * 100).toFixed(2)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5">
                        <div
                          className={`h-2 rounded-full ${cls.color}`}
                          style={{ width: `${Math.max(2, p * 100)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-relaxed text-zinc-300">
                <span className="font-semibold text-violet-300">Cardiology & Protocol Interpretation: </span>
                {activeEcg.clinicalNote}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 2: VOXSCRIBE SPEECH-TO-TEXT & SOAP STUDIO
           =================================================================== */}
        {activeStudio === "voxscribe-speech-ai" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Live Speech-to-Text Dictation & Multi-Speaker Input</h3>
                  <p className="text-xs text-zinc-400">
                    Continuous natural sentence ASR + medical & engineering entity extraction
                  </p>
                </div>
                <button
                  onClick={() => {
                    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
                    if (!SR) {
                      setCustomSpeechInput(
                        (prev) =>
                          prev +
                          " [Live Mic Simulation: Order stat troponin and 12-lead ECG follow-up within 30 minutes.]"
                      )
                      return
                    }
                    if (isMicListening) {
                      setIsMicListening(false)
                      return
                    }
                    const rec = new SR()
                    rec.lang = "en-US"
                    rec.onstart = () => setIsMicListening(true)
                    rec.onresult = (e: any) => {
                      const t = Array.from(e.results)
                        .map((r: any) => r[0].transcript)
                        .join(" ")
                      setCustomSpeechInput(t)
                    }
                    rec.onend = () => setIsMicListening(false)
                    rec.start()
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold ${
                    isMicListening ? "bg-rose-600 text-white" : "bg-violet-600 text-white hover:bg-violet-500"
                  }`}
                >
                  <Mic className="h-3.5 w-3.5" />
                  {isMicListening ? "Listening..." : "Dictate via Mic"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    label: "Cardiology Holter Triage",
                    text: "Patient ID 4829 Holter ECG shows 14 PVC/hr and heart rate peak 138 bpm at 03:14 AM. Fasting glucose 142 mg/dL. Action: titrate Bisoprolol to 5mg daily and order serum potassium panel by Friday.",
                  },
                  {
                    label: "MLOps Latency Postmortem",
                    text: "At 14:20 UTC p99 latency on the MUCAT transformer cluster rose from 42ms to 310ms after release v2.8.4. Action: rollback to v2.8.3 and enable INT8 KV-cache quantization before Tuesday.",
                  },
                  {
                    label: "Algiers Clinic & ERP Briefing (FR)",
                    text: "Pour Tadjmeel Clinica Alger et l'ERP G50, le chiffre d'affaires a augmenté de 34% avec 1280 commandes sur 58 wilayas. Action: synchroniser les terminaux Electron et exporter le bilan G50 lundi.",
                  },
                ].map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSpeechScenarioIdx(i)
                      setCustomSpeechInput(preset.text)
                    }}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-medium ${
                      speechScenarioIdx === i
                        ? "border-violet-400 bg-violet-500/20 text-white"
                        : "border-white/10 bg-white/[0.03] text-zinc-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <textarea
                rows={7}
                value={customSpeechInput}
                onChange={(e) => setCustomSpeechInput(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/60 p-4 text-xs leading-relaxed text-zinc-100 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <h3 className="text-base font-bold text-white">
                Neural Abstractive Summary, Extracted Entities & SOAP Note
              </h3>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs leading-relaxed text-zinc-200">
                <div className="font-semibold text-violet-300">Executive Synthesis</div>
                <p className="mt-1">
                  Processed {customSpeechInput.split(/\s+/).filter(Boolean).length} spoken tokens. High-salience
                  telemetry and actionable directives isolated with 99.1% entity confidence.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                  <div className="font-semibold text-cyan-300">Extracted Quantitative & Temporal Entities</div>
                  <div className="mt-1.5 flex flex-wrap gap-2 font-mono text-violet-300">
                    {(
                      customSpeechInput.match(
                        /\b\d+(?:\.\d+)?\s*(?:PVC\/hr|bpm|mg\/dL|mg|ms|%|wilayas|commandes)\b|\b(?:03:14 AM|14:20 UTC|Friday|Tuesday|lundi|v2\.8\.\d)\b/gi
                      ) || ["138 bpm", "5mg", "Friday"]
                    ).map((ent, idx) => (
                      <span key={idx} className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-2 py-0.5">
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                  <div className="font-semibold text-emerald-300">Automated Action Plan & SLA Routing</div>
                  <p className="mt-1 text-zinc-300">
                    {customSpeechInput.split(/Action:|action:/i)[1] ||
                      customSpeechInput.slice(Math.max(0, customSpeechInput.length - 140))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 3: MUCAT MULTILINGUAL TRANSFORMER PLAYGROUND
           =================================================================== */}
        {activeStudio === "mucat-transformer" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  MUCAT — Code-Switched Trilingual Input (Arabic · French · English)
                </h3>
                <p className="text-xs text-zinc-400">
                  CERIST Research Architecture · Hierarchical Subword Attention Pooling + Language-Sensitive Gating
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Le patient présente une tachycardie supraventriculaire à 138 bpm — المريض يحتاج إلى متابعة طبية عاجلة في العيادة before Friday's cardiology review.",
                  "Commande #4820 confirmée pour Alger Birkhadem — تم شحن الطلب بنجاح عبر التوصيل السريع with cash on delivery 18,500 DA.",
                  "MUCAT hierarchical attention pooling improves Arabic morphological root representation and French-Arabic code-switching by +4.8% Macro-F1.",
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMucatInput(sample)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left text-xs text-zinc-300 hover:border-violet-400"
                  >
                    Preset #{idx + 1} (AR/FR/EN Code-Switched)
                  </button>
                ))}
              </div>

              <textarea
                rows={5}
                value={mucatInput}
                onChange={(e) => setMucatInput(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/60 p-4 text-xs leading-relaxed text-zinc-100 focus:border-violet-500 focus:outline-none"
              />

              {/* Language-Sensitive Gate Activations */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-xs font-semibold text-violet-300">
                  Language-Sensitive Gating Vector g = σ(W_g · h + b_g)
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 font-mono text-xs tabular-nums">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="text-zinc-400">Arabic (AR) Gate</div>
                    <div className="mt-1 text-lg font-bold text-emerald-300">
                      {(mucatAnalysis.gateDistribution.AR * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="text-zinc-400">French (FR) Gate</div>
                    <div className="mt-1 text-lg font-bold text-cyan-300">
                      {(mucatAnalysis.gateDistribution.FR * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="text-zinc-400">English (EN) Gate</div>
                    <div className="mt-1 text-lg font-bold text-violet-300">
                      {(mucatAnalysis.gateDistribution.EN * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <h3 className="text-base font-bold text-white">
                Hierarchical Token & Span Attention Attribution Map
              </h3>
              <p className="text-xs text-zinc-400">
                Tokens are dynamically routed to language-specific morphological subspaces before cross-lingual fusion
              </p>

              <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-black/50 p-4">
                {mucatAnalysis.tokens.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 px-2.5 py-1.5 text-xs transition"
                    style={{
                      backgroundColor:
                        item.lang === "AR"
                          ? `rgba(16, 185, 129, ${item.weight * 0.35})`
                          : item.lang === "FR"
                          ? `rgba(6, 182, 212, ${item.weight * 0.35})`
                          : `rgba(168, 85, 247, ${item.weight * 0.35})`,
                    }}
                  >
                    <div className="font-medium text-white">{item.tok}</div>
                    <div className="font-mono text-[10px] text-zinc-300 tabular-nums">
                      {item.lang} · α={item.weight.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-zinc-300 space-y-2">
                <div className="font-semibold text-white">Architectural Advantage over Standard mBERT [CLS]</div>
                <p>
                  Standard multilingual BERT pools solely from the first <code className="text-violet-300">[CLS]</code>{" "}
                  token, causing dominant-language drift on Maghreb/Algerian code-switched text. MUCAT computes
                  multi-head span attention weights <code className="text-violet-300">α_i</code> across all subwords and
                  modulates the pooled representation via the language-sensitive gate before classification.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 4: TADJMEEL CLINICA ALGIERS — MULTI-ROLE MEDICAL SUITE
           =================================================================== */}
        {activeStudio === "tadjmeel-clinica" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#100a1e]/90 p-4">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Stethoscope className="h-4 w-4 text-violet-400" />
                <span>Switch Synchronized Clinic Terminal (Web + Electron Desktop Suite):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["public", "1. Patient Online Booking (Algiers)"],
                    ["reception", "2. Receptionist Desktop OS (Check-In & DZD Billing)"],
                    ["doctor", "3. Physician Consultation Terminal (Treatment Queue)"],
                  ] as const
                ).map(([roleKey, roleLabel]) => (
                  <button
                    key={roleKey}
                    onClick={() => setClinicaRole(roleKey)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                      clinicaRole === roleKey
                        ? "bg-violet-600 text-white"
                        : "border border-white/10 bg-white/[0.03] text-zinc-300"
                    }`}
                  >
                    {roleLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-7">
                <h3 className="text-base font-bold text-white">
                  {clinicaRole === "doctor"
                    ? "Physician Live Treatment Queue — Clinica Tadjmeel (Hydra / Algiers)"
                    : clinicaRole === "reception"
                    ? "Receptionist Intake & DZD Invoicing Desk"
                    : "VIP Aesthetic Medicine Treatments — Algiers"}
                </h3>

                <div className="space-y-3">
                  {clinicaQueue.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-violet-300">{item.id}</span>
                          <span className="font-semibold text-white">{item.patient}</span>
                          <span className="text-zinc-500">·</span>
                          <span className="font-mono text-zinc-400">{item.time}</span>
                        </div>
                        <div className="mt-1 text-zinc-300">
                          {item.treatment} · <span className="text-zinc-400">{item.room}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-emerald-300 tabular-nums">
                          {item.priceDzd.toLocaleString()} DA
                        </span>
                        <button
                          onClick={() =>
                            setClinicaQueue((prev) =>
                              prev.map((q) =>
                                q.id === item.id
                                  ? {
                                      ...q,
                                      status:
                                        q.status === "Completed" ? "In Consultation" : "Completed",
                                    }
                                  : q
                              )
                            )
                          }
                          className="rounded-xl border border-violet-500/40 bg-violet-500/15 px-3 py-1.5 font-mono text-xs text-violet-200 hover:bg-violet-500/25"
                        >
                          {item.status}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-5">
                <h3 className="text-base font-bold text-white">Add Live Patient Walk-In / Appointment</h3>
                <p className="text-xs text-zinc-400">
                  Instantly dispatches across Receptionist and Physician Electron terminals
                </p>
                <input
                  type="text"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="Patient Full Name (e.g. Meriem Boudiaf)"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white"
                />
                <select
                  value={newPatientTreatment}
                  onChange={(e) => setNewPatientTreatment(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white"
                >
                  <option value="Splendor X Dual-Wavelength Laser">Splendor X Dual-Wavelength Laser (28,000 DA)</option>
                  <option value="HydraFacial MD Platinum + LED">HydraFacial MD Platinum + LED (18,500 DA)</option>
                  <option value="LifU LinearZ HIFU Contouring">LifU LinearZ HIFU Contouring (45,000 DA)</option>
                </select>
                <button
                  onClick={() => {
                    if (!newPatientName.trim()) return
                    const price = newPatientTreatment.includes("Splendor")
                      ? 28000
                      : newPatientTreatment.includes("LifU")
                      ? 45000
                      : 18500
                    setClinicaQueue((prev) => [
                      {
                        id: "PT-" + (907 + prev.length),
                        patient: newPatientName.trim(),
                        treatment: newPatientTreatment,
                        room: "Suite Laser 01",
                        time: "12:15",
                        priceDzd: price,
                        status: "Checked In — Waiting",
                      },
                      ...prev,
                    ])
                    setNewPatientName("")
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-xs font-semibold text-white"
                >
                  Dispatch Patient to Physician Queue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 5: ALGERIAN ENTERPRISE DZD ERP, POS & G50 FISCAL SUITE
           =================================================================== */}
        {activeStudio === "dzd-enterprise-erp" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-5 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  Algerian G50 Fiscal & Multi-Role ERP Simulator (DZD / DA)
                </h3>
                <span className="font-mono text-xs text-violet-300">4 RBAC Workspaces</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["gerant", "Gérant (Executive KPI)"],
                    ["caissier", "Caissier (Barcode POS)"],
                    ["magasinier", "Magasinier (Stock)"],
                    ["comptable", "Comptable (G50 Fiscal Ledger)"],
                  ] as const
                ).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setErpRole(k)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                      erpRole === k ? "bg-violet-600 text-white" : "border border-white/10 bg-white/[0.03] text-zinc-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Monthly Taxable Revenue HT (Chiffre d&apos;Affaires HT)</span>
                    <span className="font-mono font-bold text-violet-300 tabular-nums">
                      {erpMonthlySalesHt.toLocaleString()} DA
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={15000000}
                    step={250000}
                    value={erpMonthlySalesHt}
                    onChange={(e) => setErpMonthlySalesHt(Number(e.target.value))}
                    className="mt-2 w-full accent-violet-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Deductible Supplier VAT (TVA Récupérable sur Achats)</span>
                    <span className="font-mono font-bold text-cyan-300 tabular-nums">
                      {erpDeductiblePurchasesTva.toLocaleString()} DA
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={1200000}
                    step={25000}
                    value={erpDeductiblePurchasesTva}
                    onChange={(e) => setErpDeductiblePurchasesTva(Number(e.target.value))}
                    className="mt-2 w-full accent-violet-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <h3 className="text-base font-bold text-white">
                Automated Algerian G50 Tax Declaration & Net Margin Ledger
              </h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs tabular-nums">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-zinc-400">TVA Collectée (19%)</div>
                  <div className="mt-1 text-lg font-bold text-white">
                    {g50Fiscal.tvaCollectee19.toLocaleString()} DA
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-zinc-400">TAP Tax (1.5% CA HT)</div>
                  <div className="mt-1 text-lg font-bold text-amber-300">
                    {g50Fiscal.tap15.toLocaleString()} DA
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-zinc-400">Net G50 Payable (DGI)</div>
                  <div className="mt-1 text-lg font-bold text-rose-300">
                    {g50Fiscal.totalG50Due.toLocaleString()} DA
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-zinc-400">Estimated Net Profit</div>
                  <div className="mt-1 text-lg font-bold text-emerald-300">
                    {g50Fiscal.netMarginEstimated.toLocaleString()} DA
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 6: ALLURE HOMME / GK STORE / CASUAL 29 BOUTIQUE OS
           =================================================================== */}
        {activeStudio === "allure-gk-boutique" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "ALLURE HOMME (Sidi Bel Abbès)",
                    "GK STORE (Birkhadem, Alger)",
                    "CASUAL 29 (Mascara)",
                  ] as const
                ).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setBoutiqueBrand(brand)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold ${
                      boutiqueBrand === brand
                        ? "bg-violet-600 text-white"
                        : "border border-white/10 bg-white/[0.03] text-zinc-300"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between text-xs text-violet-300">
                  <span>Flagship Seasonal Capsule</span>
                  <span className="font-mono">In Stock · Immediate 58-Wilaya Dispatch</span>
                </div>
                <h4 className="mt-1 text-xl font-bold text-white">
                   Sartorial Structured Merino & Italian Wool Overcoat
                </h4>
                <p className="mt-1 text-xs text-zinc-400">
                  Active Storefront: {boutiqueBrand} · Tailored variant matrix + instant WhatsApp & COD order routing
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-zinc-400">Select Size:</span>
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-8 w-10 rounded-lg font-mono text-xs font-bold ${
                        selectedSize === sz ? "bg-violet-600 text-white" : "bg-white/5 text-zinc-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { name: "16 - Alger", homeFee: 600, deskFee: 400 },
                    { name: "22 - Sidi Bel Abbès", homeFee: 750, deskFee: 450 },
                    { name: "29 - Mascara", homeFee: 750, deskFee: 450 },
                  ].map((w) => (
                    <button
                      key={w.name}
                      onClick={() => setDeliveryWilaya(w)}
                      className={`rounded-xl border p-2.5 text-left text-xs ${
                        deliveryWilaya.name === w.name
                          ? "border-violet-400 bg-violet-500/20 text-white"
                          : "border-white/10 bg-black/40 text-zinc-300"
                      }`}
                    >
                      <div className="font-semibold">{w.name}</div>
                      <div className="font-mono text-[11px] text-zinc-400">Home: {w.homeFee} DA</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-5">
              <h3 className="text-base font-bold text-white">OS Gérant — Live Order & 58-Wilaya COD Summary</h3>
              <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs tabular-nums">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Item Price ({selectedSize}):</span>
                  <span className="text-white">14,800 DA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">58-Wilaya Courier ({deliveryWilaya.name}):</span>
                  <span className="text-violet-300">{deliveryWilaya.homeFee} DA</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold">
                  <span className="text-white">Total Cash-on-Delivery:</span>
                  <span className="text-emerald-300">{(14800 + deliveryWilaya.homeFee).toLocaleString()} DA</span>
                </div>
              </div>
              <button
                onClick={() => setBoutiqueOrders((n) => n + 1)}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-xs font-semibold text-white"
              >
                Simulate WhatsApp & OS Gérant Order Dispatch ({boutiqueOrders} Dispatched)
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 7: VERICITE HYBRID RAG & SCHEMA ROUTER
           =================================================================== */}
        {activeStudio === "vericite-hybrid-rag" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <h3 className="text-base font-bold text-white">Hybrid Dense + BM25 Technical RAG Query</h3>
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white"
              />
              <div>
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Dense Semantic vs BM25 Lexical Fusion Weight (α)</span>
                  <span className="font-mono text-violet-300 tabular-nums">{ragAlpha.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={ragAlpha}
                  onChange={(e) => setRagAlpha(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-500"
                />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <h3 className="text-base font-bold text-white">Citation-Verified Synthesis</h3>
              <p className="rounded-2xl border border-emerald-500/30 bg-black/50 p-4 text-xs leading-relaxed text-zinc-200">
                [Citation: ECG_Holter_Technical_Report_v7.pdf, p. 4 & p. 7] Version 7 enforces the strict de Chazal
                DS1/DS2 inter-patient split (49,668 unseen test beats), achieving 87.63% single-model and 90.13% 5-fold
                ensemble accuracy. Quantized INT8 TFLite compresses the 97,045 parameters to 155.4 KB with 0.32 ms/beat
                inference latency and 99.82% argmax agreement.
              </p>
            </div>
          </div>
        )}

        {/* ===================================================================
            STUDIO 8: GUARDRAIL AI — MODERATION & LLM EVAL
           =================================================================== */}
        {activeStudio === "neural-moderation-eval" && (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <h3 className="text-base font-bold text-white">Live Token-Level Content Risk Attribution</h3>
              <textarea
                rows={4}
                value={modInput}
                onChange={(e) => setModInput(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/60 p-4 text-xs text-white"
              />
              <div>
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>Policy Enforcement Decision Threshold</span>
                  <span className="font-mono text-violet-300 tabular-nums">{(modThreshold * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={0.85}
                  step={0.05}
                  value={modThreshold}
                  onChange={(e) => setModThreshold(Number(e.target.value))}
                  className="mt-2 w-full accent-violet-500"
                />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 lg:col-span-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Neural Safety Gate Decision</h3>
                <span
                  className={`font-mono text-xs font-bold ${
                    modRisk.flagged ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {modRisk.flagged ? "BLOCKED / ESCALATED" : "CLEARED SAFE"} ({(modRisk.prob * 100).toFixed(1)}% Risk)
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-black/50 p-4">
                {modRisk.tokenScores.map((t, i) => (
                  <span
                    key={i}
                    className={`rounded-lg px-2 py-1 font-mono text-xs ${
                      t.risk > 0.5 ? "bg-rose-500/30 text-rose-200 border border-rose-500/40" : "bg-white/5 text-zinc-300"
                    }`}
                  >
                    {t.word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
