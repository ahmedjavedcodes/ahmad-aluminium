"use client";

import Link from "next/link";
import { content } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { WORK_HREF } from "@/lib/work";
import { SectionHeading } from "@/components/SectionHeading";
import { Screen } from "@/components/Screen";
import { WorkWall } from "@/components/WorkWall";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";

/**
 * Our Work — the home page's one-screen portfolio wall. Every frame, and the
 * "View all work" button, opens the /work page (at that project).
 */
export default function Gallery({ index }: { index?: number }) {
  return (
    <Screen id="gallery" labelledBy="work-heading">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <SectionHeading
          id="work-heading"
          index={index}
          eyebrow={content.gallery.eyebrow}
          heading={content.gallery.heading}
          className="max-w-2xl"
        />
        <Reveal index={1} className="hidden sm:block">
          <Button asChild variant="outline">
            <Link href={WORK_HREF}>
              <RollText>View all work</RollText>
              <ArrowSwap size={16} />
            </Link>
          </Button>
        </Reveal>
      </div>

      <WorkWall className="mt-[clamp(1.25rem,4svh,2.5rem)] min-h-[20rem] flex-1" />

      <Reveal index={2} className="mt-4 sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href={WORK_HREF}>
            <RollText>View all work</RollText>
            <ArrowSwap size={16} />
          </Link>
        </Button>
      </Reveal>
    </Screen>
  );
}
