// "use client"

import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
// import dynamic from "next/dynamic";
// import Loading from "./loading";
import { CategoriesClient } from "./components/client";

// const DynamicCategoriesClient = dynamic(() => import('./components/client').then(mod => mod.CategoriesClient), {
//   ssr: false,
//   loading: () => <Loading />
// });

const CategoryPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const category = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Category"
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = category.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    updatedBy: item.updatedBy,
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default CategoryPage;
