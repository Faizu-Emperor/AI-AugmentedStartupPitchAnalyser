import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        parchment: "#F6F2E9",
        parchmentLine: "#DDD5C2",
        signalRed: "#A63D2F",
        signalGreen: "#3A6B4C",
        ochre: "#B8863C",
        slateText: "#5B5A52",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
