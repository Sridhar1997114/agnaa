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
        surface: {
          DEFAULT: "var(--md-sys-color-surface, #ffffff)",
          low: "var(--md-sys-color-surface-container-low, #f8f9fa)",
          container: "var(--md-sys-color-surface-container, #f1f3f4)",
          high: "var(--md-sys-color-surface-container-high, #e9ebee)",
        },
        "on-surface": {
          DEFAULT: "var(--md-sys-color-on-surface, #1f1f1f)",
          variant: "var(--md-sys-color-on-surface-variant, #5f6368)",
        },
        outline: {
          DEFAULT: "var(--md-sys-color-outline, #80868b)",
          variant: "var(--md-sys-color-outline-variant, #dadce0)",
        },
        brand: {
          navy: "#1C1C72",
          violet: "#7B2DBF",
          blue: "#2563EB",
          dark: "#0D0D14",
          card: "#14141F",
          light: "#F0F0F6",
          muted: "#5F6368",
        },
        accent: {
          violet: "#7B2DBF",
          navy: "#1C1C72",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #7B2DBF 0%, #1C1C72 100%)",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "var(--font-space)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        accent: ["var(--font-space)", "sans-serif"],
      },
      spacing: {
        grid: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
