import Link from 'next/link';
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, YoutubeIcon } from 'lucide-react';

const blackLogos: string[] = [
    'https://mail.google.com/mail/?view=cm&fs=1&to=legacyspeaker01@gmail.com'
  ,
    'https://www.facebook.com/sbacoustics/'
  ,
    'https://wa.me/6281231833504?text=Halo,%20saya%20mau%20bertanya%20mengenai%20produk%20Legacy.'
  ,
    'https://www.instagram.com/legacy.speaker?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  ,
    'https://youtube.com/@acrspeaker-rhymeproaudio?si=jABUOuZOZV6axnPt'
];

const whiteLogos: string[] = [
    'https://mail.google.com/mail/?view=cm&fs=1&to=legacyspeaker01@gmail.com'
  ,
    'https://www.facebook.com/sbacoustics/'
  ,
    'https://wa.me/6281231833504?text=Halo,%20saya%20mau%20bertanya%20mengenai%20produk%20Legacy.'
  ,
    'https://www.instagram.com/legacy.speaker?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  ,
    'https://youtube.com/@acrspeaker-rhymeproaudio?si=jABUOuZOZV6axnPt'
  ,
];

type PropType = {
  scrolled: boolean
  type: string
}

export const FindUs: React.FC<PropType> = (props) => {
  const { scrolled, type } = props

  return (
    <>
      <div className={`flex gap-6 ${type==="footer" ?'justify-end' :'justify-start'} `}>
        {!scrolled?
        blackLogos.map((logo, index) => (
          index!=1 &&
          <div key={index}>
            <Link target='_blank' href={logo} className={`flex items-center`}>
            {index==0 ? 
                <>
                  <MailIcon size={30} className='text-white hover:text-[rgba(19,82,219,1)]'/>
                </> 
              : 
              index==1 ?  
                <>
                  <FacebookIcon size={30} className='text-white hover:text-[rgba(19,82,219,1)]'/>
                </>
              : 
              index==2 ?  
                <>
                  <PhoneIcon size={30} className='text-white hover:text-[rgba(19,82,219,1)]'/>
                </> 
              : 
              index==3 ? 
                <>
                  <InstagramIcon size={30} className='text-white hover:text-[rgba(19,82,219,1)]'/>
                </>  
              : 
              index==4 ? 
                <>
                  <YoutubeIcon size={30} className='text-white hover:text-[rgba(19,82,219,1)]'/>
                </>  
              : 
                <></>}
            </Link>
          </div>
        ))
        :
        whiteLogos.map((logo, index) => (
          index!=1 &&
          <div key={index}>
            <Link 
              target="_blank" 
              href={logo} 
              className="flex items-center"
            >
              {index==0 ? 
                <>
                  <MailIcon size={30} className='text-black hover:text-[rgba(19,82,219,1)]'/>
                </> 
              : 
              index==1 ?  
                <>
                  <FacebookIcon size={30} className='text-black hover:text-[rgba(19,82,219,1)]'/>
                </>
              : 
              index==2 ?  
                <>
                  <PhoneIcon size={30} className='text-black hover:text-[rgba(19,82,219,1)]'/>
                </> 
              : 
              index==3 ? 
                <>
                  <InstagramIcon size={30} className='text-black hover:text-[rgba(19,82,219,1)]'/>
                </>  
              : 
              index==4 ? 
                <>
                  <YoutubeIcon size={30} className='text-black hover:text-[rgba(19,82,219,1)]'/>
                </>  
              : 
                <></>}
            </Link>
          </div>
        ))       
      }
      </div>
    </>
  );
}
