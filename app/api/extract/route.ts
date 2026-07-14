import { NextRequest, NextResponse } from "next/server";
import { EXTRACTION_PROMPT } from "@/lib/prompts";

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

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inline_data: { mime_type: "application/pdf", data: base64 } },
              { text: EXTRACTION_PROMPT },
            ],
          },
        ],
      }),
    }
  );

  if (!geminiRes.ok) {
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
    return NextResponse.json({ extraction: parsed });
  } catch {
    return NextResponse.json(
      { error: "Could not parse Gemini's JSON output.", raw: rawText },
      { status: 502 }
    );
  }
}
