import type { Config } from "tailwindcss";

const config: Config = {
  /** Class strategy — no toggle means `dark` is never set, so `dark:` styles stay off */
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        ink: "var(--ink)",
        surface: "var(--bg-muted)",
        accent: {
          DEFAULT: "#0f4d92",
          dim: "#0c3f78",
          deep: "#0a335f",
          blue: "#3b82f6",
          teal: "#0ea5e9",
          on: "var(--on-accent)",
        },
        coral: {
          DEFAULT: "var(--coral)",
          dim: "var(--coral-dim)",
        },
      },
      borderRadius: {
        leap: "10px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-accent": "var(--gradient-accent)",
      },
      boxShadow: {
        leap: "4px 4px 0 0 var(--shadow-edge)",
        "leap-sm": "2px 2px 0 0 var(--shadow-edge)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "dot-drift": "dotDrift 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        dotDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "32px 32px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
