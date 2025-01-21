import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distributors',
  description: 'Distributors - Legacy Audio',
}

export default function DistributorsLayout({
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
