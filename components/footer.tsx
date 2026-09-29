'use client'

export default function Footer() {
  return (
    <footer className="mb-10 px-4 py-4 text-center text-gray-500 bg-gray-100 w-full ">
      <small className="mb-2 block text-xs">&copy; {new Date().getFullYear()} Anthony Turner. All rights reserved.</small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with React & Next.js (App Router & Server
        Actions), TypeScript, Tailwind CSS, Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  )
}
