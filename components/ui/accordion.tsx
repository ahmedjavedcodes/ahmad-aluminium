"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** shadcn/ui Accordion (Radix), styled as machined panels. */
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "panel overflow-hidden rounded-xl transition-colors duration-300 hover:border-border-strong data-[state=open]:border-accent/40",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & { index?: number }
>(({ className, children, index, ...props }, ref) => (
  <AccordionPrimitive.Header asChild>
    <h3>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "focus-ring group flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-6",
          className
        )}
        {...props}
      >
        {index !== undefined && (
          <span
            aria-hidden
            className="font-mono text-xs text-ink-subtle transition-colors group-data-[state=open]:text-accent-deep"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="flex-1 font-medium text-ink">{children}</span>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border-strong text-accent transition-[transform,background-color,color,border-color] duration-500 ease-out-expo group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent group-data-[state=open]:bg-accent group-data-[state=open]:text-on-accent"
        >
          <Plus size={15} />
        </span>
      </AccordionPrimitive.Trigger>
    </h3>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
