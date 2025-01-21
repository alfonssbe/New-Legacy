import { Searchbox } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_REACT_APP_FETCH_PRODUCT_FOR_SEARCHBOX}`;

const getProductsForSearchbox = async (): Promise<Searchbox[]> => {
    let productForSearchbox: Array<Searchbox> = [];
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error('Failed to fetch searchbox');
    }
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        if(data[i].url.length>0){
            const normalizedStr = data[i].label.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, ' inch');
            let combined_val = normalizedStr.concat(" ", data[i].value)
            let temp: Searchbox = {
                value: combined_val,
                label: normalizedStr,
                slug: data[i].slug,
                url: data[i].url[0].url,
                categoryDetails: data[i].categoryDetails
            };
            productForSearchbox.push(temp);
        }
    }
    return productForSearchbox;
};

export default getProductsForSearchbox;

