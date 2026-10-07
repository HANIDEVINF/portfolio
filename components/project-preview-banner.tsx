"use client"

import type { PortfolioProject } from "@/lib/projects-data"

/**
 * Renders a bespoke, realistic UI mockup banner in the background of each project card
 * (matching the style of live website/application preview banners for all 20 projects).
 */
export function ProjectPreviewBanner({
  project,
  compact = false,
}: {
  project: PortfolioProject
  compact?: boolean
}) {
  const slug = project.slug

  return (
    <div
      className={`relative w-full overflow-hidden border-b border-purple-500/20 select-none ${
        compact ? "h-44" : "h-56 sm:h-60"
      }`}
    >
      {/* Top browser/window chrome bar */}
      <div className="relative z-20 flex items-center justify-between px-3.5 py-2 bg-[#090614]/90 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] text-slate-400 truncate max-w-[180px] sm:max-w-[260px]">
            {project.demo
              ? project.demo.replace(/^https?:\/\//, "")
              : `github.com/HANIDEVINF/${project.slug}`}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-purple-200">
            {project.status || "Live"}
          </span>
        </div>
      </div>

      {/* Project-specific visual UI preview */}
      <div className="relative h-full w-full overflow-hidden">
        {renderProjectScreen(slug)}

        {/* Bottom gradient fade into card body */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d081a] via-[#0d081a]/75 to-transparent z-10" />
      </div>
    </div>
  )
}

function renderProjectScreen(slug: string) {
  switch (slug) {
    // 1. AI ECG Arrhythmia Classification v7
    case "ai-ecg-arrhythmia-classification-v7":
      return (
        <div className="h-full w-full bg-[#070b16] p-4 text-xs font-mono text-emerald-300 relative">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b98122_1px,transparent_1px),linear-gradient(to_bottom,#10b98122_1px,transparent_1px)] bg-[size:16px_16px]" />
          <div className="relative z-10 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[10px] text-emerald-200 font-bold">
                MIT-BIH DS2 INTER-PATIENT
              </span>
              <span className="text-[10px] text-cyan-300">MLII + V1 · 360 Hz</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400">90.13% 5-Fold · 0.32 ms</span>
          </div>
          {/* Simulated ECG Waveform SVG */}
          <div className="relative my-2 rounded-lg border border-emerald-500/25 bg-[#04070f]/90 p-2.5">
            <svg viewBox="0 0 400 70" className="w-full h-14 stroke-emerald-400 fill-none" strokeWidth="2">
              <path d="M 0 40 L 35 40 L 42 32 L 48 40 L 56 40 L 60 46 L 66 8 L 72 62 L 78 36 L 86 26 L 95 40 L 135 40 L 142 32 L 148 40 L 156 40 L 160 46 L 166 6 L 172 64 L 178 36 L 186 25 L 195 40 L 235 40 L 242 30 L 248 42 L 254 12 L 262 65 L 270 22 L 280 40 L 325 40 L 332 32 L 338 40 L 344 46 L 350 9 L 356 60 L 364 35 L 374 28 L 385 40 L 400 40" />
            </svg>
            <div className="mt-1 flex justify-between text-[9px] text-slate-400">
              <span>Beat #208 · R-R: 0.78s</span>
              <span className="text-emerald-300">TFLite INT8: 155.4 KB</span>
              <span className="text-fuchsia-300">P(N)=0.94 · P(V)=0.04</span>
            </div>
          </div>
        </div>
      )

    // 2. MedGuardAI — Real-Time IoT Patient Monitoring
    case "medguard-ai-patient-monitoring":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#07131e] via-[#0b192c] to-[#090d1a] p-4 font-sans text-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white text-xs">MedGuardAI Telemedicine &amp; IoT Hub</span>
            </div>
            <span className="rounded bg-rose-500/20 border border-rose-400/40 px-2 py-0.5 text-[10px] font-mono text-rose-200">
              Raspberry Pi Sensor Live
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/30 p-2.5">
              <div className="text-[10px] text-cyan-300">Heart Rate (ECG)</div>
              <div className="text-lg font-black text-white mt-0.5">78 BPM</div>
              <div className="text-[9px] text-emerald-300">Normal Sinus</div>
            </div>
            <div className="rounded-lg border border-purple-500/30 bg-purple-950/30 p-2.5">
              <div className="text-[10px] text-purple-300">Blood Glucose</div>
              <div className="text-lg font-black text-white mt-0.5">104 mg/dL</div>
              <div className="text-[9px] text-emerald-300">Sensor Calibrated</div>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-2.5">
              <div className="text-[10px] text-emerald-300">WebRTC Consult</div>
              <div className="text-xs font-bold text-white mt-1">Dr. Benali Online</div>
              <div className="text-[9px] text-cyan-200 mt-0.5">Rx Sheet Ready</div>
            </div>
          </div>
        </div>
      )

    // 3. Clinical Medical Note & Triage Assistant
    case "medical-note-assistant":
      return (
        <div className="h-full w-full bg-[#0b1020] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-cyan-300">Clinical SOAP Structuring &amp; Triage AI</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-mono">
              HIPAA / Guardrail Active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/10 bg-black/40 p-2.5">
              <div className="text-[10px] font-mono text-purple-300 mb-1">S / O — Clinical Findings</div>
              <p className="text-[10px] text-slate-300 leading-snug">
                dyspnea on exertion, BP 145/92 mmHg, SpO2 96%, bilateral basal crackles.
              </p>
            </div>
            <div className="rounded-lg border border-cyan-500/25 bg-cyan-950/20 p-2.5">
              <div className="text-[10px] font-mono text-cyan-300 mb-1">A / P — Structured Plan</div>
              <p className="text-[10px] text-slate-200 leading-snug">
                • 12-Lead ECG + Troponin stat{"\n"}• Cardiology consult priority #1
              </p>
            </div>
          </div>
        </div>
      )

    // 4. MuCAT — Multilingual Uncertainty-Calibrated Attention Transformer
    case "mucat-multilingual-transformer":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#120826] via-[#0d0a1f] to-[#06121c] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-purple-200 font-mono text-[11px]">
              MuCAT · mDeBERTa-v3 + HAP + FiLM + Dirichlet EDL
            </span>
            <span className="rounded bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
              98.20% Test Acc
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {[
              ["ar · المريض", "bg-emerald-500/25 border-emerald-400/40 text-emerald-200"],
              ["arq · دزاير", "bg-teal-500/25 border-teal-400/40 text-teal-200"],
              ["kab · Taqbaylit", "bg-amber-500/25 border-amber-400/40 text-amber-200"],
              ["shy · Tacawit", "bg-orange-500/25 border-orange-400/40 text-orange-200"],
              ["fr · Diagnostic", "bg-cyan-500/25 border-cyan-400/40 text-cyan-200"],
              ["en · Evidence", "bg-purple-500/25 border-purple-400/40 text-purple-200"],
            ].map(([label, cls]) => (
              <span key={label} className={`rounded-md border px-2 py-0.5 text-[10px] font-mono ${cls}`}>
                {label}
              </span>
            ))}
          </div>
          <div className="rounded-lg border border-purple-500/25 bg-black/50 p-2 flex items-center justify-between font-mono text-[10px]">
            <span className="text-slate-300">XLM-R: 3.88% | Ablation: 23.74%</span>
            <span className="text-cyan-300 font-bold">MuCAT: 98.20% (u = K/S = 0.08)</span>
          </div>
        </div>
      )

    // 5. VoxScribe AI — Speech-to-Text, Diarization & SOAP Summarizer
    case "keras-voice-recognition-lab":
      return (
        <div className="h-full w-full bg-[#0b091a] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">VoxScribe AI · Live ASR &amp; 16×32 FFT DSP</span>
            <span className="rounded bg-fuchsia-500/20 border border-fuchsia-400/40 px-2 py-0.5 text-[10px] font-mono text-fuchsia-200">
              EN · FR · AR Mic
            </span>
          </div>
          {/* Spectrogram Bars */}
          <div className="flex items-end gap-1 h-12 rounded-lg border border-purple-500/20 bg-black/50 p-2 mb-2">
            {[35, 65, 90, 50, 80, 95, 60, 40, 75, 88, 55, 45, 85, 92, 62, 48, 77, 68, 42, 80, 58, 36, 72, 90].map(
              (h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-gradient-to-t from-purple-600 via-fuchsia-500 to-cyan-400"
                />
              )
            )}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-300">
            <span>[Speaker 1 - Physician]: Tachycardie 138 bpm</span>
            <span className="text-emerald-300">SOAP Note Ready</span>
          </div>
        </div>
      )

    // 6. Keras Content Moderation & Token Attribution
    case "keras-content-moderation-system":
      return (
        <div className="h-full w-full bg-[#11091c] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">Keras NLP Safety &amp; Token Attribution</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
              99.1% UCI Test Acc
            </span>
          </div>
          <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-2.5 mb-2">
            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-rose-500/40 text-white">URGENT:</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300">Verify</span>
              <span className="px-1.5 py-0.5 rounded bg-rose-500/40 text-white">bank-token</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200">immediately</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-rose-300">Risk Score: 0.942 (BLOCKED)</span>
            <span className="text-slate-400">Threshold τ = 0.65</span>
          </div>
        </div>
      )

    // 7. EmbedCluster 64D — Neural Document Clustering Lab
    case "keras-document-clustering-lab":
      return (
        <div className="h-full w-full bg-[#090d1c] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">EmbedCluster 64D · 20 Newsgroups Projection</span>
            <span className="font-mono text-[10px] text-cyan-300">Cosine Matrix</span>
          </div>
          <div className="relative h-20 rounded-lg border border-cyan-500/20 bg-black/50 p-2 overflow-hidden">
            {[
              ["left-6 top-3", "bg-cyan-400"],
              ["left-10 top-6", "bg-cyan-400"],
              ["left-14 top-4", "bg-cyan-400"],
              ["left-36 top-10", "bg-purple-400"],
              ["left-40 top-12", "bg-purple-400"],
              ["left-44 top-8", "bg-purple-400"],
              ["right-12 top-4", "bg-emerald-400"],
              ["right-16 top-7", "bg-emerald-400"],
              ["right-8 top-9", "bg-emerald-400"],
            ].map(([pos, color], idx) => (
              <span key={idx} className={`absolute h-2.5 w-2.5 rounded-full ${pos} ${color} shadow`} />
            ))}
            <div className="absolute bottom-1.5 left-2.5 right-2.5 flex justify-between text-[9px] font-mono text-slate-400">
              <span className="text-cyan-300">● sci.med (0.91)</span>
              <span className="text-purple-300">● comp.graphics (0.88)</span>
              <span className="text-emerald-300">● sci.space (0.93)</span>
            </div>
          </div>
        </div>
      )

    // 8. VeriCite Hybrid Document QA RAG Studio
    case "document-qa-rag":
      return (
        <div className="h-full w-full bg-[#08101d] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">VeriCite Hybrid RAG · Dense + BM25 RRF</span>
            <span className="rounded bg-cyan-500/20 border border-cyan-400/40 px-2 py-0.5 text-[10px] font-mono text-cyan-200">
              α = 0.65 Fusion
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/50 p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-emerald-300">[Chunk #1 · RRF 0.94] Clinical Protocol v4.2</span>
              <span className="text-purple-300">Grounded ✓</span>
            </div>
            <p className="text-[10px] text-slate-300 truncate">
              &ldquo;Patients with QTc &gt; 500ms require immediate telemetry monitoring and potassium check...&rdquo;
            </p>
          </div>
        </div>
      )

    // 9. SchemaRoute AI — Universal Document & JSON Extractor
    case "keras-universal-data-extractor":
    case "financial-document-extractor":
      return (
        <div className="h-full w-full bg-[#0c0a1c] p-4 text-xs font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-purple-200">SchemaRoute AI · 9-Class Neural JSON Router</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">OOD Gate PASS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded border border-white/10 bg-black/40 p-2 text-slate-300">
              INV-2026-089{"\n"}SARL Alger Tech{"\n"}TVA 19%: 28,500 DA
            </div>
            <div className="rounded border border-purple-500/30 bg-purple-950/30 p-2 text-cyan-200">
              {`{"schema":"invoice","total_dzd":178500,"valid":true}`}
            </div>
          </div>
        </div>
      )

    // 10. ResolveAI Multi-Agent Support Orchestrator
    case "resolveai-multi-agent-support-bot":
      return (
        <div className="h-full w-full bg-[#0d091b] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">ResolveAI · 4-Agent ReAct Orchestrator</span>
            <span className="rounded bg-purple-500/20 border border-purple-400/40 px-2 py-0.5 font-mono text-[10px] text-purple-200">
              SLA Audit Active
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px] mb-2">
            <div className="rounded border border-emerald-500/40 bg-emerald-950/30 p-1.5 text-emerald-200">1. Triage</div>
            <div className="rounded border border-cyan-500/40 bg-cyan-950/30 p-1.5 text-cyan-200">2. Billing</div>
            <div className="rounded border border-purple-500/40 bg-purple-950/30 p-1.5 text-purple-200">3. Tech SRE</div>
            <div className="rounded border border-fuchsia-500/40 bg-fuchsia-950/30 p-1.5 text-fuchsia-200">4. Retain</div>
          </div>
          <div className="rounded bg-black/50 border border-white/10 px-2.5 py-1.5 font-mono text-[10px] text-slate-300 truncate">
            ToolCall → issue_refund_credit(invoice_id=&quot;INV-8841&quot;, policy_Verified=true)
          </div>
        </div>
      )

    // 11. LLM Evaluation & Safety Gate Framework
    case "llm-evaluation-framework":
      return (
        <div className="h-full w-full bg-[#090d1a] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">EvalGate MLOps · LLM Regression &amp; Pareto Bench</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
              RELEASE GATE: PASS
            </span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex items-center justify-between rounded bg-black/40 border border-white/10 px-2.5 py-1">
              <span className="text-slate-300">Faithfulness &amp; Grounding</span>
              <span className="text-emerald-300 font-bold">96.4%</span>
            </div>
            <div className="flex items-center justify-between rounded bg-black/40 border border-white/10 px-2.5 py-1">
              <span className="text-slate-300">Zero-Injection Safety Gate</span>
              <span className="text-cyan-300 font-bold">99.2%</span>
            </div>
          </div>
        </div>
      )

    // 12. OpsPilot SRE Incident Copilot
    case "opspilot-ai-incident-copilot":
      return (
        <div className="h-full w-full bg-[#0b0c18] p-4 text-xs font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">OpsPilot SRE · Human-in-the-Loop Incident Console</span>
            <span className="rounded bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 text-[10px] text-amber-200">
              P99 Latency Alert
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/50 p-2.5 space-y-1 text-[10px]">
            <div className="text-rose-300">● api-gateway → p99 rose 42ms → 310ms (v2.8.4)</div>
            <div className="text-emerald-300">✓ Action Approved: Rollback to v2.8.3 + INT8 KV-Cache</div>
          </div>
        </div>
      )

    // 13. CodeRefactor Neural AST Security & Complexity Workbench
    case "coderefactor-ai":
      return (
        <div className="h-full w-full bg-[#0a0c18] p-4 text-xs font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">CodeRefactor AST · OWASP &amp; ML Leakage Audit</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">v(G): 14 → 3</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded border border-rose-500/30 bg-rose-950/20 p-2 text-rose-200">
              - scaler.fit_transform(X){"\n"}- SELECT * FROM users + id
            </div>
            <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-2 text-emerald-200">
              + scaler.fit(X_train){"\n"}+ db.query(&quot;... WHERE id=$1&quot;)
            </div>
          </div>
        </div>
      )

    // 14. VisionTensor Lab — CIFAR-10 Neural Classifier & Fall Detection
    case "keras-vision-classifier":
    case "real-time-object-detection":
      return (
        <div className="h-full w-full bg-[#0a0f1f] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">
              {slug === "keras-vision-classifier"
                ? "VisionTensor Lab · 32×32×3 Keras CNN"
                : "Real-Time Posture & Fall Detection YOLO Pipeline"}
            </span>
            <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
              30 FPS Tensor
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="col-span-1 h-16 rounded-lg border-2 border-dashed border-emerald-400/70 bg-emerald-950/20 flex flex-col items-center justify-center p-1">
              <span className="font-mono text-[9px] text-emerald-300">BBox [0.96]</span>
              <span className="font-bold text-[10px] text-white mt-0.5">Target Locked</span>
            </div>
            <div className="col-span-2 space-y-1.5 font-mono text-[10px]">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-[94%]" />
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Top-1 Confidence: 94.2%</span>
                <span className="text-emerald-300">In-Browser Weights</span>
              </div>
            </div>
          </div>
        </div>
      )

    // 15. Tadjmeel Clinica — Medical Aesthetic Platform & Desktop Suite
    case "tadjmeel-clinica-suite":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#1f1224] via-[#150d1c] to-[#0d0914] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-amber-300 font-semibold block">
                CLINICA TADJMEEL · ALGIERS
              </span>
              <span className="font-bold text-white text-sm">Splendor X · HydraFacial · Desktop OS</span>
            </div>
            <span className="rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-[10px] text-amber-200">
              Web + 2 Electron Apps
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded-lg border border-amber-500/25 bg-black/40 p-2">
              <div className="text-amber-300 font-semibold">Patient Portal</div>
              <div className="text-slate-300 mt-0.5">Online Booking</div>
            </div>
            <div className="rounded-lg border border-purple-500/25 bg-black/40 p-2">
              <div className="text-purple-300 font-semibold">Doctor Station</div>
              <div className="text-slate-300 mt-0.5">Live Queue &amp; Rx</div>
            </div>
            <div className="rounded-lg border border-cyan-500/25 bg-black/40 p-2">
              <div className="text-cyan-300 font-semibold">Reception OS</div>
              <div className="text-slate-300 mt-0.5">Check-in &amp; Billing</div>
            </div>
          </div>
        </div>
      )

    // 16. Enterprise DZD Business ERP, POS & G50 Fiscal Suite
    case "algerian-erp-pos-suite":
      return (
        <div className="h-full w-full bg-[#09121e] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">Enterprise DZD ERP · POS &amp; G50 Fiscal Ledger</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
              4 RBAC Portals
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
            <div className="rounded-lg border border-white/10 bg-black/40 p-2">
              <div className="text-slate-400">CA Mensuel HT</div>
              <div className="text-emerald-300 font-bold text-xs mt-0.5">2,450,000 DA</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/40 p-2">
              <div className="text-slate-400">TVA 19% + TAP</div>
              <div className="text-cyan-300 font-bold text-xs mt-0.5">G50 Ready</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/40 p-2">
              <div className="text-slate-400">Expéditions</div>
              <div className="text-purple-300 font-bold text-xs mt-0.5">58 Wilayas</div>
            </div>
          </div>
        </div>
      )

    // 17. ALLURE HOMME (Sidi Bel Abbès) — Storefront & Manager OS
    case "menswear-boutique-os-suite":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#17120e] via-[#120e18] to-[#0a0810] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-semibold block">
                ALLURE HOMME · SIDI BEL ABBÈS
              </span>
              <span className="font-bold text-white text-sm">Luxury Menswear &amp; OS Gérant</span>
            </div>
            <span className="rounded bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 font-mono text-[10px] text-amber-200">
              Wilaya 22 + 58 COD
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded-lg border border-amber-500/25 bg-black/50 p-2">
              <div className="text-amber-300 font-semibold">Costume &amp; Tailoring</div>
              <div className="text-slate-300 mt-0.5">18,500 DA · Sizes S–XXL</div>
            </div>
            <div className="rounded-lg border border-emerald-500/25 bg-black/50 p-2">
              <div className="text-emerald-300 font-semibold">WhatsApp Checkout</div>
              <div className="text-slate-300 mt-0.5">58-Wilaya Tariff</div>
            </div>
            <div className="rounded-lg border border-purple-500/25 bg-black/50 p-2">
              <div className="text-purple-300 font-semibold">Manager Dashboard</div>
              <div className="text-slate-300 mt-0.5">Live Stock Control</div>
            </div>
          </div>
        </div>
      )

    // 18. GK STORE (Birkhadem, Algiers) — Storefront & Manager OS
    case "gkstore-algiers-menswear":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#0e1624] via-[#0c101d] to-[#080a12] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-cyan-300 font-semibold block">
                GK STORE · BIRKHADEM, ALGIERS
              </span>
              <span className="font-bold text-white text-sm">Streetwear, Footwear &amp; Manager OS</span>
            </div>
            <span className="rounded bg-cyan-500/20 border border-cyan-400/40 px-2 py-0.5 font-mono text-[10px] text-cyan-200">
              Algiers Flagship
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded-lg border border-cyan-500/25 bg-black/50 p-2">
              <div className="text-cyan-300 font-semibold">New Drop Catalog</div>
              <div className="text-slate-300 mt-0.5">Color &amp; Size Matrix</div>
            </div>
            <div className="rounded-lg border border-emerald-500/25 bg-black/50 p-2">
              <div className="text-emerald-300 font-semibold">Direct COD Order</div>
              <div className="text-slate-300 mt-0.5">Home / Stop-Desk DA</div>
            </div>
            <div className="rounded-lg border border-purple-500/25 bg-black/50 p-2">
              <div className="text-purple-300 font-semibold">OS Gérant</div>
              <div className="text-slate-300 mt-0.5">Daily Revenue &amp; SKU</div>
            </div>
          </div>
        </div>
      )

    // 19. CASUAL 29 (Mascara) — Menswear Storefront & Inventory OS
    case "casual29-mascara-menswear":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#0f1d18] via-[#0b1318] to-[#080a12] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-emerald-300 font-semibold block">
                CASUAL 29 · MASCARA (WILAYA 29)
              </span>
              <span className="font-bold text-white text-sm">Menswear Storefront &amp; Stock OS</span>
            </div>
            <span className="rounded bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 font-mono text-[10px] text-emerald-200">
              Wilaya 29 Live
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="rounded-lg border border-emerald-500/25 bg-black/50 p-2">
              <div className="text-emerald-300 font-semibold">Variant Inventory</div>
              <div className="text-slate-300 mt-0.5">Auto Low-Stock Alert</div>
            </div>
            <div className="rounded-lg border border-cyan-500/25 bg-black/50 p-2">
              <div className="text-cyan-300 font-semibold">58-Wilaya Shipping</div>
              <div className="text-slate-300 mt-0.5">Instant Tariff Calc</div>
            </div>
            <div className="rounded-lg border border-purple-500/25 bg-black/50 p-2">
              <div className="text-purple-300 font-semibold">Shop Floor Sync</div>
              <div className="text-slate-300 mt-0.5">Online + In-Store</div>
            </div>
          </div>
        </div>
      )

    // 20. AURA — Multi-Industry Luxury Commerce & Retail OS
    case "aura-luxury-commerce-os":
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#1d1028] via-[#120b1d] to-[#090710] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] tracking-[0.18em] uppercase text-fuchsia-300 font-semibold block">
                AURA MULTI-VERTICAL RETAIL OS
              </span>
              <span className="font-bold text-white text-sm">5 Client Verticals + PDF Financial Reports</span>
            </div>
            <span className="rounded bg-fuchsia-500/20 border border-fuchsia-400/40 px-2 py-0.5 font-mono text-[10px] text-fuchsia-200">
              5 Retail Verticals
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
            {["1. Eyewear", "2. Apparel", "3. Gourmet Food", "4. Electronics", "5. Mobile Tech", "PDF Ledger"].map(
              (v) => (
                <span key={v} className="rounded border border-purple-500/30 bg-black/50 px-2 py-1 text-slate-200">
                  {v}
                </span>
              )
            )}
          </div>
        </div>
      )

    // 21. Aurelia Vector Affinity AI Commerce
    case "aurelia-market-ai-commerce":
    default:
      return (
        <div className="h-full w-full bg-gradient-to-br from-[#161026] via-[#0e0a1a] to-[#090712] p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">Aurelia AI · 4D Vector Cosine Recommendation Engine</span>
            <span className="rounded bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 font-mono text-[10px] text-purple-200">
              Cosine Re-Ranking
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
            <div className="rounded-lg border border-purple-500/25 bg-black/40 p-2">
              <div className="text-purple-300 font-semibold">User Vector u⃗</div>
              <div className="text-slate-300 mt-0.5">[0.88, 0.42, 0.91, 0.65]</div>
            </div>
            <div className="rounded-lg border border-emerald-500/25 bg-black/40 p-2">
              <div className="text-emerald-300 font-semibold">Match Score</div>
              <div className="text-slate-300 mt-0.5">cos(θ) = 0.974 (#1)</div>
            </div>
            <div className="rounded-lg border border-cyan-500/25 bg-black/40 p-2">
              <div className="text-cyan-300 font-semibold">Smart Bundle</div>
              <div className="text-slate-300 mt-0.5">Live Cart Telemetry</div>
            </div>
          </div>
        </div>
      )
  }
}
