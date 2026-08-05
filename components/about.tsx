'use client'

import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'
import SectionHeading from './section-heading'

export default function About() {
  const { ref } = useSectionInView('About')

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-10 max-w-[45rem] leading-8 scroll-mt-28 sm:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        After earning my degrees in <span className="font-medium">Computer Science</span> from Ulster County Community
        College and SUNY New Paltz, I built my career as a <span className="font-medium">full-stack developer</span>.
        Over the past <span className="font-medium">10+ years</span>, I&apos;ve delivered enterprise software for
        commercial and federal clients, modernized legacy systems, and shipped scalable cloud-based applications.
        My core stack is{' '}
        <span className="font-medium">
          C#, .NET, ASP.NET Core, Angular, TypeScript, SQL Server, Azure, REST APIs, and cloud technologies
        </span>
        .
      </p>
      <p className="mb-3">
        I bring a strong focus on <span className="font-medium">AI-assisted software engineering</span>, using{' '}
        <span className="font-medium">GitHub Copilot, OpenAI Codex, and prompt engineering</span> to accelerate
        architecture, implementation, debugging, testing, and documentation without sacrificing code quality.
      </p>
      <p>
        <span className="italic">When I&apos;m not coding</span>, I enjoy gaming, movies, and dancing. I&apos;m also
        passionate about <span className="font-medium">continuous learning</span> and currently exploring piano as a
        creative outlet.
      </p>
    </motion.section>
  )
}
