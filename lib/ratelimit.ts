// Rate limit settings: 15 minutes window and maximum 100 requests per IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 100;

const rateLimitStore: Map<string, {count: number; windowStart: number}> =
  (globalThis as any).__rateLimitStore || new Map();

if (!(globalThis as any).__rateLimitStore) {
  (globalThis as any).__rateLimitStore = rateLimitStore;
}

export const ratelimit = {
  limit: async (ip: string): Promise<{success: boolean; remaining: number; reset: number}> => {
    const now = Date.now();
    let record = rateLimitStore.get(ip);

    if (!record) {
      record = {count: 1, windowStart: now};
      rateLimitStore.set(ip, record);
      return {success: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS};
    }

    if (now - record.windowStart > WINDOW_MS) {
      record.count = 1;
      record.windowStart = now;
      return {success: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS};
    }

    if (record.count < MAX_REQUESTS) {
      record.count++;
      return {
        success: true,
        remaining: MAX_REQUESTS - record.count,
        reset: record.windowStart + WINDOW_MS,
      };
    }

    // Rate limit exceeded
    return {success: false, remaining: 0, reset: record.windowStart + WINDOW_MS};
  },
};
