interface ProjectVideoProps {
  src: string
  title: string
  poster?: string
  caption?: string
}

export default function ProjectVideo({ src, title, poster, caption }: ProjectVideoProps) {
  return (
    <figure className="clear-both mt-6 mb-2">
      <video
        controls
        preload="metadata"
        playsInline
        poster={poster}
        aria-label={`Demo video: ${title}`}
        className="
          w-full rounded-lg shadow-2xl bg-black
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600
        "
      >
        <source src={src} type="video/mp4" />
        <p>
          Your browser cannot play embedded video.{' '}
          <a href={src} className="underline">
            Download the demo clip
          </a>{' '}
          instead.
        </p>
      </video>
      {caption && (
        <figcaption className="mt-2 text-sm leading-relaxed text-gray-600">{caption}</figcaption>
      )}
    </figure>
  )
}
