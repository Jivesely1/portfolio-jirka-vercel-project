/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": "#f8f9fb",
        "brand-bgDark": "#0b0e14",

        "brand-surface": "#ffffff",
        "brand-surfaceDark": "#11151c",

        "brand-border": "rgba(0,0,0,0.08)",
        "brand-borderDark": "rgba(255,255,255,0.08)",

        "brand-text": "#111827",
        "brand-textDark": "#e4e7ec",

        "brand-textMuted": "#6b7280",
        "brand-textMutedDark": "#9ca3af",

        "brand-accent": "#6366f1",
        "brand-accentHover": "#818cf8",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
