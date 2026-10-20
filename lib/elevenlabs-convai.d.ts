import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string
        placement?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right'
      }
    }
  }
}
