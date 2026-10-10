import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const MAX_REQUESTS_PER_WINDOW = 5
const WINDOW_MS = 10 * 60 * 1000
const requestWindows = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

function isRateLimited(clientIp: string) {
  const now = Date.now()
  const current = requestWindows.get(clientIp)
  if (!current || current.resetAt <= now) {
    requestWindows.set(clientIp, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) return true
  current.count += 1
  return false
}

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()
    const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {}
    const name = readText(data.name, 120)
    const email = readText(data.email, 254).toLowerCase()
    const subject = readText(data.subject, 180) || "Portfolio contact inquiry"
    const message = readText(data.message, 5_000)
    const website = readText(data.website, 200)

    if (website) return NextResponse.json({ ok: true })

    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a name, valid email address, and message." },
        { status: 400 }
      )
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { ok: false, error: "Too many messages. Please try again in a few minutes." },
        { status: 429 }
      )
    }

    let storedInDb = false
    let relayedViaEmail = false

    // Service-role access stays on the server; falls back to publishable key if RLS insert policy allows.
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kzjyetclbsljbjkarlpc.supabase.co"
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "sb_publishable_dgzwe5XyZeP8SvXjsqDShQ_cB8D6M9M"

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)
        const { error } = await supabase.from("contact_messages").insert({
          name,
          email,
          subject,
          message,
        })
        if (!error) storedInDb = true
      } catch (dbErr) {
        console.warn("Contact DB insert warning:", dbErr)
      }
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "hanighena4@gmail.com"
    if (recipient) {
      try {
        const endpoint =
          process.env.FORMSUBMIT_ENDPOINT ||
          `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`
        const fsRes = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://portfolio-theta-seven-83.vercel.app",
            Referer: "https://portfolio-theta-seven-83.vercel.app/",
          },
          body: JSON.stringify({
            name,
            email,
            _subject: subject,
            message,
            _captcha: "false",
            _template: "table",
          }),
        })
        if (fsRes.ok) {
          const fsJson = await fsRes.json().catch(() => null)
          if (fsJson && (fsJson.success === "true" || fsJson.success === true)) {
            relayedViaEmail = true
          }
        }
      } catch {
        // The form can still be recorded in Supabase when the relay is unavailable.
      }
    }

    if (!storedInDb && !relayedViaEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "The contact service is unavailable. Please use the email link instead.",
        },
        { status: 503 }
      )
    }

    return NextResponse.json({
      ok: true,
      storedInDb,
      relayedViaEmail,
      recipient,
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to process contact message." },
      { status: 500 }
    )
  }
}
