import type { Metadata } from "next";
import { OsrsStats } from "@/features/portfolio/components/osrs-stats";

export const metadata: Metadata = {
  title: "Hobby",
  description: "Personal interests and hobbies.",
};

export default function HobbyPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <OsrsStats />
    </div>
  );
}
