import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News',
  description: 'News - Legacy Audio',
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
