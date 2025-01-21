import getSingleMetadata from "@/app/(legacy)/actions/get-metadata-single-product"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ productSlug: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const product = await getSingleMetadata(params.productSlug)
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: product.name.concat(" | Legacy Audio"),
    description: product.desc,
    applicationName: 'Legacy Audio',
    keywords: [product.name, product.slug, product.desc, product.coverAlt, product.size.value.toString()],
    openGraph: {
      images: [product.coverUrl, ...previousImages],
      description: product.coverAlt,
      title: product.name
    },
  }
}

export default function SingleProductLayout({
    children,
  }: {
    children: React.ReactNode
  }
)
{
  return(
    <>
      {children}
    </>
  )
  }