import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button, skinned for the light industrial site.
 *
 * Every variant animates on hover with transform/opacity only (compositor
 * friendly): the copper primary lifts, glows and catches a light sweep; the
 * outline and glass variants fill with ink from the bottom edge. Pair with
 * <RollText> and <ArrowSwap> for the rolling label and swapping arrow.
 *
 * Pass `asChild` to render onto a child `<a>` or `<Link>` — most calls to
 * action here are links (WhatsApp, tel:, routes), not buttons.
 */
const buttonVariants = cva(
  "focus-ring group relative inline-flex cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,transform] duration-500 ease-out-expo active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "btn-sheen bg-accent bg-gradient-to-b from-white/[0.14] to-transparent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_1px_2px_rgb(20_22_25/0.12)] hover:-translate-y-0.5 hover:shadow-copper-glow",
        dark:
          "btn-sheen bg-ink text-bg shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:-translate-y-0.5 hover:shadow-deep",
        glass: "btn-fill glass-panel text-ink hover:-translate-y-0.5",
        outline:
          "btn-fill border border-border-strong bg-bg-elevated/60 text-ink hover:-translate-y-0.5",
        ghost: "text-ink-muted hover:bg-surface hover:text-ink",
        link: "link-underline px-0 text-accent-deep",
      },
      size: {
        sm: "h-10 rounded-full px-4 text-[13px]",
        md: "h-12 rounded-full px-6 text-sm",
        lg: "h-14 rounded-full px-7 text-[15px]",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
);
Button.displayName = "Button";

/**
 * Label that rolls up on hover, replaced by an identical copy from below.
 * The copy is aria-hidden so screen readers announce the text once.
 */
function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("roll", className)}>
      <span className="roll-inner">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

/** Arrow that exits on hover while a twin slides in behind it. */
function ArrowSwap({
  diagonal = false,
  size = 16,
  className,
}: {
  diagonal?: boolean;
  size?: number;
  className?: string;
}) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden
      className={cn("arrow-swap", diagonal && "diagonal", className)}
      style={{ fontSize: size }}
    >
      <Icon />
      <Icon />
    </span>
  );
}

export { Button, buttonVariants, RollText, ArrowSwap };
