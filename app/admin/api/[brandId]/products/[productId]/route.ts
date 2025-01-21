import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";
import { Cover_Image, Drawing_Image, Graph_Image, Image_Catalogues, Impedance_Image, multipleDatasheetProduct } from "@prisma/client";

const slugify = (str: string): string => {
  const normalizedStr = str.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, "'");
  const strAfterQuote = normalizedStr.includes("'") ? normalizedStr.split("'")[1] : normalizedStr;
  const strBeforeSlash = strAfterQuote.includes('/') ? strAfterQuote.split('/')[0] : strAfterQuote;
  const strWithoutSatori = strBeforeSlash.replace(/SATORI/gi, '');
  return strWithoutSatori.toLowerCase()
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '');
};

export async function GET(req: Request, props: { params: Promise<{ productId: string }> }) {
  const params = await props.params;
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        allCat: true,
        specification: true,
        images_catalogues: true,
        cover_img: true,
        drawing_img: true,
        graph_img: true,
        impedance_img: true,
        size: true,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string }> }
) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const product = await prismadb.product.delete({
      where: {
        id: params.productId
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string }> }
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

    const { name, description, isFeatured, isArchived, isNewProduct, sizeId, images_catalogues, multipleDatasheetProduct, cover_img, drawing_img, graph_img, impedance_img, series } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const initial = await prismadb.product.findFirst({
      where:{
        id: params.productId
      },
      select:{
        name: true
      }
    })


    if(initial){
      if(initial.name ===  name){
        await prismadb.product.update({
          where: {
            id: params.productId
          },
          data: {
            name,
            slug: slugify(name),
            isFeatured,
            isArchived,
            isNewProduct,
            series,
            sizeId,
            description: description,
            updatedBy: session.name,
            images_catalogues: {
              deleteMany: {},
            },
            cover_img:{
              deleteMany: {},
            },
            drawing_img:{
              deleteMany: {},
            },
            graph_img:{
              deleteMany: {},
            },
            impedance_img:{
              deleteMany: {},
            },
            multipleDatasheetProduct:{
              deleteMany: {},
            }
          },
        });
        
        if(images_catalogues.length!=0){
          images_catalogues.map(async (value: Image_Catalogues) => {
            if(value.url!=''){
              await prismadb.image_Catalogues.create({
                data:{
                  productId: params.productId,
                  url:value.url,
                  name: value.name,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              })
            }
          })
        }

        if(multipleDatasheetProduct.length!=0){
          multipleDatasheetProduct.map(async (datasheet: multipleDatasheetProduct) => {
            if(datasheet.url!=''){
              await prismadb.multipleDatasheetProduct.create({
                data:{
                  productId: params.productId,
                  url:datasheet.url,
                  name: datasheet.name
                }
              })
            }
          })
        }

        if(cover_img.length!=0){
          cover_img.map(async (value: Cover_Image) => {
            if(value.url!=''){
              await prismadb.cover_Image.create({
                data:{
                  productId: params.productId,
                  url:value.url,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              })
            }
          })
        }

        if(drawing_img.length!=0){
          drawing_img.map(async (value: Drawing_Image) => {
            if(value.url!=''){
              await prismadb.drawing_Image.create({
                data:{
                  productId: params.productId,
                  url:value.url,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              })
            }
          })
        }

        if(graph_img.length!=0){
          graph_img.map(async (value: Graph_Image) => {
            if(value.url!=''){
              await prismadb.graph_Image.create({
                data:{
                  productId: params.productId,
                  url:value.url,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              })
            }
          })
        }

        if(impedance_img.length!=0){
          impedance_img.map(async (value: Impedance_Image) => {
            if(value.url!=''){
              await prismadb.impedance_Image.create({
                data:{
                  productId: params.productId,
                  url:value.url,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              })
            }
          })
        }

        return NextResponse.json("same")
      }
    }

    const duplicates = await prismadb.product.findFirst({
      where:{
        name,
      }
    })

    if(duplicates){
      return NextResponse.json("duplicate")
    }

    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        slug: slugify(name),
        isFeatured,
        isArchived,
        isNewProduct,
        series,
        sizeId,
        description: description,
        images_catalogues: {
          deleteMany: {},
        },
        cover_img:{
          deleteMany: {},
        },
        drawing_img:{
          deleteMany: {},
        },
        graph_img:{
          deleteMany: {},
        },
        impedance_img:{
          deleteMany: {},
        },
        multipleDatasheetProduct:{
          deleteMany: {},
        }
      },
    });

    if(images_catalogues.length!=0){
      images_catalogues.map(async (value: Image_Catalogues) => {
        if(value.url!=''){
          await prismadb.image_Catalogues.create({
            data:{
              productId: params.productId,
              url:value.url,
              name: value.name,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(multipleDatasheetProduct.length!=0){
      multipleDatasheetProduct.map(async (datasheet: multipleDatasheetProduct) => {
        if(datasheet.url!=''){
          await prismadb.multipleDatasheetProduct.create({
            data:{
              productId: params.productId,
              url:datasheet.url,
              name: datasheet.name
            }
          })
        }
      })
    }

    if(cover_img.url!=''){
      cover_img.map(async (value: Cover_Image) => {
        if(value.url!=''){
          await prismadb.cover_Image.create({
            data:{
              productId: params.productId,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(drawing_img.length!=0){
      drawing_img.map(async (value: Drawing_Image) => {
        if(value.url!=''){
          await prismadb.drawing_Image.create({
            data:{
              productId: params.productId,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(graph_img.length!=0){
      graph_img.map(async (value: Graph_Image) => {
        if(value.url!=''){
          await prismadb.graph_Image.create({
            data:{
              productId: params.productId,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(impedance_img.length!=0){
      impedance_img.map(async (value: Impedance_Image) => {
        if(value.url!=''){
          await prismadb.impedance_Image.create({
            data:{
              productId: params.productId,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }
    return NextResponse.json("success");
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};