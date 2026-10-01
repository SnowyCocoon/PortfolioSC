import { cn } from "@/lib/utils";

const checkpointFormat = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Small print under a section: whether its live source is reachable, and the date of the pull being shown. */
export function DataCheckpointNotice({
  source,
  fetchedAt,
  unavailable,
  className,
}: {
  source: string;
  fetchedAt: string;
  unavailable: boolean;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground", className)}>
      <span
        aria-hidden
        className={cn("size-1.5 shrink-0 rounded-full", unavailable ? "bg-red-500" : "bg-emerald-500")}
      />
      {source} data {unavailable ? "unavailable" : "available"} - last checkpoint{" "}
      {checkpointFormat.format(new Date(fetchedAt))}
    </p>
  );
}
