import { GraduationCap } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { EDUCATION } from "../data/education";
import type { Education } from "../types";

export function EducationSection() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Education</PanelTitle>
      </PanelHeader>
      <div className="relative">
        {/* Vertical timeline line — runs between icon centers */}
        <div className="absolute bottom-8 left-[2.25rem] top-8 w-px bg-line" />
        {EDUCATION.map((edu) => (
          <EducationItem key={edu.id} education={edu} />
        ))}
      </div>
    </Panel>
  );
}

function EducationItem({ education }: { education: Education }) {
  return (
    <div className="flex gap-4 border-b border-line px-4 py-4 last:border-b-0">
      {/* Graduation cap icon in a bordered frame — same style as overview icons */}
      <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-background text-muted-foreground">
        <GraduationCap className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-sm font-bold">{education.institution}</h3>
          <p className="shrink-0 font-mono text-xs text-muted-foreground">
            {education.startYear}&ndash;{education.endYear}
          </p>
        </div>

        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {education.degree} &mdash; {education.field}
          {education.specialization && `, ${education.specialization}`}
        </p>

        {education.grade && (
          <p className="font-mono text-xs text-muted-foreground">
            Grade: {education.grade}
          </p>
        )}

        {education.thesis && (
          <p className="mt-1 font-mono text-xs italic text-muted-foreground">
            {education.thesis}
          </p>
        )}

        {education.info && (
          <p className="mt-1 font-mono text-xs text-muted-foreground/70 leading-relaxed">
            {education.info}
          </p>
        )}

        {education.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {education.skills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-accent px-1.5 py-0.5 font-mono text-xs text-accent-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
