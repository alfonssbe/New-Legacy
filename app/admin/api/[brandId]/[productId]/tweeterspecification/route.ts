import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import { redirect } from 'next/navigation';
 
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
      nominal_impedance,
      dc_resistance,
      voice_coil_diameter,
      voice_coil_height,
      air_gap_height,
      sensitivity,
      magnetic_flux_density,
      magnet_weight
    } = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const tweeterspecification = await prismadb.tweeterSpecification.create({
      data: {
        nominal_impedance,
        dc_resistance,
        voice_coil_diameter,
        voice_coil_height,
        air_gap_height,
        sensitivity,
        magnetic_flux_density,
        magnet_weight,
        productId: params.productId
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId
      },
      data: {
        tweeterSpecId: tweeterspecification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({tweeterspecification, updatedProduct});
  } catch (error) {
    console.log('[TWEETER_SPECIFICATION_POST]', error);
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

    const tweeterspecification = await prismadb.tweeterSpecification.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(tweeterspecification);
  } catch (error) {
    console.log('[TWEETER_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
