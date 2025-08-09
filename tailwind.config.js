import defaultTheme from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";
/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1536px",
      },
    },

    screens: {
      ...defaultTheme.screens,
      xs: {
        raw: "(min-width: 350px) and (max-width: 640px)",
      },
      hsm: {
        raw: "(max-height: 760px) and (min-width: 768px)",
      },
    },

    extend: {
      colors: {
        border: "hsl(var(--border)/ 0.08)",
        input: "hsl(var(--input) / 0.1)",
        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",

        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / 0.1)",
          foreground: "hsl(var(--muted-foreground) / 0.7)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / 0.08)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover)/0.15)",
          foreground: "hsl(var(--popover-foreground))",
          solid: "hsl(var(--popover-solid) / 1)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / 0.15)",
          foreground: "hsl(var(--card-foreground))",
        },

        neon: {
          blue: "hsl(var(--neon-blue))",
          purple: "hsl(var(--neon-purple))",
          lavender: "hsl(var(--neon-lavender))",
          yellow: "hsl(var(--neon-yellow))",
          orange: "hsl(var(--neon-orange))",
          red: "hsl(var(--neon-red))",
          green: "hsl(var(--neon-green))",
          white: "hsl(var(--neon-white))",
          dark: "hsl(var(--neon-dark))",
        },

        success: "hsl(var(--success))",
        danger: "hsl(var(--danger))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",

        glass: {
          light: "rgba(255,255,255,0.15)",
          lighter: "rgba(255,255,255,0.1)",
          dark: "rgba(15,15,16,0.85)",
        },

        white: {
          5: "rgba(255, 255, 255, 0.05)",
          8: "rgba(255, 255, 255, 0.08)",
          10: "rgba(255, 255, 255, 0.1)",
          15: "rgba(255, 255, 255, 0.15)",
          20: "rgba(255, 255, 255, 0.2)",
          50: "rgba(255, 255, 255, 0.5)",
          70: "rgba(255, 255, 255, 0.7)",
          DEFAULT: "#ffffff",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 12px rgba(125, 249, 255, 0.8)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 18px rgba(192, 132, 252, 0.8)",
          },
        },
        "pulse-neon-card": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 12px rgba(125, 249, 255, 0.20)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 18px rgba(192, 132, 252, 0.20)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        shine: {
          "0%": {
            transform: "translateY(-100%) skewY(-20deg)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100%) skewY(-20deg)",
            opacity: "0",
          },
        },
        "gradient-flow": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 3s ease-in-out infinite",
        "pulse-neon-card": "pulse-neon-card 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out",
        "gradient-flow": "gradient-flow 8s ease infinite",
        shine: "shine 1s ease-in-out forwards",
        "shine-delay": "shine 1s ease-in-out forwards 0.15s",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(90deg, #7DF9FF, #C084FC, #7DF9FF)",
      },
      backgroundSize: {
        "200%": "200% 200%",
        "35%": "35% 200%",
      },
    },
  },
  plugins: [animatePlugin],
};
