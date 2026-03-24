"use client";

import { ArrowUpRight, Bookmark as BookmarkIcon } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { CollapsibleList } from "@/components/collapsible-list";
import { BOOKMARKS } from "../data/bookmarks";
import type { Bookmark } from "../types";

export function BookmarksSection() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Bookmarks
          <PanelTitleSup>{BOOKMARKS.length}</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>
      <CollapsibleList
        items={BOOKMARKS}
        max={3}
        renderItem={(bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        )}
      />
    </Panel>
  );
}

function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  return (
    <a
      href={bookmark.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 border-b border-line px-4 py-3 transition-colors hover:bg-accent last:border-b-0"
    >
      {/* Icon */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white p-1 shadow-sm">
        {bookmark.iconSlug ? (
          <img
            src={`https://cdn.simpleicons.org/${bookmark.iconSlug}`}
            alt={bookmark.title}
            className="size-full object-contain"
            loading="lazy"
          />
        ) : (
          <BookmarkIcon className="size-4 text-muted-foreground" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-mono text-xs font-bold group-hover:underline">
          {bookmark.title}
        </h3>
        {bookmark.description && (
          <p className="truncate font-mono text-xs text-muted-foreground">
            {bookmark.description}
          </p>
        )}
        <p className="font-mono text-xs text-muted-foreground">{bookmark.date}</p>
      </div>

      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
