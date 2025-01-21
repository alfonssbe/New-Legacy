import { AllCategory, ComparisonProductData, Specifications } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_ONE_COMPARISON_PRODUCT}`;

const getComparisonProduct = async (productSlug: string): Promise<ComparisonProductData> => {
  const API_EDITED = API.replace('{productSlug}', productSlug)
  const response = await fetch(API_EDITED!);
  if (!response.ok) {
    throw new Error('Failed to fetch one product');
  }
  const data = await response.json();
  let prod_sub_sub_cat: AllCategory[] = []
  let all_graph_url : string[] = []
  let all_impedance_url : string[] = []
  if (data){
    if(data.allCat){
      //SUB SUB CAT ONLY
      for (let i = 0; i < data.allCat.length; i++) {
        let temp: AllCategory = {
          id: data.allCat[i].id,
          name: data.allCat[i].name,
          slug: data.allCat[i].slug
        }
        prod_sub_sub_cat.push(temp)
      }
    }
    
    if(data.graph_img!=undefined){
      for(let i = 0; i< data.graph_img.length;i++){
        all_graph_url.push(data.graph_img[i].url.toString())
      }
    }
    
    if(data.impedance_img!=undefined){
      for(let i = 0; i< data.impedance_img.length;i++){
        all_impedance_url.push(data.impedance_img[i].url.toString())
      }
    }




    let specific: Specifications = {
      diameter_speaker: "",
      daya_maksimum: "",
      lebar_daerah_frekuensi: "",
      spl: "",
      medan_magnet: "",
      berat_magnet: "",
      voice_coil_diameter: "",
      impedansi: "",
      nominal_power_handling: "",
      program_power: "",
      voice_coil_material: "",
      berat_speaker: "",
      custom_note: "",
    }
    if(data.specification){
      specific = {
        diameter_speaker: data.specification.diameter_speaker,
        daya_maksimum: data.specification.daya_maksimum,
        lebar_daerah_frekuensi: data.specification.lebar_daerah_frekuensi,
        spl: data.specification.spl,
        medan_magnet: data.specification.medan_magnet,
        berat_magnet: data.specification.berat_magnet,
        voice_coil_diameter: data.specification.voice_coil_diameter,
        impedansi: data.specification.impedansi,
        nominal_power_handling: data.specification.nominal_power_handling,
        program_power: data.specification.program_power,
        voice_coil_material: data.specification.voice_coil_material,
        berat_speaker: data.specification.berat_speaker,
        custom_note: data.specification.custom_note,
      }
    }


    
    let product: ComparisonProductData = {
      id: data.id,
      coverUrl: data.cover_img? data.cover_img[0].url: '',
      coverAlt: data.slug,
      graph_Url: all_graph_url.length!=0?all_graph_url:[],
      impedance_Url: all_impedance_url.length!=0?all_impedance_url:[],
      name: data.name,
      desc: data.description,
      slug: data.slug,
      sub_sub_categories: prod_sub_sub_cat,
      specification: specific
    }
    return product;
  }
  let product: ComparisonProductData = {
    id: "",
    coverUrl: "",
    coverAlt: "",
    graph_Url: [],
    impedance_Url: [],
    name: "",
    desc: "",
    slug: "",
    sub_sub_categories: [],
    specification: {
      diameter_speaker: "",
      daya_maksimum: "",
      lebar_daerah_frekuensi: "",
      spl: "",
      medan_magnet: "",
      berat_magnet: "",
      voice_coil_diameter: "",
      impedansi: "",
      nominal_power_handling: "",
      program_power: "",
      voice_coil_material: "",
      berat_speaker: "",
      custom_note: "",
    }
  }
  return product;
};

export default getComparisonProduct;

