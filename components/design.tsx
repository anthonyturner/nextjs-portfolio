'use client'
import { designData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import SectionHeading from './section-heading'

export default function Design() {
  const { ref } = useSectionInView('Design', 0.25)

  return (
    <section ref={ref} id="design" className="mb-20 w-full max-w-[53rem] scroll-mt-28 sm:mb-40">
      <SectionHeading>{designData.heading}</SectionHeading>
      <p className="-mt-4 mb-8 text-gray-600 leading-relaxed">{designData.intro}</p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {designData.practices.map((practice) => (
          <li key={practice.title} className="bg-white border border-black/[0.1] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">{practice.title}</h3>
            <p className="mt-2 text-gray-600 leading-relaxed">{practice.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
