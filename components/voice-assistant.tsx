'use client'

import { voiceAssistantData } from '@/lib/data'
import Script from 'next/script'

// Pinned to the 0.20 range: while the package is 0.x a minor release is the
// breaking one, and no 1.x exists to pin to.
const WIDGET_SCRIPT_URL = 'https://unpkg.com/@elevenlabs/convai-widget-embed@0.20'

// The widget floats in a screen corner, and the theme toggle holds bottom-right.
const WIDGET_PLACEMENT = 'bottom-left'

// Next inlines NEXT_PUBLIC_ variables at build time, so changing the id needs
// a rebuild and redeploy.
const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim()

export default function VoiceAssistant() {
  if (!agentId) {
    return null
  }

  return (
    <>
      <p className="mb-3 text-sm text-gray-700">{voiceAssistantData.privacyNotice}</p>
      <elevenlabs-convai agent-id={agentId} placement={WIDGET_PLACEMENT} />
      <Script src={WIDGET_SCRIPT_URL} strategy="lazyOnload" />
    </>
  )
}
