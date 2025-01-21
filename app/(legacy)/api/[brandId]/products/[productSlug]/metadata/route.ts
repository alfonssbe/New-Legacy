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
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};