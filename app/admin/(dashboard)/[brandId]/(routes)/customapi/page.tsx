import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { CustomApiList } from "@/app/admin/components/ui/custom-api-list";
import { Heading } from "@/app/admin/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/app/admin/actions";


const CustomApiPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const brand = await prismadb.brand.findFirst({
    where: {
      id: params.brandId,
      userId: session.userId
    }
  });

  if (!brand) {
    redirect(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="API" description="API Calls for Custom Usage" />
      <Separator />
        <CustomApiList entityName="searchbox" entityIdName="productId" />
      </div>
    </div>
  );
}

export default CustomApiPage;
