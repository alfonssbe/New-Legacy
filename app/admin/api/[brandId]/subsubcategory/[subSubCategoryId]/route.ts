import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";

const slugify = (str: string): string => str.toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');

export async function GET(req: Request, props: { params: Promise<{ subSubCategoryId: string }> }) {
  const params = await props.params;
  try {
    if (!params.subSubCategoryId) {
      return new NextResponse("Sub Sub Category id is required", { status: 400 });
    }

    const subsubCategory = await prismadb.allCategory.findUnique({
      where: {
        id: params.subSubCategoryId,
        type: "Sub Sub Category"
      }
    });
  
    return NextResponse.json(subsubCategory);
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  props: { params: Promise<{ subSubCategoryId: string, brandId: string }> }
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

    if (!params.subSubCategoryId) {
      return new NextResponse("Sub Sub Category id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const stillused = await prismadb.allProductCategory.findMany({
      where:{
        categoryId: params.subSubCategoryId,
        type: "Sub Sub Category"
      }
    })

    if(stillused.length!=0){
      return NextResponse.json("stillused")
    }

    await prismadb.allCategory.delete({
      where: {
        id: params.subSubCategoryId
      }
    });
  
    return NextResponse.json("success");
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ subSubCategoryId: string, brandId: string }> }
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

    const { type, name, description } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.subSubCategoryId) {
      return new NextResponse("Sub Sub Category id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const initial = await prismadb.allCategory.findFirst({
      where:{
        id: params.subSubCategoryId
      },
      select:{
        name: true
      }
    })

    if(initial){
      if(initial.name ===  name){
        await prismadb.allCategory.update({
          where: {
            id: params.subSubCategoryId
          },
          data: {
            type: type,
            name: name,
            slug: slugify(name),
            description: description,
            thumbnail_url: "",
            updatedBy: session.name,
          }
        });

        await prismadb.allProductCategory.updateMany({
          where: {
            categoryId: params.subSubCategoryId,
            type
          },
          data:{
            name,
            slug: slugify(name)
          }
        })
        return NextResponse.json("same")
      }
    }

    const duplicates = await prismadb.allCategory.findFirst({
      where:{
        name,
        type
      }
    })

    if(duplicates){
      return NextResponse.json("duplicate")
    }

    await prismadb.allCategory.update({
      where: {
        id: params.subSubCategoryId
      },
      data: {
        type: type,
        name: name,
        slug: slugify(name),
        description: description,
        thumbnail_url: "",
        updatedBy: session.name,
      }
    });
    await prismadb.allProductCategory.updateMany({
      where: {
        categoryId: params.subSubCategoryId,
        type
      },
      data:{
        name,
        slug: slugify(name)
      }
    })
  
    return NextResponse.json("success");
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
