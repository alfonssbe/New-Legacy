// "use client"

import prismadb from "@/lib/prismadb";
import { ActiveSubwooferSpecForm } from "./components/active_subwoofer_specification_form";
// import dynamic from "next/dynamic";
// import Loading from "../../loading";

// const DynamicActiveSubwooferSpecForm = dynamic(() => import('./components/active_subwoofer_specification_form').then(mod => mod.ActiveSubwooferSpecForm), {
//   ssr: false,
//   loading: () => <Loading />
// });

const ActiveSubwooferSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const specSBAudience = await prismadb.activeSubwooferSpecification.findFirst({
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
        <ActiveSubwooferSpecForm 
          initialData={specSBAudience!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default ActiveSubwooferSpecPage;
