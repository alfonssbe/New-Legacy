// "use client"

import prismadb from "@/lib/prismadb";
import { SpecForm } from "./components/specification-form";
// import dynamic from "next/dynamic";
// import Loading from "../../loading";

// const DynamicSpecForm = dynamic(() => import('./components/specification-form').then(mod => mod.SpecForm), {
//   ssr: false,
//   loading: () => <Loading />
// });

const SpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;
  const spec = await prismadb.specification.findFirst({
    where: {
      productId: params.productId,
    },
  });

  const product = await prismadb.product.findFirst({
    where:{
      id: params.productId
    },
    select:{
      name: true
    }
  })

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecForm 
          initialData={spec!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default SpecPage;
