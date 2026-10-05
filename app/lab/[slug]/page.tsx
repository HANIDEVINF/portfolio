"use client"

import { use } from "react"
import InteractiveAiCommercialLabPage from "../page"

const SLUG_MAP: Record<string, any> = {
  "ecg-holter-v7": "ecg-holter-v7",
  "voxscribe-speech-ai": "voxscribe-speech-ai",
  "mucat-transformer": "mucat-transformer",
  "tadjmeel-clinica": "tadjmeel-clinica",
  "dzd-enterprise-erp": "dzd-enterprise-erp",
  "allure-gk-boutique": "allure-gk-boutique",
  "vericite-hybrid-rag": "vericite-hybrid-rag",
  "neural-moderation-eval": "neural-moderation-eval",
}

export default function StudioDeepLinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = use(params)
  const studioId = SLUG_MAP[resolved.slug] || "ecg-holter-v7"
  return <InteractiveAiCommercialLabPage initialStudio={studioId} />
}
