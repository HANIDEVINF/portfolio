export type CaseStudySection = {
  heading: string
  body: string
  bullets?: string[]
}

export type PortfolioProject = {
  slug: string
  title: string
  description: string
  technologies: string[]
  github: string
  githubReady?: boolean
  demo?: string
  caseStudyUrl?: string
  category: "Healthcare AI" | "Client & Commercial" | "AI/ML" | "MLOps" | "Computer Vision" | "Full Stack"
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
  {
    slug: "ai-ecg-arrhythmia-classification-v7",
    title: "AI ECG Arrhythmia Classification (v7)",
    description:
      "Embedded-ready AI ECG Holter system combining 1D-CNN, 2 Multi-Head Transformer attention blocks, and 8 standardized RR features. Evaluated on the strict DS1/DS2 inter-patient MIT-BIH benchmark with zero patient leakage.",
    technologies: ["PyTorch", "TensorFlow/Keras", "Transformer Attention", "1D CNN", "TFLite INT8", "PhysioNet MIT-BIH"],
    github: "https://github.com/HANIDEVINF",
    githubReady: false,
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
    technologies: ["Flutter", "Python / Flask", "MongoDB", "WebRTC", "Raspberry Pi", "IoT Sensors"],
    github: "https://github.com/HANIDEVINF/MED-Guard-AI.",
    githubReady: true,
    caseStudyUrl: "/blog/flutter-state-management-2024",
    category: "Healthcare AI",
    featured: true,
    status: "PFE Distinction",
    metrics: ["Real-time ECG & Glucose", "Emergency alert workflows", "WebRTC + Chat + Booking"],
    impact:
      "Licence Graduation Capstone (PFE USTHB). Connects physical medical sensors & Raspberry Pi to a Python/Flask backend, MongoDB, and cross-platform Flutter mobile/web apps.",
    architecture: [
      "Edge Layer: Physical ECG & Blood Glucose sensors → Raspberry Pi acquisition & stream relay",
      "Backend & AI Service: Python / Flask REST & real-time telemetry pipeline + AI anomaly detection model",
      "Clinical Workflows: Automated emergency notifications, 1-on-1 & group medical chat, online/in-person appointment scheduling, auto-generated medication records",
      "Client Layer: Cross-platform Flutter mobile & web dashboards with live waveform rendering & WebRTC video calls",
    ],
    caseStudy: {
      subtitle: "PFE Licence Capstone — End-to-End Medical IoT, Real-Time AI & Telemedicine Platform",
      datasetOrScope: "Full-Stack Hardware + Software System · Flutter, Flask/Python, MongoDB, WebRTC, Raspberry Pi",
      keyFindings: [
        "Real-time streaming from physical ECG and glucose sensors to patient and physician interfaces",
        "Automated AI anomaly detection triggering multi-tier emergency alerts when vitals cross clinical thresholds",
        "Integrated telemedicine suite: private/group chat, WebRTC consultations, appointment booking, and digital prescription sheets",
      ],
      sections: [
        {
          heading: "Bridging Physical Sensors & AI Models",
          body: "Unlike isolated notebook prototypes, MedGuardAI was engineered as a complete clinical system where hardware telemetry flows continuously through a Flask backend into live mobile dashboards.",
        },
        {
          heading: "Patient-Doctor Communication & Emergency Response",
          body: "When abnormal ECG or glucose readings are detected, the system dispatches instant alerts to assigned physicians and unlocks immediate communication channels and automated medication sheets.",
        },
      ],
    },
  },
  {
    slug: "mucat-multilingual-transformer",
    title: "MUCAT — Multilingual Custom Attention Transformer",
    description:
      "Custom BERT/Transformer neural architecture designed for multilingual NLP across Arabic, French, and English. Features hierarchical attention pooling, language-sensitive gating, and language-specific output heads.",
    technologies: ["PyTorch", "Hugging Face", "BERT", "Hierarchical Attention", "Arabic NLP", "Multilingual"],
    github: "https://github.com/HANIDEVINF",
    githubReady: false,
    category: "AI/ML",
    featured: true,
    status: "Research",
    metrics: ["Trilingual (AR / FR / EN)", "Language-sensitive gating", "Hierarchical attention pooling"],
    impact:
      "Engineered during AI research internships at CERIST to handle morphological richness and code-switching across Arabic, French, and English NLP tasks.",
    architecture: [
      "Backbone: Shared multilingual Transformer / BERT contextual encoder",
      "Hierarchical Attention Pooling: Multi-level token and span aggregation for morphologically rich text",
      "Language-Sensitive Gating: Dynamic routing module conditioning representations on detected language characteristics (AR / FR / EN)",
      "Task Heads: Language-specific output projections for classification and conversational NLP workflows",
    ],
    caseStudy: {
      subtitle: "Custom BERT/Transformer Architecture for Arabic, French & English NLP",
      datasetOrScope: "CERIST AI Engineering Research · Multilingual & Code-Switched NLP",
      keyFindings: [
        "Combines shared cross-lingual representations with language-sensitive gating to prevent dominant-language interference",
        "Hierarchical attention pooling improves representation quality over standard [CLS] token pooling on Arabic/French/English tasks",
        "Designed as a modular PyTorch/Hugging Face research and engineering framework",
      ],
      sections: [
        {
          heading: "Architectural Motivation",
          body: "Standard multilingual encoders often underperform on Algerian/Maghreb linguistic contexts where Arabic, French, and English coexist. MUCAT introduces explicit hierarchical pooling and language-aware gating.",
        },
      ],
    },
  },
  {
    slug: "tadjmeel-clinica-suite",
    title: "Tadjmeel Clinica — Medical Aesthetic Platform & Desktop Suite",
    description:
      "Commercial production system built for Tadjmeel Clinica in Algiers (Splendor X laser, HydraFacial, LifU LinearZ). Includes the public clinic website plus dedicated Electron/web workspaces for Physicians and Receptionists.",
    technologies: ["React", "TypeScript", "Electron", "Node.js", "Multi-Role Portals", "Healthcare CRM"],
    github: "https://github.com/HANIDEVINF/clinicatajmeel",
    githubReady: true,
    category: "Client & Commercial",
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
    category: "Client & Commercial",
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
    title: "ALLURE HOMME, GK STORE & CASUAL 29 — Retail & Manager OS",
    description:
      "Three production e-commerce storefronts and store-manager operating systems built for Algerian menswear boutiques in Algiers (Birkhadem), Sidi Bel Abbès, and Mascara with 58-wilaya delivery & WhatsApp checkout.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Inventory OS", "WhatsApp Commerce", "58-Wilaya COD"],
    github: "https://github.com/HANIDEVINF/allure",
    githubReady: true,
    category: "Client & Commercial",
    featured: true,
    status: "Client Production",
    metrics: ["3 live retail brands", "58-wilaya COD checkout", "Integrated Manager OS"],
    impact:
      "Deployed for ALLURE HOMME (Sidi Bel Abbès), GK STORE (Birkhadem, Algiers), and CASUAL 29 (Mascara), combining luxury editorial storefronts with back-office stock management.",
    architecture: [
      "Storefronts: Tailored brand experiences for ALLURE HOMME (Sidi Bel Abbès), GK STORE (Algiers), and CASUAL 29 (Mascara)",
      "Conversion Flow: Size/color variant selection, 58-wilaya delivery fee calculation, and instant WhatsApp order dispatch",
      "OS Gérant (Manager Dashboard): Stock tracking, product catalog editor, and daily revenue analytics",
    ],
    caseStudy: {
      subtitle: "Bespoke E-Commerce & Store Management Systems for 3 Algerian Menswear Brands",
      datasetOrScope: "Commercial Client Deliveries · Algiers (Birkhadem), Sidi Bel Abbès (22) & Mascara (29)",
      keyFindings: [
        "Custom-branded storefronts for ALLURE HOMME, GK STORE, and CASUAL 29",
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
    slug: "keras-content-moderation-system",
    title: "Keras Content Moderation System",
    description:
      "Production-style moderation app powered by a trained Keras neural network. Users type any message and get live unsafe/spam probability, confidence bands, token attribution, and model metrics.",
    technologies: ["Keras", "TensorFlow", "NLP", "Browser Inference", "Vercel"],
    github: "https://github.com/HANIDEVINF/content-moderation-system",
    githubReady: true,
    demo: "https://content-moderation-system-psi.vercel.app",
    category: "AI/ML",
    featured: true,
    status: "Live",
    metrics: ["99.1% test accuracy", "UCI SMS dataset", "Live token attribution"],
    impact: "Real exported Keras weights running in-browser with customizable policy thresholds and token-level risk attribution.",
  },
  {
    slug: "keras-voice-recognition-lab",
    title: "Keras Voice Recognition Lab",
    description:
      "Audio ML app with a Keras dense model trained on the Free Spoken Digit Dataset. Users can record from the microphone or upload WAV audio and inspect live FFT spectrogram features and probability bars.",
    technologies: ["Keras", "TensorFlow", "Audio ML", "Microphone API", "FFT Features"],
    github: "https://github.com/HANIDEVINF/speech-to-text-summarization",
    githubReady: true,
    demo: "https://speech-to-text-summarization.vercel.app",
    category: "AI/ML",
    featured: true,
    status: "Live",
    metrics: ["92.2% macro F1", "16×32 FFT features", "Mic & WAV upload"],
    impact: "Demonstrates Web Audio API signal processing, 8kHz resampling, FFT feature extraction, and real browser neural inference.",
  },
  {
    slug: "keras-vision-classifier",
    title: "Keras Vision Classifier",
    description:
      "Image classification app trained on CIFAR-10 with saved Keras artifacts and a static browser inference engine. Users upload any image or test sample tensors and inspect ranked class probabilities.",
    technologies: ["Keras", "TensorFlow", "Computer Vision", "CIFAR-10", "Static Deployment"],
    github: "https://github.com/HANIDEVINF/image-classification-mobile-app",
    githubReady: true,
    demo: "https://image-classification-mobile-app.vercel.app",
    category: "Computer Vision",
    status: "Live",
    metrics: ["10 CIFAR vision classes", "Real exported weights", "Instant image upload"],
    impact: "End-to-end proof of Keras model export and client-side tensor preprocessing without external API latency.",
  },
  {
    slug: "aura-luxury-commerce-os",
    title: "AURA — Multi-Industry Luxury Commerce & Retail OS",
    description:
      "Multi-industry freelance commerce and desktop business OS suite featuring 5 tailored client verticals (Eyewear, Apparel, Gourmet Food, Electronics, Mobile Accessories) with inventory analytics and PDF reporting.",
    technologies: ["React", "TypeScript", "Retail OS", "PDF Reports", "Multi-Vertical"],
    github: "https://github.com/HANIDEVINF/ecom",
    githubReady: true,
    category: "Client & Commercial",
    status: "Client Production",
    metrics: ["5 retail verticals", "Owner desktop logiciel", "PDF financial reports"],
    impact: "Modular commerce & point-of-sale architecture adaptable across eyewear, fashion, food, and electronics stores.",
  },
  {
    slug: "aurelia-market-ai-commerce",
    title: "Aurelia Market AI Commerce",
    description:
      "Full-stack AI commerce experience with personalized recommendations, dynamic comparison drawers, smart cart telemetry, wishlist persistence, and multi-step checkout flows.",
    technologies: ["Next.js", "TypeScript", "AI UX", "Ecommerce", "Vercel"],
    github: "https://github.com/HANIDEVINF/ai-recommendation-system",
    githubReady: true,
    demo: "https://ai-recommendation-system-beige.vercel.app",
    category: "Full Stack",
    status: "Live",
    metrics: ["AI recommendation engine", "Product comparison", "Interactive checkout"],
    impact: "Highlights product thinking and polished full-stack interface work alongside AI portfolio projects.",
  },
  {
    slug: "keras-universal-data-extractor",
    title: "Keras Universal Data Extractor",
    description:
      "Structured extraction app with a trained Keras schema router, unknown-input handling, text-file upload, universal entity detection, and validated JSON output.",
    technologies: ["Keras", "TensorFlow", "Information Extraction", "JSON", "Browser Inference"],
    github: "https://github.com/HANIDEVINF/structured-data-extraction",
    githubReady: true,
    demo: "https://structured-data-extraction-app.vercel.app",
    category: "AI/ML",
    status: "Live",
    metrics: ["9 document types", "Unknown class gate", "Validated JSON schema"],
    impact: "Turns unstructured text into validated JSON using a trained schema router and entity extraction pipeline.",
  },
  {
    slug: "keras-document-clustering-lab",
    title: "Keras Document Clustering Lab",
    description:
      "Document clustering interface powered by Keras embeddings trained on 20 Newsgroups. Users paste any document set and get topic probabilities plus an interactive 2D cluster map.",
    technologies: ["Keras", "TensorFlow", "20 Newsgroups", "Embeddings", "Clustering"],
    github: "https://github.com/HANIDEVINF/document-clustering-visualization",
    githubReady: true,
    demo: "https://document-clustering-visualization.vercel.app",
    category: "AI/ML",
    status: "Live",
    metrics: ["60.5% test accuracy", "20 Newsgroups topics", "2D embedding projection"],
    impact: "Shows learned text embeddings, real dataset training, and interactive visualization for user-provided documents.",
  },
  {
    slug: "llm-evaluation-framework",
    title: "LLM Evaluation & Safety Gate Framework",
    description:
      "Quality testing workbench for comparing LLM candidates across safety, grounded faithfulness, policy compliance, latency, and token cost regression gates—with custom prompt & response evaluation.",
    technologies: ["Next.js", "LLM-as-a-Judge", "Safety Gates", "Regression Testing"],
    github: "https://github.com/HANIDEVINF/llm-evaluation-framework",
    githubReady: true,
    demo: "https://llm-evaluation-framework.vercel.app",
    category: "MLOps",
    status: "Live",
    metrics: ["Custom prompt eval", "Safety & policy gates", "Latency/cost pareto"],
    impact: "Shows MLOps judgment: systematically testing whether models hallucinate or violate policy before deployment.",
  },
  {
    slug: "resolveai-multi-agent-support-bot",
    title: "ResolveAI Multi-Agent Support Orchestrator",
    description:
      "Support automation workbench with live custom ticket input, dynamic intent routing across Triage, Billing, Technical, and Retention agents, JSON tool-call payloads, and SLA audit trails.",
    technologies: ["AI Agents", "ReAct Routing", "Tool Calling", "Next.js"],
    github: "https://github.com/HANIDEVINF/multi-agent-support-bot",
    githubReady: true,
    demo: "https://multi-agent-support-bot.vercel.app",
    category: "AI/ML",
    status: "Live",
    metrics: ["Custom ticket input", "4 specialized agents", "JSON tool contracts"],
    impact: "Demonstrates multi-agent orchestration, memory gating, and auditable tool execution for support operations.",
  },
  {
    slug: "opspilot-ai-incident-copilot",
    title: "OpsPilot SRE Incident Copilot",
    description:
      "Agentic SRE incident-response console with live custom incident simulation, service dependency health telemetry, interactive human-in-the-loop approval gates, and automated postmortem generation.",
    technologies: ["MLOps", "Agentic SRE", "Approval Gates", "Incident Response"],
    github: "https://github.com/HANIDEVINF/containerized-ai-api-service",
    githubReady: true,
    demo: "https://containerized-ai-api-service.vercel.app",
    category: "MLOps",
    status: "Live",
    metrics: ["Human approval gates", "Service topology graph", "Auto-postmortem"],
    impact: "Positions the portfolio around operational AI systems with strict human-in-the-loop safety controls.",
  },
  {
    slug: "document-qa-rag",
    title: "Document QA RAG",
    description: "RAG pipeline focused on fast semantic chunking, vector retrieval, and grounded question answering over technical documents.",
    technologies: ["Python", "Vector Search", "LangChain", "RAG"],
    github: "https://github.com/HANIDEVINF/document-qa-rag",
    githubReady: true,
    demo: "https://document-qa-rag-sand.vercel.app",
    category: "AI/ML",
  },
  {
    slug: "coderefactor-ai",
    title: "CodeRefactor AI",
    description: "AI code refactoring workbench with browser-based static review, complexity scoring, and cloud persistence.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    github: "https://github.com/HANIDEVINF/coderefactor-ai",
    githubReady: true,
    demo: "https://coderefactor-ai.vercel.app",
    category: "AI/ML",
  },
  {
    slug: "medical-note-assistant",
    title: "Medical Note Assistant",
    description: "Domain-focused clinical assistant for medical note structuring and Q&A with safety-minded response guardrails.",
    technologies: ["Python", "Medical NLP", "RAG", "Guardrails"],
    github: "https://github.com/HANIDEVINF/medical-note-assistant",
    githubReady: true,
    category: "Healthcare AI",
  },
  {
    slug: "financial-document-extractor",
    title: "Financial Document Extractor",
    description: "OCR and structured entity extraction workflow for invoices, receipts, and financial statements.",
    technologies: ["OCR", "Python", "Regex", "Data Extraction"],
    github: "https://github.com/HANIDEVINF/financial-document-extractor",
    githubReady: true,
    category: "AI/ML",
  },
  {
    slug: "real-time-object-detection",
    title: "Real-Time Object Detection",
    description: "Real-time computer vision detection pipeline for live camera and video streams with bounding-box overlays.",
    technologies: ["YOLO", "OpenCV", "Python", "Realtime"],
    github: "https://github.com/HANIDEVINF/real-time-object-detection",
    githubReady: true,
    category: "Computer Vision",
  },
]
