import { GoogleGenAI, Type } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  })
}

export async function POST(req: NextRequest) {
  const rawLength = Number(req.headers.get("content-length") || 0)
  if (Number.isFinite(rawLength) && rawLength > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Request payload is too large. Maximum size is 10 MB." }, { status: 413 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 })
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 })
  }

  const record = body as Record<string, unknown>
  const task = record.task
  const payload = record.payload
  if (typeof task !== "string" || !task.trim()) {
    return NextResponse.json({ error: "A non-empty task is required." }, { status: 400 })
  }
  if (payload !== undefined && (!payload || typeof payload !== "object" || Array.isArray(payload))) {
    return NextResponse.json({ error: "Payload must be a JSON object." }, { status: 400 })
  }
  if (payload && typeof payload === "object" && "audioBase64" in payload) {
    const audio = (payload as Record<string, unknown>).audioBase64
    if (typeof audio === "string" && audio.length > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Encoded audio payload is too large." }, { status: 413 })
    }
  }

  const ai = getAiClient()

  try {
    if (task === "ecg_clinical_analysis") {
      const { rhythmClass, heartRateBpm, rrPrev, rrNext, prematurityRatio, compensatoryRatio, patientNotes } = payload || {}

      if (ai) {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `Perform a structured cardiology Holter telemetry analysis for the following beat window:
- Detected AAMI Class: ${rhythmClass}
- Instantaneous Heart Rate: ${heartRateBpm} BPM
- Previous RR Interval: ${rrPrev} s
- Next RR Interval: ${rrNext} s
- Prematurity Ratio (RR_prev / RR_local): ${prematurityRatio}
- Compensatory Pause Ratio (RR_next / RR_local): ${compensatoryRatio}
- Clinical Context / Patient Notes: ${patientNotes || "Ambulatory 2-lead Holter (MLII + V1)"}`,
          config: {
            systemInstruction:
              "You are an educational text-generation assistant. You are not connected to the trained ECG_CNN_Attention_v7 model unless actual model outputs are explicitly supplied. Interpret only the supplied values, describe uncertainty, do not diagnose, and do not prescribe medication or treatment. Return a cautious JSON draft for clinician review.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                clinicalSummary: { type: Type.STRING },
                morphologyAndRhythmMechanism: { type: Type.STRING },
                riskStratification: { type: Type.STRING },
                recommendedHolterFollowUp: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["clinicalSummary", "morphologyAndRhythmMechanism", "riskStratification", "recommendedHolterFollowUp"],
            },
          },
        })
        const parsed = JSON.parse(response.text || "{}")
        return NextResponse.json({ source: "gemini-3.8-flash", mode: "model_generated_unverified", modelGenerated: true, demoOnly: false, disclaimer: "AI-generated draft; not independently verified. Clinical content requires qualified clinician review and must not be used as a standalone diagnosis or treatment recommendation.", result: parsed })
      }

      return NextResponse.json({
        source: "demo-only-fallback-ecg",
        mode: "demo_fallback",
        modelGenerated: false,
        demoOnly: true,
        disclaimer: "Illustrative hard-coded fallback, not model inference and not medical advice. Do not use to diagnose, triage, or change medication.",
        result: {
          clinicalSummary: `Detected AAMI Class ${rhythmClass} beat at ${heartRateBpm} BPM with prematurity ratio ${prematurityRatio} and compensatory pause ratio ${compensatoryRatio}.`,
          morphologyAndRhythmMechanism:
            rhythmClass === "V"
              ? "Wide bizarre QRS complex (>120 ms) lacking preceding P-wave, coupled with shortened RR_prev and full compensatory pause (RR_next / RR_local > 1.25), characteristic of Premature Ventricular Contraction (PVC)."
              : rhythmClass === "S"
                ? "Narrow QRS morphology with premature ectopic atrial depolarization (RR_prev / RR_local < 0.85) and incomplete compensatory pause, consistent with Supraventricular Ectopic Beat (PAC)."
                : "Regular sinus rhythm morphology on MLII + V1 with physiological R-R interval stability and normal PR/QRS conduction.",
          riskStratification:
            rhythmClass === "V"
              ? "Elevated Ectopic Burden — Monitor for R-on-T phenomenon, ventricular bigeminy, or non-sustained VT runs."
              : rhythmClass === "S"
                ? "Moderate Atrial Ectopy — Evaluate for paroxysmal atrial fibrillation trigger potential."
                : "Nominal Sinus Baseline — Low immediate arrhythmic risk.",
          recommendedHolterFollowUp: [
            "Quantify 24-hour ectopic burden percentage across full ambulatory recording",
            "Cross-check potassium/magnesium serum electrolytes and medication QT intervals",
            "Verify TFLite INT8 edge inference agreement against Lead V1 + MLII morphology",
          ],
        },
      })
    }

    if (task === "voice_scribe_soap") {
      const { transcript, language, audioBase64, mimeType } = payload || {}

      if (ai) {
        let finalTranscript = transcript || ""
        if (audioBase64 && mimeType) {
          const transRes = await ai.models.generateContent({
            model: "gemini-3.5-transcribe",
            contents: {
              parts: [
                { inlineData: { mimeType, data: audioBase64 } },
                { text: "Transcribe this medical or executive voice note accurately." },
              ],
            },
          })
          finalTranscript = transRes.text || finalTranscript
        }

        const soapRes = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `Analyze this dictated consultation note (${language || "Trilingual AR/FR/EN"}): "${finalTranscript}"`,
          config: {
            systemInstruction:
              "You are a drafting assistant, not a clinician. Convert the supplied dictation into a structured draft, clearly distinguish spoken facts from inferred content, do not invent patient measurements or diagnoses, and state that all clinical content and code candidates require qualified human verification.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                cleanedTranscript: { type: Type.STRING },
                subjective: { type: Type.STRING },
                objective: { type: Type.STRING },
                assessment: { type: Type.STRING },
                plan: { type: Type.ARRAY, items: { type: Type.STRING } },
                entities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      category: { type: Type.STRING },
                      value: { type: Type.STRING },
                      code: { type: Type.STRING },
                    },
                    required: ["category", "value", "code"],
                  },
                },
              },
              required: ["cleanedTranscript", "subjective", "objective", "assessment", "plan", "entities"],
            },
          },
        })
        return NextResponse.json({ source: "gemini-3.8-flash", mode: "model_generated_unverified", modelGenerated: true, demoOnly: false, disclaimer: "AI-generated transcription and SOAP draft; verify against the original audio and clinical record. Do not use as a standalone diagnosis or treatment plan.", result: JSON.parse(soapRes.text || "{}") })
      }

      return NextResponse.json({
        source: "demo-only-fallback-soap",
        mode: "demo_fallback",
        modelGenerated: false,
        demoOnly: true,
        disclaimer: "Illustrative sample note, not generated from the supplied transcript and not a real medical record. Do not use for care decisions.",
        result: {
          cleanedTranscript: transcript,
          subjective: "Patient reports intermittent palpitations and mild exertional fatigue over the past 72 hours.",
          objective: "BP 128/82 mmHg, HR 88 BPM. Ambulatory 2-lead Holter trace shows isolated premature ventricular contractions (PVCs).",
          assessment: "Symptomatic ventricular ectopy (AAMI Class V) requiring 24-hour Holter burden quantification and metabolic panel.",
          plan: [
            "Order 24-hour dual-lead ECG Holter monitoring (MLII + V1)",
            "Complete serum electrolytes (K+, Mg2+) and TSH thyroid panel",
            "Advise reduction of caffeine/stimulant intake and schedule cardiology review in 7 days",
          ],
          entities: [
            { category: "Symptom", value: "Intermittent Palpitations", code: "ICD-10 R00.2" },
            { category: "Telemetry", value: "Premature Ventricular Contractions", code: "ICD-10 I49.3" },
            { category: "Procedure", value: "24h Ambulatory Holter ECG", code: "CPT 93224" },
          ],
        },
      })
    }

    if (task === "mucat_multilingual_analyze") {
      const { text } = payload || {}
      if (ai) {
        const res = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `Perform MUCAT trilingual (Arabic / French / English) code-switched NLP analysis on: "${text}"`,
          config: {
            systemInstruction:
              "You are a generic language-model demo for code-switched Arabic/Darja, French, and English text. You are not executing the MuCAT trained weights and must not present invented token weights as measured model attention. Clearly treat language weights and token-level labels as illustrative estimates.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                detectedIntent: { type: Type.STRING },
                sentimentUrgency: { type: Type.STRING },
                languageGatingWeights: {
                  type: Type.OBJECT,
                  properties: {
                    arabic: { type: Type.NUMBER },
                    french: { type: Type.NUMBER },
                    english: { type: Type.NUMBER },
                  },
                  required: ["arabic", "french", "english"],
                },
                translations: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    fr: { type: Type.STRING },
                    ar: { type: Type.STRING },
                  },
                  required: ["en", "fr", "ar"],
                },
                tokenSpans: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      token: { type: Type.STRING },
                      lang: { type: Type.STRING },
                      attentionWeight: { type: Type.NUMBER },
                      role: { type: Type.STRING },
                    },
                    required: ["token", "lang", "attentionWeight", "role"],
                  },
                },
              },
              required: ["detectedIntent", "sentimentUrgency", "languageGatingWeights", "translations", "tokenSpans"],
            },
          },
        })
        return NextResponse.json({ source: "gemini-3.8-flash", mode: "model_generated_unverified", modelGenerated: true, demoOnly: false, disclaimer: "Generic Gemini output, not inference from the MuCAT trained model. Token weights are generated estimates, not measured attention values.", result: JSON.parse(res.text || "{}") })
      }

      return NextResponse.json({
        source: "demo-only-fallback-mucat",
        mode: "demo_fallback",
        modelGenerated: false,
        demoOnly: true,
        disclaimer: "Canned illustrative sample, not MuCAT inference. The language-gating weights and token weights are fixed fixture values, not measured model outputs.",
        result: {
          detectedIntent: "Clinical / Commercial Appointment & Order Inquiry",
          sentimentUrgency: "High Priority · Actionable Request",
          languageGatingWeights: { arabic: 0.42, french: 0.38, english: 0.2 },
          translations: {
            en: "Hello doctor, I have chest palpitations since yesterday and I would like to book an urgent Holter ECG consultation today.",
            fr: "Bonjour docteur, j'ai des palpitations cardiaques depuis hier et je voudrais réserver une consultation Holter ECG urgente aujourd'hui.",
            ar: "مرحباً دكتور، أعاني من خفقان في القلب منذ الأمس وأود حجز استشارة تخطيط قلب هولتر عاجلة اليوم.",
          },
          tokenSpans: [
            { token: "Salam / Bonjour", lang: "AR/FR", attentionWeight: 0.64, role: "Discourse Greeting" },
            { token: "palpitations", lang: "FR/EN", attentionWeight: 0.94, role: "Clinical Trigger Entity" },
            { token: "Holter ECG", lang: "EN/FR", attentionWeight: 0.91, role: "Diagnostic Modality" },
            { token: "urgent / lyoum", lang: "FR/AR", attentionWeight: 0.89, role: "Temporal SLA Modifier" },
          ],
        },
      })
    }

    if (task === "erp_fiscal_copilot") {
      const { revenueDzd, vatCollectedDzd, deductibleVatDzd, tapRate, query } = payload || {}
      if (ai) {
        const res = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: `Analyze Algerian G50 fiscal ledger and merchant query:
- Monthly Gross Turnover (HT): ${revenueDzd} DZD
- TVA Collected (19%): ${vatCollectedDzd} DZD
- TVA Deductible on Purchases: ${deductibleVatDzd} DZD
- TAP / Local Fiscal Rate: ${tapRate}%
- Executive Query: ${query}`,
          config: {
            systemInstruction:
              "You are an informational accounting assistant, not a certified Algerian tax auditor. Do not guarantee compliance, invent official deadlines or regulatory interpretations, and clearly state that calculations and tax suggestions need checking against current DGI rules and a qualified professional.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                auditVerdict: { type: Type.STRING },
                g50SummaryNote: { type: Type.STRING },
                cashflowRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["auditVerdict", "g50SummaryNote", "cashflowRecommendations"],
            },
          },
        })
        return NextResponse.json({ source: "gemini-3.8-flash", mode: "model_generated_unverified", modelGenerated: true, demoOnly: false, disclaimer: "AI-generated tax/accounting draft only. It is not a compliance determination; verify figures, deadlines and applicable Algerian rules with current official guidance or a qualified professional.", result: JSON.parse(res.text || "{}") })
      }

      const netTva = Math.max(0, (vatCollectedDzd || 0) - (deductibleVatDzd || 0))
      return NextResponse.json({
        source: "demo-only-fallback-erp",
        mode: "demo_fallback",
        modelGenerated: false,
        demoOnly: true,
        disclaimer: "Illustrative fallback only. This is not an Algerian tax compliance check and does not verify official deadlines, invoices, or DGI rules.",
        result: {
          auditVerdict: `G50 Declaration Balanced — Net Payable TVA: ${netTva.toLocaleString()} DZD (Filing Deadline: 20th of following month)`,
          g50SummaryNote:
            "All supplier invoices carry verified NIF/NIS tax identifiers. Deductible TVA on inventory restocking is compliant with Algerian DGI G50 regulations.",
          cashflowRecommendations: [
            "Reconcile pending 58-wilaya COD courier remittances (Yalidine / ZR Express) prior to the 18th to optimize G50 treasury liquidity",
            "Automate credit-note generation for returned Mascara & Sidi Bel Abbès parcels to reclaim invoiced TVA",
            "Reallocate slow-moving apparel SKUs via multi-store stock transfer between Algiers and Oran warehouses",
          ],
        },
      })
    }

    return NextResponse.json({ error: "Unsupported AI task" }, { status: 400 })
  } catch {
    // Keep provider details and possibly sensitive request context out of client-facing errors.
    return NextResponse.json(
      { error: "AI Studio request failed. Check the server configuration and try again." },
      { status: 502 }
    )
  }
}
