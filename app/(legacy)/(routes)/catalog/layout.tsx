import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Catalog - Legacy Audio',
}

export default function CatalogLayout({
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
