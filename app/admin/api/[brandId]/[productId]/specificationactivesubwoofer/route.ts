import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
 
export async function POST(
  req: Request,
  props: { params: Promise<{ brandId: string, productId: string }> }
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
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const activesubwooferspecification = await prismadb.activeSubwooferSpecification.create({
      data: {
        speaker,
        subwoofer,
        daya_amplifier,
        filter_lpf_variabel,
        input_level,
        power_input,
        box_type ,
        productId: params.productId
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId
      },
      data: {
        activeSubwooferSpecId: activesubwooferspecification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({activesubwooferspecification, updatedProduct});
  } catch (error) {
    console.log('[ACTIVE_SUBWOOFER_SPECIFICATION_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, productId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const activesubwooferspecification = await prismadb.activeSubwooferSpecification.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(activesubwooferspecification);
  } catch (error) {
    console.log('[ACTIVE_SUBWOOFER_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
