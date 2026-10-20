'use client'

import { sendEmail } from '@/actions/sendEmail'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import SectionHeading from './section-heading'
import SubmitBtn from './submit-btn'
import VoiceAssistant from './voice-assistant'

export default function Contact() {
  const { ref } = useSectionInView('Contact', 1)

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-10 max-w-[45rem] text-center leading-8 scroll-mt-28 sm:mb-20"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="mb-3 text-gray-700 -mt-6">
        Please contact me directly at{' '}
        <a className="underline" href="mailto:anthonybturner@icloud.com">
          anthonybturner@icloud.com
        </a>{' '}
        or through this form.
      </p>
      <VoiceAssistant />
      <form
        className="mt-10 flex flex-col p-1"
        action={async (formData) => {
          const { error } = await sendEmail(formData)
          if (error) {
            toast.error(error)
            return
          }
          toast.success('Email sent successfully!')
        }}
      >
        <input
          className="
            h-14 rounded-lg
            p-2
            bg-gray-50 border border-gray-200
            borderBlack
          "
          name="email"
          type="email"
          placeholder="Your email"
        />
        <textarea
          className="
            h-52 my-3 rounded-lg
            p-2
            bg-gray-50 border border-gray-200
            borderBlack
          "
          name="message"
          placeholder="Your Message"
        />
        <SubmitBtn></SubmitBtn>
      </form>
    </motion.section>
  )
}
