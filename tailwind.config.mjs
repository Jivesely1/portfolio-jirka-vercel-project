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
        brand: {
          // pozadí
          bg: "#f5f7fb",       // hlavní světlejší background
          bgDark: "#0b0e14",   // deep navy dark

          // panely / karty
          surface: "#ffffff",
          surfaceDark: "#11151c",

          // text
          text: "#0f172a",
          textMuted: "#4b5563",
          textDark: "#e5e7eb",
          textMutedDark: "#9ca3af",

          // border
          border: "#e5e7eb",
          borderDark: "#1f2937",

          // akcent (brand)
          accent: "#6366f1",
          accentHover: "#4f46e5",
        },
      },

      boxShadow: {
        card: "0 18px 45px rgba(15,23,42,0.18)",
        soft: "0 8px 25px rgba(15,23,42,0.12)",
      },

      borderRadius: {
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
