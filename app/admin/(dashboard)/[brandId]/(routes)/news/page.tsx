// "use client"

import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { NewsColumn } from "./components/columns";
import { NewsClient } from "./components/client";
// import dynamic from "next/dynamic";
// import Loading from "./loading";

// const DynamicNewsClient = dynamic(() => import('./components/client').then(mod => mod.NewsClient), {
//   ssr: false,
//   loading: () => <Loading />
// });

const NewsPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const allnews = await prismadb.news.findMany({
    where: {
      brandId: params.brandId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      news_img: true
    }
  });

  const formattedNews: NewsColumn[] = allnews.map((item) => ({
    id: item.id,
    name: item.title,
    value: item.news_img.length!=0?item.news_img[0].url:"",
    eventDate: format(item.event_date, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewsClient data={formattedNews} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default NewsPage;
