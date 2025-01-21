import { Active_Subwoofer_Specifications, AllCategory, Datasheet_Prod, SingleProducts, Size, Specifications, Thiele_Small_Parameters_Specifications, Tweeter_Specifications } from "@/app/(legacy)/types";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}${process.env.NEXT_PUBLIC_FETCH_ONE_PRODUCT}`;

const getProduct = async (productSlug: string): Promise<SingleProducts> => {
  const API_EDITED = API.replace('{productSlug}', productSlug)
  const response = await fetch(API_EDITED!);
  if (!response.ok) {
    throw new Error('Failed to fetch one product');
  }
  const data = await response.json();

  let prod_cat: AllCategory[] = []
  let prod_sub_cat: AllCategory[] = []
  let prod_sub_sub_cat: AllCategory[] = []
  let all_url : string[] = []
  let all_drawing_url : string[] = []
  let all_graph_url : string[] = []
  let all_impedance_url : string[] = []
  let all_alt : string[] = []
  let alldatasheet : Datasheet_Prod[] = []
  if (data && data.product){
    if(data.product.allCat){
      for (let i = 0; i < data.product.allCat.length; i++) {
        let temp: AllCategory = {
          id: data.product.allCat[i].id,
          name: data.product.allCat[i].name,
          slug: data.product.allCat[i].slug
        }
        if(data.product.allCat[i].type === "Category"){
          prod_cat.push(temp)
        }
        else if(data.product.allCat[i].type === "Sub Category"){
          prod_sub_cat.push(temp)
        }
        else{
          prod_sub_sub_cat.push(temp)
        }
      }
    }

    if(data.product.images_catalogues!=undefined){
      for(let i = 0; i< data.product.images_catalogues.length;i++){
        all_url.push(data.product.images_catalogues[i].url.toString())
        all_alt.push(data.product.images_catalogues[i].name.toString())
      }
    }
    
    if(data.product.drawing_img!=undefined){
      for(let i = 0; i< data.product.drawing_img.length;i++){
        all_drawing_url.push(data.product.drawing_img[i].url.toString())
      }
    }
    
    if(data.product.graph_img!=undefined){
      for(let i = 0; i< data.product.graph_img.length;i++){
        all_graph_url.push(data.product.graph_img[i].url.toString())
      }
    }

    if(data.product.impedance_img!=undefined){
      for(let i = 0; i< data.product.impedance_img.length;i++){
        all_impedance_url.push(data.product.impedance_img[i].url.toString())
      }
    }

    if(data.product.multipleDatasheetProduct!=undefined){
      for(let i = 0; i< data.product.multipleDatasheetProduct.length;i++){
        alldatasheet.push({
          id: data.product.multipleDatasheetProduct[i].id,
          productId: data.product.multipleDatasheetProduct[i].productId,
          url: data.product.multipleDatasheetProduct[i].url,
          name: data.product.multipleDatasheetProduct[i].name
        })
      }
    }

    let size = {} as Size;
    if(data.product.size!=null){
      let size2: Size = {
        label: data.product.size.value,
        value: Number(data.product.size.name)
      }
      size = size2  
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
    if(data.product.specification){
      specific = {
        diameter_speaker: data.product.specification.diameter_speaker,
        daya_maksimum: data.product.specification.daya_maksimum,
        lebar_daerah_frekuensi: data.product.specification.lebar_daerah_frekuensi,
        spl: data.product.specification.spl,
        medan_magnet: data.product.specification.medan_magnet,
        berat_magnet: data.product.specification.berat_magnet,
        voice_coil_diameter: data.product.specification.voice_coil_diameter,
        impedansi: data.product.specification.impedansi,
        nominal_power_handling: data.product.specification.nominal_power_handling,
        program_power: data.product.specification.program_power,
        voice_coil_material: data.product.specification.voice_coil_material,
        berat_speaker: data.product.specification.berat_speaker,
        custom_note: data.product.specification.custom_note,
      }
    }


    let tweeter_specific: Tweeter_Specifications = {
      nominal_impedance: "",
      dc_resistance: "",
      voice_coil_diameter: "",
      voice_coil_height: "",
      air_gap_height: "",
      sensitivity: "",
      magnetic_flux_density: "",
      magnet_weight: "",
    }
    if(data.tweeterSpecification){
      tweeter_specific = {
        nominal_impedance: data.tweeterSpecification.nominal_impedance,
        dc_resistance: data.tweeterSpecification.dc_resistance,
        voice_coil_diameter: data.tweeterSpecification.voice_coil_diameter,
        voice_coil_height: data.tweeterSpecification.voice_coil_height,
        air_gap_height: data.tweeterSpecification.air_gap_height,
        sensitivity: data.tweeterSpecification.sensitivity,
        magnetic_flux_density: data.tweeterSpecification.magnetic_flux_density,
        magnet_weight: data.tweeterSpecification.magnet_weight,
      }
    }


    let active_subwoofer_specific: Active_Subwoofer_Specifications = {
      speaker: "",
      subwoofer: "",
      daya_amplifier: "",
      filter_lpf_variabel: "",
      input_level: "",
      power_input: "",
      box_type: "",
    }
    if(data.activesubwooferSpecification){
      active_subwoofer_specific = {
        speaker: data.activesubwooferSpecification.speaker,
        subwoofer: data.activesubwooferSpecification.subwoofer,
        daya_amplifier: data.activesubwooferSpecification.daya_amplifier,
        filter_lpf_variabel: data.activesubwooferSpecification.filter_lpf_variabel,
        input_level: data.activesubwooferSpecification.input_level,
        power_input: data.activesubwooferSpecification.power_input,
        box_type: data.activesubwooferSpecification.box_type,
      }
    }


    let thiele_2_specific: Thiele_Small_Parameters_Specifications = {
      fs: "",
      dcr: "",
      qts: "",
      qes: "",
      qms: "",
      mms: "",
      cms: "",
      bl_product: "",
      vas: "",
      no: "",
      sd: "",
      xmax: "",
    }
    if(data.thielesmallparameter2){
      thiele_2_specific = {
        fs: data.thielesmallparameter2.fs,
        dcr: data.thielesmallparameter2.dcr,
        qts: data.thielesmallparameter2.qts,
        qes: data.thielesmallparameter2.qes,
        qms: data.thielesmallparameter2.qms,
        mms: data.thielesmallparameter2.mms,
        cms: data.thielesmallparameter2.cms,
        bl_product: data.thielesmallparameter2.bl_product,
        vas: data.thielesmallparameter2.vas,
        no: data.thielesmallparameter2.no,
        sd: data.thielesmallparameter2.sd,
        xmax: data.thielesmallparameter2.xmax,
      }
    }



    let thiele_4_specific: Thiele_Small_Parameters_Specifications = {
      fs: "",
      dcr: "",
      qts: "",
      qes: "",
      qms: "",
      mms: "",
      cms: "",
      bl_product: "",
      vas: "",
      no: "",
      sd: "",
      xmax: "",
    }
    if(data.thielesmallparameter4){
      thiele_4_specific = {
        fs: data.thielesmallparameter4.fs,
        dcr: data.thielesmallparameter4.dcr,
        qts: data.thielesmallparameter4.qts,
        qes: data.thielesmallparameter4.qes,
        qms: data.thielesmallparameter4.qms,
        mms: data.thielesmallparameter4.mms,
        cms: data.thielesmallparameter4.cms,
        bl_product: data.thielesmallparameter4.bl_product,
        vas: data.thielesmallparameter4.vas,
        no: data.thielesmallparameter4.no,
        sd: data.thielesmallparameter4.sd,
        xmax: data.thielesmallparameter4.xmax,
      }
    }

    
    let product: SingleProducts = {
      id: data.product.id,
      coverUrl: data.product.cover_img? data.product.cover_img[0].url: '',
      coverAlt: data.product.slug,
      images_Catalogues_Url: all_url.length!=0?all_url:[],
      images_Catalogues_Alt: all_alt,
      drawing_Url: all_drawing_url.length!=0?all_drawing_url:[],
      graph_Url: all_graph_url.length!=0?all_graph_url:[],
      impedance_Url: all_impedance_url.length!=0?all_impedance_url:[],
      name: data.product.name,
      desc: data.product.description,
      datasheet: alldatasheet,
      slug: data.product.slug,
      size: size,
      categories: prod_cat,
      sub_categories: prod_sub_cat,
      sub_sub_categories: prod_sub_sub_cat,
      specification: specific,
      tweeter_specification: tweeter_specific,
      active_subwoofer_specification: active_subwoofer_specific,
      thiele_small_parameters_specification2: thiele_2_specific,
      thiele_small_parameters_specification4: thiele_4_specific
    }
    return product;
  }
  let product: SingleProducts = {
    id: "",
    coverUrl: "",
    coverAlt: "",
    images_Catalogues_Url: [],
    images_Catalogues_Alt: [],
    drawing_Url: [],
    graph_Url: [],
    impedance_Url: [],
    name: "",
    desc: "",
    datasheet: [],
    slug: "",
    size: {
      value:0,
      label:'',
    },
    categories: [],
    sub_categories: [],
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
    },
    tweeter_specification:{
      nominal_impedance: "",
      dc_resistance: "",
      voice_coil_diameter: "",
      voice_coil_height: "",
      air_gap_height: "",
      sensitivity: "",
      magnetic_flux_density: "",
      magnet_weight: "",
    },
    active_subwoofer_specification:{
      speaker: "",
      subwoofer: "",
      daya_amplifier: "",
      filter_lpf_variabel: "",
      input_level: "",
      power_input: "",
      box_type: "",
    },
    thiele_small_parameters_specification2:{
      fs: "",
      dcr: "",
      qts: "",
      qes: "",
      qms: "",
      mms: "",
      cms: "",
      bl_product: "",
      vas: "",
      no: "",
      sd: "",
      xmax: "",
    },    
    thiele_small_parameters_specification4:{
      fs: "",
      dcr: "",
      qts: "",
      qes: "",
      qms: "",
      mms: "",
      cms: "",
      bl_product: "",
      vas: "",
      no: "",
      sd: "",
      xmax: "",
    }
  }
  return product;
};

export default getProduct;

