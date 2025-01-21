"use client";

import { useEffect, useState } from "react";
import { activeSlider, NewsType } from "@/app/(legacy)/types";
import NoResults from "@/app/(legacy)/components/ui/no-results";
import NewsCard from "@/app/(legacy)/components/ui/news-card";
import { Separator } from "@/components/ui/separator";


interface MainProps {
    allActiveSliderVal: (activeSlider)[]
    news: (NewsType)[]
};

const AllNews: React.FC<MainProps> = ({
    allActiveSliderVal, news
}) => {
    const [allNews, setAllNews] = useState<NewsType[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            let finishedSliderNews: NewsType[] = []
            let tempShowed: NewsType[][] = [];
            

            if (allActiveSliderVal.length !== 0) {
                allActiveSliderVal.forEach((slider, indexslider) => {
                    if (!tempShowed[indexslider]) {
                        tempShowed[indexslider] = [];
                    }
                    if (indexslider === 0) {
                        news.forEach((product) => {
                            let productValue = new Date(product.event_date);
                            const bottomValue = new Date(slider.bottomRealVal);
                            const topValue = new Date(slider.topRealVal);

                            if (bottomValue <= productValue && topValue >= productValue) {
                                tempShowed[indexslider].push(product);
                            }
                        });
                    } else {
                        tempShowed[indexslider - 1].forEach((product) => {
                            let productValue = new Date(product.event_date).getTime();
                            const bottomValue = new Date(slider.bottomRealVal).getTime();
                            const topValue = new Date(slider.topRealVal).getTime();

                            if (bottomValue <= productValue && topValue >= productValue) {
                                tempShowed[indexslider].push(product);
                            }
                        });
                    }
                });
                finishedSliderNews = tempShowed[allActiveSliderVal.length - 1]
            } else {
                finishedSliderNews = news
            }

            let FinalFeatured: NewsType[] = []
            for (const slidernews of finishedSliderNews) {
                FinalFeatured.push(slidernews)
            }
            FinalFeatured.sort((a, b) => a.title.localeCompare(b.title));

            setAllNews(FinalFeatured)

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [news, allActiveSliderVal]); 
    return ( 
        <>
            {allNews.length === 0 ?        
                <div className="w-full">
                    <NoResults />
                </div>
            :
                <div className="block">
                    {allNews.map((item: NewsType, i) => (
                        <div key={i} className="px-2 ">
                            <NewsCard data={item}/>
                            <Separator/>
                        </div>
                    ))}
                </div>
            }
        </>
    );
};

export default AllNews;
