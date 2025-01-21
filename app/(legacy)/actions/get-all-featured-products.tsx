import { FeaturedProducts } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_ALL_FEATURED_PRODUCTS}`;

const getAllFeaturedProducts = async (): Promise<FeaturedProducts[]> => {
  let allFeaturedProducts: Array<FeaturedProducts> = []

  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch featured products');
  }
  const data = await response.json();
  

  for (let i = 0; i < data.length; i++) {
    if(data[i].featured_img.length>0){
      let product: FeaturedProducts = {
        id: data[i].id,
        name: data[i].name,
        slug: data[i].slug,
        featuredImgUrl: data[i].featured_img[0].url,
        featuredDesc: data[i].featuredDesc,
        series: data[i].series
      }
      allFeaturedProducts.push(product)
    }
  }
  return allFeaturedProducts;
};

export default getAllFeaturedProducts;

