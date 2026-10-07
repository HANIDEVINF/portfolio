import { NextRequest, NextResponse } from "next/server"
import { buildResumePdfBytes } from "@/lib/resume-pdf-builder"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get("lang") === "fr" ? "fr" : "en"
  const filename = lang === "fr" ? "Ghena_Hani_CV_FR.pdf" : "Ghena_Hani_CV_EN.pdf"

  const pdfBytes = buildResumePdfBytes(lang)

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}
