const USER_ID = "172078018";
const FEED_URL = `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=currently-reading`;

export interface Book {
  id: string;
  title: string;
  author: string;
  href: string;
  cover: string;
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

// Goodreads wraps some fields in CDATA and entity-escapes others.
function field(item: string, tag: string): string {
  const raw = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1] ?? "";
  const cdata = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  if (cdata) return cdata[1].trim();
  return raw.replace(/&(amp|lt|gt|quot|apos);/g, (_, name: string) => ENTITIES[name]).trim();
}

/** The "currently reading" shelf from the public Goodreads RSS feed, newest first. Throws if the feed can't be read. */
export async function fetchCurrentlyReading(): Promise<Book[]> {
  const res = await fetch(FEED_URL, { headers: { "User-Agent": "Mozilla/5.0" }, cache: "no-store" });
  if (!res.ok) throw new Error(`Goodreads feed failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  if (!xml.includes("<rss")) throw new Error("Goodreads feed returned an unexpected payload");

  return xml
    .split("<item>")
    .slice(1)
    .map((item) => {
      const id = field(item, "book_id");
      return {
        id,
        title: field(item, "title"),
        author: field(item, "author_name"),
        href: `https://www.goodreads.com/book/show/${id}`,
        cover: field(item, "book_medium_image_url"),
      };
    })
    .filter((b) => b.id && b.title);
}
