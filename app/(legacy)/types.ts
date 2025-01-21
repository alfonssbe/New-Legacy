export interface Products {
    id: string;
    name: string;
    slug: string;
    coverUrl: string;
    CoverAlt: string;
    size: Size;
    categories: AllCategory[];
    sub_categories: AllCategory[];
    sub_sub_categories: AllCategory[];
    specification: Specifications;
}

export interface FeaturedProducts {
    id: string;
    name: string;
    slug: string;
    featuredImgUrl: string;
    featuredDesc: string;
    series: string;
}

export interface NewsType {
    id: string;
    title: string;
    slug: string;
    link_url: string;
    link_placeholder: string;
    description: string;
    news_img_url: string;
    event_date: Date;
    updatedAt: string;
}

export interface Size {
    value: number;
    label: string;
}

export interface Searchbox {
    value: string;
    label: string;
    slug: string;
    url: string;
    categoryDetails: string;
}

export interface AllCategory {
    id: string;
    name: string;
    slug: string;
}

export interface NavbarCategory {
    name: string;
    type: string;
}

export interface SubCategoryFilters {
    id: string;
    productId: string;
    categoryId: string;
    type: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface NavbarProducts {
    name: string;
    href: string;
    categories: NavbarCategory[]
    url: string;
}

export interface Specifications {
    diameter_speaker: string;
    daya_maksimum: string;
    lebar_daerah_frekuensi: string;
    spl: string;
    medan_magnet: string;
    berat_magnet: string;
    voice_coil_diameter: string;
    impedansi: string;
    nominal_power_handling: string;
    program_power: string;
    voice_coil_material: string;
    berat_speaker: string;
    custom_note: string;
}

export interface Tweeter_Specifications {
    nominal_impedance: string
    dc_resistance: string
    voice_coil_diameter: string
    voice_coil_height: string
    air_gap_height: string
    sensitivity: string
    magnetic_flux_density: string
    magnet_weight: string
}

export interface Active_Subwoofer_Specifications {
    speaker: string
    subwoofer: string
    daya_amplifier: string
    filter_lpf_variabel: string
    input_level: string
    power_input: string
    box_type: string
}

export interface Thiele_Small_Parameters_Specifications {
    fs: string
    dcr: string
    qts: string
    qes: string
    qms: string
    mms: string
    cms: string
    bl_product: string
    vas: string
    no: string
    sd: string
    xmax: string
}

export interface Datasheet_Prod {
    productId: string
    name: string
    url: string
    id: string
}

export interface AllProductsForHome {
    allProducts: Products[];
    allSPL: number[];
    allVoiceCoilDiameter: number[];
    allSubSubCategory: string[];
    allSubCategory: string[];
}

export interface SingleProducts {
    id: string;
    name: string;
    desc: string;
    slug: string;
    coverUrl: string;
    coverAlt: string;
    datasheet: Datasheet_Prod[];
    images_Catalogues_Url: string[];
    images_Catalogues_Alt: string[];
    drawing_Url: string[];
    graph_Url: string[];
    impedance_Url: string[];
    size: Size;
    categories: AllCategory[];
    sub_categories: AllCategory[];
    sub_sub_categories: AllCategory[];
    specification: Specifications;
    tweeter_specification: Tweeter_Specifications;
    active_subwoofer_specification: Active_Subwoofer_Specifications;
    thiele_small_parameters_specification2: Thiele_Small_Parameters_Specifications;
    thiele_small_parameters_specification4: Thiele_Small_Parameters_Specifications;
}

export interface MetadataSingleProducts {
    id: string;
    name: string;
    desc: string;
    slug: string;
    coverUrl: string;
    coverAlt: string;
    size: Size;
}

export interface ComparisonProductData {
    id: string;
    name: string;
    desc: string;
    slug: string;
    coverUrl: string;
    coverAlt: string;
    graph_Url: string[];
    impedance_Url: string[];
    sub_sub_categories: AllCategory[];
    specification: Specifications;
}

export interface CachedAllProducts {
    allproduct: AllProductsForHome;
    allsizes: number[];
}

export interface activeSlider{
    parentName: string;
    slug: string;
    bottomVal: number;
    topVal: number;
    bottomRealVal: number;
    topRealVal: number;
    unit: string;
}

export interface activeCheckbox{
    parentName: string;
    slug: string;
    name: string;
    unit: string;
}

export interface categoriesHeader{
    name: string;
    description: string;
}

export interface SliderDataNews{
    name: string;
    slug: string;
    value: number[];
    realDate: string[];
    unit: string;
    max_index: number;
    min_index: number;
}

export interface SliderData{
    name: string;
    slug: string;
    value: number[];
    unit: string;
    max_index: number;
    min_index: number;
}

export interface CheckBoxData{
    name: string;
    slug: string;
    value: string[];
    unit: string;
}