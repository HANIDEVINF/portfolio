"use client"

import { use } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

const posts: Record<string, {
  title: string
  date: string
  readTime: string
  content: string
  tags: string[]
}> = {
  "ai-ecg-arrhythmia-classification-mit-bih": {
    title: "AI ECG Arrhythmia Classification on MIT-BIH (v7): Inter-Patient Rigor & Embedded TFLite",
    date: "2026-10-05",
    readTime: "12 min read",
    tags: ["Healthcare AI", "MIT-BIH", "Transformers", "TFLite", "PyTorch"],
    content: `
# AI ECG Arrhythmia Classification on MIT-BIH (v7)

## 1. Why the Evaluation Protocol Must Come First
On the MIT-BIH benchmark, studies reporting 98–99% accuracy often measure fundamentally different tasks. In **intra-patient** evaluation, heartbeats from the same patient appear in both training and test sets, allowing models to memorize patient-specific QRS morphologies.

In contrast, our **v7 pipeline** enforces strict **inter-patient separation (DS1/DS2 split)** where no test patient ever appears during training.

## 2. Key Architecture: 1D-CNN + Transformer Attention + RR Fusion
- **Two ECG Leads**: MLII + second available lead, band-pass filtered (0.5–45 Hz) and z-score normalized per beat (200 samples).
- **8 Standardized RR Features**: Capturing local rhythm context, prematurity ratios (RR_prev / RR_local), and compensatory pause ratios (RR_next / RR_local).
- **Morphological Extraction**: 3 Conv1D layers followed by 2 Multi-Head Transformer attention blocks (4 heads, FFN 128) and Global Average Pooling (64 features).
- **Dual-Branch Fusion**: Concatenating morphology (64-dim) with encoded rhythm features (16-dim) → Dense(64) → 5 AAMI classes (N, S, V, F, Q).

## 3. Results & Why 94.56% Is Not the Headline Metric
- **Raw Single Model on DS2 (49,668 beats)**: 87.63% accuracy, 0.5172 macro-F1 (N/S/V/F).
- **5-Fold Ensemble on DS2**: 90.13% accuracy, 0.5290 macro-F1.
- **Logit Adjustment (τ = 1.5)**: Yields 94.56% accuracy, but drops Supraventricular (S) sensitivity to 1.03% and Fusion (F) to 0%. In medical AI, high accuracy driven exclusively by the dominant normal class (N) masks failure on critical arrhythmias.

## 4. Embedded Deployment Validation
- **Model Size**: 97,045 parameters (96,725 trainable) → 155.4 KB INT8 TFLite.
- **Inference Speed**: 0.32 ms / beat on CPU.
- **Argmax Fidelity**: 99.82% agreement between Keras float32 and TFLite on 5,000 sampled DS2 beats.
    `,
  },
  "getting-started-with-ai-engineering": {
    title: "Getting Started with AI Engineering in 2026-2027",
    date: "2026-09-15",
    readTime: "8 min read",
    tags: ["AI Engineering", "Roadmap", "PyTorch", "LLMs"],
    content: `
# Getting Started with AI Engineering

AI Engineering combines software engineering rigor with deep learning, LLMs, and systems design to build production-ready intelligent software.

## 1. Core Production Pillars
- **Machine Learning & Deep Learning**: PyTorch, custom loss functions (Focal Loss), group cross-validation, and probability calibration.
- **Transformers & NLP**: Self-attention, BERT/encoder models, multilingual tokenization, and fine-tuning (LoRA/QLoRA).
- **RAG & Agentic Workflows**: Hybrid retrieval, reranking, tool calling, and ReAct loops with explicit guardrails.

## 2. Engineering & Deployment
- **Full-Stack Delivery**: Exposing models via high-throughput APIs and interactive Next.js and TypeScript interfaces.
- **Edge & Embedded**: Quantizing models to INT8 TFLite/ONNX and verifying post-quantization argmax agreement.
    `,
  },
  "building-intelligent-apps-with-langchain": {
    title: "Building Intelligent Multi-Agent Systems & Tool Calling",
    date: "2026-08-10",
    readTime: "10 min read",
    tags: ["AI Agents", "ReAct", "Tool Calling", "Agentic AI"],
    content: `
# Building Intelligent Multi-Agent Systems & Tool Calling

Modern AI applications require more than single-turn prompt responses. Production agentic systems combine specialized sub-agents, structured tool schemas, and deterministic guardrails.

## Core Design Principles
1. **Explicit Routing & Triage**: Route user requests to specialized domain agents (e.g., billing, technical debugging, incident response).
2. **Structured Outputs & Tool Contracts**: Validate every tool call against strict JSON schemas before execution.
3. **Observability & Audit Trails**: Log every reasoning step, tool invocation, latency metric, and fallback decision.
    `,
  },
  "medguard-ai-realtime-iot-streaming": {
    title: "Real-Time Medical IoT Sensor Streaming & Anomaly Detection (MedGuardAI)",
    date: "2026-07-05",
    readTime: "9 min read",
    tags: ["Healthcare AI", "Medical IoT", "WebRTC", "Telemetry"],
    content: `
# Real-Time Medical IoT Sensor Streaming & Anomaly Detection (MedGuardAI)

In healthcare IoT applications like **MedGuardAI**, clinical dashboards must render continuous physiological streams (ECG waveforms and blood glucose readings) without frame drops while coordinating instant emergency alerts.

## Architecture Highlights
1. **Sensor-to-Cloud Pipeline**: Physical ECG and glucose sensors connected via Raspberry Pi stream telemetry to a real-time backend and MongoDB store.
2. **Real-Time Anomaly Detection**: AI models evaluate incoming windows and trigger immediate notifications and emergency workflows when abnormal rhythms or glucose spikes occur.
3. **Integrated Telemedicine**: Built-in WebRTC video consultations, private/group clinical chat, appointment scheduling, and automated medication records.
    `,
  },
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const post = posts[resolvedParams.slug] || posts["ai-ecg-arrhythmia-classification-mit-bih"]

  return (
    <main className="min-h-screen bg-[#07050d] text-white">
      <Navigation />
      
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-purple-400 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-purple-950/60 text-purple-300 rounded-full border border-purple-500/20 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert prose-purple max-w-none">
              <div className="text-slate-300 leading-relaxed space-y-6 whitespace-pre-line text-base sm:text-lg font-light">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
