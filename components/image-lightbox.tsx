'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

interface ImageLightboxProps {
  isOpen: boolean
  imageUrl: string
  title: string
  onClose: () => void
}

export default function ImageLightbox({
  isOpen,
  imageUrl,
  title,
  onClose,
}: ImageLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition text-3xl font-bold"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <div className="relative w-full h-[80vh] flex justify-center">
              <Image
                src={imageUrl}
                alt={title}
                quality={95}
                priority
                fill
                unoptimized={imageUrl.startsWith('http')}
                sizes="(max-width: 1024px) 90vw, 80vw"
                className="rounded-lg object-contain"
              />
            </div>
            <p className="text-white text-center mt-4 text-sm">{title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
