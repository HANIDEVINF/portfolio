import { GoogleGenAI } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"

const MAX_QUERY_LENGTH = 2000

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Request body must be valid JSON." }, { status: 400 })
  }

  if (!body || typeof body !== "object" || !("query" in body)) {
    return NextResponse.json({ ok: false, error: "Research query is required." }, { status: 400 })
  }

  const query = (body as { query?: unknown }).query
  if (typeof query !== "string" || !query.trim()) {
    return NextResponse.json({ ok: false, error: "Research query must be a non-empty string." }, { status: 400 })
  }

  const normalizedQuery = query.trim()
  if (normalizedQuery.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "Research query must be " + MAX_QUERY_LENGTH + " characters or fewer." },
      { status: 413 },
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Research synthesis is not configured. Set GEMINI_API_KEY on the server." },
      { status: 503 },
    )
  }

  const ai = new GoogleGenAI({ apiKey })
  const prompt = [
    "Create a structured technical research draft for the following topic:",
    normalizedQuery,
    "",
    "Use Markdown and these sections where relevant:",
    "1. Research question and concise overview",
    "2. Important concepts and approaches",
    "3. Possible architecture or implementation plan",
    "4. Evaluation questions and likely failure modes",
    "5. Limitations, uncertainties, and next steps for verification",
    "",
    "Accuracy requirements:",
    "- You are generating a draft from the model's available knowledge in a single model call.",
    "- Do not claim that you browsed the web, retrieved external documents, ran experiments, consulted independent agents, or independently verified citations.",
    "- Do not invent measured benchmarks, dates, paper titles, DOIs, URLs, or source quotations.",
    "- Clearly label claims that need independent verification, especially current facts, numbers, laws, clinical claims, and research comparisons.",
    "- Prefer explaining what evidence would be needed over inventing an answer when uncertain.",
    "- The output is a starting point for human review, not a verified research report.",
  ].join("\n")

  const startedAt = Date.now()
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })
    const reportText = response.text?.trim()

    if (!reportText) {
      return NextResponse.json(
        { ok: false, error: "The model returned an empty response. Please retry." },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      query: normalizedQuery,
      timestamp: new Date().toISOString(),
      source: "Gemini API · gemini-2.5-flash",
      executionMode: "single_model_call",
      latencyMs: Date.now() - startedAt,
      report: reportText,
    })
  } catch {
    // Avoid returning provider errors or request data to the browser.
    return NextResponse.json(
      { ok: false, error: "Research synthesis failed. Check server configuration and try again." },
      { status: 502 },
    )
  }
}
