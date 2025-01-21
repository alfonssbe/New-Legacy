"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FeaturedProducts } from '../../types';
import Link from 'next/link';
import { Separator } from '../../../../components/ui/separator';
import { Button } from '@/components/ui/button';
import { LazyImageCustom } from '../lazyImageCustom';
import { Suspense } from 'react';
import Image from 'next/image';

type PropType = {
  slides: FeaturedProducts[];
};

const SwiperCarousel: React.FC<PropType> = (props) => {
  const { slides } = props;
  return (
    <div className="relative top-0 left-0 w-full z-10 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Swiper
          centeredSlides={true}
          autoplay={{
              delay: 5000,
              disableOnInteraction: false,
          }}
          loop={slides && slides.length > 1 ? true : false}
          pagination={{
              clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="swiper"
          style={{
              //@ts-ignore
              '--swiper-pagination-color': '#f2b90f',
              '--swiper-pagination-bullet-height': '20px',
              '--swiper-pagination-bullet-width': '20px',
              '--swiper-pagination-bullet-horizontal-gap': '20px',
              '--swiper-pagination-bullet-inactive-color': '#ffffff',
              '--swiper-pagination-bullet-inactive-opacity': '1',
          }}
        >
          {slides && slides.length > 0 && slides.map((item, indexParent) => (
            <SwiperSlide key={item.name.concat(` ${indexParent}`)}>
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between xl:px-36 lg:px-20 px-10 pb-16 pt-6">
                {/* Image */}
                <div className="order-1 md:order-2 flex items-center justify-center md:w-2/5 w-full h-[200px] md:h-full">
                  {/* <Image
                    src={item.featuredImgUrl}
                    alt={item.slug}
                    width={500}
                    height={500}
                    className="w-fit object-contain h-full"
                    priority
                    // placeholder="blur"
                    // blurDataURL="data:image/webp;base64,[base64-placeholder]"
                    sizes="(max-width: 768px) 500px, 1000px"
                  /> */}
                  {/* <LazyImageCustom
                    src={item.featuredImgUrl}
                    alt={item.slug}
                    width={500}
                    height={500}
                    classname="w-fit object-contain h-full"
                  /> */}
                   <Image
                    src={item.featuredImgUrl}
                    alt={item.slug}
                    width={500}
                    height={500}
                    className="w-fit object-contain h-full"
                    loading='lazy'
                  />
                </div>
                <div className="order-2 md:order-1 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-2 md:w-3/5 w-full">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {item.series} SERIES
                  </h2>
                  <Separator className="bg-foreground w-56 h-2 md:block hidden" />
                  <h3 className="text-2xl xl:text-3xl font-bold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm text-white md:hidden block line-clamp-3 h-[80px] sm:h-[50px]">
                    {item.featuredDesc.length > 150
                      ? `${item.featuredDesc.slice(0, 150)}...`
                      : item.featuredDesc}
                  </p>
                  <p className="text-base text-white md:block hidden">
                    {item.featuredDesc}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="w-full md:w-fit mt-4"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-white font-bold"
                    >
                      LEARN MORE
                    </Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Suspense>
    </div>
  );
};


export default SwiperCarousel;
