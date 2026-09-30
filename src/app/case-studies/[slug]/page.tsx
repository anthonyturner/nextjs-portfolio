import CaseStudyArticle from '@/components/case-study'
import { caseStudies } from '@/lib/data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type CaseStudyPageProps = { params: Promise<{ slug: string }> }

// Only the case studies in lib/data.ts exist; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }))
}

const findCaseStudy = (slug: string) => caseStudies.find((caseStudy) => caseStudy.slug === slug)

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = findCaseStudy((await params).slug)
  if (!caseStudy) {
    return {}
  }
  const path = `/case-studies/${caseStudy.slug}`
  const title = `Case study: ${caseStudy.projectName} | Anthony Turner`
  const description = caseStudy.metaDescription

  return {
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
      images: [caseStudy.socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [caseStudy.socialImage.url],
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = findCaseStudy((await params).slug)
  if (!caseStudy) {
    notFound()
  }

  return (
    <main className="flex flex-col items-center">
      <CaseStudyArticle caseStudy={caseStudy} />
    </main>
  )
}
