import getSubCatNameBySlug from "@/app/(legacy)/actions/get-SubCat_Name"
import getSubSubCatNameBySlug from "@/app/(legacy)/actions/get-SubSubCat_Name"
import { Metadata } from "next"

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}
 
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug(params.driversSubCategory),
    getSubSubCatNameBySlug(params.driversSubSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' ? subSubCatNameResult.value : { name: '' };

  return {
    title: subSubCatName.name.concat(" | ", subCatName.name," Series | Legacy"),
    description: "All ".concat(subSubCatName.name, " From ", subCatName.name, " Series | Products by Legacy"),
    applicationName: 'Legacy',
    keywords: ["Legacy", subCatName.name.concat(" Products"), subCatName.name.concat(" Series | Legacy"), subSubCatName.name.concat(" Products"), subSubCatName.name.concat(" Legacy")],
  }
}

export default function ProductBySubSubCategoryLayout({
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