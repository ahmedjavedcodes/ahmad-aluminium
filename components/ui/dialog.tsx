"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteFontVariables } from "@/app/site-fonts";

/**
 * shadcn/ui Dialog (Radix): focus trap, Escape to close, scroll lock and
 * focus return come from the primitive. Portalled outside `.site-theme`, so
 * the theme class and font variables are repeated on the portal wrapper.
 */
const Dialog = DialogPrimitive.Root;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;
const DialogClose = DialogPrimitive.Close;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <div className={`site-theme contents ${siteFontVariables}`}>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-md data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-[80] max-h-[92svh] w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[clamp(1.25rem,3svh,2rem)] bg-bg-elevated shadow-deep focus:outline-none data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="focus-ring absolute right-3 top-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur transition-colors hover:bg-accent hover:text-on-accent"
          aria-label="Close"
        >
          <X size={18} aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </div>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

export { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose };
