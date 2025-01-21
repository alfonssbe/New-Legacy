"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import { Card, CardContent } from './card';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { LazyImage } from '../lazyImage';

type PropType = {
  alt: string,
  drawing: string[],
  graph: string[],
  impedance: string[],
}

const highlight_style = "w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm max-h-screen p-2 overflow-y-auto flex flex-col justify-start items-center bg-white text-black"
const image_highlight_style = "w-screen max-h-screen object-contain bg-white"

const SwiperCarouselGraphImpedance: React.FC<PropType> = (props) => {
  const { alt, drawing, graph, impedance } = props

  return (
    <>
      <Swiper
        centeredSlides={true}
        loop={false}
        spaceBetween={0}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, FreeMode, Pagination]}
        className="mySwiper2"
        style={{
          // @ts-ignore
            "--swiper-navigation-color": "#f2b90f",
            "--swiper-pagination-color": "#f2b90f",
            "--swiper-navigation-size": "30px",
            "--swiper-navigation-sides-offset": "0px"
        }}
      >
          {drawing && drawing.length > 0 && drawing.map((item, index) => (
            <SwiperSlide key={alt.concat(" - Drawing - ", index.toString())}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-full flex justify-center items-center cursor-pointer">
                  <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                      <CardContent className="p-6 flex items-center justify-center w-full h-full">
                        <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                          <LazyImage
                            src={item} 
                            alt={alt.concat(" - Drawing")} 
                            width={500}
                            height={500}
                          />
                          {/* <Image 
                            src={item} 
                            alt={alt.concat(" - Drawing")} 
                            width={1000}
                            height={1000}
                            className="object-contain max-h-full max-w-full"
                            priority
                          /> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <DialogContent className={highlight_style}>
                <DialogDescription defaultValue={alt.concat(" - Drawing")}/>
                  <DialogHeader>
                    <DialogTitle>{alt} - Drawing</DialogTitle>
                  </DialogHeader>
                  <Image 
                    src={item} 
                    alt={alt.concat(" - Drawing")} 
                    width={1000}
                    height={1000}
                    className={image_highlight_style}
                  />
                </DialogContent>
              </Dialog>
            </SwiperSlide>
          ))}
          {graph && graph.length > 0 && graph.map((item, index) => (
            <SwiperSlide key={alt.concat(" - Frequency Response - ", index.toString())}>
              <Dialog>
                <DialogTrigger asChild>
                <div className="h-full flex justify-center items-center cursor-pointer">
                    <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                      <CardContent className="p-6 flex items-center justify-center w-full h-full">
                        <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                          
                          <LazyImage
                            src={item} 
                            alt={alt.concat(" - Frequency Response")} 
                            width={500}
                            height={500}
                          />
                          {/* <Image 
                            src={item} 
                            alt={alt.concat(" - Frequency Response")} 
                            width={1000}
                            height={1000}
                            className="object-contain max-h-full max-w-full"
                            priority
                          /> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <DialogContent className={highlight_style}>
                <DialogDescription defaultValue={alt.concat(" - Frequency Response")}/>
                  <DialogHeader>
                    <DialogTitle>{alt} - Frequency Response</DialogTitle>
                  </DialogHeader>
                  <Image 
                    src={item} 
                    alt={alt.concat(" - Frequency Response")} 
                    width={1000}
                    height={1000}
                    className={image_highlight_style}
                  />
                </DialogContent>
              </Dialog>
            </SwiperSlide>
          ))}
          {impedance && impedance.length > 0 && impedance.map((item, index) => (
            <SwiperSlide key={alt.concat(" - Impedance - ", index.toString())}>
              <Dialog>
                <DialogTrigger asChild>
                <div className="h-full flex justify-center items-center cursor-pointer">
                    <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                      <CardContent className="p-6 flex items-center justify-center w-full h-full">
                        <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                          
                          <LazyImage
                            src={item} 
                            alt={alt.concat(" - Impedance")} 
                            width={500}
                            height={500}
                          />
                          {/* <Image 
                            src={item} 
                            alt={alt.concat(" - Impedance")} 
                            width={1000}
                            height={1000}
                            className="object-contain max-h-full max-w-full"
                            // priority={indexParent === 0}
                          /> */}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <DialogContent className={highlight_style}>
                <DialogDescription defaultValue={alt.concat(" - Impedance")}/>
                  <DialogHeader>
                    <DialogTitle>{alt} - Impedance</DialogTitle>
                  </DialogHeader>
                  <Image 
                    src={item} 
                    alt={alt.concat(" - Impedance")} 
                    width={1000}
                    height={1000}
                    className={image_highlight_style}
                  />
                </DialogContent>
              </Dialog>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default SwiperCarouselGraphImpedance