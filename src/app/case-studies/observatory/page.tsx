import CaseStudyArticle from '@/components/case-study'
import { observatoryCaseStudy } from '@/lib/data'
import type { Metadata } from 'next'

const path = '/case-studies/observatory'
const title = 'Case study: Observatory | Anthony Turner'
const description =
  'How Anthony Turner directed AI agents to migrate a 16,288-line prototype into a tested, production Angular app in five days: 105 merged pull requests and about 1,500 automated tests.'
const image = {
  url: observatoryCaseStudy.video.poster,
  width: 1280,
  height: 720,
  alt: 'The Observatory home screen',
}

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: path,
    siteName: 'Anthony Turner Portfolio',
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image.url],
  },
}

export default function ObservatoryCaseStudyPage() {
  return (
    <main className="flex flex-col items-center">
      <CaseStudyArticle caseStudy={observatoryCaseStudy} />
    </main>
  )
}
