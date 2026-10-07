import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    let storedInDb = false
    let relayedViaEmail = false

    // 1. Attempt server-side Supabase insert if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)
        const { error } = await supabase.from("contact_messages").insert({
          name: String(name).trim(),
          email: String(email).trim(),
          subject: String(subject || "Portfolio Contact Inquiry").trim(),
          message: String(message).trim(),
        })
        if (!error) storedInDb = true
      } catch (dbErr) {
        console.warn("Contact DB insert warning:", dbErr)
      }
    }

    // 2. Also relay via FormSubmit AJAX endpoint to hanighena4@gmail.com if reachable
    try {
      const fsRes = await fetch("https://formsubmit.co/ajax/hanighena4@gmail.com", {
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
          _subject: subject || `New Portfolio Message from ${name}`,
          message,
          _captcha: "false",
        }),
      })
      if (fsRes.ok) {
        const fsJson = await fsRes.json().catch(() => null)
        if (fsJson && (fsJson.success === "true" || fsJson.success === true)) {
          relayedViaEmail = true
        }
      }
    } catch {
      // Ignore external relay network errors
    }

    return NextResponse.json({
      ok: true,
      storedInDb,
      relayedViaEmail,
      recipient: "hanighena4@gmail.com",
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to process contact message." },
      { status: 500 }
    )
  }
}
