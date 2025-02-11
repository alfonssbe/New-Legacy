// "use client"

import prismadb from "@/lib/prismadb";
import { ThieleSpecForm } from "./components/thiele_specification_form";
// import dynamic from "next/dynamic";
// import Loading from "../../loading";

// const DynamicThieleSpecForm = dynamic(() => import('./components/thiele_specification_form').then(mod => mod.ThieleSpecForm), {
//   ssr: false,
//   loading: () => <Loading />
// });

const ThieleSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const thieleSmallParameters2 = await prismadb.thieleSmallParameters2Ohm.findFirst({
    where: {
      productId: params.productId,
    },
  });

  const thieleSmallParameters4 = await prismadb.thieleSmallParameters4Ohm.findFirst({
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
        <ThieleSpecForm 
          thiele2={thieleSmallParameters2!}
          thiele4={thieleSmallParameters4!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default ThieleSpecPage;
