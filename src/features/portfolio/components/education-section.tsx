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
        <div className="absolute bottom-4 left-7 top-4 w-px bg-line" />
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
      <div className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-background">
        <div className="size-2 rounded-full bg-foreground/40" />
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
