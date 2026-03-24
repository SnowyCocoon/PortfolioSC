"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { EXPERIENCES } from "../data/experiences";
import { type Experience, getSkillColor } from "../types";

const COMPANY_STYLES: Record<string, { bg: string; text: string; initials: string }> = {
  "3r-games":     { bg: "bg-red-500",    text: "text-white", initials: "3R" },
  "manic-pixel":  { bg: "bg-purple-500", text: "text-white", initials: "MP" },
  "knoocker":     { bg: "bg-blue-500",   text: "text-white", initials: "K"  },
  "microtaur":    { bg: "bg-green-600",  text: "text-white", initials: "M"  },
  "put-vr":       { bg: "bg-orange-500", text: "text-white", initials: "P"  },
};

function CompanyLogo({ experience }: { experience: Experience }) {
  const [imgFailed, setImgFailed] = useState(false);
  const style = COMPANY_STYLES[experience.id];

  if (experience.logo && !imgFailed) {
    return (
      <div className="relative flex size-10 shrink-0 overflow-hidden rounded-lg border border-line bg-background">
        <Image
          src={experience.logo}
          alt={experience.companyName}
          fill
          className="object-cover"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${style?.bg ?? "bg-muted"} ${style?.text ?? "text-muted-foreground"}`}
    >
      {style?.initials ?? experience.companyName.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function Experiences() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>
      <div>
        {EXPERIENCES.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))}
      </div>
    </Panel>
  );
}

function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="flex gap-4 border-b border-line px-4 py-4 last:border-b-0">
      <CompanyLogo experience={experience} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-sm font-bold">
            {experience.companyWebsite ? (
              <a
                href={experience.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {experience.companyName}
              </a>
            ) : (
              experience.companyName
            )}
          </h3>
          {experience.location && (
            <p className="shrink-0 font-mono text-xs text-muted-foreground">
              {experience.location}
            </p>
          )}
        </div>

        {experience.positions.map((pos, i) => (
          <div key={i} className={i > 0 ? "mt-4 border-t border-line pt-4" : "mt-1"}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-sm font-medium">{pos.title}</p>
              <p className="shrink-0 font-mono text-xs text-muted-foreground">
                {pos.startDate}&ndash;{pos.endDate}
              </p>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {pos.employmentType}
            </p>

            {pos.description.length > 0 && (
              <ul className="mt-2 space-y-1">
                {pos.description.map((desc, j) => (
                  <li
                    key={j}
                    className="flex gap-2 font-mono text-xs text-muted-foreground"
                  >
                    <span className="text-foreground/40">&bull;</span>
                    {desc}
                  </li>
                ))}
              </ul>
            )}

            {pos.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {pos.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded px-1.5 py-0.5 font-mono text-xs ${getSkillColor(skill)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
