function verdictWord(score: number): { word: string; color: string } {
  if (score >= 7) return { word: "INVEST", color: "#3A6B4C" };
  if (score >= 5) return { word: "DISCUSS", color: "#B8863C" };
  return { word: "PASS", color: "#A63D2F" };
}

export default function VerdictStamp({ score }: { score: number }) {
  const { word, color } = verdictWord(score);

  return (
    <div className="animate-stamp inline-block select-none" style={{ transformOrigin: "center" }}>
      <div
        className="border-[3px] rounded-sm px-6 py-3 relative"
        style={{ borderColor: color, color }}
      >
        <div className="absolute inset-[3px] border border-dashed rounded-sm" style={{ borderColor: color, opacity: 0.5 }} />
        <div className="relative flex items-baseline gap-3">
          <span className="font-display italic text-4xl md:text-5xl tracking-wide" style={{ letterSpacing: "0.04em" }}>
            {word}
          </span>
          <span className="font-mono text-lg md:text-xl">{score.toFixed(1)}/10</span>
        </div>
      </div>
    </div>
  );
}
