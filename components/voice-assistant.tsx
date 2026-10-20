'use client'

import { voiceAssistantData } from '@/lib/data'
import Script from 'next/script'

// Pinned to the 0.20 range: while the package is 0.x a minor release is the
// breaking one, and no 1.x exists to pin to.
const WIDGET_SCRIPT_URL = 'https://unpkg.com/@elevenlabs/convai-widget-embed@0.20'

// The theme toggle holds bottom-right. The `placement` attribute is read from
// the 0.20 script and is not on the public docs page, so re-check it whenever
// the pin above moves; the dashboard's placement setting is the fallback.
const WIDGET_PLACEMENT = 'bottom-left'

// Next inlines NEXT_PUBLIC_ variables at build time, so changing the id needs
// a rebuild and redeploy.
const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim()

// The notice and the launcher are separate because the launcher floats on the
// screen but its element would inherit the opacity of whatever contains it:
// Contact fades in on scroll, so the launcher must be rendered outside it.
// Both check the same id, so the notice only shows with the launcher.
export function VoiceAssistantNotice() {
  if (!agentId) {
    return null
  }

  return <p className="mb-3 text-sm text-gray-700">{voiceAssistantData.privacyNotice}</p>
}

export function VoiceAssistantLauncher() {
  if (!agentId) {
    return null
  }

  return (
    <>
      <elevenlabs-convai agent-id={agentId} placement={WIDGET_PLACEMENT} />
      <Script src={WIDGET_SCRIPT_URL} strategy="lazyOnload" />
    </>
  )
}
