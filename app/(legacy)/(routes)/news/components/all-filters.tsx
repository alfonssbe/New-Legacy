"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { activeSlider, NewsType, SliderDataNews } from "@/app/(legacy)/types";
import AllNews from "./all-news";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/app/(legacy)/components/ui/sheet";
import { ScrollArea } from "@/app/(legacy)/components/ui/scroll-area";
// import { SliderNews } from "@/app/(legacy)/components/ui/slidernews_bu";

type SliderSheetValue = {
    slug: string;
    value: {
      min: number;
      max: number;
    };
};

interface MainProps {
  data: (NewsType)[];
  slider: (SliderDataNews)[]
  showFilters: (boolean)
};

const AllNewsandFilters: React.FC<MainProps> = ({
  data, slider, showFilters
}) => {
    const [allActiveSlider, setAllActiveSlider] = useState<activeSlider[]>([])  
    const [defaultSliderSheet, setdefaultSliderSheet] = useState<SliderSheetValue[]>([])  
    const [sheetOpenedForSlider, setSheetOpenedForSlider] = useState<boolean>(false)  
    const [reseted, setReseted] = useState<string>('false')

    useEffect(() => {
        if (reseted) {
          setAllActiveSlider([]);
          setReseted('false');
        }
    }, [reseted]);

    const handleSliderChange = (slug: string, value: number[], min_index: number, max_index: number, allVal: number[], parentName: string, unit: string) => {
        let tempactiveSlider : activeSlider[] = []
        let sliderisActive : boolean = false
        if(allActiveSlider.length!= 0){
          allActiveSlider.map((valueactiveSlider) => {
            if(valueactiveSlider.slug === slug){
                sliderisActive = true
                if(value[0] === min_index && value[1] === max_index){

                }
                else if(value[0] !== min_index || value[1] !== max_index){
                    tempactiveSlider.push({
                    slug,
                    bottomVal: value[0],
                    topVal: value[1],
                    bottomRealVal: allVal[value[0]],
                    topRealVal: allVal[value[1]],
                    parentName,
                    unit
                    })
                }
            }
            else{
              tempactiveSlider.push(valueactiveSlider)
            }
          })
        }
        else{
            sliderisActive = true
            if(value[0] !== min_index || value[1] !== max_index){
                tempactiveSlider.push({
                slug,
                bottomVal: value[0],
                topVal: value[1],
                bottomRealVal: allVal[value[0]],
                topRealVal: allVal[value[1]],
                parentName,
                unit
                })
            }
        }
        if(!sliderisActive){
            tempactiveSlider.push({
                slug,
                bottomVal: value[0],
                topVal: value[1],
                bottomRealVal: allVal[value[0]],
                topRealVal: allVal[value[1]],
                parentName,
                unit
            })
        }
        setAllActiveSlider(tempactiveSlider)
      };

      useEffect(() => {
        const fetchData = () => {
          try {
            let sliderTemp: SliderSheetValue[] = []
            allActiveSlider.map((value, index) => {
                sliderTemp.push({
                    slug: value.slug,
                    value:{
                        min: value.bottomVal,
                        max: value.topVal
                    }
                })
            })
            setdefaultSliderSheet(sliderTemp)
            setSheetOpenedForSlider(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [sheetOpenedForSlider, allActiveSlider]); 


    return ( 
        <>
        
        <div className='block lg:hidden text-center pb-4'>
                <div className='pb-4'>
                <Sheet>
                    <SheetTrigger asChild className="hover:cursor-pointer">
                    <div className="w-full text-center font-bold text-lg bg-transparent p-2 rounded-lg text-foreground border-foreground border-4 hover:shadow-lg">
                        Edit Filters
                    </div>
                    </SheetTrigger>
                    <SheetContent side={'left'} className="w-full max-w-[300px] sm:max-w-[300px] bg-white">
                    <SheetTitle/>
                    <SheetDescription/>
                    <SheetHeader>
                        <div className="text-lg lg:text-xl font-bold text-center pb-4 text-black">
                        FILTERS 
                        </div>
                    </SheetHeader>
                        <ScrollArea className="h-full w-full pb-8">
                        {slider.map((value, index)=> 
                            value.value.length===1?
                            null
                            :
                            <div key={index} className="grid gap-2 w-full pt-2">
                                <div className="text-center font-bold text-sm text-black">
                                    {value.name}
                                </div>
                                {/* <SliderNews
                                    max={value.max_index}
                                    min={value.min_index}
                                    step={1}
                                    unit={value.unit}
                                    value={value.value}
                                    opensheetvalmin={
                                        (defaultSliderSheet && defaultSliderSheet.find(tempVal => tempVal.slug === value.slug)?.value.min) ?? 0
                                    }
                                    opensheetvalmax={
                                        (defaultSliderSheet && defaultSliderSheet.find(tempVal => tempVal.slug === value.slug)?.value.max) ?? 0
                                    }
                                    realdatesvalues={value.realDate}
                                    //@ts-ignore
                                    resetclicked={reseted}
                                    onValueChange={(val) => handleSliderChange(value.slug, val, value.min_index, value.max_index, value.value, value.name, value.unit)}
                                    className={cn("w-full py-2")}
                                /> */}
                                <hr/>
                            </div>
                        )}
                        <div className="w-full flex justify-center pt-4">
                            <Button onClick={() => setReseted('true')} variant={"outline"} className="bg-transparent border-foreground border-4">
                                <b>Clear Filters</b>
                            </Button>
                        </div>
                    </ScrollArea>
                    </SheetContent>
                </Sheet>
                
                </div>
            </div>
            <div className="w-full flex">
            {showFilters?
                <div className="hidden lg:block py-4 pr-4 w-1/4">
                    <div className="w-full flex justify-center pb-4">
                        <Button onClick={() => setReseted('true')} variant={"outline"} className="bg-transparent border-foreground border-4 w-full">
                            <b>Clear Filters</b>
                        </Button>
                    </div>
                    {slider.map((value, index)=> 
                        value.value.length===1?
                        null
                        :
                        <div key={index} className="grid gap-2 w-full max-w-80 pt-2">
                            <div className="text-center font-bold text-sm text-black">
                                {value.name}
                            </div>
                            {/* <SliderNews
                                max={value.max_index}
                                min={value.min_index}
                                step={1}
                                unit={value.unit}
                                value={value.value}
                                opensheetvalmin={
                                    (defaultSliderSheet && defaultSliderSheet.find(tempVal => tempVal.slug === value.slug)?.value.min) ?? 0
                                }
                                opensheetvalmax={
                                    (defaultSliderSheet && defaultSliderSheet.find(tempVal => tempVal.slug === value.slug)?.value.max) ?? 0
                                }
                                realdatesvalues={value.realDate}
                                //@ts-ignore
                                resetclicked={reseted}
                                onValueChange={(val) => handleSliderChange(value.slug, val, value.min_index, value.max_index, value.value, value.name, value.unit)}
                                className={cn("w-full py-2")}
                            /> */}
                            <hr/>
                        </div>
                    )}
                </div>
            :
                <div className="hidden md:block pr-16"></div>
            }
            <div className="w-full">
            <AllNews allActiveSliderVal={allActiveSlider} news={data}/>
            </div>
            </div>
        </>
    );
};

export default AllNewsandFilters;
