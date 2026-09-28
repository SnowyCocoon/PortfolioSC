import type { Metadata } from "next";
import { OsrsStats } from "@/features/portfolio/components/osrs-stats";
import { GarminRunning } from "@/features/portfolio/components/garmin-running";
import { EastAsianStudies } from "@/features/portfolio/components/east-asian-studies";

export const metadata: Metadata = {
  title: "Hobby",
  description: "Hobbies of Dominik Strzalko — running personal bests and monthly training volume from Garmin, East Asian studies (Japanese JLPT, Chinese HSK), and Old School RuneScape ironman stats.",
  alternates: { canonical: "/hobby" },
};

export default function HobbyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 py-4">
      <GarminRunning />
      <EastAsianStudies />
      <OsrsStats />
    </div>
  );
}
