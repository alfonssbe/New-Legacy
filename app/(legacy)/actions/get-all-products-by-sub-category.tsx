import { AllCategory, AllProductsForHome, CachedAllProducts, Products, Size, Specifications, SubCategoryFilters } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS_BY_SUB_CATEGORY}`;

const getAllProductsBySubCategory = async (subcategory: string): Promise<CachedAllProducts> => {
  let allProducts: Array<Products> = []

  let allSPL: Array<number> = []
  let allVoiceCoilDiameter: Array<number> = []
  let size = {} as Size;
  let parentSize: Array<number> = []
  
  let allSubSubCategory: Array<string> = []

  const API_EDITED = API.replace('{productSubCategory}', subcategory)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    throw new Error(`Failed to fetch products by ${subcategory}`);
  }
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    //Voice Coil Diameter
    if(data[i].specification.voice_coil_diameter!=null){
      allVoiceCoilDiameter.push(Number(data[i].specification.voice_coil_diameter))
    }
    //SPL
    if(data[i].specification.spl!=null){
      allSPL.push(Number(data[i].specification.spl))
    }
    //Size
    if(data[i].size!=null){
      let size2: Size = {
        label: data[i].size.value,
        value: Number(data[i].size.name)
      }
      if (!parentSize.some((size) => size === size2.value)) {
        parentSize.push(size2.value);
      }
      size = size2
    }
    //Sub Sub Category
    data[i].allCat.map((value: SubCategoryFilters) => {
      if(value.type === "Sub Sub Category"){
        allSubSubCategory.push(value.name)
      }
    })

    let specific: Specifications = {
      diameter_speaker: "",
      daya_maksimum: "",
      lebar_daerah_frekuensi: "",
      spl: data[i].specification.spl,
      medan_magnet: "",
      berat_magnet: "",
      voice_coil_diameter: data[i].specification.voice_coil_diameter,
      impedansi: "",
      nominal_power_handling: "",
      program_power: "",
      voice_coil_material: "",
      berat_speaker: "",
      custom_note: "",
    }

    let tempCat: Array<AllCategory> = []
    let tempSubCat: Array<AllCategory> = []
    let tempSubSubCat: Array<AllCategory> = []
    data[i].allCat && data[i].allCat.map((value: SubCategoryFilters) => {
      if(value.type === "Category"){
        tempCat.push({
          id: value.id,
          name: value.name,
          slug: value.slug
        })
      }
      else if(value.type === "Sub Category"){
        tempSubCat.push({
          id: value.id,
          name: value.name,
          slug: value.slug
        })
      }
      else if(value.type === "Sub Sub Category"){
        tempSubSubCat.push({
          id: value.id,
          name: value.name,
          slug: value.slug
        })
      }
    })

    if(data[i].cover_img.length>0){
      let product: Products = {
        id: data[i].id,
        coverUrl: data[i].cover_img[0].url,
        CoverAlt: data[i].slug,
        name: data[i].name,
        slug: data[i].slug,
        size: size,
        categories: tempCat,
        sub_categories: tempSubCat,
        sub_sub_categories: tempSubSubCat,
        specification: specific
      }
      allProducts.push(product)
    }
  }

  let allProducts_Final : AllProductsForHome = {
    allProducts,
    allSPL,
    allVoiceCoilDiameter,
    allSubSubCategory,
    allSubCategory: [],
  }

  let everything : CachedAllProducts = {
    allproduct: allProducts_Final,
    allsizes: parentSize,
  }


  return everything;
};

export default getAllProductsBySubCategory;

