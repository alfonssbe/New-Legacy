// "use client"

import prismadb from "@/lib/prismadb";
import { NewsForm } from "./components/news-form";
// import dynamic from "next/dynamic";
// import Loading from "../loading";

// const DynamicNewsForm = dynamic(() => import('./components/news-form').then(mod => mod.NewsForm), {
//   ssr: false,
//   loading: () => <Loading />
// });

const NewsPage = async (
  props: {
    params: Promise<{ newsId: string }>
  }
) => {
  const params = await props.params;
  const onenews = await prismadb.news.findUnique({
    where: {
      id: params.newsId,
    },
    include: {
      news_img: true
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewsForm 
          initialData={onenews}
        />
      </div>
    </div>
  );
}

export default NewsPage;

