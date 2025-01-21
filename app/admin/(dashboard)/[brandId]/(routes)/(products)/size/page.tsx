// "use client"

import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { SizesClient } from "./components/client";
// import dynamic from "next/dynamic";
// import Loading from "./loading";

// const DynamicSizesClient = dynamic(() => import('./components/client').then(mod => mod.SizesClient), {
//   ssr: false,
//   loading: () => <Loading />
// });

const SizePage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const sizes = await prismadb.size.findMany({
    where: {
      brandId: params.brandId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default SizePage;
