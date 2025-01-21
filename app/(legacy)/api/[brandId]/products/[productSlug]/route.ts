import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ productSlug: string }> }) {
  const params = await props.params;
  try {
    if (!params.productSlug) {
      return new NextResponse("Product slug is required", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        slug: params.productSlug
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        allCat: {
          select:{
            id: true,
            name: true,
            slug:true,
            type: true
          }
        },
        specification: true,
        images_catalogues: {
          select:{
            url: true,
            name: true
          }
        },
        drawing_img: {
          select: {
            url: true
          }
        },
        graph_img: {
          select: {
            url: true
          }
        },
        impedance_img: {
          select: {
            url: true
          }
        },
        cover_img: {
          select: {
            url: true
          }
        },
        size: {
          select: {
            value: true,
            name: true
          }
        },
        multipleDatasheetProduct: {
          select: {
            id: true,
            productId: true,
            url: true,
            name: true
          }
        }
      }
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Fetch specifications if available
    const tweeterSpecification = await prismadb.tweeterSpecification.findFirst({
      where: {
        productId: product.id
      }
    });

    const activesubwooferSpecification = await prismadb.activeSubwooferSpecification.findFirst({
      where: {
        productId: product.id
      }
    });

    const thielesmallparameter2 = await prismadb.thieleSmallParameters2Ohm.findFirst({
      where: {
        productId: product.id
      }
    });

    const thielesmallparameter4 = await prismadb.thieleSmallParameters4Ohm.findFirst({
      where: {
        productId: product.id
      }
    });

    const responseData = {
      product,
      tweeterSpecification: tweeterSpecification || null,
      activesubwooferSpecification: activesubwooferSpecification || null,
      thielesmallparameter2: thielesmallparameter2 || null,
      thielesmallparameter4: thielesmallparameter4 || null,
      tes: ""
    };


    return NextResponse.json(responseData);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
