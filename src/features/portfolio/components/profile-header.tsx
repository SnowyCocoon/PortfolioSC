"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { USER } from "../data/user";

export function ProfileHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % USER.flipSentences.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="screen-line-top screen-line-bottom border-x border-line">
      {/* Banner — diagonal stripe, sits fully above the avatar row */}
      <div className="relative h-32 overflow-hidden sm:h-40 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/40" />

      {/* Avatar + Name — avatar fills full row height */}
      <div className="screen-line-top flex h-28 sm:h-32">
        {/* Avatar cell — fills full row height, circle clipped inside */}
        <div className="relative w-28 shrink-0 border-r border-line sm:w-32">
          <div className="absolute inset-2 overflow-hidden rounded-full">
            <Image
              src={USER.avatar}
              alt={USER.displayName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name + animated role */}
        <div className="flex flex-col justify-center px-5">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {USER.displayName}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            <span
              key={currentIndex}
              className="inline-block animate-[fadeIn_0.3s_ease-in-out]"
            >
              {USER.flipSentences[currentIndex]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
