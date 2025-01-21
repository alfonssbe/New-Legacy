import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Us - Legacy Audio',
}

export default function AboutUsLayout({
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
