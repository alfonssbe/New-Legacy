import { NewsType } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_ALL_NEWS}`;

const getAllNews = async (totalNews: string): Promise<NewsType[]> => {
  let allNews: Array<NewsType> = []

  const API_EDITED = API.replace('{totalNews}', totalNews)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    throw new Error(`Failed to fetch news`);
  }
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    if(data[i].news_img.length>0){
      let product: NewsType = {
        id: data[i].id,
        title: data[i].title,
        slug: data[i].slug,
        link_placeholder: data[i].link_placeholder,
        link_url: data[i].link_url,
        description: data[i].description,
        news_img_url: data[i].news_img[0].url,
        event_date: data[i].event_date,
        updatedAt: data[i].updatedAt
      }
      allNews.push(product)
    }
  }

  return allNews;
};

export default getAllNews;

