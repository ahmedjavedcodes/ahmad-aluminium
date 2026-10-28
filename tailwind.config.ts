import type { Config } from "tailwindcss";

/**
 * Palette entries use the `<alpha-value>` placeholder against channel-triplet
 * CSS variables. That is what allows opacity modifiers (`border-accent/40`,
 * `from-ink/95`) to compile — with a plain `var(--color-x)` hex value Tailwind
 * silently emits nothing for them. The translucent tokens (border, surface,
 * tints) already carry their own alpha, so they stay as flat vars.
 */
const withAlpha = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: withAlpha("bg"),
          elevated: withAlpha("bg-elevated"),
          sunken: withAlpha("bg-sunken"),
        },
        "bg-elevated": withAlpha("bg-elevated"),
        "bg-sunken": withAlpha("bg-sunken"),
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        ink: {
          DEFAULT: withAlpha("ink"),
          muted: withAlpha("ink-muted"),
          subtle: withAlpha("ink-subtle"),
        },
        accent: {
          DEFAULT: withAlpha("accent"),
          deep: withAlpha("accent-deep"),
          tint: "var(--color-accent-tint)",
        },
        teal: {
          DEFAULT: withAlpha("teal"),
          deep: withAlpha("teal-deep"),
          tint: "var(--color-teal-tint)",
        },
        "on-accent": withAlpha("on-accent"),
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono, ui-monospace)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "mesh-accent":
          "radial-gradient(60% 60% at 18% 18%, rgb(154 69 19 / 0.13) 0%, rgb(154 69 19 / 0) 62%)",
        "mesh-teal":
          "radial-gradient(52% 52% at 82% 8%, rgb(11 100 112 / 0.11) 0%, rgb(11 100 112 / 0) 62%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgb(28 26 22 / 0.10)",
        "glow-accent": "0 10px 30px -10px rgb(154 69 19 / 0.55)",
        lift: "0 18px 40px -18px rgb(28 26 22 / 0.28)",
        // Public site (dark) — deep drop plus a copper rim on hover.
        deep: "0 30px 60px -30px rgb(0 0 0 / 0.85)",
        "copper-rim": "0 0 0 1px rgb(222 135 80 / 0.35), 0 24px 50px -24px rgb(222 135 80 / 0.35)",
        "copper-glow": "0 12px 36px -10px rgb(222 135 80 / 0.6)",
      },
      animation: {
        "accordion-down": "accordion-down 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.26s cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-in": "sheet-in 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out": "sheet-out 0.3s cubic-bezier(0.7, 0, 0.84, 0)",
        "overlay-in": "overlay-in 0.3s ease-out",
        "overlay-out": "overlay-out 0.25s ease-in",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
