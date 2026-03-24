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
  const inner = (
    <>
      {/* Icon */}
      <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-white p-1 shadow-sm">
        {certification.iconUrl ? (
          <img
            src={certification.iconUrl}
            alt={certification.issuer}
            className="size-full object-contain"
            loading="lazy"
          />
        ) : certification.iconSlug ? (
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
        <h3 className="font-mono text-xs font-bold leading-snug">{certification.title}</h3>
        <p className="font-mono text-xs text-muted-foreground">
          @{certification.issuer} &bull; {certification.date}
        </p>
        {certification.certId && (
          <p className="font-mono text-[10px] text-muted-foreground/60">
            ID: {certification.certId}
          </p>
        )}
      </div>

      {/* Arrow — always shown when there's a link */}
      {certification.href && (
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      )}
    </>
  );

  if (certification.href) {
    return (
      <a
        href={certification.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 transition-colors hover:bg-accent/60"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0">
      {inner}
    </div>
  );
}
