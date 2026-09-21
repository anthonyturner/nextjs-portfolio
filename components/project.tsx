'use client'
import { projectsData } from '@/lib/data'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import ImageLightbox from './image-lightbox'
import ProjectVideo from './project-video'

type ProjectProps = (typeof projectsData)[number]

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  thumbnailUrl,
  github,
  website,
  videoUrl,
  videoPosterUrl,
  videoCaption,
}: Partial<ProjectProps> & {
  github?: string
  website?: string
  videoUrl?: string
  videoPosterUrl?: string
  videoCaption?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  })
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  return (
    <>
      <motion.div
        ref={ref}
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="group even:pl-2 mb-3 sm:mb-8 last:m-0"
      >
        <section
          className="
          relative overflow-hidden
          max-w-[42rem] 
          mb-3 last:mb-0
          sm:mb-8 sm:h-auto
          bg-gray-100 border border-black/5 rounded-lg
          hover:bg-gray-200 transition
          p-4 sm:p-8
        "
        >
          {!videoUrl && thumbnailUrl && (
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="
                w-full sm:float-right sm:w-64 sm:ml-4 sm:mb-4
                rounded-lg shadow-2xl mb-4 sm:mb-0
                group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04]
                transition-all duration-300
                cursor-pointer hover:opacity-90
                bg-none border-none p-0
              "
            >
              <Image
                src={thumbnailUrl}
                alt="Project I worked on"
                quality={95}
                className="rounded-lg"
              />
            </button>
          )}
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
          {videoUrl && (
            <ProjectVideo
              src={videoUrl}
              title={title || ''}
              poster={videoPosterUrl}
              caption={videoCaption}
            />
          )}
          <ul className="flex flex-wrap mt-4 gap-2">
            {tags?.map((tag, index) => (
              <li
                className="
                  px-3 py-1
                  text-[0.5rem] uppercase tracking-wider
                  bg-black/[0.7] text-white rounded-full
                  hover:bg-amber-600
                "
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-8 clear-both">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-3 py-2
                  text-sm font-medium
                  bg-gray-800 text-white rounded-lg
                  hover:bg-gray-700 transition
                "
                aria-label="View on GitHub"
              >
                <FaGithub size={16} />
                GitHub
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-3 py-2
                  text-sm font-medium
                  bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 transition
                "
                aria-label="Visit website"
              >
                <FaExternalLinkAlt size={14} />
                Website
              </a>
            )}
          </div>
        </section>
      </motion.div>
      <ImageLightbox
        isOpen={isLightboxOpen}
        imageUrl={typeof imageUrl === 'string' ? imageUrl : (typeof thumbnailUrl === 'string' ? thumbnailUrl : thumbnailUrl?.src || '')}
        title={title || ''}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  )
}
