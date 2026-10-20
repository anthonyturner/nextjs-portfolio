export type RateLimiter = {
  isLimited: (key: string) => boolean
  record: (key: string) => void
}

type RateLimiterOptions = {
  limit: number
  windowMs: number
  now?: () => number
}

type Window = { count: number; resetAt: number }

// Fixed window counter held in this process's memory, so each server instance
// counts on its own and a restart forgets everything.
export const createRateLimiter = ({ limit, windowMs, now = Date.now }: RateLimiterOptions): RateLimiter => {
  const windows = new Map<string, Window>()

  const evictExpired = (time: number): void => {
    for (const [key, window] of windows) {
      if (window.resetAt <= time) windows.delete(key)
    }
  }

  return {
    isLimited: (key) => {
      const window = windows.get(key)
      return window !== undefined && window.resetAt > now() && window.count >= limit
    },
    record: (key) => {
      const time = now()
      evictExpired(time)
      const window = windows.get(key)
      if (window) {
        window.count += 1
      } else {
        windows.set(key, { count: 1, resetAt: time + windowMs })
      }
    },
  }
}
