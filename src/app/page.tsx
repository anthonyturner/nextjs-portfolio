import About from '@/components/about'
import Certifications from '@/components/certifications'
import Contact from '@/components/contact'
import Experience from '@/components/experience'
import Home from '@/components/home'
import Learning from '@/components/learning'
import Projects from '@/components/projects'
import SectionDivider from '@/components/section-divider'
import Skills from '@/components/skills'
import { getProjects } from '@/lib/github-projects'

// Refresh GitHub-sourced project data at most every 10 minutes.
export const revalidate = 600

export default async function Page() {
  const projects = await getProjects()

  return (
    <main className="flex flex-col items-center">
      <Home />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects projects={projects} />
      <SectionDivider />
      <Skills />
      <SectionDivider /> 
      <Certifications />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Learning />
      <SectionDivider />
      <Contact />
      <SectionDivider />
    </main>
  )
}
