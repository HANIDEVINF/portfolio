export type PortfolioProject = {
  title: string
  description: string
  technologies: string[]
  github: string
  demo?: string
  category: "AI/ML" | "MLOps" | "Computer Vision" | "Full Stack"
  featured?: boolean
  status?: "Live" | "In Progress"
  metrics?: string[]
  impact?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Keras Content Moderation System",
    description:
      "Production-style moderation app powered by a trained Keras neural network. Users type any message and get live unsafe/spam probability, confidence bands, and model metrics.",
    technologies: ["Keras", "TensorFlow", "NLP", "Browser Inference", "Vercel"],
    github: "https://github.com/HANIDEVINF/content-moderation-system",
    demo: "https://content-moderation-system-psi.vercel.app",
    category: "AI/ML",
    featured: true,
    status: "Live",
    metrics: ["99.1% test accuracy", "UCI SMS dataset", "User text input"],
    impact: "Shows real text classification, training artifacts, metrics, and end-to-end deployment.",
  },
  {
    title: "Keras Voice Recognition Lab",
    description:
      "Audio ML app with a Keras dense model trained on the Free Spoken Digit Dataset. Users can record from the microphone or upload audio and inspect probability bars.",
    technologies: ["Keras", "TensorFlow", "Audio ML", "Microphone API", "FFT Features"],
    github: "https://github.com/HANIDEVINF/speech-to-text-summarization",
    demo: "https://speech-to-text-summarization.vercel.app",
    category: "AI/ML",
    featured: true,
    status: "Live",
    metrics: ["92.2% macro F1", "Real audio dataset", "Record or upload"],
    impact: "Demonstrates signal processing, Keras training, exported weights, and real browser audio inference.",
  },
  {
    title: "Keras Vision Classifier",
    description:
      "Image classification app trained on CIFAR-10 with saved Keras artifacts and a static browser inference engine. Users upload their own image and see ranked probabilities.",
    technologies: ["Keras", "TensorFlow", "Computer Vision", "CIFAR-10", "Static Deployment"],
    github: "https://github.com/HANIDEVINF/image-classification-mobile-app",
    demo: "https://image-classification-mobile-app.vercel.app",
    category: "Computer Vision",
    featured: true,
    status: "Live",
    metrics: ["50.1% test accuracy", "10 vision classes", "Image upload"],
    impact: "Good proof of model export and deployment; marked as a compact baseline ready for broader vision upgrades.",
  },
  {
    title: "Aurelia Market AI Commerce",
    description:
      "Premium ecommerce experience with AI-style product personalization, food and car sections, smart cart, account profiles, comparison, wishlist, and checkout flows.",
    technologies: ["Next.js", "TypeScript", "AI UX", "Ecommerce", "Vercel"],
    github: "https://github.com/HANIDEVINF/ai-recommendation-system",
    demo: "https://ai-recommendation-system.vercel.app",
    category: "Full Stack",
    featured: true,
    status: "Live",
    metrics: ["Smart cart", "Food and cars", "Checkout panels"],
    impact: "Highlights product thinking and polished full-stack interface work alongside AI portfolio projects.",
  },
  {
    title: "LLM Evaluation Framework",
    description:
      "Quality testing dashboard for comparing model responses across safety, faithfulness, helpfulness, latency, and cost regression gates.",
    technologies: ["Next.js", "Evaluation", "Safety", "Regression Testing"],
    github: "https://github.com/HANIDEVINF/llm-evaluation-framework",
    demo: "https://llm-evaluation-framework.vercel.app",
    category: "MLOps",
    status: "Live",
    metrics: ["Safety gates", "Model leaderboard", "Scenario tests"],
    impact: "Shows MLOps judgment: not only building AI, but measuring whether it behaves safely.",
  },
  {
    title: "ResolveAI Multi-Agent Support Bot",
    description:
      "Support automation dashboard with specialized agents for triage, billing, technical debugging, retention, memory, and audit-safe response drafting.",
    technologies: ["Agents", "Routing", "Support Automation", "Next.js"],
    github: "https://github.com/HANIDEVINF/multi-agent-support-bot",
    demo: "https://multi-agent-support-bot.vercel.app",
    category: "AI/ML",
    status: "Live",
    metrics: ["Agent routing", "Memory toggle", "Audit trail"],
    impact: "Demonstrates agent workflow design and user-facing automation for real support operations.",
  },
  {
    title: "OpsPilot AI Incident Copilot",
    description:
      "Agentic incident-response interface for service health, tool calls, runbooks, governance mode, impact analysis, and executive summaries.",
    technologies: ["MLOps", "Agentic UI", "Runbooks", "Incident Response"],
    github: "https://github.com/HANIDEVINF/containerized-ai-api-service",
    demo: "https://containerized-ai-api-service.vercel.app",
    category: "MLOps",
    status: "Live",
    metrics: ["Tool calls", "Risk scoring", "Runbook plan"],
    impact: "Positions the portfolio around operational AI systems companies actually need.",
  },
  {
    title: "Keras Universal Data Extractor",
    description:
      "Structured extraction app with a trained Keras schema router, unknown-input handling, text-file upload, universal entity detection, and validated JSON output.",
    technologies: ["Keras", "TensorFlow", "Information Extraction", "JSON", "Browser Inference"],
    github: "https://github.com/HANIDEVINF/structured-data-extraction",
    demo: "https://structured-data-extraction-app.vercel.app",
    category: "AI/ML",
    featured: true,
    status: "Live",
    metrics: ["9 document types", "Unknown class", "Paste or upload text"],
    impact: "Turns the earlier parser demo into a real trained model workflow that handles arbitrary text safely.",
  },
  {
    title: "Keras Document Clustering Lab",
    description:
      "Document clustering interface powered by Keras embeddings trained on 20 Newsgroups. Users paste any document set and get topic probabilities plus a 2D cluster map.",
    technologies: ["Keras", "TensorFlow", "20 Newsgroups", "Embeddings", "Clustering"],
    github: "https://github.com/HANIDEVINF/document-clustering-visualization",
    demo: "https://document-clustering-visualization.vercel.app",
    category: "AI/ML",
    featured: true,
    status: "Live",
    metrics: ["60.5% test accuracy", "20 topics", "Multi-document input"],
    impact: "Shows learned text embeddings, real dataset training, and interactive visualization for user-provided documents.",
  },
  {
    title: "Document QA RAG",
    description: "RAG experiment focused on fast semantic retrieval and concise question answering over documents.",
    technologies: ["Python", "Vector Search", "LangChain", "RAG"],
    github: "https://github.com/HANIDEVINF/document-qa-rag",
    category: "AI/ML",
  },
  {
    title: "Medical Note Assistant",
    description: "Domain-focused assistant concept for medical notes and Q&A with safety-minded response patterns.",
    technologies: ["Python", "Medical NLP", "RAG", "Prompting"],
    github: "https://github.com/HANIDEVINF/medical-note-assistant",
    category: "AI/ML",
  },
  {
    title: "CodeRefactor AI",
    description: "AI code refactoring bot with browser-based review workflow, quality scoring, and cloud persistence.",
    technologies: ["Next.js", "JavaScript", "Supabase", "Vercel"],
    github: "https://github.com/HANIDEVINF/coderefactor-ai",
    category: "AI/ML",
  },
  {
    title: "Financial Document Extractor",
    description: "OCR and structured extraction workflow for invoices and financial forms.",
    technologies: ["OCR", "Python", "Regex", "Data Extraction"],
    github: "https://github.com/HANIDEVINF/financial-document-extractor",
    category: "AI/ML",
  },
  {
    title: "Real-Time Object Detection",
    description: "Real-time detection pipeline for live camera/video streams with model inference and overlays.",
    technologies: ["YOLO", "OpenCV", "Python", "Realtime"],
    github: "https://github.com/HANIDEVINF/real-time-object-detection",
    category: "Computer Vision",
  },
]
