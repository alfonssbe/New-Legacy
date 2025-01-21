"use client"

import { MapPin, Phone } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import { useState } from "react";
import { LazyImageContact } from "../../components/lazyImageContact";

const allMapsUrl: string[] = [
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15831.555636353316!2d112.6804805!3d-7.2534827!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fe923ed24eeb%3A0x85682a2a3bd9cf3a!2sSinar%20Baja%20Electric%20Group!5e0!3m2!1sen!2sid!4v1728026193190!5m2!1sen!2sid",
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.842753394362!2d112.7403310912412!3d-7.258730476112531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f96796683915%3A0x2ebf780f4f0b637c!2sJl.%20Genteng%20Besar%20No.15%2C%20Genteng%2C%20Kec.%20Genteng%2C%20Surabaya%2C%20Jawa%20Timur%2060275!5e0!3m2!1sen!2sid!4v1733792228029!5m2!1sen!2sid",
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9097762192227!2d106.81405422498979!3d-6.142820643844167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f607717f29f7%3A0x93706dd52bf170b4!2sGlodok%20Plaza!5e0!3m2!1sen!2sid!4v1733792363701!5m2!1sen!2sid"
]

export default function ContactUs() {
  const [activeMapIndex, setActiveMapIndex] = useState<number>(0)
  const [_, setIsScrolling] = useState(false);

  const handleScrollToTop = () => {
    // Set isScrolling to true to disable pointer events
    setIsScrolling(true);

    // Start the smooth scroll to the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Check if scrolling has reached the top every 100ms
    const scrollCheck = setInterval(() => {
      if (window.scrollY === 0) {
        // When scroll position reaches the top, clear the interval and enable pointer events
        clearInterval(scrollCheck);
        setIsScrolling(false);
      }
    }, 100);
  };

  return (
    <>
    <div className="bg-white -z-10">
     <div className="map-container">
       <iframe src={allMapsUrl[activeMapIndex]} width="100%" height="500" loading="lazy"></iframe>
    </div>
    <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit flex justify-center">
    <div className='pb-4'>
        <div className='text-4xl font-bold text-black pb-4'>
          Alamat & Kontak
        </div>
        <div className="flex justify-center">
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
      </div>
    </div>
    <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-8 h-fit">
    
    
    <div className={`md:grid md:grid-cols-2 block border-2 rounded-lg shadow-lg overflow-hidden hover:border-secondary ${
    activeMapIndex === 0 && 'border-secondary'}`} onMouseEnter={() => setActiveMapIndex(0)} onClick={handleScrollToTop}>
      {/* Left Side: Text */}
      <div className="p-4">
        <div className="pb-4">
          <div className="md:text-4xl text-3xl font-bold text-black pb-2">MAIN OFFICE</div>
          <Separator className="bg-foreground w-56 h-2" />
        </div>

        <div className="text-black font-bold text-2xl pb-2">SURABAYA</div>
        <div className="flex text-black pb-4">
          <div className="pr-2">
            <MapPin size={20} />
          </div>
          <div>: Jl. Margomulyo No.5, Tandes - Surabaya 60186</div>
        </div>

        <div className="text-black font-bold text-xl pb-2">Telp Pabrik:</div>
        <div className="flex text-black">
          <div className="pr-2">
            <Phone size={20} />
          </div>
          <div>: +62 31 7480011 (Phone)</div>
        </div>
        <div className="flex text-black">
          <div className="pr-2">
            <Phone size={20} />
          </div>
          <div>: +62 31 7493777 (Fax)</div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative md:block hidden">
        <LazyImageContact src="/images/legacy/contact-us-page.webp" alt="Contact Us SBE"/>
        {/* <Image
          src="/images/legacy/contact-us-page.webp"
          alt="Contact Us Page"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-cover h-full"
        /> */}
      </div>
    </div>




    <div className="py-8">
      <div className={`md:grid md:grid-cols-2 block border-2 rounded-lg shadow-lg overflow-hidden hover:border-secondary ${activeMapIndex === 1 && 'border-secondary'}`} onMouseEnter={() => setActiveMapIndex(1)} onClick={handleScrollToTop}>
        {/* Left Side: Text */}
        <div className="p-4">
          <div className="pb-4">
            <div className="md:text-4xl text-3xl font-bold text-black pb-2">SHOWROOM - SBY</div>
            <Separator className="bg-foreground w-56 h-2" />
          </div>

          <div className="text-black font-bold text-2xl pb-2">SURABAYA</div>
          <div className="flex text-black pb-4">
            <div className="pr-2">
              <MapPin size={20} />
            </div>
            <div>: Jl. Genteng Besar No. 15A - Genteng</div>
          </div>

          <div className="text-black font-bold text-xl pb-2">Telp Showroom:</div>
          <div className="flex text-black">
            <div className="pr-2">
              <Phone size={20} />
            </div>
            <div>: +62-81 231 833 504</div>
          </div>
          <div className="flex text-black">
            <div className="pr-2">
              <Phone size={20} />
            </div>
            <div>: +62-81 217 334 084</div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="relative md:block hidden">
          <LazyImageContact src="/images/legacy/contact-us-page-sby.webp" alt="Contact Us Surabaya"/>
          {/* <Image
            src="/images/legacy/contact-us-page-sby.webp"
            alt="Contact Us Page"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="object-cover h-full"
          /> */}
        </div>
      </div>

    </div>




    <div className={`md:grid md:grid-cols-2 block border-2 rounded-lg shadow-lg overflow-hidden hover:border-secondary ${ activeMapIndex === 2 && 'border-secondary'}`} onMouseEnter={() => setActiveMapIndex(2)} onClick={handleScrollToTop}>
      {/* Left Side: Text */}
      <div className="p-4">
        <div className="pb-4">
          <div className="md:text-4xl text-3xl font-bold text-black pb-2">SHOWROOM - JKT</div>
          <Separator className="bg-foreground w-56 h-2" />
        </div>

        <div className="text-black font-bold text-2xl pb-2">JAKARTA</div>
        <div className="flex text-black pb-4">
          <div className="pr-2">
            <MapPin size={20} />
          </div>
          <div>: Ruko Glodok Plaza, Blok F-97 Mangga Besar - Jakarta Barat.</div>
        </div>

        <div className="text-black font-bold text-xl pb-2">Telp Showroom:</div>
        <div className="flex text-black">
          <div className="pr-2">
            <Phone size={20} />
          </div>
          <div>: +62-021-6493139</div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative md:block hidden">
      <LazyImageContact src="/images/legacy/contact-us-page-jkt.webp" alt="Contact Us Jakarta"/>
        {/* <Image
          src="/images/legacy/contact-us-page-jkt.webp"
          alt="Contact Us Page"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-cover h-full"
          priority
        /> */}
      </div>
    </div>



    </div>
    </div>
    </>
  );
}