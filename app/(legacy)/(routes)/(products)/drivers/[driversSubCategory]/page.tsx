"use client"

import { CheckBoxData, Products, SliderData } from "@/app/(legacy)/types";
import getAllProductsBySubCategory from '@/app/(legacy)/actions/get-all-products-by-sub-category';
import { useEffect, useState, use } from 'react';
import AllDriversandFiltersProducts from "../components/all-filters";
import FullScreenLoader from "@/app/(legacy)/components/loadingNoScroll";

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

const ProductBySubCategoryPage = (
  props: {
    params: Promise<{ driversSubCategory: string }>
  }
) => {
  const params = use(props.params);
  const [allproduct, setAllProducts] = useState<Products[]>([])
  const [slider, setSlider] = useState<SliderData[]>([])
  const [checkbox, setCheckbox] = useState<CheckBoxData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tempData = await getAllProductsBySubCategory(params.driversSubCategory);
        let sliderRows: SliderData[] = [];
        let checkboxRows: CheckBoxData[] = [];

        let tempSliderLoop = [];
        let tempCheckboxLoop = [];
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
        })

        tempCheckboxLoop.push(
          createFilterProps('allSubSubCategory', 'Type', '', 'sub_sub_category'),
        )
        tempCheckboxLoop.map((value) =>{
          //@ts-ignore
          const allValueWithoutDuplicates: string[] = removeDuplicates(tempData.allproduct[value.key]);
          const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => number != '');
          const sortedValues = allValueWithoutDuplicatesAndNone.sort()
          if(sortedValues.length>1){
            counterShow+=1
          }
          checkboxRows.push(
            {
              name: value.name, 
              value: sortedValues, 
              unit: value.unit,
              slug: value.filterKey,
            },
          )
        })

        if(counterShow===0){
          setShow(false)
        }
        setSlider(sliderRows)
        setCheckbox(checkboxRows)
        setAllProducts(tempData.allproduct.allProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.driversSubCategory]);

  return(
    <>
      {loading?
        <FullScreenLoader isVisible={loading} />
        :
        <div className="relative w-full bg-white py-8 h-fit">
          {show?
            <AllDriversandFiltersProducts data={allproduct} slider={slider} checkbox={checkbox} showFilters={show} />
          :
          <div className="md:grid md:grid-cols-4">
            <AllDriversandFiltersProducts data={allproduct} slider={slider} checkbox={checkbox} showFilters={show} />
          </div>
          }
        </div>
      }
    </>
  );
}

export default ProductBySubCategoryPage;
