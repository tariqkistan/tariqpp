import { cn } from "@/lib/utils";

/** Wordmark + motto only (no crest) — vector text, blends on any card background. */
export function EduvosEducationMark({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-[min(100%,280px)] shrink-0 text-left leading-tight", className)}>
      <p
        className="font-serif text-2xl font-bold tracking-tight text-[#063257] dark:text-sky-100 sm:text-[1.65rem]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Eduvos
      </p>
      <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#00a3e0] dark:text-sky-400">
        Your Education. Your Future.
      </p>
    </div>
  );
}
