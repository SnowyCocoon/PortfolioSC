"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollapsibleListProps<T> {
  items: T[];
  max: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function CollapsibleList<T>({
  items,
  max,
  renderItem,
}: CollapsibleListProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, max);
  const hasMore = items.length > max;

  return (
    <div>
      {visible.map((item, i) => renderItem(item, i))}
      {hasMore && (
        <div className="flex justify-center border-t border-line py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="font-mono text-xs"
          >
            {expanded ? "Show Less" : "Show More"}
            <ChevronDown
              className={`ml-1 size-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
