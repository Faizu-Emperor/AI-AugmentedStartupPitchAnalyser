import { NextRequest, NextResponse } from "next/server";
import { ANALYSIS_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

function stripJsonFences(text: string): string {
  let t = text.trim();
  if (t.startsWith("```")) {
    t = t.split("```")[1];
    if (t.startsWith("json")) t = t.slice(4);
    t = t.trim();
  }
  return t;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set on the server. Add it to .env.local and restart." },
      { status: 500 }
    );
  }

  const body = await req.json();
  const extraction = body?.extraction;
  if (!extraction) {
    return NextResponse.json({ error: "No extraction data provided." }, { status: 400 });
  }

  async function callGemini() {
    return fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: ANALYSIS_PROMPT + JSON.stringify(extraction, null, 2) }],
            },
          ],
        }),
      }
    );
  }

  let geminiRes = await callGemini();

  // If we hit a rate limit, wait and retry once.
  if (geminiRes.status === 429) {
    await new Promise((r) => setTimeout(r, 15000));
    geminiRes = await callGemini();
  }

  if (!geminiRes.ok) {
    if (geminiRes.status === 429) {
      return NextResponse.json(
        {
          error:
            "Gemini's API rate limit is still active after one retry. Wait a minute and try again, or use the 'Try the sample deck' button, which makes no API calls.",
        },
        { status: 429 }
      );
    }
    const errText = await geminiRes.text();
    return NextResponse.json(
      { error: `Gemini API error: ${geminiRes.status} — ${errText}` },
      { status: 502 }
    );
  }

  const data = await geminiRes.json();
  const rawText: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    return NextResponse.json(
      { error: "Gemini returned no extractable text.", raw: data },
      { status: 502 }
    );
  }

  try {
    const parsed = JSON.parse(stripJsonFences(rawText));
    return NextResponse.json({ analysis: parsed });
  } catch {
    return NextResponse.json(
      { error: "Could not parse Gemini's JSON output.", raw: rawText },
      { status: 502 }
    );
  }
}

