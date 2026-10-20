import { createHash, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { sendContactEmail, type ContactEmailField } from '@/lib/contact-email'
import { createRateLimiter } from '@/lib/rate-limit'
import { isValidString } from '@/lib/utils'

export const runtime = 'nodejs'

const SECRET_HEADER = 'x-voice-tool-secret'
const WINDOW_MS = 60 * 60 * 1000
const CONVERSATION_LIMIT = 3
const GLOBAL_LIMIT = 20
const MAX_CONVERSATION_ID_LENGTH = 200
const UNKNOWN_CONVERSATION = 'unknown-conversation'
const GLOBAL_KEY = 'all'
const NOT_CONFIGURED_MESSAGE =
  'Message taking is not set up yet. Ask the caller to use the contact form on the website instead.'

const conversationLimiter = createRateLimiter({ limit: CONVERSATION_LIMIT, windowMs: WINDOW_MS })
const globalLimiter = createRateLimiter({ limit: GLOBAL_LIMIT, windowMs: WINDOW_MS })

const FIELD_LABELS = {
  name: "caller's name",
  email: 'email address',
  message: 'message',
  company: 'company name',
} as const satisfies Record<ContactEmailField, string>

// The agent speaks these. Every non-2xx body carries one because it is not
// known what ElevenLabs shows the agent for an error status.
const respond = (status: number, reason: string, message: string, extra: Record<string, string> = {}) =>
  NextResponse.json({ ok: false, reason, message, ...extra }, { status })

const digest = (value: string): Buffer => createHash('sha256').update(value).digest()

const secretMatches = (provided: string | null, expected: string): boolean =>
  timingSafeEqual(digest(provided ?? ''), digest(expected))

export async function POST(request: Request): Promise<NextResponse> {
  const expectedSecret = process.env.VOICE_TOOL_SECRET?.trim()
  if (!expectedSecret) {
    return respond(503, 'not-configured', NOT_CONFIGURED_MESSAGE)
  }
  if (!secretMatches(request.headers.get(SECRET_HEADER), expectedSecret)) {
    return respond(401, 'unauthorized', 'This request was not authorised, so the message was not sent. Ask the caller to use the contact form on the website instead.')
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = undefined
  }
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return respond(400, 'bad-request', 'The message was not sent because the request was not a JSON object. Try again.')
  }
  const fields = body as Record<string, unknown>

  const conversationId = isValidString(fields.conversationId, MAX_CONVERSATION_ID_LENGTH)
    ? fields.conversationId
    : UNKNOWN_CONVERSATION
  if (globalLimiter.isLimited(GLOBAL_KEY) || conversationLimiter.isLimited(conversationId)) {
    return respond(429, 'rate-limited', 'Too many messages have been sent recently, so this one was not sent. Ask the caller to use the contact form on the website or to try again later.')
  }
  globalLimiter.record(GLOBAL_KEY)
  conversationLimiter.record(conversationId)

  const result = await sendContactEmail({
    source: 'voice-assistant',
    name: fields.name,
    email: fields.email,
    message: fields.message,
    company: fields.company,
  })

  if (result.ok) {
    return NextResponse.json({ ok: true, message: 'The message has been sent to Anthony. He will reply by email.' })
  }
  switch (result.reason) {
    case 'invalid':
      return respond(
        400,
        'invalid',
        `The message was not sent because the ${FIELD_LABELS[result.field]} is missing, too long or not valid. Ask the caller to confirm it, then try again.`,
        { field: result.field }
      )
    case 'not-configured':
      return respond(503, 'not-configured', NOT_CONFIGURED_MESSAGE)
    case 'send-failed':
      return respond(502, 'send-failed', 'The message could not be sent just now. Ask the caller to use the contact form on the website or to try again later.', { detail: result.error })
  }
}
