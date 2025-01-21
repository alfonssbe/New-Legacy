"use client"

import { NewsType, SliderDataNews,  } from "../../types";
import getAllNews from "../../actions/get-all-news";
import AllNewsandFilters from "./components/all-filters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import FullScreenLoader from "../../components/loadingNoScroll";
import { useEffect, useState } from "react";

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

export default function News() { 
  const [allNews, setAllNews] = useState<NewsType[]>([])
  const [slider, setSlider] = useState<SliderDataNews[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tempData = await getAllNews('all');
        const all_Date = tempData.map(news => news.event_date);
        let sliderRows: SliderDataNews[] = [];
        let tempSliderLoop = [];
        let counterShow = 0;
        tempSliderLoop.push(
          createFilterProps('event_date', 'Tempo Waktu', '', 'eventDate'),
        )
        tempSliderLoop.map((value) =>{
          //@ts-ignore
          const allValueWithoutDuplicates: number[] = removeDuplicates(all_Date);
          const allValueWithoutDuplicatesAndNone = allValueWithoutDuplicates.filter(number => !Number.isNaN(number));
          const sortedValues2 = allValueWithoutDuplicatesAndNone.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
          const sortedValues = sortedValues2.map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
          });
          const timestampsArray: number[] = sortedValues
            .map(date => new Date(date).getTime())  // Convert each date to a timestamp (number)
            .sort((a, b) => a - b);  // Sort numerically
          if(sortedValues.length>1){
            counterShow+=1
          }
          let newSortedValues : number[] = []
          sortedValues.map((val) =>{
            newSortedValues.push(Number(val))
          })
          sliderRows.push(
            {
              name: value.name, 
              value: timestampsArray,
              realDate: sortedValues,
              unit: value.unit,
              max_index: sortedValues.length - 1,
              min_index: 0,
              slug: value.filterKey
            },
          )
        })
        if(counterShow===0){
          setShow(false)
        }
        setSlider(sliderRows)
        setAllNews(tempData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    loading?
    <FullScreenLoader isVisible={loading} />
    :
    <div className="bg-white -z-10">
    <div className="relative w-full bg-white p-8 h-fit container mx-auto xl:px-36 lg:px-20 px-10 ">
    <div className="pb-6">
      <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              <BreadcrumbPage>All News</BreadcrumbPage>
              </BreadcrumbItem>
          </BreadcrumbList>
      </Breadcrumb>
    </div>
      {show?
          <AllNewsandFilters data={allNews} slider={slider} showFilters={show} />
        :
        <div className="md:grid md:grid-cols-4">
          <AllNewsandFilters data={allNews} slider={slider} showFilters={show} />
        </div>
        }
    </div>
    </div>
  );
}