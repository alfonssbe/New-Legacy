import { categoriesHeader } from "../types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_SUBCAT_NAME_BY_SLUG}`;

const getSubCatNameBySlug = async (slug: string): Promise<categoriesHeader> => {
    const API_EDITED = API.replace('{subCategorySlug}', slug)
    const response = await fetch(API_EDITED);
    if (!response.ok) {
      throw new Error('Failed to fetch SubCat Name by Slug');
    }
    const data = await response.json();
    return data;
};

export default getSubCatNameBySlug;

