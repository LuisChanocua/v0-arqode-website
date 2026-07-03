import { createHash } from "node:crypto"

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000

type RateLimitBucket = {
  count: number
  resetAt: number
}

type SubmissionRecord = {
  expiresAt: number
}

type ContactRequestLimitResult =
  | { allowed: true }
  | { allowed: false; reason: "rate-limit"; retryAfterSeconds: number }
  | { allowed: false; reason: "duplicate" }

const rateLimitBuckets = new Map<string, RateLimitBucket>()
const completedSubmissions = new Map<string, SubmissionRecord>()

function now() {
  return Date.now()
}

function cleanupExpiredRecords(currentTime: number) {
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= currentTime) {
      rateLimitBuckets.delete(key)
    }
  }

  for (const [key, submission] of completedSubmissions) {
    if (submission.expiresAt <= currentTime) {
      completedSubmissions.delete(key)
    }
  }
}

export function getContactClientKey(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = headers.get("x-real-ip")?.trim()

  return forwardedFor || realIp || "unknown"
}

export function createContactSubmissionFingerprint(clientKey: string, rawBody: string) {
  return createHash("sha256").update(`${clientKey}:${rawBody}`).digest("hex")
}

export function checkContactRequestLimit(
  clientKey: string,
  submissionFingerprint: string,
): ContactRequestLimitResult {
  const currentTime = now()
  cleanupExpiredRecords(currentTime)

  if (completedSubmissions.has(submissionFingerprint)) {
    return { allowed: false, reason: "duplicate" }
  }

  const bucket = rateLimitBuckets.get(clientKey)

  if (!bucket || bucket.resetAt <= currentTime) {
    rateLimitBuckets.set(clientKey, {
      count: 1,
      resetAt: currentTime + RATE_LIMIT_WINDOW_MS,
    })
    return { allowed: true }
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      reason: "rate-limit",
      retryAfterSeconds: Math.ceil((bucket.resetAt - currentTime) / 1000),
    }
  }

  bucket.count += 1
  return { allowed: true }
}

export function rememberContactSubmission(submissionFingerprint: string) {
  completedSubmissions.set(submissionFingerprint, {
    expiresAt: now() + IDEMPOTENCY_TTL_MS,
  })
}
