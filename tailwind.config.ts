import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-cormorant-garamond)", "serif"],
        eb: ["var(--font-eb-garamond)", "serif"],
        amoresa: ["var(--font-amoresa-regular)", "serif"],
        "amoresa-aged": ["var(--font-amoresa-aged)", "serif"],
      },
      colors: {
        cream: {
          light: "#F6F2EC",
          light2: "#F6F1EB",
        },
        beige: {
          light: "#E6D6C6",
          medium: "#D8BFA8",
        },
        terracotta: "#C3A38C",
        sage: {
          light: "#87986A",
          dark: "#718355",
        },
        gold: "#E2B84B",
      },
    },
  },
};

export default config;

