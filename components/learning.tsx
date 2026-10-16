'use client'
import { booksData, learningVideosData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import type { Book, LearningVideo } from '@/lib/types'
import { FaExternalLinkAlt } from 'react-icons/fa'
import SectionHeading from './section-heading'

function embedUrl({ youtubeId, startSeconds }: LearningVideo): string {
  const start = startSeconds ? `?start=${startSeconds}` : ''
  return `https://www.youtube-nocookie.com/embed/${youtubeId}${start}`
}

function watchUrl({ youtubeId, startSeconds }: LearningVideo): string {
  const start = startSeconds ? `&t=${startSeconds}s` : ''
  return `https://www.youtube.com/watch?v=${youtubeId}${start}`
}

function PointList({ heading, points }: { heading: string; points: readonly string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-800">{heading}</h4>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-amber-600">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

const bookStatusLabel: Record<Book['status'], string> = { reading: 'Reading', read: 'Read' }
const authorList = new Intl.ListFormat('en', { type: 'conjunction' })

function BookList() {
  return (
    <>
      <h3 className="mt-12 mb-4 text-xl font-semibold text-gray-800">Books</h3>
      <ul className="bg-white border border-black/[0.1] rounded-lg divide-y divide-black/[0.1]">
        {booksData.map((book) => (
          <li key={book.url} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-amber-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                {book.title}
                <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <p className="text-sm text-gray-500">by {authorList.format(book.authors)}</p>
            </div>
            <span className="self-start bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm sm:self-center">
              <span className="sr-only">Status: </span>
              {bookStatusLabel[book.status]}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Learning() {
  const { ref } = useSectionInView('Learning', 0.25)

  return (
    <section ref={ref} id="learning" className="mb-20 w-full max-w-[53rem] scroll-mt-28 sm:mb-40">
      <SectionHeading>What I&apos;m learning</SectionHeading>
      <p className="-mt-4 mb-8 text-gray-600 leading-relaxed">
        Talks, videos and books on computer science and software craft that shape how I build and keep sharpening my skills.
      </p>
      <ul className="flex flex-col gap-8">
        {learningVideosData.map((video) => (
          <li key={video.youtubeId} className="bg-white border border-black/[0.1] rounded-lg p-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                src={embedUrl(video)}
                title={`${video.title} - ${video.channel} (YouTube video)`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
            <h3 className="mt-4">
              <a
                href={watchUrl(video)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-amber-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                {video.title}
                <FaExternalLinkAlt className="text-sm" aria-hidden="true" />
                <span className="sr-only">(opens on YouTube in a new tab)</span>
              </a>
            </h3>
            <p className="text-sm text-gray-500">{video.channel}</p>
            <p className="text-gray-600 mt-2 leading-relaxed">{video.description}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <PointList heading="Key ideas" points={video.keyIdeas} />
              <PointList heading="How to apply it" points={video.howToApply} />
            </div>
            <ul className="flex flex-wrap gap-2 mt-4" aria-label="Topics">
              {video.tags.map((tag) => (
                <li key={tag} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <BookList />
    </section>
  )
}
