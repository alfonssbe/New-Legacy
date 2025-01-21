import Image from 'next/image';
import { FindUs } from './FindUs';
import { Separator } from '../../../components/ui/separator';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <div className='relative md:py-0 py-10'>
      <Image src={'/images/legacy/footerbg.webp'} alt='Background Footer Legacy' className='object-cover bg-center absolute inset-0 z-0 w-screen h-full' width={1000} height={1000} loading='lazy'/>
      <div className='relative z-10 container mx-auto xl:px-36 lg:px-20 px-10 xl:py-8 lg:py-6 py-4'>
      <div className="text-white font-bold sm:text-2xl text-lg text-center">
        Brand Lain Dari CV. Sinar Baja Electric
        <div className="md:grid md:grid-cols-3 md:px-0 px-8 items-center gap-4 py-8">
          <div className="hidden md:block"></div>

          <div className="flex items-center justify-center gap-4">
            <Link href="https://acrspeaker.com/" target="_blank" aria-label="Visit ACR Speaker Website">
              <Image
                src="/images/legacy/ACR2.webp"
                alt="ACR Logo"
                width={150}
                height={150}
                className="w-auto md:h-24 h-12 object-contain transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </Link>
            <Link href="https://rhymeaudio.com/" target="_blank" aria-label="Visit Rhyme Audio Website">
              <Image
                src="/images/legacy/Rhyme2.webp"
                alt="Rhyme Logo"
                width={150}
                height={150}
                className="w-auto md:h-24 h-12 object-contain transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="hidden md:block"></div>
        </div>
        <div className="md:hidden flex justify-center items-center w-full h-full pb-4">
          <FindUs scrolled={false} type='footer'/>
        </div>
        <Separator className="opacity-50" />
      </div>

      <div className="md:grid md:grid-cols-2 flex flex-col w-full h-auto pt-8">
        <div className="md:order-1 order-2 flex flex-col items-center md:items-start text-center md:text-left">
          <div>
            <div className="text-lg lg:text-2xl font-bold text-white pb-1">
              CV. Sinar Baja Electric
            </div>
            <div className="py-4">
              <Separator className="bg-foreground w-56 h-2 mx-auto md:mx-0" />
            </div>
            <div className="text-xs text-white pb-4 font-light space-y-2 sm:block hidden">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin size={15} className="mr-2" />
                <span>Jl. Margomulyo No.5, Surabaya 60186, Jawa Timur, Indonesia</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone size={15} className="mr-2" />
                <span>+62 812-3183-3504</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail size={15} className="mr-2" />
                <span>legacyspeaker01@gmail.com</span>
              </div>
            </div>
            <div className="text-xs text-white pb-1 font-light  sm:block hidden">
              Showroom Jakarta: Ruko Glodok Plaza, Blok F-97 Mangga Besar - Jakarta Barat
            </div>
            <div className="text-xs text-white pb-1 font-light  sm:block hidden">
              Showroom Surabaya: Jl. Genteng Besar No. 15A - Genteng, Surabaya
            </div>
          </div>
        </div>
        <div className="md:order-2 order-1 flex flex-col items-center md:items-end w-full h-full">
          <div className="w-full max-w-[200px] h-auto pb-8">
            <Link href="/">
              <Image
                src="/images/legacy/logo_legacy.webp"
                alt="Legacy"
                width={800}
                height={600}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </Link>
          </div>
          <div className='md:block hidden'>
            <FindUs scrolled={false} type="footer" />
          </div>
        </div>
      </div>

        <div className='text-center text-xs justify-center text-white md:pt-16 pt-8 font-light'>
          ©2025 LEGACY SPEAKER - ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
}
