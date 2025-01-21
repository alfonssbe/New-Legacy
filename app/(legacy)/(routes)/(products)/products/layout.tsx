import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'All Products',
    description: 'All Products Provided by Legacy Audio',
}

export default function ProductLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
        <>
          {children}
        </>
    )
}