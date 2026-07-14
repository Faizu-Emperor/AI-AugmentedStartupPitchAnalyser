
# Diligence — AI Investment Committee

A live web app for the AI-Augmented Startup Pitch Analyser capstone. Upload a pitch deck PDF
and get a VC-grade scorecard, verdict, and 3-year financial read in under a minute.

## What it does

1. **Extract** — sends the uploaded PDF to Gemini (`gemini-flash-latest`), returns structured
   fields (problem, solution, market, team, traction, financials).
2. **Score** — sends that structured data to Gemini again, which scores it across the
   8-dimension VC rubric (TAM, Team, Traction, Moat, Business Model, Why Now, Financials,
   Risk Disclosure), plus a condensed 3-year financial projection.
3. **Display** — renders a radar chart, dimension-by-dimension justifications, an "unfair
   advantage / fatal flaw" callout, a financial table, and a stamped PASS/DISCUSS/INVEST verdict.

There's also a **"Try the sample deck"** button that instantly replays real, previously-generated
results (the pediatric tier-2 healthcare deck from Days 2–5) with zero API calls — useful as a
guaranteed-working fallback if you're demoing somewhere with unreliable wifi.

## IMPORTANT — methodology note for your presentation/report

This app uses **Gemini for both extraction AND scoring**, not Claude. This is a deliberate
engineering decision made because Anthropic's API requires a minimum prepaid credit balance
with no free-calling tier, while Gemini's API has a genuine free tier.

However, the actual rubric design, the 8-dimension scoring prompt, the "unfair advantage /
fatal flaw" reasoning framework, and the full Day 2–5 analysis documented in Notion were all
**developed and validated using Claude** in conversation. The live app is therefore a *second,
independent implementation* of that same prompt/rubric running on a different model — it may
produce slightly different exact scores or phrasing than the validated Day 3/5 output.

**State this explicitly in your report/demo**, e.g.:
> "The rubric and scoring methodology were designed and validated using Claude (see Days 1–5).
> The live demo app runs on Gemini end-to-end for API reliability and cost reasons. Both models
> were given the identical rubric and prompt structure."

This is honest, defensible, and consistent with the project's whole ethos of not silently
smoothing over gaps — don't let the live app quietly imply it's Claude-powered when it isn't.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Get a Gemini API key: https://aistudio.google.com/apikey

3. Copy the env template and fill in your key:
   ```
   cp .env.local.example .env.local
   ```
   Then edit `.env.local`:
   ```
   GEMINI_API_KEY=your-real-key
   ```
   **Never commit `.env.local` to git** — it's already in `.gitignore`.

4. Run it locally:
   ```
   npm run dev
   ```
   Open http://localhost:3000

## For your live demo

- Try a real PDF upload once beforehand to confirm your API key works and wifi is stable.
- Gemini's free tier has generous but not unlimited rate limits — avoid rapid back-to-back
  testing right before presenting.
- If you're worried about live-demo risk in front of the class, lead with the **"Try the sample
  deck"** button — it's real analysis output, just replayed instantly instead of called live.
  You can still show a live upload afterward as the "and it works on any deck" moment.

## Deploying (optional, for a shareable link)

This is a standard Next.js app — the easiest path is Vercel:
```
npm install -g vercel
vercel
```
Add `GEMINI_API_KEY` as an environment variable in the Vercel dashboard
(Project Settings → Environment Variables) before deploying.

## Notes

- Competitor scan (ChatGPT step from Day 3) isn't wired into this app — it's documented
  separately in Notion.
- The financial model here is a condensed version of the full Day 5 analysis (kept short so
  the live API call returns fast). The complete STATED/DERIVED/ASSUMED breakdown lives in Notion.

