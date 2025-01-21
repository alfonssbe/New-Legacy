import getOneNews from "@/app/(legacy)/actions/get-one-news"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ newsSlug: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const product = await getOneNews(params.newsSlug)
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: product.title.concat(" | Legacy Speaker"),
    description: product.description,
    applicationName: 'Legacy Speaker',
    keywords: [product.title, product.slug, product.description, product.news_img_url, 'Legacy News'],
    openGraph: {
      images: [product.news_img_url, ...previousImages],
      description: product.description,
      title: product.title
    },
  }
}

export default function SingleNewsLayout({
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