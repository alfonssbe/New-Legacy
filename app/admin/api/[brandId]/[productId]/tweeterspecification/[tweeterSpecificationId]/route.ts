import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  props: { params: Promise<{ tweeterSpecificationId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.tweeterSpecificationId) {
      return new NextResponse("Tweeter Specification id is required", { status: 400 });
    }

    const tweeterspecification = await prismadb.tweeterSpecification.findUnique({
      where: {
        id: params.tweeterSpecificationId
      }
    });
    return NextResponse.json(tweeterspecification);
  } catch (error) {
    console.log('[TWEETER_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string, tweeterSpecificationId: string }> }
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

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    
    
    const tweeterspecification = await prismadb.tweeterSpecification.update({
      where: {
        id : params.tweeterSpecificationId
      },
      data: {
        nominal_impedance,
        dc_resistance,
        voice_coil_diameter,
        voice_coil_height,
        air_gap_height,
        sensitivity,
        magnetic_flux_density,
        magnet_weight
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
  
    return NextResponse.json(tweeterspecification);
  } catch (error) {
    console.log('[TWEETER_SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
