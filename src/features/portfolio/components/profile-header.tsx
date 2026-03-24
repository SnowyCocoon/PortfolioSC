"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { USER } from "../data/user";

export function ProfileHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0 });
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % USER.flipSentences.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bannerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setLogoOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setLogoOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div className="screen-line-top screen-line-bottom border-x border-line">
      {/* Banner — logo floats with mouse parallax over diagonal stripe */}
      <div
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-32 overflow-hidden sm:h-40 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/40"
      >
        {/* Floating logo — parallax follows mouse */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${logoOffset.x}px, ${logoOffset.y}px)`,
            transition: "transform 0.18s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {/* mix-blend-multiply removes white bg in light mode; dark:mix-blend-normal shows logo on subtle frosted container */}
          <div className="rounded-2xl dark:bg-white/[0.08] dark:shadow-lg dark:backdrop-blur-sm">
            <img
              src="/logo.png"
              alt="SnowyCocoon"
              className="h-20 w-auto object-contain mix-blend-multiply sm:h-28 dark:mix-blend-normal"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Avatar + Name row */}
      <div className="screen-line-top flex h-28 sm:h-32">
        {/* Avatar cell — brand-red ring animates on hover */}
        <div className="relative w-28 shrink-0 border-r border-line sm:w-32">
          <div className="group absolute inset-2 overflow-hidden rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-background transition-all duration-300 hover:ring-[#b5392b]">
            <Image
              src={USER.avatar}
              alt={USER.displayName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
        </div>

        {/* Name + animated flip role */}
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
