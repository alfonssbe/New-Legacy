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
      fs,
      dcr,
      qts,
      qes,
      qms,
      mms,
      cms,
      bl_product,
      vas,
      no,
      sd,
      xmax
    } = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const thielespecification4 = await prismadb.thieleSmallParameters4Ohm.create({
      data: {
        fs,
        dcr,
        qts,
        qes,
        qms,
        mms,
        cms,
        bl_product,
        vas,
        no,
        sd,
        xmax,
        productId: params.productId
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId
      },
      data: {
        thieleSmallParameter4OhmId: thielespecification4.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({thielespecification4, updatedProduct});
  } catch (error) {
    console.log('[THIELE_SPECIFICATION_4_OHM_POST]', error);
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

    const thielespecification4 = await prismadb.thieleSmallParameters4Ohm.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(thielespecification4);
  } catch (error) {
    console.log('[THIELE_SPECIFICATION_4_OHM_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
