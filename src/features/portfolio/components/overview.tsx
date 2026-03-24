"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Mail,
  Link as LinkIcon,
  Heart,
} from "lucide-react";
import { USER } from "../data/user";

function CurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: USER.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;
  return <span>{time}</span>;
}

export function Overview() {
  return (
    <div className="screen-line-top screen-line-bottom border-x border-line">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Left column */}
        <div>
          <OverviewItem icon={<Briefcase className="size-4" />} label={`${USER.currentJobs[0].title} @${USER.currentJobs[0].company}`} />
          <OverviewItem icon={<Heart className="size-4" />} label={USER.volunteerRole || ""} />
          <OverviewItem icon={<MapPin className="size-4" />} label={USER.location} />
        </div>

        {/* Right column */}
        <div className="sm:border-l sm:border-line">
          <OverviewItem icon={<Clock className="size-4" />} label={<CurrentTime />} />
          <OverviewItem icon={<Mail className="size-4" />} label={USER.email} />
          <OverviewItem icon={<LinkIcon className="size-4" />} label={USER.website} />
        </div>
      </div>
    </div>
  );
}

function OverviewItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-line px-4 py-3 font-mono text-sm text-muted-foreground last:border-b-0">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg text-muted-foreground">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </div>
  );
}
