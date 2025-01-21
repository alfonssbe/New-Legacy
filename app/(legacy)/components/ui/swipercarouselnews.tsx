import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// import required modules
import { FreeMode } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { NewsType } from '../../types';
import { Button } from '@/components/ui/button';

interface SwiperCarouselNewsProps {
  news: NewsType[];
}

export default function SwiperCarouselNews({ news }: SwiperCarouselNewsProps) {
  return (
    <>
      <div className='sm:block hidden'>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {news.map((value, index) => (
            <SwiperSlide key={index}>
              <div className={`${index === 0 ? 'pr-4': index === news.length - 1 ? 'pl-4' : 'px-2'}`} key={index}>
              <Image
                src={value.news_img_url}
                alt={value.title}
                width={1000}
                height={1000}
                className='w-full h-fit mx-auto'
              />
              <div className='text-2xl font-bold text-black w-full line-clamp-2 my-4'>
                {value.title}
              </div>
              <div className="text-black w-full line-clamp-4 my-4" dangerouslySetInnerHTML={{ __html: value.description}}>
              </div>
                <div className="items-start pb-4 pt-2 w-full">
                  <Button asChild size={'lg'} variant={'secondary'} className='w-full'>
                    <Link href={`/news/${value.slug}`} className='text-white font-bold'>READ MORE</Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='sm:hidden block'>
        <Swiper
          slidesPerView={1.25}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {news.map((value, index) => (
            <SwiperSlide key={index}>
              <div className={`${index === 0 ? 'pr-4': index === news.length - 1 ? 'pl-4' : 'px-2'}`} key={index}>
              <Image
                src={value.news_img_url}
                alt={value.title}
                width={1000}
                height={1000}
                className='w-full h-fit mx-auto'
              />
              <div className='text-2xl font-bold text-black w-full line-clamp-2 my-4'>
                  {value.title}
              </div>
              <div className="text-black w-full line-clamp-3 my-4" dangerouslySetInnerHTML={{ __html: value.description}}>
              </div>
                <div className="items-start pb-4 pt-2 w-full">
                  <Button asChild size={'lg'} variant={'secondary'} className='w-full'>
                    <Link href={`/news/${value.slug}`} className='text-white font-bold'>READ MORE</Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
