// "use client"

import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ProductColumn } from "./components/columns";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { ProductsClient } from "./components/client";
// import Loading from "./loading";
// import dynamic from "next/dynamic";

// const DynamicProductsClient = dynamic(() => import('./components/client').then(mod => mod.ProductsClient), {
//   ssr: false,
//   loading: () => <Loading />
// });

const ProductsPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const products = await prismadb.product.findMany({
    where: {
      brandId: params.brandId
    },
    include: {
      images_catalogues: true,
      cover_img: true,
      size: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    desc: item.description,
    productImageUrl: item.cover_img.map((img_url) => (
      img_url.url
    )),
    size: item.size.name,
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default ProductsPage;
