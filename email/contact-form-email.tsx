import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from '@react-email/components'
import type { ContactEmailSource } from '@/lib/types'

type ContactFormEmailProps = {
  message: string
  email: string
  source?: ContactEmailSource
  name?: string
  company?: string
}

const SOURCE_LABELS = {
  'contact-form': 'the contact form',
  'voice-assistant': 'the voice assistant',
} as const satisfies Record<ContactEmailSource, string>

const detailStyle = { fontSize: '14px', lineHeight: '24px', margin: '16px 0' }

export default function ContactFormEmail({
  message,
  email,
  source = 'contact-form',
  name,
  company,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your Portfolio site</Preview>
      <Body className="bg-gray-100">
        <Container style={{ margin: '0 auto', padding: '20px' }}>
          <Section className="borderBlack my-10 px-10 rounded-md">
            <Heading className="leading-tight">{`You received the following message from ${SOURCE_LABELS[source]}`}</Heading>
            <Text style={detailStyle}>{message}</Text>
            <Hr style={{ width: '100%', border: 'none', borderTop: '1px solid #eaeaea' }} />
            {name && <Text style={detailStyle}>The sender&apos;s name is: {name}</Text>}
            {company && <Text style={detailStyle}>The sender&apos;s company is: {company}</Text>}
            <Text style={detailStyle}>
              The sender&apos;s email is: <Link href={`mailto:${email}`}>{email}</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
