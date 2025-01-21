"use client";

import { useEffect, useState, use } from "react";
import { NewsType } from "@/app/(legacy)/types";
import getOneNews from "@/app/(legacy)/actions/get-one-news";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/(legacy)/components/ui/breadcrumb";
import "./styles.scss";
import { LazyImageContact } from "@/app/(legacy)/components/lazyImageContact";
import FullScreenLoader from "@/app/(legacy)/components/loadingNoScroll";

const SingleNewsPage = (
  props: {
    params: Promise<{ newsSlug: string }>;
  }
) => {
  const params = use(props.params);
  const [loading, setLoading] = useState<boolean>(true);
  const [news, setNews] = useState<NewsType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = await getOneNews(params.newsSlug);
        setNews(tempData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.newsSlug]);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <>
      {loading ? (
        <FullScreenLoader isVisible={loading} />
      ) : (
        <div className="bg-white -z-10">
          {news && (
            <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-8">
              {/* Breadcrumb */}
              <div className="pb-6">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/news">All News</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{news.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Content Section */}
              <div className="w-full">
                {/* Image with reserved space */}
                <div className="relative w-full sm:w-1/3 aspect-square">
                  <LazyImageContact src={news.news_img_url} alt={news.title}/>
                  {/* <Image
                    src={news.news_img_url}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                  /> */}
                </div>

                {/* Title and Date */}
                <div className="lg:text-3xl text-xl text-black font-bold py-2">
                  {news.title}
                </div>
                <div className="lg:text-base text-sm text-gray-500 pb-8">
                  {formatDate(news.event_date.toString())}
                </div>

                {/* Description */}
                <div
                  className="news-content text-base text-black pb-8"
                  dangerouslySetInnerHTML={{ __html: news.description }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SingleNewsPage;
