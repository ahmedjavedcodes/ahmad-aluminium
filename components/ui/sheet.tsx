"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteFontVariables } from "@/app/site-fonts";

/**
 * shadcn/ui Sheet (a Radix Dialog sliding in from the right). Radix handles
 * the focus trap, Escape to close, scroll locking and returning focus to the
 * trigger — the parts a hand-rolled mobile menu tends to miss.
 */
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    {/* Portalled to <body>, outside the .site-theme wrapper — so the wrapper
        class and font variables are repeated here. */}
    <div className={`site-theme contents ${siteFontVariables}`}>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-y-0 right-0 z-[80] flex w-[88%] max-w-sm flex-col border-l border-border bg-bg-elevated shadow-deep data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="focus-ring absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:border-accent/50 hover:text-ink"
          aria-label="Close menu"
        >
          <X size={18} aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </div>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };
