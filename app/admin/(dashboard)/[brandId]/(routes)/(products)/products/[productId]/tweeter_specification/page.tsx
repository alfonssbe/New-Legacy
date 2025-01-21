// "use client"

import prismadb from "@/lib/prismadb";
import { TweeterSpecForm } from "./components/tweeter_specification_form";
// import dynamic from "next/dynamic";
// import Loading from "../../loading";

// const DynamicTweeterSpecForm = dynamic(() => import('./components/tweeter_specification_form').then(mod => mod.TweeterSpecForm), {
//   ssr: false,
//   loading: () => <Loading />
// });

const TweeterSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const specTweeter = await prismadb.tweeterSpecification.findFirst({
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
        <TweeterSpecForm 
          initialData={specTweeter!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default TweeterSpecPage;
