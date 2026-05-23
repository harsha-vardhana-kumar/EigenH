import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EigenH brand
        navy: {
          DEFAULT: "#042C53",
          50: "#E6EEF7",
          100: "#C2D4E8",
          200: "#8FAFD3",
          300: "#5C8ABE",
          400: "#2E6AAF",
          500: "#0A4A8A",
          600: "#063C70",
          700: "#042C53",
          800: "#031F3B",
          900: "#021426",
        },
        clinical: {
          blue: "#185FA5",
          green: "#1D9E75",
        },
        sky: {
          accent: "#85B7EB",
        },
        soft: {
          white: "#F1EFE8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 8px 24px -8px rgba(4, 44, 83, 0.10), 0 2px 6px -2px rgba(4, 44, 83, 0.06)",
        lift: "0 18px 40px -16px rgba(4, 44, 83, 0.18), 0 4px 10px -4px rgba(4, 44, 83, 0.08)",
        glow: "0 0 0 6px rgba(133, 183, 235, 0.18)",
      },
      opacity: {
        "8": "0.08",
        "12": "0.12",
        "18": "0.18",
        "65": "0.65",
        "85": "0.85",
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(rgba(24,95,165,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(24,95,165,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.35)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.2s ease-in-out infinite",
        "dash-flow": "dash-flow 1.4s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
