import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/app/(legacy)/components/ui/toaster'
import Image from 'next/image'

const font = Inter({ subsets: ['cyrillic'] })

export const metadata = {
  title: {
    template: '%s | Legacy Speaker',
    default: 'Legacy Speaker',
  },
  description: 'Welcome to Legacy Speaker Website!',
  keywords: 'Legacy, Legacy Speaker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`${font.className || ''} overflow-x-hidden`}>
          <Image
            src='/images/legacy/navbarbg.webp'
            alt='Legacy Website'
            width={1000}
            height={1000}
            className='fixed inset-0 -z-10 w-screen'
            loading='lazy'
          />
          {children}
        <Toaster />
      </body>
    </html>
  )
}
