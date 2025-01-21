import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '../../../../components/ui/separator';
import { FindUs } from '../../components/FindUs';

const Distributor: React.FC = () => {
  return (
    <div className="relative w-full h-fit bg-white">
     <div className="container mx-auto xl:px-36 lg:px-20 px-10 py-16 h-fit block items-center lg:grid lg:grid-cols-2">
        <div>
          <div className='text-3xl font-bold text-black pb-4'>
            TOKO & DISTRIBUTOR
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
          <div className='pt-2 pb-8 text-black lg:text-base text-sm lg:w-4/5 w-full'>
            Chanel pembelian speaker legacy bisa diperoleh melalui Toko & Distributor berikut.
          </div>
          <Button asChild variant={'secondary'} className='w-fit px-12 justify-center lg:block hidden'>
            <Link href="/distributors" className='text-white font-extrabold'>VIEW</Link>
          </Button>
          <Button asChild variant={'secondary'} className='w-full lg:hidden block'>
            <Link href="/distributors" className='text-white font-extrabold text-center justify-center'>CONTACT US</Link>
          </Button>
        </div>
        <div className='lg:pl-8 lg:block hidden'>
          <div className='text-3xl font-bold text-black pb-4'>
            SOCIAL MEDIA
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
          <div className='py-11'>
            <FindUs scrolled={true} type='navbar'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Distributor;