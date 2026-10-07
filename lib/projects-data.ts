export type CaseStudySection = {
  heading: string
  body: string
  bullets?: string[]
}

export type ProjectCategory =
  | "Freelance & Client Systems"
  | "Healthcare AI"
  | "NLP & Speech AI"
  | "RAG & Information Extraction"
  | "Agentic AI & MLOps"
  | "Computer Vision"

export const PROJECT_CATEGORIES: readonly ("All" | ProjectCategory)[] = [
  "All",
  "Healthcare AI",
  "NLP & Speech AI",
  "RAG & Information Extraction",
  "Agentic AI & MLOps",
  "Computer Vision",
  "Freelance & Client Systems",
] as const

export type PortfolioProject = {
  slug: string
  title: string
  description: string
  technologies: string[]
  github: string
  githubReady?: boolean
  demo?: string
  caseStudyUrl?: string
  category: ProjectCategory
  featured?: boolean
  status?: "Live" | "Research" | "PFE Distinction" | "Client Production"
  metrics?: string[]
  impact?: string
  architecture?: string[]
  caseStudy?: {
    subtitle: string
    datasetOrScope: string
    keyFindings: string[]
    sections: CaseStudySection[]
  }
}

export const portfolioProjects: PortfolioProject[] = [
  // ==========================================================================
  // 1. HEALTHCARE AI
  // ==========================================================================
  {
    slug: "ai-ecg-arrhythmia-classification-v7",
    title: "AI ECG Arrhythmia Classification (v7)",
    description:
      "Embedded-ready AI ECG Holter system combining 1D-CNN, 2 Multi-Head Transformer attention blocks, and 8 standardized RR features. Evaluated on the strict DS1/DS2 inter-patient MIT-BIH benchmark with zero patient leakage.",
    technologies: ["PyTorch", "TensorFlow/Keras", "Transformer Attention", "1D CNN", "TFLite INT8", "PhysioNet MIT-BIH"],
    github: "https://github.com/HANIDEVINF/deep-learning-model-for-anomaly-detection-of-ECG",
    githubReady: true,
    demo: "/lab/ecg-holter-v7",
    caseStudyUrl: "/blog/ai-ecg-arrhythmia-classification-mit-bih",
    category: "Healthcare AI",
    featured: true,
    status: "Research",
    metrics: [
      "87.63% raw / 90.13% 5-fold ensemble",
      "97,045 params (155.4 KB INT8)",
      "0.32 ms/beat TFLite latency",
    ],
    impact:
      "Strict inter-patient DS1/DS2 split (49,668 held-out test beats), 5-fold StratifiedGroupKFold by patient, focal loss (γ=2), DS1-only OOF logit calibration, and 99.82% Keras-to-TFLite argmax agreement.",
    architecture: [
      "Input A: Dual-lead ECG (200 × 2) → 0.5–45 Hz zero-phase Butterworth + per-beat z-score",
      "Morphology Branch: Conv1D(32, k=7) → Conv1D(64, k=5) → Conv1D(64, k=3) → 2× Transformer (4 heads, FFN 128) → GlobalAvgPool(64)",
      "Input B: 8 DS1-standardized RR interval & ratio features → Dense(32) → Dense(16)",
      "Fusion Head: Concatenate(64 + 16 = 80) → Dense(64) + Dropout(0.3) → Softmax (5 AAMI classes: N, S, V, F, Q)",
    ],
    caseStudy: {
      subtitle: "Version 7 Technical Report — Inter-Patient Protocol, Architecture & TFLite Deployment",
      datasetOrScope: "MIT-BIH Arrhythmia Database · DS1 (50,977 train beats, 22 patients) / DS2 (49,668 test beats, 22 unseen patients)",
      keyFindings: [
        "Single raw model achieves 87.63% accuracy and 0.5172 macro-F1 (N/S/V/F) on unseen DS2 patients",
        "5-fold patient-grouped ensemble reaches 90.13% accuracy and 0.5290 macro-F1",
        "Out-of-fold prior calibration (τ = 1.5) reaches 94.56% accuracy, explicitly analyzed as a class-N-dominated operating point rather than inflated headline accuracy",
        "INT8 TFLite quantization compresses model to 155.4 KB with 0.32 ms/beat inference and 99.82% argmax fidelity",
      ],
      sections: [
        {
          heading: "Why Protocol Comes First (Inter-Patient vs Intra-Patient)",
          body: "Many MIT-BIH papers report 98–99% accuracy using intra-patient splits where beats from the same patient appear in both train and test sets. Version 7 enforces the strict de Chazal DS1/DS2 inter-patient split so no test patient is ever seen during training or hyperparameter selection.",
        },
        {
          heading: "Cleaned 8-Feature RR Context",
          body: "Non-beat markers (rhythm change, signal quality, noise annotations) are filtered prior to RR computation so intervals are never corrupted. Eight temporal features (previous/next RR, ±5 local mean, prematurity ratio, compensatory pause ratio, median-normalized intervals) are standardized using DS1 statistics only.",
        },
        {
          heading: "Deployment & Hardware Verification",
          body: "Exported from Keras (379.08 KB float32) to dynamic-range TFLite (146.0 KB) and INT8 TFLite (155.4 KB). Verified across 5,000 DS2 beats with 99.82% argmax decision agreement.",
        },
      ],
    },
  },
  {
    slug: "medguard-ai-patient-monitoring",
    title: "MedGuardAI — Real-Time IoT Patient Monitoring",
    description:
      "End-to-end medical IoT and AI platform connected in real time to physical ECG and blood glucose sensors. Includes AI anomaly detection, emergency alerts, WebRTC doctor-patient consultations, and automated medication sheets.",
    technologies: ["Medical IoT", "Real-Time Telemetry", "MongoDB", "WebRTC", "Raspberry Pi", "Anomaly Detection"],
    github: "https://github.com/HANIDEVINF/MED-Guard-AI.",
    githubReady: true,
    demo: "/lab/ecg-holter-v7",
    caseStudyUrl: "/blog/medguard-ai-realtime-iot-streaming",
    category: "Healthcare AI",
    featured: true,
    status: "PFE Distinction",
    metrics: ["Real-time ECG & Glucose", "Emergency alert workflows", "WebRTC + Chat + Booking"],
    impact:
      "Licence Graduation Capstone (PFE USTHB). Connects physical medical sensors & Raspberry Pi to a real-time backend, MongoDB, and cross-platform clinical dashboards.",
    architecture: [
      "Edge Layer: Physical ECG & Blood Glucose sensors → Raspberry Pi acquisition & stream relay",
      "Backend & AI Service: Real-time REST & WebSocket telemetry pipeline + AI anomaly detection model",
      "Clinical Workflows: Automated emergency notifications, 1-on-1 & group medical chat, online/in-person appointment scheduling, auto-generated medication records",
      "Client Layer: Cross-platform mobile & web dashboards with live waveform rendering & WebRTC video calls",
    ],
    caseStudy: {
      subtitle: "PFE Licence Capstone — End-to-End Medical IoT, Real-Time AI & Telemedicine Platform",
      datasetOrScope: "Full-Stack Hardware + Software System · Medical Sensors, MongoDB, WebRTC, Raspberry Pi",
      keyFindings: [
        "Real-time streaming from physical ECG and glucose sensors to patient and physician interfaces",
        "Automated AI anomaly detection triggering multi-tier emergency alerts when vitals cross clinical thresholds",
        "Integrated telemedicine suite: private/group chat, WebRTC consultations, appointment booking, and digital prescription sheets",
      ],
      sections: [
        {
          heading: "Bridging Physical Sensors & AI Models",
          body: "Unlike isolated notebook prototypes, MedGuardAI was engineered as a complete clinical system where hardware telemetry flows continuously into live physician and patient dashboards.",
        },
        {
          heading: "Patient-Doctor Communication & Emergency Response",
          body: "When abnormal ECG or glucose readings are detected, the system dispatches instant alerts to assigned physicians and unlocks immediate communication channels and automated medication sheets.",
        },
      ],
    },
  },
  {
    slug: "medical-note-assistant",
    title: "Clinical Medical Note & Triage Assistant",
    description:
      "Domain-focused clinical assistant for medical note structuring, SOAP synthesis, and clinical Q&A with safety-minded response guardrails.",
    technologies: ["Medical NLP", "SOAP Structuring", "Clinical RAG", "Safety Guardrails"],
    github: "https://github.com/HANIDEVINF/medical-note-assistant",
    githubReady: true,
    demo: "/lab/voxscribe-speech-ai",
    category: "Healthcare AI",
    status: "Live",
    metrics: ["Clinical SOAP structuring", "Biomedical entity tagging", "Safety guardrails"],
  },

  // ==========================================================================
  // 2. FREELANCE & CLIENT SYSTEMS
  // ==========================================================================
  {
    slug: "tadjmeel-clinica-suite",
    title: "Tadjmeel Clinica — Medical Aesthetic Platform & Desktop Suite",
    description:
      "Commercial production system built for Tadjmeel Clinica in Algiers (Splendor X laser, HydraFacial, LifU LinearZ). Includes the public clinic website plus dedicated Electron/web workspaces for Physicians and Receptionists.",
    technologies: ["React", "TypeScript", "Electron", "Node.js", "Multi-Role Portals", "Healthcare CRM"],
    github: "https://github.com/HANIDEVINF/clinicatajmeel",
    githubReady: true,
    demo: "https://hanidevinf.github.io/clinicatajmeel/",
    category: "Freelance & Client Systems",
    featured: true,
    status: "Client Production",
    metrics: ["Patient & Doctor portals", "Desktop Electron apps", "Algiers clinic deployment"],
    impact:
      "Real-world commercial delivery for an aesthetic medicine clinic in Algiers, unifying patient booking, receptionist intake, and doctor treatment queues.",
    architecture: [
      "Public Clinic Experience: High-conversion showcase for Splendor X, HydraFacial, and medical aesthetic treatments in Algiers",
      "Doctor Workspace (doctor.html + Electron): Real-time patient queue, treatment notes, and session tracking",
      "Receptionist Workspace (worker.html + Electron): Patient check-in, scheduling, billing, and clinic flow coordination",
      "Backend Server: Local & network synchronization connecting reception and medical consultation rooms",
    ],
    caseStudy: {
      subtitle: "Full-Stack Clinic Website + Desktop Electron Applications for Doctors & Receptionists",
      datasetOrScope: "Commercial Client Project · Tadjmeel Clinica (Algiers, Algeria)",
      keyFindings: [
        "Delivered 3 synchronized interfaces: Public Clinic Website, Doctor Desktop App, and Receptionist Desktop App",
        "Packaged with one-click Windows/Electron launchers for clinic staff (Doctor & Receptionist stations)",
        "Streamlined patient intake and treatment room handoffs",
      ],
      sections: [
        {
          heading: "Multi-Surface Clinic Operations",
          body: "Designed specifically for clinical operations in Algiers: patients explore treatments online while clinic staff manage walk-ins, consultations, and medical records on dedicated desktop terminals.",
        },
      ],
    },
  },
  {
    slug: "algerian-erp-pos-suite",
    title: "Enterprise DZD Business ERP, POS & G50 Fiscal Suite",
    description:
      "Multi-role Algerian enterprise management system in DZD (DA) with dedicated interfaces for Gérant (Manager), Caissier (POS), Magasinier (Inventory), and Comptable (G50 Fiscal Audit Ledger), plus 58-wilaya carrier tracking.",
    technologies: ["TypeScript", "React", "Node.js", "RBAC Auth", "POS & Inventory", "G50 Fiscal Ledger"],
    github: "https://github.com/HANIDEVINF/ecom-dashboard",
    githubReady: true,
    demo: "https://hanidevinf.github.io/ecom-dashboard/",
    category: "Freelance & Client Systems",
    featured: true,
    status: "Client Production",
    metrics: ["4 RBAC role interfaces", "G50 fiscal audit ledger", "58-wilaya logistics"],
    impact:
      "Built for Algerian business owners to manage sales, cashier POS terminals, warehouse stock, G50 tax compliance, and national delivery carriers in Algerian Dinars (DZD).",
    architecture: [
      "Role-Based Access Control (RBAC): Separate authenticated workspaces for Gérant, Caissier POS, Magasinier Stock, and Comptable Fiscal",
      "Financial & Tax Engine: Algerian G50 fiscal audit ledger, DZD margin analytics, and automated PDF financial reporting",
      "Operations & Logistics: Barcode POS checkout, real-time stock alerts, and 58-wilaya courier tracking integration",
    ],
    caseStudy: {
      subtitle: "Multi-Tenant Algerian Retail & Enterprise Management Suite (DZD / G50)",
      datasetOrScope: "Commercial B2B Software · Gérant, Caissier, Magasinier & Comptable Workspaces",
      keyFindings: [
        "4 specialized role interfaces tailored to Algerian retail and distribution workflows",
        "Built-in G50 fiscal ledger and DZD accounting reports",
        "Integrated 58-wilaya delivery and inventory management",
      ],
      sections: [
        {
          heading: "Tailored for Algerian Commerce",
          body: "Addresses real operational requirements of Algerian merchants: DZD currency formatting, G50 tax preparation, multi-employee permissions, and cash-on-delivery wilaya logistics.",
        },
      ],
    },
  },
  {
    slug: "menswear-boutique-os-suite",
    title: "ALLURE HOMME (Sidi Bel Abbès) — Storefront & Manager OS",
    description:
      "Production luxury menswear e-commerce storefront and store-manager operating system built for ALLURE HOMME in Sidi Bel Abbès with 58-wilaya delivery calculation & instant WhatsApp/COD checkout.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Inventory OS", "WhatsApp Commerce", "58-Wilaya COD"],
    github: "https://github.com/HANIDEVINF/allure",
    githubReady: true,
    demo: "https://hanidevinf.github.io/allure/",
    category: "Freelance & Client Systems",
    featured: true,
    status: "Client Production",
    metrics: ["Sidi Bel Abbès flagship", "58-wilaya COD checkout", "Integrated Manager OS"],
    impact:
      "Deployed for ALLURE HOMME (Sidi Bel Abbès), combining a luxury editorial storefront with back-office stock and order management.",
    architecture: [
      "Storefront: Tailored brand experience for ALLURE HOMME (Sidi Bel Abbès)",
      "Conversion Flow: Size/color variant selection, 58-wilaya delivery fee calculation, and instant WhatsApp order dispatch",
      "OS Gérant (Manager Dashboard): Stock tracking, product catalog editor, and daily revenue analytics",
    ],
    caseStudy: {
      subtitle: "Bespoke E-Commerce & Store Management System for Algerian Menswear Retail",
      datasetOrScope: "Commercial Client Delivery · Sidi Bel Abbès (Wilaya 22)",
      keyFindings: [
        "Custom-branded storefront for ALLURE HOMME",
        "Frictionless mobile-first checkout with 58-wilaya shipping calculation and direct WhatsApp order routing",
        "Built-in Manager OS (OS Gérant) for real-time inventory and variant control",
      ],
      sections: [
        {
          heading: "Solving Local E-Commerce Conversion",
          body: "In the Algerian retail market, customers expect fast mobile browsing, transparent 58-wilaya delivery pricing, and instant WhatsApp/COD confirmation—paired with a simple back-office for the shop owner.",
        },
      ],
    },
  },
  {
    slug: "gkstore-algiers-menswear",
    title: "GK STORE (Birkhadem, Algiers) — Storefront & Manager OS",
    description:
      "Production menswear e-commerce storefront and store-owner management system deployed for GK STORE in Birkhadem, Algiers with 58-wilaya delivery pricing and direct WhatsApp order dispatch.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "OS Gérant", "58-Wilaya COD"],
    github: "https://github.com/HANIDEVINF/gkstore",
    githubReady: true,
    demo: "https://hanidevinf.github.io/gkstore/",
    category: "Freelance & Client Systems",
    status: "Client Production",
    metrics: ["Birkhadem Algiers store", "58-wilaya COD", "Live Manager OS"],
    impact: "Complete mobile-first retail experience and back-office inventory manager for an Algiers menswear boutique.",
  },
  {
    slug: "casual29-mascara-menswear",
    title: "CASUAL 29 (Mascara) — Menswear Storefront & Inventory OS",
    description:
      "Production e-commerce platform and inventory operating system built for CASUAL 29 in Mascara (Wilaya 29) featuring variant stock tracking, 58-wilaya shipping calculation, and instant order routing.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Inventory OS", "WhatsApp Checkout"],
    github: "https://github.com/HANIDEVINF/clothes",
    githubReady: true,
    demo: "https://hanidevinf.github.io/clothes/",
    category: "Freelance & Client Systems",
    status: "Client Production",
    metrics: ["Wilaya 29 Mascara store", "Variant inventory OS", "Instant COD checkout"],
    impact: "Tailored commercial deployment uniting online catalog browsing with real-time shop floor stock control.",
  },
  {
    slug: "aura-luxury-commerce-os",
    title: "AURA — Multi-Industry Luxury Commerce & Retail OS",
    description:
      "Multi-industry freelance commerce and desktop business OS suite featuring 5 tailored client verticals (Eyewear, Apparel, Gourmet Food, Electronics, Mobile Accessories) with inventory analytics and PDF reporting.",
    technologies: ["React", "TypeScript", "Retail OS", "PDF Reports", "Multi-Vertical"],
    github: "https://github.com/HANIDEVINF/ecom",
    githubReady: true,
    demo: "https://hanidevinf.github.io/ecom/",
    category: "Freelance & Client Systems",
    status: "Client Production",
    metrics: ["5 retail verticals", "Owner desktop logiciel", "PDF financial reports"],
    impact: "Modular commerce & point-of-sale architecture adaptable across eyewear, fashion, food, and electronics stores.",
  },
  {
    slug: "aurelia-market-ai-commerce",
    title: "Aurelia Vector Affinity AI Commerce",
    description:
      "AI-personalized commerce platform with live 4D user preference embedding vectors, real-time cosine similarity catalog re-ranking, smart cart telemetry, and multi-step checkout flows.",
    technologies: ["Next.js", "TypeScript", "4D Vector Ranking", "Cosine Similarity", "Vercel"],
    github: "https://github.com/HANIDEVINF/ai-recommendation-system",
    githubReady: true,
    demo: "https://ai-recommendation-system-beige.vercel.app",
    category: "Freelance & Client Systems",
    status: "Live",
    metrics: ["4D cosine ranking", "Dynamic bundle synthesis", "Interactive checkout"],
    impact: "Combines vector-similarity recommendation math with a luxury hardware commerce experience.",
  },

  // ==========================================================================
  // 3. NLP & SPEECH AI
  // ==========================================================================
  {
    slug: "mucat-multilingual-transformer",
    title: "MuCAT — Multilingual Uncertainty-Calibrated Attention Transformer",
    description:
      "Language-conditioned multilingual Transformer architecture with native Dirichlet uncertainty quantification for low-resource & Maghreb settings (Modern Standard Arabic, Algerian Arabic/Darija, Kabyle, Chaoui, French, and English). Stacks 4 custom modules over mDeBERTa-v3-base: Hierarchical Attention Pooling (HAP), Language-Aware Gating (LAG FiLM), Evidential Dirichlet Head (EDL), and Script Auxiliary Head.",
    technologies: ["mDeBERTa-v3", "Evidential Deep Learning", "FiLM Gating", "Hierarchical Attention", "Berber & Darija NLP", "LLRD"],
    github: "https://github.com/HANIDEVINF/MUCAT-Multilingual-Transformer",
    githubReady: true,
    demo: "/lab/mucat-transformer",
    category: "NLP & Speech AI",
    featured: true,
    status: "CERIST Research",
    metrics: ["98.20% Test Acc (vs 23.74% ablation)", "6 Languages (AR/ARQ/KAB/SHY/FR/EN)", "Single-Pass Dirichlet Uncertainty u=K/S"],
    impact:
      "CERIST (UbiSys Team, DTISI) research supervised by Nadir Bouchama: achieves 98.26% Val / 98.20% Test accuracy with native calibrated uncertainty u = K/S under an identical 10-epoch LLRD budget, outperforming XLM-RoBERTa-base (3.88% test) and standard mDeBERTa-v3 ablation (23.74% test).",
    architecture: [
      "Backbone: Pretrained mDeBERTa-v3-base (disentangled attention + ELECTRA replaced-token detection) with 9/12 selective layer freezing & LLRD (ξ ≈ 0.95)",
      "1. Hierarchical Attention Pooling (HAP): Learned gate mixing multi-head token attention summary with the [CLS] residual (inspired by MaxPoolBERT 2025)",
      "2. Language-Aware Gating (LAG — FiLM): Affine scale/shift modulation conditioned on the detected writing-system family",
      "3. Evidential Dirichlet Head (EDL) + 4. AuxHead: Predicts Dirichlet parameters α_i for single-pass calibrated uncertainty u = K/S (S = ∑α_i) with multi-task script regularization",
    ],
    caseStudy: {
      subtitle: "CERIST UbiSys DTISI Research Report · Supervised by Nadir Bouchama",
      datasetOrScope: "Tatoeba 6-Language Low-Resource Benchmark (MSA `ar`, Algerian Darija `arq`, Kabyle `kab`, Chaoui `shy`, French `fr`, English `en`) · Strict Identical Budget (4 Epochs Frozen + 6 Epochs Unfrozen Top-8 Layers, LLRD ξ=0.95)",
      keyFindings: [
        "Controlled comparison at strictly identical compute budget: MuCAT reaches 98.26% Val / 98.20% Test accuracy vs. 98.15% Val / 23.74% Test on standard mDeBERTa-v3 ablation and 97.75% Val / 3.88% Test on XLM-RoBERTa-base",
        "Native calibrated uncertainty u = K/S in a single forward pass via Evidential Deep Learning (Sensoy et al., 2018), avoiding 10–50× MC-Dropout overhead or separate temperature-scaling validation sets",
        "Hierarchical Attention Pooling (HAP) + Language-Aware FiLM Gating (LAG) prevent dominant-language drift on low-resource Berber (Kabyle, Chaoui) and Algerian Arabic dialects",
        "Selective layer freezing (first 9 of 12 layers frozen, costing only 0.04 accuracy points) combined with Layer-wise Learning Rate Decay (LLRD, ξ ≈ 0.95) prevents catastrophic forgetting",
      ],
      sections: [
        {
          heading: "1. Literature Review & Backbone Selection",
          body: "Surveys mBERT, XLM-RoBERTa, DeBERTa-v3, and mmBERT (Marone et al., 2025), alongside Algerian/Berber NLP works (DziriBERT, chDzDT, PADIC, AraDial, GlotLID). While mmBERT is the newest 1,800-language encoder, HuggingFace transformers v5 removed TFAutoModel support; XLM-RoBERTa-base is therefore selected as the defensible public baseline alongside a controlled mDeBERTa-v3-base ablation.",
        },
        {
          heading: "2. Four-Module MuCAT Architecture",
          body: "Stacks (1) Hierarchical Attention Pooling (HAP) mixing token-level attention with the [CLS] residual, (2) Language-Aware Gating (LAG — FiLM affine scale/shift conditioned on writing-system family), (3) Evidential Dirichlet Head (EDL) predicting concentration parameters α_i to compute strength S = ∑α_i and vacuity uncertainty u = K/S in one pass, and (4) Auxiliary script-discrimination head for multi-task regularization.",
        },
        {
          heading: "3. Controlled Experimental Protocol & Honest Limitations",
          body: "All three models share the exact same Tatoeba 6-language split, class weighting, and 4+6 epoch LLRD schedule, isolating architectural gain from compute budget. Explicitly documents statistical variance on low-volume Chaoui (<800 sentences), expected Kabyle/Chaoui Berber family confusion noted in GlotLID, and EDL epistemic vs. dataset bias correlations.",
        },
      ],
    },
  },
  {
    slug: "keras-voice-recognition-lab",
    title: "VoxScribe AI — Speech-to-Text, Diarization & SOAP Summarizer",
    description:
      "Multilingual speech-to-text & clinical/executive summarization studio combining real-time Web Speech ASR dictation (EN/FR/AR), speaker diarization, biomedical/technical entity extraction, and automated SOAP & action-item synthesis—plus an acoustic 16×32 FFT Keras spectrogram lab.",
    technologies: ["Web Speech ASR", "NLP Summarization", "Speaker Diarization", "Keras DSP", "Next.js"],
    github: "https://github.com/HANIDEVINF/speech-to-text-summarization",
    githubReady: true,
    demo: "https://speech-to-text-summarization.vercel.app",
    category: "NLP & Speech AI",
    featured: true,
    status: "Live",
    metrics: ["Live Mic ASR (EN/FR/AR)", "SOAP & Action Synthesis", "16×32 FFT Acoustic DSP"],
    impact: "End-to-end speech intelligence workbench with live microphone sentence transcription, named entity tagging, and structured clinical/executive summarization.",
  },
  {
    slug: "keras-content-moderation-system",
    title: "Keras Content Moderation & Token Attribution System",
    description:
      "Production-style NLP moderation workbench powered by a trained Keras neural network. Users type any message and get live unsafe/spam probability, policy threshold gating, and token-level risk attribution.",
    technologies: ["Keras", "TensorFlow", "NLP Safety", "Token Attribution", "Vercel"],
    github: "https://github.com/HANIDEVINF/content-moderation-system",
    githubReady: true,
    demo: "https://content-moderation-system-psi.vercel.app",
    category: "NLP & Speech AI",
    featured: true,
    status: "Live",
    metrics: ["99.1% test accuracy", "UCI SMS dataset", "Live token attribution"],
    impact: "Real exported Keras weights running in-browser with customizable policy thresholds and token-level risk attribution.",
  },
  {
    slug: "keras-document-clustering-lab",
    title: "EmbedCluster 64D — Neural Document Clustering Lab",
    description:
      "Document clustering interface powered by 64D Keras embeddings trained on 20 Newsgroups. Users paste any document set and inspect topic probabilities, cosine similarity matrices, and an interactive 2D cluster projection.",
    technologies: ["Keras", "TensorFlow", "20 Newsgroups", "64D Embeddings", "Clustering"],
    github: "https://github.com/HANIDEVINF/document-clustering-visualization",
    githubReady: true,
    demo: "https://document-clustering-visualization.vercel.app",
    category: "NLP & Speech AI",
    status: "Live",
    metrics: ["64D neural embeddings", "20 Newsgroups topics", "2D PCA/t-SNE projection"],
    impact: "Shows learned text embeddings, real dataset training, and interactive visualization for user-provided documents.",
  },

  // ==========================================================================
  // 4. RAG & INFORMATION EXTRACTION
  // ==========================================================================
  {
    slug: "document-qa-rag",
    title: "VeriCite Hybrid Document QA RAG Studio",
    description:
      "Hybrid Dense Vector + BM25 Lexical RAG workbench with interactive alpha fusion weight, citation faithfulness guardrails, abstention gating, and live document chunk ingestion.",
    technologies: ["Hybrid Vector + BM25", "Faithfulness Gate", "Citation Grounding", "RAG"],
    github: "https://github.com/HANIDEVINF/document-qa-rag",
    githubReady: true,
    demo: "https://document-qa-rag-sand.vercel.app",
    category: "RAG & Information Extraction",
    featured: true,
    status: "Live",
    metrics: ["Dense + BM25 RRF fusion", "Faithfulness abstention gate", "Live chunk ingestion"],
    impact: "Eliminates ungrounded hallucinations by combining dense semantic similarity with lexical BM25 scoring and strict citation thresholds.",
  },
  {
    slug: "keras-universal-data-extractor",
    title: "SchemaRoute AI — Universal Document & JSON Extractor",
    description:
      "Structured extraction workbench powered by a 9-class Keras neural schema router, out-of-distribution (unknown) abstention gate, entity tagging, and validated JSON schema synthesis.",
    technologies: ["Keras", "TensorFlow", "Schema Routing", "JSON Extraction", "Browser Inference"],
    github: "https://github.com/HANIDEVINF/structured-data-extraction",
    githubReady: true,
    demo: "https://structured-data-extraction.vercel.app",
    category: "RAG & Information Extraction",
    status: "Live",
    metrics: ["9 document schemas", "OOD unknown class gate", "Validated JSON schema"],
    impact: "Turns unstructured invoices, clinical notes, contracts, and tickets into validated JSON payloads in real time.",
  },
  {
    slug: "financial-document-extractor",
    title: "Financial & Invoice Entity Extraction Pipeline",
    description:
      "Specialized financial document parser for invoices, tax ledgers, and bank statements with line-item reconciliation and JSON schema validation.",
    technologies: ["Document AI", "Schema Validation", "Entity Extraction", "JSON"],
    github: "https://github.com/HANIDEVINF/financial-document-extractor",
    githubReady: true,
    demo: "https://structured-data-extraction.vercel.app",
    category: "RAG & Information Extraction",
    status: "Live",
    metrics: ["Invoice & ledger parsing", "Tax/total reconciliation", "JSON export"],
  },

  // ==========================================================================
  // 5. AGENTIC AI & MLOPS
  // ==========================================================================
  {
    slug: "resolveai-multi-agent-support-bot",
    title: "ResolveAI Multi-Agent Support Orchestrator",
    description:
      "Agentic support automation workbench with live custom ticket input, dynamic ReAct intent routing across Triage, Billing, Technical, and Retention agents, JSON tool-call payloads, and SLA audit trails.",
    technologies: ["Agentic AI", "ReAct Routing", "Tool Calling", "Next.js"],
    github: "https://github.com/HANIDEVINF/multi-agent-support-bot",
    githubReady: true,
    demo: "https://multi-agent-support-bot.vercel.app",
    category: "Agentic AI & MLOps",
    featured: true,
    status: "Live",
    metrics: ["Custom ticket input", "4 specialized agents", "JSON tool contracts"],
    impact: "Demonstrates multi-agent orchestration, memory gating, and auditable tool execution for enterprise operations.",
  },
  {
    slug: "llm-evaluation-framework",
    title: "LLM Evaluation & Safety Gate Framework",
    description:
      "Quality testing workbench for comparing LLM candidates across safety, grounded faithfulness, policy compliance, latency, and token cost regression gates—with custom prompt & response evaluation.",
    technologies: ["LLM-as-a-Judge", "Safety Gates", "Regression Testing", "MLOps"],
    github: "https://github.com/HANIDEVINF/llm-evaluation-framework",
    githubReady: true,
    demo: "https://llm-evaluation-framework.vercel.app",
    category: "Agentic AI & MLOps",
    status: "Live",
    metrics: ["Custom prompt eval", "Safety & policy gates", "Latency/cost pareto"],
    impact: "Shows MLOps judgment: systematically testing whether models hallucinate or violate policy before deployment.",
  },
  {
    slug: "opspilot-ai-incident-copilot",
    title: "OpsPilot SRE Incident Copilot",
    description:
      "Agentic SRE incident-response console with live custom incident simulation, service dependency health telemetry, interactive human-in-the-loop approval gates, and automated postmortem generation.",
    technologies: ["Agentic SRE", "Human-in-the-Loop Gates", "Incident Response", "MLOps"],
    github: "https://github.com/HANIDEVINF/containerized-ai-api-service",
    githubReady: true,
    demo: "https://containerized-ai-api-service.vercel.app",
    category: "Agentic AI & MLOps",
    status: "Live",
    metrics: ["Human approval gates", "Service topology graph", "Auto-postmortem"],
    impact: "Positions the portfolio around operational AI systems with strict human-in-the-loop safety controls.",
  },
  {
    slug: "coderefactor-ai",
    title: "CodeRefactor Neural AST Security & Complexity Workbench",
    description:
      "Automated static analysis & AI refactoring workbench detecting OWASP SQL injection, hardcoded secrets, quadratic O(N²) loops, and ML train/test data leakage with side-by-side patch synthesis.",
    technologies: ["AST Static Analysis", "OWASP Security Audit", "Cyclomatic Complexity", "TypeScript"],
    github: "https://github.com/HANIDEVINF/coderefactor-ai",
    githubReady: true,
    demo: "https://coderefactor-ai.vercel.app",
    category: "Agentic AI & MLOps",
    status: "Live",
    metrics: ["OWASP & leakage audit", "v(G) complexity delta", "Side-by-side diff"],
  },

  // ==========================================================================
  // 6. COMPUTER VISION
  // ==========================================================================
  {
    slug: "keras-vision-classifier",
    title: "VisionTensor Lab — CIFAR-10 Neural Classifier",
    description:
      "Interactive computer vision workbench powered by exported Keras weights and a client-side tensor preprocessing pipeline. Upload any image or inspect test tensors with live RGB perturbation controls.",
    technologies: ["Keras", "TensorFlow", "Computer Vision", "CIFAR-10", "Browser Tensor Engine"],
    github: "https://github.com/HANIDEVINF/image-classification-mobile-app",
    githubReady: true,
    demo: "https://image-classification-mobile-app.vercel.app",
    category: "Computer Vision",
    featured: true,
    status: "Live",
    metrics: ["10 CIFAR vision classes", "Real exported weights", "Instant image upload"],
    impact: "End-to-end proof of Keras model export and client-side tensor preprocessing without external API latency.",
  },
  {
    slug: "real-time-object-detection",
    title: "Real-Time Fall & Object Detection Pipeline",
    description:
      "Computer vision detection pipeline for human fall detection and real-time bounding-box tracking with emergency alert webhooks.",
    technologies: ["YOLO", "OpenCV", "Computer Vision", "Real-Time Inference"],
    github: "https://github.com/HANIDEVINF/Fall-Detection-Model",
    githubReady: true,
    demo: "https://image-classification-mobile-app.vercel.app",
    category: "Computer Vision",
    status: "Research",
    metrics: ["Real-time bounding boxes", "Human posture tracking", "Alert webhook"],
  },
]
