// "use client"

import prismadb from "@/lib/prismadb";
import { FeaturedProductForm } from "./components/featured-product-form";
// import dynamic from "next/dynamic";
// import Loading from "../loading";

// const DynamicFeaturedProductForm = dynamic(() => import('./components/featured-product-form').then(mod => mod.FeaturedProductForm), {
//   ssr: false,
//   loading: () => <Loading />
// });

const FeaturedProductPage = async (
  props: {
    params: Promise<{ featuredProductId: string }>
  }
) => {
  const params = await props.params;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.featuredProductId,
    },
    include: {
      featured_img: true
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FeaturedProductForm 
          initialData={product}
        />
      </div>
    </div>
  );
}

export default FeaturedProductPage;

