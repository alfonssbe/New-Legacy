"use client"

import { Products, SliderData } from '@/app/(legacy)/types';
import AllDriversandFiltersProducts from '../../components/all-filters';
import { useEffect, useState, use } from 'react';
import getAllProductsBySubSubCategory from '@/app/(legacy)/actions/get-all-products-by-sub-sub-category';
import FullScreenLoader from '@/app/(legacy)/components/loadingNoScroll';

function createFilterProps(
  key: string,
  name: string,
  unit: string,
  filterKey: string,
) {
  return { key, name, unit, filterKey };
}

function removeDuplicates<RangeSliderFilter>(arr: RangeSliderFilter[]): RangeSliderFilter[] {
  return Array.from(new Set(arr));
}

const ProductBySubSubCategoryPage = (
  props: {
    params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
  }
) => {
  const params = use(props.params);
  const [allproduct, setAllProducts] = useState<Products[]>([])
  const [slider, setSlider] = useState<SliderData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tempData = await getAllProductsBySubSubCategory(params.driversSubCategory, params.driversSubSubCategory);
        let sliderRows: SliderData[] = [];

        let tempSliderLoop = [];
        let counterShow = 0;
        tempSliderLoop.push(
          createFilterProps('parentSize', 'Diameter Cone', '"', 'size'),
          createFilterProps('allSPL', 'SPL (Sound Pressure Level)', 'dB', 'spl'),
          createFilterProps('allVoiceCoilDiameter', 'Voice Coil Diameter', 'mm', 'voice_coil_diameter'),
        )
        tempSliderLoop.map((value) =>{
          if(value.key==='parentSize'){
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allsizes);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
            const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
            if(sortedValues.length>1){
              counterShow+=1
            }
            sliderRows.push(
              {
                name: value.name, 
                value: sortedValues, 
                unit: value.unit,
                max_index: sortedValues.length - 1,
                min_index: 0,
                slug: value.filterKey
              },
            )
          }
          else{
            //@ts-ignore
            const allValueWithoutDuplicates: number[] = removeDuplicates(tempData.allproduct[value.key]);
            const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
            const sortedValues = allValueWithoutDuplicatesAndNone.slice().sort((a, b) => a - b);
            if(sortedValues.length>1){
              counterShow+=1
              sliderRows.push(
                {
                  name: value.name, 
                  value: sortedValues, 
                  unit: value.unit,
                  max_index: sortedValues.length - 1,
                  min_index: 0,
                  slug: value.filterKey
                },
              )
            }
          }
        })
        if(counterShow===0){
          setShow(false)
        }
        setSlider(sliderRows)
        setAllProducts(tempData.allproduct.allProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.driversSubCategory, params.driversSubSubCategory]);

  return(
    <>
      {loading?
        <FullScreenLoader isVisible={loading} />
        :
        // <div className="xl:px-60 xl:py-8 lg:px-48 lg:py-6 md:px-40 sm:px-32 px-8 py-4">
    <div className="w-full bg-white py-8 h-fit">
          {/* <div className="md:grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4"> */}
            <AllDriversandFiltersProducts data={allproduct} slider={slider} checkbox={[]} showFilters={show}/>
          {/* </div> */}
        </div>
      }
    </>
  );
}

export default ProductBySubSubCategoryPage;
