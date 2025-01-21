import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparison | Legacy',
  description: 'Lihat Komparasi yang Telah Dipilih',
}

export default function ComparisonLayout({
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
