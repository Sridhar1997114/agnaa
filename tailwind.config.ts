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
        brand: {
          navy: "#1C1C72",
          violet: "#7B2DBF",
          dark: "#0D0D14",
          card: "#14141F",
          light: "#F0F0F6",
          muted: "#8888AA",
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
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
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
