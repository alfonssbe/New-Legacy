import SingleProductTable from "@/app/(legacy)/components/single-product-table";
import Link from "next/link";
import { FileDown } from "lucide-react";
import SwiperCarouselCoverandCatalogues from "@/app/(legacy)/components/ui/swipercarouselcoverandcatalogues";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Thiele24ProductTable from "@/app/(legacy)/components/thiele-2-4-product-table";
import SwiperCarouselGraphImpedance from "@/app/(legacy)/components/ui/swipercarouselgraphimpedance";
import TweeterTable from "@/app/(legacy)/components/tweeter-table";
import ActiveSubwooferTable from "@/app/(legacy)/components/active-sub-table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/(legacy)/components/ui/breadcrumb";
import getProduct from "@/app/(legacy)/actions/get-one-product";

const all_desc_style = "text-left xl:text-base sm:text-sm text-xs text-black p-0 py-1"
const all_sub_title_style = "text-left font-bold xl:text-4xl text-2xl text-black"

const SingleProduct = async (
    props: {
        params: Promise<{ productSlug: string }>
      }
) => {
    const params = await props.params;
    let data = await getProduct(params.productSlug)
    if(data.id === '' && data.slug === ''){
        redirect('/notfound')
    }

    return(
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:py-8 lg:py-6 py-4">
            {/* <div className="hidden md:flex"> */}
            <div className="pb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {data.categories.length > 0 && 
                            <>
                                <BreadcrumbItem>
                                <BreadcrumbLink href={'/'.concat(data.categories[0].slug)}>{data.categories[0].name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }
                        {data.categories.length > 0 && data.sub_categories.length > 0 && 
                            <>
                                <BreadcrumbItem>
                                <BreadcrumbLink href={'/'.concat(data.categories[0].slug, '/', data.sub_categories[0].slug)}>{data.sub_categories[0].name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }
                        {data.categories.length > 0 && data.sub_categories.length > 0 && data.sub_sub_categories.length > 0 && 
                            <>
                                <BreadcrumbItem>
                                <BreadcrumbLink href={'/'.concat(data.categories[0].slug, '/', data.sub_categories[0].slug, '/', data.sub_sub_categories[0].slug)}>{data.sub_sub_categories[0].name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        }
                        <BreadcrumbItem>
                        <BreadcrumbPage>{data.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="block md:flex">
    {/* Right Column for Typography */}
    <div className="md:order-2 order-1 md:w-1/2 justify-center md:h-1/2 block w-full h-full md:pl-2 md:pb-0 pb-4">
        <div className="flex flex-col w-full">
            <div>
                {(data.coverUrl || (data.images_Catalogues_Url && data.images_Catalogues_Alt)) && data.name && (
                    <div className="w-full h-fit pb-4">
                        <SwiperCarouselCoverandCatalogues cover={data.coverUrl} alt={data.name} catalogues={data.images_Catalogues_Url} catalogues_alt={data.images_Catalogues_Alt} />
                    </div>
                )}
                {(data.drawing_Url || data.graph_Url || data.impedance_Url) && data.name && (
                    <div className="w-full h-fit pb-4">
                        <SwiperCarouselGraphImpedance alt={data.name} drawing={data.drawing_Url} graph={data.graph_Url} impedance={data.impedance_Url} />
                    </div>
                )}

                {data.datasheet.length > 0 && (
                    <div className="pt-4">
                        <Link href={data.datasheet[0].url} target="_blank">
                            <div className="w-full bg-blue-500 text-white flex justify-center items-center py-2 rounded-lg hover:bg-foreground transition-all ease-in-out duration-200">
                                <FileDown size={20} />
                                <div>Download Manual</div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </div>

    {/* Left Column for Images */}
    <div className="md:order-1 order-2 md:w-1/2 md:h-1/2 block w-full h-full pr-2">
        {data.sub_sub_categories && (
            <div className={`${data.sub_sub_categories.length != 0 ? '' : 'hidden'}`}>
                {data.sub_sub_categories.map((subsubcategory, index) => (
                    <div key={index} className="text-2xl text-gray-500 font-bold pb-4">
                        {subsubcategory.name}
                    </div>
                ))}
            </div>
        )}

        {data.name && <div className={`${all_sub_title_style} pb-4`}>{data.name}</div>}

        <Separator className="bg-foreground w-56 h-2" />

        {data.specification && (
            (data.specification.diameter_speaker != '' ||
                data.specification.daya_maksimum != '' ||
                data.specification.lebar_daerah_frekuensi != '' ||
                data.specification.spl != '' ||
                data.specification.medan_magnet != '' ||
                data.specification.berat_magnet != '' ||
                data.specification.voice_coil_diameter != '' ||
                data.specification.impedansi != '' ||
                data.specification.nominal_power_handling != '' ||
                data.specification.program_power != '' ||
                data.specification.voice_coil_material != '' ||
                data.specification.berat_speaker != '' ||
                data.specification.custom_note != '') && (
                <>
                    <div className="text-2xl text-gray-500 font-bold py-4">Spesifikasi</div>
                    {SingleProductTable(data.specification, all_desc_style)}
                </>
            )
        )}

        {data.tweeter_specification && (
            (data.tweeter_specification.nominal_impedance != '' ||
                data.tweeter_specification.dc_resistance != '' ||
                data.tweeter_specification.voice_coil_diameter != '' ||
                data.tweeter_specification.voice_coil_height != '' ||
                data.tweeter_specification.air_gap_height != '' ||
                data.tweeter_specification.sensitivity != '' ||
                data.tweeter_specification.magnetic_flux_density != '' ||
                data.tweeter_specification.magnet_weight != '') && (
                <>
                    <div className="text-2xl text-gray-500 font-bold py-4">Tweeter Specification</div>
                    {TweeterTable(data.tweeter_specification, all_desc_style)}
                </>
            )
        )}

        {data.active_subwoofer_specification && (
            (data.active_subwoofer_specification.speaker != '' ||
                data.active_subwoofer_specification.subwoofer != '' ||
                data.active_subwoofer_specification.daya_amplifier != '' ||
                data.active_subwoofer_specification.filter_lpf_variabel != '' ||
                data.active_subwoofer_specification.input_level != '' ||
                data.active_subwoofer_specification.power_input != '' ||
                data.active_subwoofer_specification.box_type != '') && (
                <>
                    <div className="text-2xl text-gray-500 font-bold py-4">Active Subwoofers Specification</div>
                    {ActiveSubwooferTable(data.active_subwoofer_specification, all_desc_style)}
                </>
            )
        )}

        {data.thiele_small_parameters_specification2 && (
            (data.thiele_small_parameters_specification2.fs != '' ||
                data.thiele_small_parameters_specification2.dcr != '' ||
                data.thiele_small_parameters_specification2.qts != '' ||
                data.thiele_small_parameters_specification2.qes != '' ||
                data.thiele_small_parameters_specification2.qms != '' ||
                data.thiele_small_parameters_specification2.mms != '' ||
                data.thiele_small_parameters_specification2.cms != '' ||
                data.thiele_small_parameters_specification2.bl_product != '' ||
                data.thiele_small_parameters_specification2.vas != '' ||
                data.thiele_small_parameters_specification2.no != '' ||
                data.thiele_small_parameters_specification2.sd != '' ||
                data.thiele_small_parameters_specification2.xmax != '') &&
            data.thiele_small_parameters_specification4 && (
                <>
                    <div className="text-2xl text-gray-500 font-bold py-4">Parameter Thiele-Small</div>
                    {Thiele24ProductTable(data.thiele_small_parameters_specification2, data.thiele_small_parameters_specification4, all_desc_style)}
                </>
            )
        )}
    </div>
</div>

        </div>
    );
}

export default SingleProduct;