import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isArchived: false,
      },
      select: {
        slug: true,
        name: true,
        id: true,
        size: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    const productIds = products.map(product => product.id);

    const categories = await prismadb.allProductCategory.findMany({
      where:{
          productId:{
              in: productIds
          },
      },
      select:{
          type: true,
          name: true,
          productId: true
      }
    })
    
    const image_url = await prismadb.cover_Image.findMany({
      select:{
        productId: true,
        url: true
      }
    })

    const productsWithCategoriesandImage = products.map((product) => {
      const productCategories = categories.filter(category => category.productId === product.id);
      
      let tempName = ""
      const categoryDetails = productCategories.map(category => {
          tempName = tempName.concat(category.name, " ");
          return { tempName };
      });
      
      const productImage = image_url.filter(image => image.productId === product.id);
      const final_Url = productImage.map(url => ({
       url: url.url
      }));

      return {
        label: product.name,
        value: tempName,
        slug: product.slug,
        url: final_Url,
        categoryDetails: categoryDetails[2].tempName
      };
    });


  
    return NextResponse.json(productsWithCategoriesandImage);
  } catch (error) {
    console.log('[SEARCHBOX_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};