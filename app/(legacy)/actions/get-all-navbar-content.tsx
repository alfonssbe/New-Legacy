import { NavbarCategory, NavbarProducts } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_ALL_NAVBAR_CONTENT}`;

const getAllNavbarContent = async (): Promise<NavbarProducts[]> => {
  let allNavbarProducts: Array<NavbarProducts> = []

  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch navbar products');
  }
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    if(data[i].url.length>0){
      let allNavbarCat: Array<NavbarCategory> = []
      for(let j = 0; j < data[i].categories.length; j++){
        let cat: NavbarCategory = {
          name: data[i].categories[j].name,
          type: data[i].categories[j].type,
        }
        allNavbarCat.push(cat)
      }
      let product: NavbarProducts = {
        name: data[i].productName,
        href: process.env.NEXT_PUBLIC_ROOT_URL!.concat("products/", data[i].productSlug),
        categories: allNavbarCat,
        url: data[i].url[0].url
      }
      allNavbarProducts.push(product)
    }
  }

  return allNavbarProducts;
};

export default getAllNavbarContent;

