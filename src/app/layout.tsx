import Footer from '@/components/footer'
import Header from '@/components/header'
import ThemeSwitch from '@/components/theme-switch'
import ActiveSectionContextProvider from '@/context/active-section-context'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://anthonybturner-next.vercel.app'),
  title: 'Anthony Turner | Full-Stack Developer Portfolio',
  description:
    'Anthony is a full-stack developer with 10+ years of experience in React, Next.js, Angular, .NET, and cloud technologies. View my projects and experience.',
  keywords: ['Anthony Turner', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Anthony Turner' }],
  creator: 'Anthony Turner',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anthonybturner-next.vercel.app',
    title: 'Anthony Turner | Full-Stack Developer Portfolio',
    description:
      'Full-stack developer with 10+ years of experience. Specializing in React, Next.js, Angular, .NET, and cloud technologies.',
    siteName: 'Anthony Turner Portfolio',
    images: [
      {
        url: '/og-image.jpg', // ✅ Simplified path
        width: 1200,
        height: 630,
        alt: 'Anthony Turner - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anthony Turner | Full-Stack Developer Portfolio',
    description: 'Full-stack developer with 10+ years of experience in modern web technologies.',
    images: ['/og-image.jpg'], // ✅ Simplified path
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className}
      bg-gray-50 text-gray-950 relative ml-4 mr-4 pt-28 sm:pt-36        
      `}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        <ActiveSectionContextProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </ActiveSectionContextProvider>
        <ThemeSwitch></ThemeSwitch>
        <Analytics />
      </body>
    </html>
  )
}
