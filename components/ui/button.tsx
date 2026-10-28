import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button, re-skinned for the public site's dark theme.
 *
 * Pass `asChild` to render the styles onto a child `<a>` or `<Link>` — most
 * calls to action here are links (WhatsApp, tel:, routes), not buttons.
 */
const buttonVariants = cva(
  "focus-ring group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "btn-sheen bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] hover:bg-accent-deep hover:shadow-copper-glow",
        glass:
          "glass-panel text-ink hover:border-accent/50 hover:text-accent-deep",
        outline:
          "border border-border-strong bg-transparent text-ink hover:border-accent/60 hover:text-accent-deep",
        ghost: "text-ink-muted hover:bg-surface hover:text-ink",
        link: "link-underline px-0 text-accent-deep",
      },
      size: {
        sm: "h-9 rounded-md px-3.5 text-[13px]",
        md: "h-11 rounded-lg px-5 text-sm",
        lg: "h-[3.25rem] rounded-lg px-7 text-[15px]",
        icon: "h-10 w-10 rounded-lg",
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

export { Button, buttonVariants };
