'use client'
import { useSectionInView } from '@/lib/hooks'
import type { Project as ProjectData } from '@/lib/types'
import React from 'react'
import Project from './project'
import SectionHeading from './section-heading'

export default function Projects({ projects }: { projects: ProjectData[] }) {
  const { ref } = useSectionInView('Projects', 0.25)

  return (
    <section ref={ref} id="projects" className="mb-10 max-w-[45rem] leading-8 scroll-mt-28 sm:mb-20">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {/* prettier-ignore */}
        {projects.map((project, i) => (
          <React.Fragment key={i}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
