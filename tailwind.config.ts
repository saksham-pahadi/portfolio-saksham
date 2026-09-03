import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#09080d",
        panel: "#111017",
        purple: "#9b5cff",
        violet: "#6d2bff",
        acid: "#d6ff3f",
      },
      boxShadow: {
        glow: "0 0 50px rgba(155,92,255,.28)",
        acid: "0 0 30px rgba(214,255,63,.18)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseGlow: { "0%,100%": { opacity: ".45" }, "50%": { opacity: ".9" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
