export type CaseStudySection = {
  heading: string
  body: string
  bullets?: string[]
}

export type ProjectCategory =
  | "Freelance & Client Systems"
  | "EdTech & SaaS Platform"
  | "Healthcare AI"
  | "NLP & Speech AI"
  | "RAG & Information Extraction"
  | "Agentic AI & MLOps"
  | "Computer Vision"

export const PROJECT_CATEGORIES: readonly ("All" | ProjectCategory)[] = [
  "All",
  "EdTech & SaaS Platform",
  "Healthcare AI",
  "NLP & Speech AI",
  "RAG & Information Extraction",
  "Agentic AI & MLOps",
  "Computer Vision",
  "Freelance & Client Systems",
] as const

export type SystemType =
  | "Research Implementation"
  | "Live Client Production"
  | "In-Browser Prototype"
  | "Multi-Agent Workflow"

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
  status?: "Live" | "Research" | "CERIST Research" | "PFE Distinction" | "Client Production"
  systemType?: SystemType
  metrics?: string[]
  impact?: string
  architecture?: string[]
  trainedDataset?: string
  modelType?: string
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
    slug: "asthma-expert-ultra-transformer",
    title: "AsthmaExpertUltra — Multi-Task Transformer for Asthma Crisis Prediction",
    description:
      "Simulation-based research prototype exploring joint asthma severity and lead-time classification using generated synthetic multivariate time series. The public lab uses deterministic illustrative heuristics, not this trained model; no real-patient evaluation or clinical validation is claimed.",
    technologies: [
      "PyTorch",
      "Transformer Encoder",
      "Multi-Task Learning",
      "Dempster-Shafer Fusion",
      "PyTorch Lite (.ptl)",
      "Android Edge AI"
    ],
    github: "https://github.com/HANIDEVINF/asthma-expert-ultra",
    githubReady: true,
    demo: "/lab/asthma-expert-ultra",
    caseStudyUrl: "/lab/asthma-expert-ultra",
    category: "Healthcare AI",
    featured: true,
    status: "CERIST Research",
    systemType: "Research Implementation",
    trainedDataset: "1,000 simulated patients, 1,440 hours/patient (60 days), strict patient-independent GroupShuffleSplit (80/20 train/test, zero patient overlap)",
    modelType: "4-Layer Transformer Encoder (d_model=128, h=8) + GAP + Dual Multi-Task Heads (Severity Focal Loss γ=2 + Lead-Time Cross-Entropy)",
    metrics: [
      "76.0% 4-Class Severity Accuracy (vs 61.8% XGBoost, 57.7% PatchTST)",
      "69.0% 4-Bin Lead-Time Accuracy (vs 59.3% LSTM)",
      "No standalone Android app or exported .ptl artifact included in the public repo"
    ],
    impact:
      "Research prototype documented with 1,000 simulated patients and patient-grouped splits. Reported metrics apply only to the generated simulation, are not real-patient evidence, and have not been independently rerun as part of this portfolio update. No clinical validation is claimed.",
    architecture: [
      "Input Window: 24h temporal sliding window (24 × 8) of 8 multimodal signals (FEV1, PEF, SpO2, HR, RR, PM2.5, Pollen, Temp) with patient-specific Z-score normalisation",
      "Module 1 (Transformer Encoder): Linear projection (8 → 128) + Sinusoidal Positional Encoding → 4-layer Transformer Encoder (8 heads, FFN 512, LayerNorm) → Global Average Pooling context h_GAP (128-d)",
      "Module 2 (Multi-Task Heads): Severity Head (128 → 64 → 4, Focal Loss γ=2, w=[1,5,5,10]) and Lead-Time Head (128 → 64 → 4, Cross-Entropy) trained jointly (0.5/0.5)",
      "Safety Layer & Edge Deployment: Dempster-Shafer evidence fusion with independent spirometric rule (VEMS < 50% critical emergency override), exported to TorchScript and PyTorch Lite (.ptl) for offline Android execution"
    ],
    caseStudy: {
      subtitle: "CERIST Research Technical Report — Multi-Task Transformer & Android Edge Deployment",
      datasetOrScope: "1,000 Patients · 1,440 Hours Each · Strict Patient-Independent Split · 8 Multimodal Channels",
      keyFindings: [
        "On the reported synthetic cohort, AsthmaExpertUltra records 76.0% severity accuracy and 69.0% lead-time accuracy; these are simulation-only results and not clinical performance estimates",
        "The project notes report a severe-class recall change under asymmetric focal-loss weighting on synthetic data; this does not establish reliable detection of life-threatening crises in real patients",
        "Dempster-Shafer decision fusion escalates 47.3% of critical low-VEMS readings to immediate triage while de-escalating false alarms in stable patients",
        "An edge-export workflow is described in project notes, but this repository does not include a standalone .ptl file or device-level latency evidence"
      ],
      sections: [
        {
          heading: "Why Anticipatory Multi-Task Monitoring Matters",
          body: "Asthma management is conventionally reactive: patients only receive intervention after airway constriction begins. AsthmaExpertUltra shifts this paradigm by tracking subtle physiological degradation (FEV1 decline, compensatory respiratory rate climb, SpO2 dips) 4 to 8 hours prior to onset."
        },
        {
          heading: "Patient-Independent Splitting & Benchmark Rigor",
          body: "Unlike naive random train/test splits that leak patient identities and produce deceptively high scores, AsthmaExpertUltra enforces a strict GroupShuffleSplit by patient ID. The model was benchmarked against XGBoost, Simple RNN, LSTM, and 2023 Patch-based Transformers on an identical test cohort."
        },
        {
          heading: "Clinical Safety Override & Edge Privacy",
          body: "To bridge deep learning and medical practice, the network's probabilistic belief is fused with deterministic clinical guidelines: if a patient's VEMS falls below 50% of their reference value, an emergency alert triggers immediately. The complete system runs locally on an Android device via PyTorch Lite."
        }
      ]
    }
  },
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
    systemType: "Research Implementation",
    trainedDataset: "PhysioNet MIT-BIH Arrhythmia Database (100,645 labeled beats, DS1/DS2 inter-patient protocol)",
    modelType: "Hybrid 1D-CNN + 2x Multi-Head Transformer Attention + 8-RR Fusion Head (155 KB INT8 TFLite)",
    metrics: [
      "90.13% 5-fold ensemble (87.63% single)",
      "0.529 macro-F1 (16.2% S-class sensitivity)",
      "155.4 KB INT8 TFLite (0.32 ms/beat latency)",
    ],
    impact:
      "Strict inter-patient DS1/DS2 split (49,668 held-out test beats), 5-fold StratifiedGroupKFold by patient, focal loss (γ=2), DS1-only OOF logit calibration, and 99.82% Keras-to-TFLite argmax agreement. Openly reports minority-class challenges (S-class 16.2% sensitivity) rather than masking with headline accuracy.",
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
        "5-fold patient-grouped ensemble reaches 90.13% accuracy and 0.5290 macro-F1, honestly noting 16.2% S-class sensitivity",
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
          heading: "Deployment, Hardware Verification & Research Disclaimer",
          body: "Exported from Keras (379.08 KB float32) to dynamic-range TFLite (146.0 KB) and INT8 TFLite (155.4 KB). Verified across 5,000 DS2 beats with 99.82% argmax decision agreement. Medical Disclaimer: Research & educational demonstration evaluated on PhysioNet MIT-BIH; not a certified clinical diagnostic device.",
        },
      ],
    },
  },
  {
    slug: "medguard-ai-patient-monitoring",
    title: "MedGuardAI — Medical IoT & Telehealth Architecture Case Study",
    description:
      "USTHB Licence capstone documenting an intended medical-monitoring architecture involving physiological sensors, an edge relay, a backend, and telehealth interfaces. The public repository currently contains a README only; the full application and device code are not included, so end-to-end integration is not independently reproducible from this repository.",
    technologies: ["Medical IoT Architecture", "Raspberry Pi Concept", "Flask/MongoDB Design", "Telehealth Workflow"],
    github: "https://github.com/HANIDEVINF/MED-Guard-AI.",
    githubReady: true,
    caseStudyUrl: "/blog/medguard-ai-realtime-iot-streaming",
    category: "Healthcare AI",
    featured: true,
    status: "Academic Case Study",
    systemType: "Research Implementation",
    trainedDataset: "No dataset included in the public MedGuardAI repository; related model work is linked separately",
    modelType: "Model assets and full inference application are not included in the public repository",
    metrics: ["Licence capstone architecture", "Sensor-to-backend design", "Telehealth workflow design"],
    impact:
      "Licence graduation capstone at USTHB. The case study summarizes the intended architecture and academic scope; it does not claim a reproducible or clinically validated live monitoring system.",
    architecture: [
      "Planned edge layer: physiological sensors and a Raspberry Pi acquisition/relay component",
      "Described backend: Python/Flask service and MongoDB data storage",
      "Described application workflows: alerting, appointment management and patient-doctor communication",
      "Intended client layer: Flutter patient/doctor interfaces and WebRTC telehealth",
    ],
    caseStudy: {
      subtitle: "USTHB Licence Capstone — Medical IoT Architecture and Telehealth Workflow",
      datasetOrScope: "Architecture case study; full source, hardware code, schema and packaged model artifacts are not included in the public repo",
      keyFindings: [
        "Describes a proposed connection between sensor acquisition, an application backend and patient/doctor interfaces",
        "Separates related ECG/glucose model experiments into their own repositories",
        "Does not provide independent evidence of a live end-to-end deployment or clinical validity",
      ],
      sections: [
        {
          heading: "Architecture Scope",
          body: "The public README describes an academic design spanning sensor acquisition, edge relay, backend storage and telehealth interfaces. Because the implementation source is not included here, individual integrations need to be verified from the original project materials.",
        },
        {
          heading: "Safety and Reproducibility",
          body: "This is not a certified medical device and must not be used for diagnosis or real patient monitoring. Demonstration data are not real patient readings.",
        },
      ],
    },
  },
  {
    slug: "cgm-blood-glucose-anomaly-detection",
    title: "Continuous Glucose (CGM) Deep Learning Anomaly Detection",
    description:
      "Deep learning time-series sequence model trained on continuous glucose monitoring (CGM) sensor trajectories to classify glucose patterns and forecast acute hypo/hyperglycemic risk episodes for diabetes patients.",
    technologies: ["PyTorch", "Time-Series Anomaly Detection", "CGM Sensors", "Python", "Jupyter Notebook"],
    github: "https://github.com/HANIDEVINF/deep-learning-model-for-anomaly-detection-of-blood-glucose-monitoring",
    githubReady: true,
    demo: "/lab/ecg-holter-v7",
    category: "Healthcare AI",
    status: "Research",
    systemType: "Research Implementation",
    trainedDataset: "Continuous Glucose Monitoring (CGM) Physiological Time-Series Sensor Dataset",
    modelType: "Deep Sequence Anomaly Classifier (Temporal 1D-CNN / LSTM Forecaster)",
    metrics: ["Hypo/Hyperglycemia classification", "Temporal CGM stream predictor", "MedGuardAI integration"],
    impact: "Provides proactive clinical risk alerting for diabetes telemetry before glucose crosses dangerous hypoglycemic thresholds.",
  },
  {
    slug: "medical-note-assistant",
    title: "Clinical Medical Note Assistant — Concept Prototype",
    description:
      "A concept for structuring dictated notes and drafting SOAP-style documentation. The linked private repository currently contains a short README rather than a reproducible application; the public VoxScribe demo is a separate prototype and is not this project's implementation.",
    technologies: ["Medical NLP Concept", "SOAP Drafting", "Human Review", "Prototype"],
    github: "https://github.com/HANIDEVINF/medical-note-assistant",
    githubReady: false,
    category: "Healthcare AI",
    status: "Prototype",
    systemType: "In-Browser Prototype",
    metrics: ["Implementation not included in linked repo", "No clinical validation", "Human review required"],
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
    systemType: "Live Client Production",
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
    systemType: "Live Client Production",
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
    systemType: "Live Client Production",
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
    systemType: "Live Client Production",
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
    systemType: "Live Client Production",
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
    systemType: "Live Client Production",
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
    systemType: "In-Browser Prototype",
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
      "MuCAT is a multilingual NLP research architecture for low-resource Maghreb languages. The public code exposes custom attention, FiLM gating, evidential-head and auxiliary-head modules operating over externally supplied backbone hidden states; it does not include the complete end-to-end training/evaluation pipeline needed to reproduce reported benchmark results.",
    technologies: ["mDeBERTa-v3", "Evidential Deep Learning", "FiLM Gating", "Hierarchical Attention", "Berber & Darija NLP", "LLRD"],
    github: "https://github.com/HANIDEVINF/MUCAT-Multilingual-Transformer",
    githubReady: true,
    demo: "/lab/mucat-transformer",
    category: "NLP & Speech AI",
    featured: true,
    status: "CERIST Research",
    systemType: "Research Implementation",
    trainedDataset: "Tatoeba six-language benchmark described in project notes; complete public data-preparation and training/evaluation pipeline is not included", 
    modelType: "Custom task-head modules: Hierarchical Attention Pooling (HAP) + FiLM language-aware gating + evidential Dirichlet head + auxiliary script head", 
    metrics: ["Six-language Maghreb NLP research target", "Architecture modules are public", "End-to-end benchmark reproduction pending"],
    impact:
      "CERIST UbiSys research described in project notes and supervised by Nadir Bouchama. The public repository currently provides the custom head modules and reports, but not a complete reproducible training/evaluation pipeline. The README reports corrected baseline metrics after a label-mapping issue; neither the corrected baseline values nor the 98.20% MuCAT result should be treated as independently reproduced from the public checkout.",
    architecture: [
      "Intended backbone in the research design: pretrained mDeBERTa-v3-base; the public implementation starts from caller-supplied hidden states and does not provide full backbone/tokenizer/training orchestration", 
      "1. Hierarchical Attention Pooling (HAP): Learned gate mixing multi-head token attention summary with the [CLS] residual (inspired by MaxPoolBERT 2025)",
      "2. Language-Aware Gating (LAG — FiLM): Affine scale/shift modulation conditioned on the detected writing-system family",
      "3. Evidential Dirichlet Head (EDL) + 4. AuxHead: Predicts Dirichlet parameters α_i for single-pass predictive uncertainty u = K/S (S = ∑α_i) with multi-task script regularization",
    ],
    caseStudy: {
      subtitle: "CERIST UbiSys research architecture · benchmark reproduction pending", 
      datasetOrScope: "Six languages named in project notes (MSA, Algerian Darija, Kabyle, Chaoui, French, English); the full end-to-end public training/evaluation workflow is not available", 
      keyFindings: [
        "Project reports a controlled comparison, but the end-to-end pipeline is not included in the public checkout; treat all headline accuracy figures as pending independent reproduction", 
        "Implements a Dirichlet-style uncertainty output u = K/S; empirical calibration and real-world abstention behavior still require a reproducible evaluation", 
        "HAP and language-aware FiLM gating are proposed to help the low-resource multilingual setting; their individual contribution needs reproducible ablations", 
        "Layer-freezing and layer-wise learning-rate decay are described in the report; comparative outcomes should not be treated as independently verified until the full experiment is reproducible", 
      ],
      sections: [
        {
          heading: "1. Literature Review & Backbone Selection",
          body: "The report surveys multilingual encoders and low-resource Algerian/Berber NLP work. The public checkout does not include enough of the full benchmark pipeline to independently validate all model selection and comparative-performance claims.",
        },
        {
          heading: "2. Four-Module MuCAT Architecture",
          body: "Stacks (1) Hierarchical Attention Pooling (HAP) mixing token-level attention with the [CLS] residual, (2) Language-Aware Gating (LAG — FiLM affine scale/shift conditioned on writing-system family), (3) Evidential Dirichlet Head (EDL) predicting concentration parameters α_i to compute strength S = ∑α_i and vacuity uncertainty u = K/S in one pass, and (4) Auxiliary script-discrimination head for multi-task regularization.",
        },
        {
          heading: "3. Controlled Experimental Protocol, Label Mapping & Honest Limitations",
          body: "The project notes document a historical label-map discrepancy: 3.88% and 23.74% baseline figures were later marked invalid, and the README lists corrected baselines. The corrected results and MuCAT headline score are still pending independent reproduction from a clean public checkout. The report appropriately distinguishes the mathematical uncertainty output from empirical probability calibration.",
        },
      ],
    },
  },
  {
    slug: "keras-voice-recognition-lab",
    title: "VoxScribe AI — Speech-to-Text, Diarization & SOAP Summarizer",
    description:
      "Multilingual speech intelligence workbench combining real-time browser-native Web Speech API dictation (EN/FR/AR) for clinical note capture with an independent 16×32 FFT acoustic spectrogram Keras classifier trained on spoken digit audio.",
    technologies: ["Web Speech ASR", "NLP Summarization", "Speaker Diarization", "Keras DSP", "Next.js"],
    github: "https://github.com/HANIDEVINF/speech-to-text-summarization",
    githubReady: true,
    demo: "https://speech-to-text-summarization.vercel.app",
    category: "NLP & Speech AI",
    featured: true,
    status: "Live",
    systemType: "In-Browser Prototype",
    trainedDataset: "Free Spoken Digit Dataset (FSDD 2,000+ spoken audio recordings at 8kHz) for acoustic research",
    modelType: "Browser Web Speech API Dictation + 16x32 Hann DFT Spectrogram Matrix Conv1D Classifier",
    metrics: ["Live Mic ASR (EN/FR/AR)", "SOAP & Action Synthesis", "16×32 FFT Acoustic DSP"],
    impact: "Decouples browser-native Web Speech dictation for clinical SOAP synthesis from an exported Keras audio spectrogram model demonstrating digital signal processing on the Free Spoken Digit benchmark.",
  },
  {
    slug: "keras-content-moderation-system",
    title: "UCI SMS Spam & Policy Token Attribution Classifier",
    description:
      "Interpretable NLP spam & policy classifier trained on the UCI SMS Spam Collection (5,574 messages). Users input any text to inspect calibrated spam/risk probability, policy threshold gating, and token-level weight attribution.",
    technologies: ["Keras", "TensorFlow", "UCI SMS Spam", "Token Attribution", "Vercel"],
    github: "https://github.com/HANIDEVINF/content-moderation-system",
    githubReady: true,
    demo: "https://content-moderation-system-psi.vercel.app",
    category: "NLP & Speech AI",
    featured: true,
    status: "Live",
    systemType: "In-Browser Prototype",
    trainedDataset: "UCI SMS Spam Collection (5,574 labeled messages)",
    modelType: "Keras Dense(96)→Dense(32)→Sigmoid with Token Saliency & Policy Gating (99.1% Test Acc)",
    metrics: ["99.1% test acc (UCI SMS Spam)", "5,574 labeled messages", "Live token attribution"],
    impact: "Real exported Keras weights running in-browser with customizable policy thresholds and token-level weight attribution on the UCI SMS benchmark.",
  },
  {
    slug: "keras-document-clustering-lab",
    title: "EmbedCluster 64D — 20 Newsgroups Representation & Topic Lab",
    description:
      "Neural text representation and topic analysis workbench using 64D Keras embeddings trained on 20 Newsgroups. Inspect supervised topic probabilities, pairwise cosine similarity matrices, cluster separation, and 2D projection.",
    technologies: ["Keras", "TensorFlow", "20 Newsgroups", "64D Embeddings", "Cosine Similarity"],
    github: "https://github.com/HANIDEVINF/document-clustering-visualization",
    githubReady: true,
    demo: "https://document-clustering-visualization.vercel.app",
    category: "NLP & Speech AI",
    status: "Live",
    systemType: "In-Browser Prototype",
    trainedDataset: "20 Newsgroups Text Classification Benchmark (18,000+ articles across 20 topics)",
    modelType: "64-Dimensional Latent Neural Text Encoder + Cosine Similarity Metric Space",
    metrics: ["64D neural embeddings", "Cosine similarity & silhouette", "2D PCA projection"],
    impact: "Demonstrates learned 64-dimensional text embeddings, pairwise cosine geometry, and topic separation on user-provided documents.",
  },
  {
    slug: "natural-language-translation-system",
    title: "Lexical & Syntactic Grammar Translation System",
    description:
      "Compiler engineering system built with Flex and Bison in C implementing lexical analysis, AST construction, symbol table hashing, and context-free grammar parsing for formal language translation.",
    technologies: ["Flex", "Bison", "C", "CFG Parsing", "Compiler Design"],
    github: "https://github.com/HANIDEVINF/Natural-Language-Translation-System",
    githubReady: true,
    demo: "/lab",
    category: "NLP & Speech AI",
    status: "Research",
    systemType: "Research Implementation",
    trainedDataset: "Context-Free Grammar Specifications & Lexical Translation Rules",
    modelType: "Deterministic LALR(1) Grammar Syntactic Parser & Lexical Analyzer",
    metrics: ["CFG grammar parsing", "Symbol table hashing", "Semantic translation pass"],
  },

  // ==========================================================================
  // 4. RAG & INFORMATION EXTRACTION
  // ==========================================================================
  {
    slug: "document-qa-rag",
    title: "VeriCite Hybrid Document QA RAG Studio",
    description:
      "In-browser document-retrieval prototype over a seeded sample corpus. Ranking uses keyword overlap and hand-written domain boosts; there are no real embeddings, vector database, LLM-generated answers, or verified citation-grounding metrics in the current implementation.",
    technologies: ["Next.js", "TypeScript", "Seeded Corpus", "Heuristic Retrieval"],
    github: "https://github.com/HANIDEVINF/document-qa-rag",
    githubReady: false,
    demo: "https://document-qa-rag-sand.vercel.app",
    category: "RAG & Information Extraction",
    featured: true,
    status: "Prototype",
    systemType: "In-Browser Prototype",
    metrics: ["Seeded example corpus", "Keyword/domain-boost ranking", "Browser-only passage additions"],
    impact: "Demonstrates the interface for document QA. It is not yet a complete RAG pipeline; source contents and any displayed score are illustrative, and added passages are not persisted.",
  },
  {
    slug: "keras-universal-data-extractor",
    title: "SchemaRoute AI — Structured Extraction UI Prototype",
    description:
      "Frontend scaffold for exploring structured document extraction. The README lists the FastAPI/Pydantic/model backend as planned; the current repository is not yet a complete end-to-end AI extraction service.",
    technologies: ["Next.js", "TypeScript", "Extraction UI", "Prototype"],
    github: "https://github.com/HANIDEVINF/structured-data-extraction",
    githubReady: false,
    demo: "https://structured-data-extraction.vercel.app",
    category: "RAG & Information Extraction",
    status: "Live",
    systemType: "In-Browser Prototype",
    metrics: ["9 document schemas", "OOD unknown class gate", "Validated JSON schema"],
    impact: "Turns unstructured invoices, clinical notes, contracts, and tickets into validated JSON payloads in real time.",
  },
  {
    slug: "financial-document-extractor",
    title: "Financial Document Router — Synthetic-Data Prototype",
    description:
      "Browser demo combining a Keras nine-class document router trained on template-generated synthetic financial text with lightweight field-extraction logic. Its reported 100% test metrics apply only to a held-out split from that synthetic generator; real-world document accuracy has not been established.",
    technologies: ["TensorFlow/Keras", "Synthetic Data", "Document Routing", "Regex/Heuristic Extraction"],
    github: "https://github.com/HANIDEVINF/financial-document-extractor",
    githubReady: true,
    demo: "https://structured-data-extraction.vercel.app",
    category: "RAG & Information Extraction",
    status: "Prototype",
    systemType: "In-Browser Prototype",
    metrics: ["Nine synthetic document classes", "100% reported synthetic-split score", "Real-document evaluation still needed"],
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
    systemType: "Multi-Agent Workflow",
    metrics: ["Custom ticket input", "4 specialized agents", "JSON tool contracts"],
    impact: "Demonstrates multi-agent orchestration, memory gating, and auditable tool execution for enterprise operations.",
  },
  {
    slug: "llm-evaluation-framework",
    title: "EvalGate — LLM Evaluation & CI/CD Safety Gate Framework",
    description:
      "Automated evaluation and regression harness for evaluating LLM generations across Grounded Faithfulness, Policy Adherence, Latency, and Token Cost Pareto frontiers. Features a benchmark test suite, automated test reporting, and interactive candidate comparison.",
    technologies: ["LLM-as-a-Judge", "Python Test Runner", "Safety Gates", "Regression Testing", "MLOps"],
    github: "https://github.com/HANIDEVINF/llm-evaluation-framework",
    githubReady: true,
    demo: "https://llm-evaluation-framework.vercel.app",
    category: "Agentic AI & MLOps",
    status: "Live",
    systemType: "In-Browser Prototype",
    metrics: ["150-test benchmark suite", "CI/CD pass/fail gates", "Latency & cost Pareto curves"],
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
    systemType: "Multi-Agent Workflow",
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
    systemType: "In-Browser Prototype",
    metrics: ["OWASP & leakage audit", "v(G) complexity delta", "Side-by-side diff"],
  },

  // ==========================================================================
  // 6. COMPUTER VISION
  // ==========================================================================
  {
    slug: "keras-vision-classifier",
    title: "VisionTensor Lab — CIFAR-10 Baseline & Perturbation Workbench",
    description:
      "Interactive computer vision baseline workbench for inspecting exported Keras weights, client-side 32×32×3 tensor preprocessing, and sensitivity to RGB channel perturbations and noise.",
    technologies: ["Keras", "TensorFlow", "Computer Vision", "CIFAR-10", "Browser Tensor Engine"],
    github: "https://github.com/HANIDEVINF/image-classification-mobile-app",
    githubReady: true,
    demo: "https://image-classification-mobile-app.vercel.app",
    category: "Computer Vision",
    featured: false,
    status: "Research",
    systemType: "In-Browser Prototype",
    trainedDataset: "CIFAR-10 Benchmark (60,000 32x32 color images across 10 object classes)",
    modelType: "16x16x3 Spatial Tensor Quantized Convolutional Neural Network + RGB Channel Perturbation",
    metrics: ["10 CIFAR-10 classes", "Baseline vs ConvNet ablation", "Live RGB perturbation"],
    impact: "Documented baseline experiment demonstrating browser-native tensor preprocessing, weight serialization, and input perturbation analysis.",
  },
  {
    slug: "real-time-object-detection",
    title: "Real-Time Fall & Object Detection Pipeline",
    description:
      "Computer vision detection pipeline for human fall detection and real-time bounding-box tracking with emergency alert webhooks.",
    technologies: ["YOLO", "OpenCV", "Computer Vision", "Real-Time Inference"],
    github: "https://github.com/HANIDEVINF/Fall-Detection-Model",
    githubReady: true,
    demo: "https://github.com/HANIDEVINF/Fall-Detection-Model",
    category: "Computer Vision",
    status: "Research",
    systemType: "Research Implementation",
    trainedDataset: "Human Posture Acceleration & Multi-View Fall Trajectory Datasets",
    modelType: "Temporal Motion Anomaly Classifier + Vision Bounding Box Tracker",
    metrics: ["Real-time bounding boxes", "Human posture tracking", "Alert webhook"],
  },
  {
    slug: "nexuslearn-edtech-academy",
    title: "NexusLearn EdTech Academy — Online Learning & AI Quiz SaaS",
    description:
      "Modern high-end EdTech SaaS platform featuring student learning dashboards, interactive video course modules, AI quiz evaluation with instant feedback, course progress tracking, and instructor analytics.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AI Quiz Evaluation", "EdTech SaaS"],
    github: "https://github.com/HANIDEVINF/portfolio",
    githubReady: true,
    demo: "/edtech",
    category: "EdTech & SaaS Platform",
    featured: true,
    status: "Client Production",
    systemType: "Live Client Production",
    metrics: ["Interactive video modules", "AI quiz evaluation engine", "Student grade tracking"],
    impact: "Commercial EdTech platform delivering personalized learning tracks, AI-powered quiz assessments, and professional course management.",
  },
  {
    slug: "autonomous-multi-agent-research-studio",
    title: "AI-Assisted Research Draft Studio",
    description:
      "A Next.js prototype that sends a research topic to one Gemini model call and renders a structured technical draft. It does not browse the web, retrieve documents, run independent agents, or verify citations; model output requires human fact-checking.",
    technologies: ["Google Gemini API", "Next.js", "Structured Prompting", "Markdown Export"],
    github: "https://github.com/HANIDEVINF/portfolio",
    githubReady: true,
    demo: "/lab/agentic-research",
    category: "Agentic AI & MLOps",
    featured: true,
    status: "Prototype",
    systemType: "In-Browser Prototype",
    metrics: ["Single model API call", "Server-side elapsed-time reporting", "Markdown draft export"],
    impact: "Demonstrates a research-drafting interface with explicit limits on retrieval and verification; it is not a multi-agent research system.",
  },
]
