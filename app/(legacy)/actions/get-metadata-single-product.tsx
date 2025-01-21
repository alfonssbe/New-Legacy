import { MetadataSingleProducts, Size } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_METADATA_SINGLE_PRODUCT}`;

const getSingleMetadata = async (productSlug: string): Promise<MetadataSingleProducts> => {
  const API_EDITED = API.replace('{productSlug}', productSlug)
  const response = await fetch(API_EDITED!);
  if (!response.ok) {
    throw new Error('Failed to fetch one product');
  }
  const data = await response.json();
  if (data){
    let size = {} as Size;
    if(data.size!=null){
      let size2: Size = {
        label: data.size.value,
        value: Number(data.size.name)
      }
      size = size2  
    }

    let product: MetadataSingleProducts = {
      id: data.id,
      coverUrl: data.cover_img[0].url,
      coverAlt: data.slug,
      name: data.name,
      desc: data.description,
      slug: data.slug,
      size: size,      
    }
    
    return product;
  }
  let product: MetadataSingleProducts = {
    id: "",
    coverUrl: "",
    coverAlt: "",
    name: "",
    desc: "",
    slug: "",
    size: {
      value:0,
      label:'',
    },
  }
  return product;
};

export default getSingleMetadata;

