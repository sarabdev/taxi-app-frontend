/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        accent: {
          50: "#fffdf7",
          100: "#fef9e7",
          200: "#fdf0c4",
          300: "#f9df88",
          400: "#f4c542",
          500: "#d4af37",
          600: "#b8922f",
          700: "#967525",
          800: "#7a5f20",
          900: "#654f1d",
        },

        surface: {
          light: "#f8fafc",
          DEFAULT: "#ffffff",
          dark: "#0f172a",
        },

        success: {
          light: "#dcfce7",
          DEFAULT: "#22c55e",
          dark: "#15803d",
        },

        warning: {
          light: "#fef3c7",
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },

        danger: {
          light: "#fee2e2",
          DEFAULT: "#ef4444",
          dark: "#b91c1c",
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 20px rgba(15, 23, 42, 0.06)",
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
        premium: "0 20px 50px rgba(15, 23, 42, 0.12)",
      },

      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",

        "premium-gradient":
          "linear-gradient(135deg, #0f172a 0%, #111827 100%)",

        "gold-gradient":
          "linear-gradient(135deg, #d4af37 0%, #f4c542 100%)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },

  plugins: [],
};