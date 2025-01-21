import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/app/admin/actions';
import { News_Image } from '@prisma/client';

const slugify = (str: string): string => {
  const normalizedStr = str.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, "'");
  const strAfterQuote = normalizedStr.includes("'") ? normalizedStr.split("'")[1] : normalizedStr;
  const strBeforeSlash = strAfterQuote.includes('/') ? strAfterQuote.split('/')[0] : strAfterQuote;
  const strWithoutSatori = strBeforeSlash.replace(/SATORI/gi, '');
  return strWithoutSatori.toLowerCase()
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '');
};

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, newsId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.news.findMany({
      where: {
        brandId: params.brandId,
        id: params.newsId
      },
      include: {
        news_img: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[SINGLE_NEWS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ newsId: string, brandId: string }> }
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

    const { news_img, news_date, title, description, link_url, link_placeholder } = body;

    if (!params.newsId) {
      return new NextResponse("News id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    if(params.newsId != 'new'){
      await prismadb.news.update({
        where: {
          id: params.newsId,
          brandId: params.brandId
        },
        data: {
          event_date: news_date,
          title,
          link_placeholder,
          link_url,
          slug: slugify(title),
          description,
          updatedAt: new Date(),
          updatedBy: session.name,
          news_img:{
            deleteMany: {},
          }
        },
      })

      if(news_img.length!=0){
        news_img.map(async (value: News_Image) => {
          if(value.url!=''){
            await prismadb.news_Image.create({
              data:{
                newsId: params.newsId,
                url:value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            })
          }
        })
      }
    }
    else{
      let new_news = await prismadb.news.create({
        data: {
          brandId: params.brandId,
          event_date: news_date,
          title,
          link_placeholder,
          link_url,
          slug: slugify(title),
          description,
          updatedAt: new Date(),
          updatedBy: session.name,
        },
      })

      if(news_img.length!=0){
        let tempImg: News_Image[] = []
        news_img.map(async (value: News_Image, index: number) => {
          if(value.url!=''){
            let temp = await prismadb.news_Image.create({
              data:{
                newsId: new_news.id,
                url:value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            })
            tempImg.push(temp)
          }
        })
      }
    }
    return NextResponse.json("success");
  } catch (error) {
    console.log('[NEWS_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  

  export async function DELETE(
    req: Request,
    props: { params: Promise<{ brandId: string, newsId: string }> }
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
  
      if (!params.newsId) {
        return new NextResponse("News id is required", { status: 400 });
      }
      
      if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
        return NextResponse.json("unauthorized");
      }    
  
      const product = await prismadb.news.delete({
        where: {
          id: params.newsId
        },
      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.log('[NEWS_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  