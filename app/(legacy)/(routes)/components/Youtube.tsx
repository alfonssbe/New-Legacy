import Image from 'next/image';
import Link from 'next/link';

const Youtube: React.FC = () => {
  return (
    <div className='bg-slate-100 -z-10'>
    <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-4 h-fit">
      <div className='w-full justify-center flex'>
      <Link href={'https://youtube.com/@acrspeaker-rhymeproaudio?si=jABUOuZOZV6axnPt'} target='_blank'>
        <div className='sm:flex block items-center hover:bg-slate-200 p-4 rounded-lg w-fit'>
          <div className='sm:mr-4 flex justify-center sm:pb-0 pb-2'>
            <Image src={'/images/legacy/acryoutubeprofile.jpg'} alt='ACR Rhyme Youtube' className='rounded-full' width={100} height={100}/>
          </div>
          <div>
            <div className='text-2xl font-bold text-black pb-2 text-center'>
              YOUTUBE CHANNEL
            </div>
            <div className='text-xl text-black text-center'>
              ACR Speaker - Rhyme Pro Audio
            </div>
          </div>
        </div>
      </Link>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center pt-8">
        <div className='p-1'>
          <iframe className='w-full lg:h-60 h-40 rounded-lg' src="https://www.youtube.com/embed/MdXTBWAba6I?si=xqeFNWV-myVcJpTo" title="Tur Pabrik SBE" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className='p-1'>
          <iframe className='w-full lg:h-60 h-40 rounded-lg' src="https://www.youtube.com/embed/xbs1qcUuAZc?si=yhX_JDRlDp7GWUaR" title="ACR Rhyme Desibel Lumajang" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className='p-1'>
          <iframe className='w-full lg:h-60 h-40 rounded-lg' src="https://www.youtube.com/embed/oxL7PB9yZ70?si=rsqhuKSb779GZYJ9" title="ACR Rhyme Desibel Ngawi" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className='p-1 sm:block hidden'>
          <iframe className='w-full lg:h-60 h-40 rounded-lg' src="https://www.youtube.com/embed/D8z5V0Y4kIs?si=EsVDPkVmfcPyDFZJ" title="Toys Paradise Rhyme" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className='p-1 sm:block hidden'>
          <iframe className='w-full lg:h-60 h-40 rounded-lg' src="https://www.youtube.com/embed/M8QOSdspAqs?si=lN5bE6Flf4twzDq1" title="Showroom Lokal SBE Surabaya" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className='p-1 sm:block hidden'>
          <iframe className='w-full lg:h-60 h-40 rounded-lg' src="https://www.youtube.com/embed/KIV-nLkEeKE?si=pHaTGHJnW9UV2vQy" title="ACR Rhyme SMEX" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Youtube;