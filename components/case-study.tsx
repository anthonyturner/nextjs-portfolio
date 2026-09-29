import type { CaseStudy, CaseStudyBlock } from '@/lib/types'
import Link from 'next/link'
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import ProjectVideo from './project-video'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'

function BackToProjects() {
  return (
    <Link
      href="/#projects"
      className={`inline-flex items-center gap-2 rounded text-sm font-medium text-gray-600 hover:text-gray-950 transition ${focusRing}`}
    >
      <FaArrowLeft size={12} aria-hidden="true" />
      Back to projects
    </Link>
  )
}

function Block({ block }: { block: CaseStudyBlock }) {
  if (block.kind === 'paragraph') {
    return <p>{block.text}</p>
  }
  if (block.kind === 'list') {
    const List = block.ordered ? 'ol' : 'ul'
    return (
      <List className={`space-y-2 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
        {block.items.map((item, index) => (
          <li key={index}>
            {item.lead && <strong className="font-semibold text-gray-900">{item.lead}</strong>} {item.text}
          </li>
        ))}
      </List>
    )
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-black/5 bg-gray-100">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/10">
            {block.columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-3 font-semibold text-gray-900">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map(([label, detail]) => (
            <tr key={label} className="border-b border-black/5 last:border-0 align-top">
              <th scope="row" className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                {label}
              </th>
              <td className="px-4 py-3">{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CaseStudyArticle({ caseStudy }: { caseStudy: CaseStudy }) {
  const { title, byline, summary, projectName, repoUrl, liveUrl, builtWith, stats, video, sections, timeline } =
    caseStudy

  return (
    <article className="mb-20 w-full max-w-[45rem] leading-relaxed text-gray-700">
      <BackToProjects />

      <header className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Case study · {projectName}</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-gray-950 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-gray-600">{byline}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 transition ${focusRing}`}
          >
            <FaGithub size={16} aria-hidden="true" />
            Source on GitHub
          </a>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition ${focusRing}`}
          >
            <FaExternalLinkAlt size={14} aria-hidden="true" />
            Live preview
          </a>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
          {builtWith.map((item) => (
            <li
              key={item}
              className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.6rem] uppercase tracking-wider text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </header>

      <section className="mt-12" aria-labelledby="case-study-summary">
        <h2 id="case-study-summary" className="mb-4 text-2xl font-semibold text-gray-950">
          In one paragraph
        </h2>
        <p>{summary}</p>
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col-reverse rounded-lg border border-black/5 bg-gray-100 p-4"
            >
              <dt className="mt-1 text-xs leading-snug text-gray-600">{label}</dt>
              <dd className="text-2xl font-semibold text-gray-950">{value}</dd>
            </div>
          ))}
        </dl>
        <ProjectVideo src={video.src} poster={video.poster} caption={video.caption} title={projectName} />
      </section>

      {sections.map(({ heading, blocks }) => (
        <section key={heading} className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-950">{heading}</h2>
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold text-gray-950">Timeline</h2>
        <p>{timeline}</p>
      </section>

      <div className="mt-12">
        <BackToProjects />
      </div>
    </article>
  )
}
