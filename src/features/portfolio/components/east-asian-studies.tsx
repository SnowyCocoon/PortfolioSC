import Image from "next/image";
import { Award, BookOpen, Languages } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "./panel";
import { DataCheckpointNotice } from "./data-checkpoint-notice";
import { lastGood } from "../lib/last-good";
import { fetchCurrentlyReading, type Book } from "../lib/goodreads";
import { GOODREADS_SNAPSHOT } from "../data/goodreads-snapshot";

const MAX_BOOKS = 3;

const LANGUAGES = [
  { language: "Japanese", native: "日本語", level: "JLPT N5 / N4" },
  { language: "Chinese", native: "中文", level: "HSK 1" },
];

// "Currently reading" shelf from Goodreads, cached once a day; if the feed
// can't be reached, the last good pull keeps being shown.
const getCurrentlyReading = lastGood<Book[]>("goodreads-currently-reading-v1", fetchCurrentlyReading, GOODREADS_SNAPSHOT);

export async function EastAsianStudies() {
  const { data, fetchedAt, unavailable } = await getCurrentlyReading();
  const books = data.slice(0, MAX_BOOKS);

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
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {l.language} <span lang={l.language === "Japanese" ? "ja" : "zh"}>{l.native}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <Tooltip>
                    <TooltipTrigger aria-label="Actively learning" className="cursor-default">
                      <BookOpen className="size-3.5 text-[#b5392b]" />
                    </TooltipTrigger>
                    <TooltipContent>Actively learning</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger aria-label="Certification: work in progress" className="cursor-default">
                      <Award className="size-3.5 text-muted-foreground/40" />
                    </TooltipTrigger>
                    <TooltipContent>Work in progress</TooltipContent>
                  </Tooltip>
                </span>
              </div>
              <div className="mt-1 font-mono text-lg font-bold">{l.level}</div>
            </div>
          ))}
        </div>

        <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Currently Reading
        </h3>
        <div className="mb-5 space-y-2">
          {books.map((book) => (
            <a
              key={book.id}
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-line p-2 transition-colors hover:bg-accent"
            >
              <Image
                src={book.cover}
                alt={`Cover of ${book.title} by ${book.author}`}
                width={48}
                height={68}
                unoptimized
                className="h-17 w-12 shrink-0 rounded-sm object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
                  <BookOpen className="size-3.5 shrink-0" />
                  {book.title}
                </div>
                <div className="font-mono text-xs text-muted-foreground">{book.author}</div>
              </div>
            </a>
          ))}
        </div>

        <p className="font-mono text-xs italic text-muted-foreground">More info coming soon…</p>

        <DataCheckpointNotice source="Goodreads" fetchedAt={fetchedAt} unavailable={unavailable} className="mt-3" />
      </PanelContent>
    </Panel>
  );
}
