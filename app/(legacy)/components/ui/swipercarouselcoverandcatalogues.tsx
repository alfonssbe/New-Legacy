"use client"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { Card, CardContent } from './card';
import Image from 'next/image';
import { LazyImage } from '../lazyImage';

type PropType = {
  cover: string,
  alt: string,
  catalogues: string[],
  catalogues_alt: string[],
}

const highlight_style = "w-full xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm max-h-screen p-2 overflow-y-auto flex flex-col justify-start items-center bg-white text-black"
const image_highlight_style = "w-screen max-h-screen object-contain bg-white"

const SwiperCarouselOneProduct: React.FC<PropType> = (props) => {
  const { cover, alt, catalogues, catalogues_alt } = props

  return (
    <>
        <Swiper
          style={{
            //@ts-ignore
            "--swiper-navigation-color": "#f2b90f",
            "--swiper-pagination-color": "#f2b90f",
            "--swiper-navigation-size": "30px",
            "--swiper-navigation-sides-offset": "0px"
          }}
          loop={catalogues && catalogues.length > 0 ? true : false}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Navigation, Pagination]}
          className="mySwiper2"
        >
              {catalogues && catalogues.length > 0 && catalogues.map((item, index) => (
                catalogues_alt[index] === 'Top' &&
                  <SwiperSlide key={alt.concat(" - Catalogues - ", index.toString())}>
                  <Dialog>
                    <DialogTrigger asChild>
                    <div className="h-full flex justify-center items-center cursor-pointer">
                      <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                        <CardContent className="p-6 flex items-center justify-center w-full h-full">
                          <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                            {/* <div className="object-contain max-h-full max-w-full"> */}
                              <LazyImage
                                src={item} 
                                alt={alt} 
                                width={500}
                                height={500}
                              />
                            {/* </div> */}
                              {/* <Image 
                                src={item} 
                                alt={alt} 
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
                    <DialogDescription defaultValue={alt}/>
                      <DialogHeader>
                        <DialogTitle>{catalogues_alt[index]}</DialogTitle>
                      </DialogHeader>
                      <Image 
                        src={item} 
                        alt={alt} 
                        width={1000}
                        height={1000}
                        className={image_highlight_style}
                      />
                    </DialogContent>
                  </Dialog>
                  </SwiperSlide>
              ))}
              {cover != '' && 
                  <SwiperSlide key={alt.concat(" - Cover")}>
                  <Dialog>
                    <DialogTrigger asChild>
                    <div className="h-full flex justify-center items-center cursor-pointer">
                      <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                        <CardContent className="p-6 flex items-center justify-center w-full h-full">
                          <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                              <LazyImage
                                src={cover} 
                                alt={alt} 
                                width={500}
                                height={500}
                              />
                              {/* <Image 
                                src={cover} 
                                alt={alt} 
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
                    <DialogDescription defaultValue={alt}/>
                      <DialogHeader>
                        <DialogTitle>{alt.concat(" - Cover")}</DialogTitle>
                      </DialogHeader>
                      <Image 
                        src={cover} 
                        alt={alt} 
                        width={1000}
                        height={1000}
                        className={image_highlight_style}
                      />
                    </DialogContent>
                  </Dialog>
                  </SwiperSlide>
              }
              {catalogues && catalogues.length > 0 && catalogues.map((item, index) => (
                catalogues_alt[index] !== 'Top' &&
                  <SwiperSlide key={alt.concat(" - Catalogues - ", index.toString())}>
                  <Dialog>
                    <DialogTrigger asChild>
                    <div className="h-full flex justify-center items-center cursor-pointer">
                      <Card className="border-none h-full w-full flex items-center justify-center bg-transparent hover:bg-slate-200">
                        <CardContent className="p-6 flex items-center justify-center w-full h-full">
                          <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                              <LazyImage
                                src={item} 
                                alt={alt} 
                                width={500}
                                height={500}
                              />
                              {/* <Image 
                                src={item} 
                                alt={alt} 
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
                    <DialogDescription defaultValue={alt}/>
                      <DialogHeader>
                        <DialogTitle>{catalogues_alt[index]!=''? catalogues_alt[index] : alt}</DialogTitle>
                      </DialogHeader>
                      <Image 
                        src={item} 
                        alt={alt} 
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

export default SwiperCarouselOneProduct
