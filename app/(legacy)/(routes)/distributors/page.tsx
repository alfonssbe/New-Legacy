import { Phone } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";

export default function Distributors() {
  return (
    <>
  <div className="bg-white -z-10">
  <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className="pb-4">
          <div className='text-4xl font-bold text-black pb-4'>
            List Distributors
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
      </div>
    <div className="md:grid md:grid-cols-2 block relative w-full bg-white container mx-auto xl:px-36 lg:px-20 px-10 pb-4 h-fit gap-4">
    <div>
      <div className="pb-4">
        <div className="border-2 rounded-lg p-4 shadow-lg">
          <div className='pb-4'>
            <div className='text-4xl font-bold text-black pb-4'>
              SURABAYA
            </div>
          </div>
          <div className="block pb-2">
            <div className="font-bold text-black pb-2 text-2xl">Seni Musik</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 031-3815728</div>
            </div>
          </div>
          <div className="block pb-2">
            <div className="font-bold text-black pb-2 text-2xl">Mutiara Jaya</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 031-5314275, 082140191857</div>
            </div>
          </div>
          <div className="block pb-2">
            <div className="font-bold text-black pb-2 text-2xl">Surya Pratama</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 031-7490490</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <div className="border-2 rounded-lg p-4 shadow-lg">
          <div className='pb-4'>
            <div className='text-4xl font-bold text-black pb-4'>
              MALANG
            </div>
          </div>
          <div className="block pb-2">
            <div className="font-bold text-black pb-2 text-2xl">Maju Mapan</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 0341-566616, 0341-575133</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <div className="border-2 rounded-lg p-4 shadow-lg">
          <div className='pb-4'>
            <div className='text-4xl font-bold text-black pb-4'>
              PATI - JAWA TENGAH
            </div>
          </div>
          <div className="block pb-2">
            <div className="font-bold text-black pb-2 text-2xl">Mapan Abadi</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 082226465225</div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div className="">
    <div className="pb-4">
      <div className="border-2 rounded-lg p-4 shadow-lg">
        <div className='pb-4'>
          <div className='text-4xl font-bold text-black pb-4'>
          JAKARTA
          </div>
        </div>
        <div className="block pb-2">
          <div className="font-bold text-black pb-2 text-2xl">Anugerah</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 021-6590134, 021-6590151</div>
            </div>
        </div>
        <div className="block pb-2">
          <div className="font-bold text-black pb-2 text-2xl">Indomas Perkasa</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 021-6613249</div>
            </div>
        </div>
        <div className="block pb-2">
          <div className="font-bold text-black pb-2 text-2xl">Alvaro Artha Jaya</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 082112345228</div>
            </div>
        </div>
      </div>
      </div>


      <div className="pb-4">
      <div className="border-2 rounded-lg p-4 shadow-lg">
        <div className='pb-4'>
          <div className='text-4xl font-bold text-black pb-4'>
            BANDUNG
          </div>
        </div>
        <div className="block pb-2">
          <div className="font-bold text-black pb-2 text-2xl">Akai Electronic</div>
            <div className="flex text-black pb-4">
              <div className="pr-2"><Phone size={20} /></div>
              <div> : 022-7276788</div>
            </div>
        </div>
      </div>
      </div>

    </div>

    </div>
    </div>
    </>
  );
}