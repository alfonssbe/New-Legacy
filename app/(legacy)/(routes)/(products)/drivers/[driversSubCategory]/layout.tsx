import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name"
import { Metadata } from "next"

type Props = {
  params: Promise<{ driversSubCategory: string }>
}
 
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const subCatName = await getSubCatNameBySlug(params.driversSubCategory)
  return {
    title: subCatName.name.concat(" Series | Legacy"),
    description: "All ".concat(subCatName.description, " Series | Products by Legacy"),
    applicationName: 'Legacy',
    keywords: ["Legacy", subCatName.name.concat(" Products"), subCatName.name.concat(" Series | Legacy")],
  }
}

export default function ProductBySubCategoryLayout({
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