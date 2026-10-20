import 'server-only'
import ContactFormEmail from '@/email/contact-form-email'
import type { ContactEmailSource } from '@/lib/types'
import { getErrorMessage, isValidString } from '@/lib/utils'
import React from 'react'
import { Resend } from 'resend'

const SENDER = 'onboarding@resend.dev'
const RECIPIENT = 'anthonybturner@icloud.com'

export const CONTACT_EMAIL_LIMITS = {
  email: 500,
  message: 5000,
  name: 200,
  company: 200,
} as const

const SOURCES = {
  'contact-form': { subject: 'Message from contact form', requiresName: false },
  'voice-assistant': { subject: 'Message from voice assistant', requiresName: true },
} as const satisfies Record<ContactEmailSource, { subject: string; requiresName: boolean }>

// One "@" with text on both sides and no spaces. Enough to reject a spoken
// "john at gmail dot com"; Resend rejects anything it cannot deliver to.
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+$/

export type ContactEmailField = keyof typeof CONTACT_EMAIL_LIMITS

export type ContactEmailInput = {
  source: ContactEmailSource
  email: unknown
  message: unknown
  name?: unknown
  company?: unknown
}

export type ContactEmailResult =
  | { ok: true; id: string }
  | { ok: false; reason: 'invalid'; field: ContactEmailField; error: string }
  | { ok: false; reason: 'not-configured' | 'send-failed'; error: string }

const isMissing = (value: unknown): boolean => value === undefined || value === null || value === ''

const invalid = (field: ContactEmailField): ContactEmailResult => ({
  ok: false,
  reason: 'invalid',
  field,
  error: `Invalid sender ${field}`,
})

export const sendContactEmail = async (input: ContactEmailInput): Promise<ContactEmailResult> => {
  const { source, email, message, name, company } = input

  if (!isValidString(email, CONTACT_EMAIL_LIMITS.email) || !EMAIL_FORMAT.test(email)) {
    return invalid('email')
  }
  if (!isValidString(message, CONTACT_EMAIL_LIMITS.message)) {
    return invalid('message')
  }
  const validName = isValidString(name, CONTACT_EMAIL_LIMITS.name) ? name : undefined
  if (validName === undefined && (SOURCES[source].requiresName || !isMissing(name))) {
    return invalid('name')
  }
  const validCompany = isValidString(company, CONTACT_EMAIL_LIMITS.company) ? company : undefined
  if (validCompany === undefined && !isMissing(company)) {
    return invalid('company')
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      reason: 'not-configured',
      error: 'Email service is not configured. Please contact the administrator.',
    }
  }

  // Created per call so a missing key cannot fail the build.
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: SENDER,
      to: RECIPIENT,
      subject: SOURCES[source].subject,
      replyTo: email,
      react: React.createElement(ContactFormEmail, {
        message,
        email,
        source,
        name: validName,
        company: validCompany,
      }),
    })
    // Resend reports a rejected send in `error` instead of throwing.
    if (error || !data) {
      return { ok: false, reason: 'send-failed', error: error?.message ?? 'Email could not be sent' }
    }
    return { ok: true, id: data.id }
  } catch (error: unknown) {
    return { ok: false, reason: 'send-failed', error: getErrorMessage(error) }
  }
}
