import { Separator } from "../../../../components/ui/separator";
import { LazyImage } from "../../components/lazyImage";

export default function AboutUs() {
  return (
    <div className="bg-white -z-10">
      <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className='pb-4'>
          <div className='text-4xl font-bold text-black pb-4'>
            About Us
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
        <div className="pb-4 md:grid md:grid-cols-2">
          <div className="md:pl-4 md:pb-0 pb-4 flex items-center md:order-2 order-1">
            <LazyImage src={'/images/legacy/about-us.webp'} alt="About Us Legacy" width={1000} height={1000}/>
          </div>

          <div className="pr-4 md:order-1 order-2">
            <div className="font-bold text-black pb-8 text-3xl">
              Mengenal Ragam Speaker Legacy untuk Semua Kebutuhan Audio Mobil
            </div>
            <div className="text-black pb-4 text-justify">
              <div className="font-bold">Legacy dan Prestige Series: Warisan dan Inovasi Berkelas</div>
              Menonjol dengan dedikasinya terhadap warisan dan kualitas selama 30 tahun, <b>Legacy Series</b> menghadirkan suara yang jernih dan mendalam, ideal bagi mereka yang menginginkan kesempurnaan audio. Sementara itu, <b>Prestige Series</b> menawarkan perpaduan antara desain elegan dan teknologi mutakhir, menjadikannya pilihan tepat untuk mereka yang menginginkan performa tinggi dengan tampilan yang mewah. Kedua seri ini tidak hanya menawarkan kekuatan suara, tetapi juga estetika yang memperkaya ruang interior kendaraan Anda.
            </div>
            <div className="text-black pb-2 text-justify">
              <div className="font-bold">Tweeter dan Active Speaker: Detail dan Fleksibilitas Maksimal</div>
              Untuk detail suara yang lebih halus, <b>Tweeter</b> dirancang untuk menonjolkan nada tinggi dengan kejernihan maksimal, melengkapi sistem audio Anda dengan frekuensi yang tajam dan jelas. Di sisi lain, <b>Active Speaker</b> menawarkan fleksibilitas dan kemudahan instalasi, dengan amplifier built-in yang memastikan performa optimal tanpa perlu perangkat tambahan. Kombinasi ini memberikan solusi audio yang komprehensif, sesuai untuk berbagai kebutuhan dan preferensi pengguna.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}