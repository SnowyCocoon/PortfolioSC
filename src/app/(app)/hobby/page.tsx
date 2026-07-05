import type { Metadata } from "next";
import { OsrsStats } from "@/features/portfolio/components/osrs-stats";
import { GarminRunning } from "@/features/portfolio/components/garmin-running";

export const metadata: Metadata = {
  title: "Hobby",
  description: "Personal interests and hobbies.",
};

export default function HobbyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 py-4">
      <OsrsStats />
      <GarminRunning />
    </div>
  );
}
