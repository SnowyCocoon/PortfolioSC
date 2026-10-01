import { unstable_cache } from "next/cache";

export interface Checkpoint<T> {
  /** ISO timestamp of the pull this data came from. */
  fetchedAt: string;
  data: T;
}

export interface LastGood<T> extends Checkpoint<T> {
  /** True when the source couldn't be reached and `data` is an older pull. */
  unavailable: boolean;
}

const REVALIDATE_SECONDS = 86400;

// Wraps a live fetch so the Hobby page always has something to show. The
// fetch is cached once a day; `fetchLive` must throw when the source can't be
// reached, because unstable_cache then keeps serving the previous entry
// instead of overwriting the last good pull. `snapshot` is the copy committed
// to the repo — the floor for a fresh deploy with an empty data cache.
export function lastGood<T>(key: string, fetchLive: () => Promise<T>, snapshot: Checkpoint<T>): () => Promise<LastGood<T>> {
  const getCached = unstable_cache(
    async (): Promise<Checkpoint<T>> => {
      const data = await fetchLive();
      return { fetchedAt: new Date().toISOString(), data };
    },
    [key],
    { revalidate: REVALIDATE_SECONDS },
  );

  return async () => {
    let checkpoint = snapshot;
    let failed = false;
    try {
      const cached = await getCached();
      if (cached.fetchedAt > checkpoint.fetchedAt) checkpoint = cached;
      // A pull older than the revalidate window means the refresh was attempted and failed.
      failed = (Date.now() - Date.parse(cached.fetchedAt)) / 1000 > REVALIDATE_SECONDS;
    } catch (err) {
      console.error(`[${key}] live fetch failed, falling back to committed snapshot:`, err);
      failed = true;
    }
    return { ...checkpoint, unavailable: failed };
  };
}
