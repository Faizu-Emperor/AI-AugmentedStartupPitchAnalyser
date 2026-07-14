"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type DimensionScore = { dimension: string; score: number; justification: string };

export default function ScoreRadar({ scores }: { scores: DimensionScore[] }) {
  const data = scores.map((s) => ({ dimension: s.dimension, score: s.score, fullMark: 10 }));

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="#DDD5C2" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "#14213D", fontSize: 11, fontFamily: "var(--font-plex-sans)" }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "#5B5A52", fontSize: 9 }} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#A63D2F"
          fill="#A63D2F"
          fillOpacity={0.22}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: "#F6F2E9",
            border: "1px solid #DDD5C2",
            borderRadius: 4,
            fontFamily: "var(--font-plex-mono)",
            fontSize: 12,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
