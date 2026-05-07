export type PortfolioProject = {
  title: string
  description: string
  technologies: string[]
  github: string
  demo?: string
  category: "AI/ML" | "MLOps" | "Computer Vision" | "Full Stack"
  featured?: boolean
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "CodeRefactor AI",
    description: "AI code refactoring bot with browser-based review workflow, quality scoring, and cloud persistence.",
    technologies: ["Next.js", "JavaScript", "Supabase", "Vercel"],
    github: "https://github.com/HANIDEVINF/coderefactor-ai",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "DocumentQAwithRAG",
    description: "Production-ready document Q&A using retrieval-augmented generation, chunking, embeddings, and source-aware answers.",
    technologies: ["Next.js", "TypeScript", "Supabase", "RAG"],
    github: "https://github.com/HANIDEVINF/DocumentQAwithRAG",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Tool Calling Agent",
    description: "Agent system that can call tools, orchestrate multi-step tasks, and recover from tool failures.",
    technologies: ["Python", "Agents", "LLM APIs", "Async"],
    github: "https://github.com/HANIDEVINF/tool-calling-agent",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "Structured Data Extraction",
    description: "Pipeline to extract validated JSON from unstructured text with schema checks and retry logic.",
    technologies: ["Python", "Pydantic", "FastAPI", "LLM APIs"],
    github: "https://github.com/HANIDEVINF/structured-data-extraction",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "LLM Evaluation Framework",
    description: "Quality testing framework for LLM outputs with automated evaluation workflows and regression checks.",
    technologies: ["Python", "Pytest", "DeepEval", "CI"],
    github: "https://github.com/HANIDEVINF/llm-evaluation-framework",
    category: "MLOps",
  },
  {
    title: "Containerized AI API Service",
    description: "Container-first AI API deployment setup with reproducible environments and CI-friendly workflows.",
    technologies: ["FastAPI", "Docker", "GitHub Actions", "Cloud"],
    github: "https://github.com/HANIDEVINF/containerized-ai-api-service",
    category: "MLOps",
  },
  {
    title: "Document QA RAG",
    description: "RAG experiment focused on fast semantic retrieval and concise question answering over documents.",
    technologies: ["Python", "Vector Search", "LangChain", "RAG"],
    github: "https://github.com/HANIDEVINF/document-qa-rag",
    category: "AI/ML",
  },
  {
    title: "AI Recommendation System",
    description: "Personalized recommendation engine with embedding-based matching and explainable ranking logic.",
    technologies: ["Python", "Embeddings", "Vector DB", "API"],
    github: "https://github.com/HANIDEVINF/ai-recommendation-system",
    category: "AI/ML",
  },
  {
    title: "Document Clustering Visualization",
    description: "Interactive project for semantic clustering and visual exploration of related text/document groups.",
    technologies: ["Python", "UMAP", "Clustering", "Visualization"],
    github: "https://github.com/HANIDEVINF/document-clustering-visualization",
    category: "AI/ML",
  },
  {
    title: "Speech-to-Text Summarization",
    description: "Audio transcription plus AI summarization pipeline for meetings and voice notes.",
    technologies: ["Speech-to-Text", "Python", "Summarization", "LLM APIs"],
    github: "https://github.com/HANIDEVINF/speech-to-text-summarization",
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
    title: "Multi-Agent Support Bot",
    description: "Support automation architecture using multiple specialized agents and routing logic.",
    technologies: ["Python", "Multi-Agent", "Orchestration", "NLP"],
    github: "https://github.com/HANIDEVINF/multi-agent-support-bot",
    category: "AI/ML",
  },
  {
    title: "Content Moderation System",
    description: "Text and image moderation pipeline with model-driven risk detection and scoring.",
    technologies: ["Python", "NLP", "Vision", "Moderation"],
    github: "https://github.com/HANIDEVINF/content-moderation-system",
    category: "Computer Vision",
  },
  {
    title: "Financial Document Extractor",
    description: "OCR and structured extraction workflow for invoices and financial forms.",
    technologies: ["OCR", "Python", "Regex", "Data Extraction"],
    github: "https://github.com/HANIDEVINF/financial-document-extractor",
    category: "AI/ML",
  },
  {
    title: "Image Classification Mobile App",
    description: "Mobile-oriented image classification app concept using cloud inference and efficient UI flow.",
    technologies: ["Flutter", "Computer Vision", "API", "Mobile"],
    github: "https://github.com/HANIDEVINF/image-classification-mobile-app",
    category: "Computer Vision",
  },
  {
    title: "Real-Time Object Detection",
    description: "Real-time detection pipeline for live camera/video streams with model inference and overlays.",
    technologies: ["YOLO", "OpenCV", "Python", "Realtime"],
    github: "https://github.com/HANIDEVINF/real-time-object-detection",
    category: "Computer Vision",
  },
]
