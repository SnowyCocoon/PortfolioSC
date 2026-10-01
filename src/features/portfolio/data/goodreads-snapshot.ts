import type { Book } from "../lib/goodreads";
import type { Checkpoint } from "../lib/last-good";

// Last known-good "currently reading" shelf, shown when Goodreads can't be reached.
export const GOODREADS_SNAPSHOT: Checkpoint<Book[]> = {
  fetchedAt: "2026-10-01T16:47:57.000Z",
  data: [
    {
      id: "30225389",
      title: "Chiny bez makijażu",
      author: "Marcin Jacoby",
      href: "https://www.goodreads.com/book/show/30225389",
      cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1487680861l/30225389._SX98_.jpg",
    },
    {
      id: "237615803",
      title: "Chiny. Przewodnik po herosach, smokach i świętych rzekach",
      author: "Tao Tao Liu",
      href: "https://www.goodreads.com/book/show/237615803",
      cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1751291706l/237615803._SX98_.jpg",
    },
  ],
};
