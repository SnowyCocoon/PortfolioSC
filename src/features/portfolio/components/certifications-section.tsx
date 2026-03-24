"use client";

import { ArrowUpRight, Award } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { CollapsibleList } from "@/components/collapsible-list";
import { CERTIFICATIONS } from "../data/certifications";
import type { Certification } from "../types";

export function CertificationsSection() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Certifications
          <PanelTitleSup>{CERTIFICATIONS.length}</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>
      <CollapsibleList
        items={CERTIFICATIONS}
        max={3}
        renderItem={(cert) => (
          <CertificationItem key={cert.id} certification={cert} />
        )}
      />
    </Panel>
  );
}

function CertificationItem({
  certification,
}: {
  certification: Certification;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0">
      {/* Icon */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white p-1 shadow-sm">
        {certification.iconSlug ? (
          <img
            src={`https://cdn.simpleicons.org/${certification.iconSlug}`}
            alt={certification.issuer}
            className="size-full object-contain"
            loading="lazy"
          />
        ) : (
          <Award className="size-4 text-muted-foreground" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-mono text-xs font-bold">{certification.title}</h3>
        <p className="font-mono text-xs text-muted-foreground">
          @{certification.issuer} &bull; {certification.date}
        </p>
      </div>

      {certification.href && (
        <a
          href={certification.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <ArrowUpRight className="size-4" />
        </a>
      )}
    </div>
  );
}
