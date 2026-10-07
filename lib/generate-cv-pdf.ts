"use client"

import { buildResumePdfBytes } from "@/lib/resume-pdf-builder"

export function generateAndDownloadResumePdf(lang: "en" | "fr" = "en") {
  const filename = lang === "fr" ? "Ghena_Hani_CV_FR.pdf" : "Ghena_Hani_CV_EN.pdf"
  try {
    const bytes = buildResumePdfBytes(lang)
    const blob = new Blob([bytes], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 3000)
  } catch {
    window.location.assign(`/api/cv?lang=${lang}`)
  }
}
