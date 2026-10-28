import { site } from "@/data/site";

/**
 * Brand mark: an aluminium window seen head-on — an extruded outer frame with
 * a mullion and transom dividing four panes, plus a diagonal glint across the
 * glass. It reads as "aluminium + glass" at a glance and stays legible at
 * 16px, which a letterform monogram in a serif face does not.
 *
 * The frame takes `currentColor` so the mark inherits whatever colour it sits
 * in; the panes take the on-accent tone so it works on a filled tile too.
 */
export function LogoMark({
  className,
  // Tailwind token, not a raw var(): the palette stores bare "R G B" channel
  // triplets so opacity modifiers can compile, which means `var(--color-x)` on
  // its own is not a valid colour and silently renders black.
  paneClassName = "fill-on-accent",
}: {
  className?: string;
  paneClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Extruded frame */}
      <rect x="1.5" y="1.5" width="29" height="29" rx="7.5" fill="currentColor" />

      {/* Glazing — four panes split by a mullion and an off-centre transom */}
      <g className={paneClassName}>
        <rect x="6.6" y="6.6" width="8.1" height="6.9" rx="1.4" />
        <rect x="17.3" y="6.6" width="8.1" height="6.9" rx="1.4" />
        <rect x="6.6" y="16.1" width="8.1" height="9.3" rx="1.4" />
        <rect x="17.3" y="16.1" width="8.1" height="9.3" rx="1.4" />
      </g>

      {/* Glass glint */}
      <path
        d="M9.4 25.4 21.8 6.6h3.1L12.5 25.4Z"
        fill="currentColor"
        opacity="0.16"
      />
    </svg>
  );
}

/**
 * The registered name splits into the trading part and the incorporation
 * suffix, so the suffix can be set smaller without dropping it. The whole
 * registered name is always rendered — only its typographic weight varies.
 */
const SUFFIX_AT = site.legalName.indexOf("(");
const legalMain =
  SUFFIX_AT > 0 ? site.legalName.slice(0, SUFFIX_AT).trim() : site.legalName;
const legalSuffix = SUFFIX_AT > 0 ? site.legalName.slice(SUFFIX_AT).trim() : "";
const [legalFirst, ...legalRestWords] = legalMain.split(" ");
const legalRest = legalRestWords.join(" ");

/**
 * Mark + wordmark lockup.
 *
 * `variant="full"` renders the complete registered company name, for the
 * places that identify the business to a visitor — the hero and the footer.
 * `variant="short"` is the trading name, used only where the full 58-character
 * name genuinely will not fit.
 */
export function Logo({
  className,
  markClassName = "h-9 w-9 text-accent",
  textClassName = "text-[15px] sm:text-base",
  variant = "short",
  suffix,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  variant?: "short" | "full";
  /** Small second line under the short name, e.g. the company form. */
  suffix?: string;
}) {
  if (variant === "full") {
    return (
      <span className={`flex items-start gap-3 ${className ?? ""}`}>
        <LogoMark className={`shrink-0 ${markClassName}`} />
        <span className="min-w-0">
          <span
            className={`block font-display font-semibold uppercase leading-tight tracking-[0.01em] text-ink ${textClassName}`}
          >
            {legalFirst} <span className="text-accent">{legalRest}</span>
          </span>
          {legalSuffix && (
            <span className="mt-0.5 block text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              {legalSuffix}
            </span>
          )}
        </span>
      </span>
    );
  }

  const [first, ...rest] = site.name.split(" ");
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className={`shrink-0 ${markClassName}`} />
      <span className="min-w-0">
        <span className={`block whitespace-nowrap font-display font-semibold leading-tight text-ink ${textClassName}`}>
          {first} <span className="text-accent">{rest.join(" ")}</span>
        </span>
        {suffix && (
          <span className="mt-0.5 block whitespace-nowrap text-[9px] font-semibold uppercase leading-none tracking-[0.22em] text-ink-subtle sm:text-[10px]">
            {suffix}
          </span>
        )}
      </span>
    </span>
  );
}
