"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoreRadar from "@/components/ScoreRadar";
import VerdictStamp from "@/components/VerdictStamp";
import { sampleExtraction, sampleAnalysis } from "@/lib/sampleData";

type Stage = "idle" | "extracting" | "analyzing" | "done" | "error";

type Extraction = typeof sampleExtraction;
type Analysis = typeof sampleAnalysis;

const PIPELINE_STAGES = [
  { key: "extracting", label: "Extracting deck contents", tool: "Gemini" },
  { key: "analyzing", label: "Scoring against IC rubric", tool: "Gemini" },
];

export default function Home() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [extraction, setExtraction] = useState<Extraction | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSample, setIsSample] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setStage("idle");
    setFile(null);
    setExtraction(null);
    setAnalysis(null);
    setError(null);
    setIsSample(false);
  }

  async function runLivePipeline(f: File) {
    setError(null);
    setIsSample(false);
    setStage("extracting");
    try {
      const formData = new FormData();
      formData.append("file", f);
      const extractRes = await fetch("/api/extract", { method: "POST", body: formData });
      const extractJson = await extractRes.json();
      if (!extractRes.ok) throw new Error(extractJson.error || "Extraction failed.");
      setExtraction(extractJson.extraction);

      setStage("analyzing");
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extraction: extractJson.extraction }),
      });
      const analyzeJson = await analyzeRes.json();
      if (!analyzeRes.ok) throw new Error(analyzeJson.error || "Analysis failed.");
      setAnalysis(analyzeJson.analysis);
      setStage("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStage("error");
    }
  }

  async function runSample() {
    setError(null);
    setIsSample(true);
    setStage("extracting");
    await new Promise((r) => setTimeout(r, 650));
    setExtraction(sampleExtraction);
    setStage("analyzing");
    await new Promise((r) => setTimeout(r, 850));
    setAnalysis(sampleAnalysis);
    setStage("done");
  }

  function handleFileChosen(f: File) {
    setFile(f);
    runLivePipeline(f);
  }

  const processing = stage === "extracting" || stage === "analyzing";

  return (
    <main className="min-h-screen px-6 md:px-12 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-10">
        <div>
          <h1 className="font-display italic text-3xl md:text-4xl text-ink">Diligence</h1>
          <p className="text-slateText text-sm mt-1 font-body">
            An AI investment committee for your pitch deck.
          </p>
        </div>
        <div className="text-right text-xs font-mono text-slateText hidden md:block">
          <p>MEMO NO. 001</p>
          <p>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
        </div>
      </header>

      {/* Idle: upload zone */}
      {stage === "idle" && (
        <div className="animate-fade-up">
          <div
            className="border-2 border-dashed border-ink/40 rounded-sm p-12 text-center cursor-pointer hover:border-ochre hover:bg-ochre/5 transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) handleFileChosen(f);
            }}
          >
            <p className="font-display text-xl text-ink mb-2">Submit a deck for review</p>
            <p className="text-slateText text-sm mb-4">Drop a PDF pitch deck here, or click to browse</p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileChosen(f);
              }}
            />
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-parchmentLine flex-1" />
            <span className="text-xs font-mono text-slateText">OR</span>
            <div className="h-px bg-parchmentLine flex-1" />
          </div>

          <button
            onClick={runSample}
            className="w-full border border-ink/30 rounded-sm py-3 font-mono text-sm text-ink hover:bg-ink hover:text-parchment transition-colors"
          >
            Try the sample deck — QRATE (pediatric tier-2 healthtech)
          </button>
          <p className="text-xs text-slateText mt-2 text-center font-body">
            Real, previously-analyzed results — instant, no API calls.
          </p>
        </div>
      )}

      {/* Processing pipeline */}
      {processing && (
        <div className="animate-fade-up space-y-4">
          <p className="font-mono text-xs text-slateText mb-4">
            {isSample ? "REPLAYING PRIOR ANALYSIS" : `REVIEWING: ${file?.name}`}
          </p>
          {PIPELINE_STAGES.map((s, i) => {
            const currentIndex = PIPELINE_STAGES.findIndex((p) => p.key === stage);
            const isActive = s.key === stage;
            const isDone = i < currentIndex;
            return (
              <div
                key={s.key}
                className={`flex items-center gap-4 p-4 border rounded-sm transition-colors ${
                  isActive ? "border-ochre bg-ochre/5" : isDone ? "border-signalGreen/40" : "border-parchmentLine"
                }`}
              >
                <span className="font-mono text-xs text-slateText w-6">{i + 1}</span>
                <span className={`flex-1 font-body text-sm ${isActive ? "text-ink font-medium" : "text-slateText"}`}>
                  {s.label}
                </span>
                <span className="font-mono text-xs text-ochre">{s.tool}</span>
                {isActive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-3 h-3 border-2 border-ochre border-t-transparent rounded-full"
                  />
                )}
                {isDone && <span className="text-signalGreen text-sm">✓</span>}
              </div>
            );
          })}
        </div>
      )}

      {/* Error */}
      {stage === "error" && (
        <div className="animate-fade-up border border-signalRed rounded-sm p-6 bg-signalRed/5">
          <p className="font-display text-lg text-signalRed mb-2">Review could not be completed</p>
          <p className="text-sm text-ink font-mono break-words">{error}</p>
          <button
            onClick={reset}
            className="mt-4 text-sm font-mono underline text-ink hover:text-ochre"
          >
            Start over
          </button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {stage === "done" && extraction && analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Verdict row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-parchmentLine pb-8">
              <div>
                <p className="font-mono text-xs text-slateText mb-1">
                  {extraction.company_name !== "Not mentioned" ? extraction.company_name : "COMPANY NAME NOT DISCLOSED"}
                </p>
                <p className="font-display italic text-xl text-ink max-w-md">{analysis.one_line_verdict}</p>
              </div>
              <VerdictStamp score={analysis.weighted_overall_score} />
            </div>

            {/* Radar + scores */}
            <section>
              <h2 className="font-display text-lg text-ink mb-4">Rubric Scorecard</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <ScoreRadar scores={analysis.dimension_scores} />
                <div className="space-y-3">
                  {analysis.dimension_scores.map((d) => (
                    <div key={d.dimension} className="border-b border-parchmentLine pb-2">
                      <div className="flex justify-between items-baseline">
                        <span className="font-body text-sm text-ink font-medium">{d.dimension}</span>
                        <span className="font-mono text-sm text-ochre">{d.score}/10</span>
                      </div>
                      <p className="text-xs text-slateText mt-1 leading-relaxed">{d.justification}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Advantage / Flaw */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="border border-signalGreen/40 rounded-sm p-5 bg-signalGreen/5">
                <p className="font-mono text-xs text-signalGreen mb-2">UNFAIR ADVANTAGE</p>
                <p className="text-sm text-ink leading-relaxed">{analysis.unfair_advantage}</p>
              </div>
              <div className="border border-signalRed/40 rounded-sm p-5 bg-signalRed/5">
                <p className="font-mono text-xs text-signalRed mb-2">FATAL FLAW</p>
                <p className="text-sm text-ink leading-relaxed">{analysis.fatal_flaw}</p>
              </div>
            </section>

            {/* Financials */}
            <section>
              <h2 className="font-display text-lg text-ink mb-4">3-Year Financial Read</h2>
              <table className="w-full text-sm font-mono border-collapse mb-4">
                <thead>
                  <tr className="border-b-2 border-ink text-left">
                    <th className="py-2 font-body font-medium text-slateText">Rs. crore</th>
                    <th className="py-2 text-right">Year 1</th>
                    <th className="py-2 text-right">Year 2</th>
                    <th className="py-2 text-right">Year 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-parchmentLine">
                    <td className="py-2 font-body">Revenue</td>
                    <td className="py-2 text-right">{analysis.financial_summary.year_1_revenue_cr}</td>
                    <td className="py-2 text-right">{analysis.financial_summary.year_2_revenue_cr}</td>
                    <td className="py-2 text-right">{analysis.financial_summary.year_3_revenue_cr}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-body">EBITDA</td>
                    <td className="py-2 text-right">{analysis.financial_summary.year_1_ebitda_cr}</td>
                    <td className="py-2 text-right">{analysis.financial_summary.year_2_ebitda_cr}</td>
                    <td className="py-2 text-right">{analysis.financial_summary.year_3_ebitda_cr}</td>
                  </tr>
                </tbody>
              </table>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p><span className="text-slateText">Monthly burn: </span><span className="font-mono">Rs.{analysis.financial_summary.monthly_burn_lakh}L</span></p>
                <p><span className="text-slateText">Breakeven: </span><span className="font-mono">{analysis.financial_summary.breakeven_timeline}</span></p>
              </div>
              <div className="mt-4 border-l-2 border-ochre pl-4">
                <p className="font-mono text-xs text-ochre mb-1">LARGEST DATA GAP</p>
                <p className="text-sm text-ink">{analysis.financial_summary.largest_data_gap}</p>
              </div>
            </section>

            <button
              onClick={reset}
              className="font-mono text-sm underline text-slateText hover:text-ochre"
            >
              ← Review another deck
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
