import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { questionId, selectedAnswer } = await req.json()
    
    // Mock EdTech AI Quiz Evaluation
    const correctMap: Record<string, string> = {
      q1: "b",
      q2: "a",
      q3: "c",
    }

    const correct = correctMap[questionId] === selectedAnswer
    const explanation = correct
      ? "Correct! You have demonstrated strong mastery of the core concept."
      : "Not quite. Review module lessons on attention heads and multi-head scaling factors to understand the nuance."

    return NextResponse.json({
      ok: true,
      correct,
      explanation,
      scoreAwarded: correct ? 100 : 20,
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to evaluate quiz answer." },
      { status: 500 }
    )
  }
}
