import type { ReadmeBlock } from '@/lib/types'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface ReadmeSummaryProps {
  blocks: readonly ReadmeBlock[]
  url?: string
}

export default function ReadmeSummary({ blocks, url }: ReadmeSummaryProps) {
  return (
    <details className="mt-4 text-sm leading-relaxed text-gray-700">
      <summary
        className="
          w-fit cursor-pointer select-none rounded font-medium text-gray-800
          hover:text-gray-950
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600
        "
      >
        From the README
      </summary>
      <div className="mt-2 space-y-2">
        {blocks.map((block, index) =>
          block.kind === 'paragraph' ? (
            <p key={index}>{block.text}</p>
          ) : (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-blue-700 underline hover:text-blue-800"
          >
            Read the full README on GitHub
            <FaExternalLinkAlt size={11} aria-hidden="true" />
          </a>
        )}
      </div>
    </details>
  )
}
