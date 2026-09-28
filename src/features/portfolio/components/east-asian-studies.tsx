import Image from "next/image";
import { BookOpen, Languages } from "lucide-react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "./panel";

const CURRENT_BOOK = {
  title: "Niedopasowani",
  author: "Zhang Yueran",
  href: "https://www.goodreads.com/book/show/235184711-niedopasowani",
  cover: "/images/books/niedopasowani.webp",
};

const LANGUAGES = [
  { language: "Japanese", native: "日本語", level: "JLPT N5 / N4" },
  { language: "Chinese", native: "中文", level: "HSK 1" },
];

export function EastAsianStudies() {
  return (
    <Panel id="east-asian-studies">
      <PanelHeader>
        <div className="flex items-center gap-2">
          <Languages className="size-4 text-[#b5392b]" />
          <PanelTitle>East Asian Studies</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        <p className="mb-4 font-mono text-sm text-muted-foreground">
          Learning Japanese and Chinese, and reading my way through East Asian literature.
        </p>

        <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Languages
        </h3>
        <div className="mb-5 grid grid-cols-2 gap-2">
          {LANGUAGES.map((l) => (
            <div key={l.language} className="rounded-md border border-line px-3 py-2">
              <div className="font-mono text-[11px] text-muted-foreground">
                {l.language} <span lang={l.language === "Japanese" ? "ja" : "zh"}>{l.native}</span>
              </div>
              <div className="mt-1 font-mono text-lg font-bold">{l.level}</div>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Currently Reading
        </h3>
        <a
          href={CURRENT_BOOK.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 flex items-center gap-3 rounded-md border border-line p-2 transition-colors hover:bg-accent"
        >
          <Image
            src={CURRENT_BOOK.cover}
            alt={`Cover of ${CURRENT_BOOK.title} by ${CURRENT_BOOK.author}`}
            width={48}
            height={68}
            className="h-17 w-12 shrink-0 rounded-sm object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
              <BookOpen className="size-3.5 shrink-0" />
              {CURRENT_BOOK.title}
            </div>
            <div className="font-mono text-xs text-muted-foreground">{CURRENT_BOOK.author}</div>
          </div>
        </a>

        <p className="font-mono text-xs italic text-muted-foreground">More info coming soon…</p>
      </PanelContent>
    </Panel>
  );
}
