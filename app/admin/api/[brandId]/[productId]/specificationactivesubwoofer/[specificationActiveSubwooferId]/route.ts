import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";

export async function GET(
  req: Request,
  props: { params: Promise<{ specificationActiveSubwooferId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.specificationActiveSubwooferId) {
      return new NextResponse("Active Subwoofer Specification id is required", { status: 400 });
    }

    const activesubwooferspecification = await prismadb.activeSubwooferSpecification.findUnique({
      where: {
        id: params.specificationActiveSubwooferId
      }
    });
    return NextResponse.json(activesubwooferspecification);
  } catch (error) {
    console.log('[ACTIVE_SUBWOOFER_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string, specificationActiveSubwooferId: string }> }
) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn || !session){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    const body = await req.json();

    const { 
      speaker,
      subwoofer,
      daya_amplifier,
      filter_lpf_variabel,
      input_level,
      power_input,
      box_type 
    } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    
    
    const activesubwooferspecification = await prismadb.activeSubwooferSpecification.update({
      where: {
        id : params.specificationActiveSubwooferId
      },
      data: {
        speaker,
        subwoofer,
        daya_amplifier,
        filter_lpf_variabel,
        input_level,
        power_input,
        box_type 
      }
    });

    await prismadb.product.update({
      where:{
        id: params.productId
      },
      data: {
        activeSubwooferSpecId: activesubwooferspecification.id,
        updatedAt: new Date(),
        updatedBy: session.name,
      }
    });
  
    return NextResponse.json(activesubwooferspecification);
  } catch (error) {
    console.log('[SINGLE_SB_AUDIENCE_SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
