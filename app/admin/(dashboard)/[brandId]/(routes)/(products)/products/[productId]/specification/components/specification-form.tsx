"use client"

import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Specification } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Label } from "@/app/admin/components/ui/label"


interface SpecFormProps {
  initialData: Specification,
  product_name: string
};

export const SpecForm: React.FC<SpecFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<Specification>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit specification' : 'Create specification';
  const description = initialData ? `For ${product_name}` : 'Add a new specification';
  const toastMessage = initialData ? 'Specification updated.' : 'Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const temp : Specification = {
      id: "",
      // @ts-ignore
      diameter_speaker: event.target[0].value,
      // @ts-ignore
      daya_maksimum: event.target[1].value,
      // @ts-ignore
      lebar_daerah_frekuensi: event.target[2].value,
      // @ts-ignore
      spl: event.target[3].value,
      // @ts-ignore
      medan_magnet: event.target[4].value,
      // @ts-ignore
      berat_magnet: event.target[5].value,
      // @ts-ignore
      voice_coil_diameter: event.target[6].value,
      // @ts-ignore
      impedansi: event.target[7].value,
      // @ts-ignore
      nominal_power_handling: event.target[8].value,
      // @ts-ignore
      program_power: event.target[9].value,
      // @ts-ignore
      voice_coil_material: event.target[10].value,
      // @ts-ignore
      berat_speaker: event.target[11].value,
      // @ts-ignore
      custom_note: event.target[12].value,
      productId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_SPECIFICATION}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        const API_EDITED3 = API_EDITED2.replace('{id}', initialData.id)
        response = await axios.patch(API_EDITED3, temp);
      } else {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_ADD_SPECIFICATION}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        response = await axios.post(API_EDITED2, temp);
      }
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
        <form onSubmit={onSubmit} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
            <Label htmlFor="diameter_speaker">Diameter speaker (inch/mm)</Label>
            <Input disabled={loading} id="diameter_speaker" placeholder="Diameter Speaker" defaultValue={spec?.diameter_speaker? spec.diameter_speaker : ""} />
            </div>
            <div>
            <Label htmlFor="daya_maksimum">Daya maksimum (Watt)</Label>
            <Input disabled={loading} id="daya_maksimum" placeholder="Daya maksimum" defaultValue={spec?.daya_maksimum? spec.daya_maksimum : ""} />
            </div>
            <div>
            <Label htmlFor="lebar_daerah_frekuensi">Lebar daerah frekuensi (Hz)</Label>
            <Input disabled={loading} id="lebar_daerah_frekuensi" placeholder="Lebar daerah frekuensi" defaultValue={spec?.lebar_daerah_frekuensi? spec.lebar_daerah_frekuensi : ""} />
            </div>
            <div>
            <Label htmlFor="spl">SPL (2.83 V / 1 m) (dB)</Label>
            <Input disabled={loading} id="spl" placeholder="SPL (2.83 V / 1 m)" defaultValue={spec?.spl? spec.spl : ""} />
            </div>
            <div>
            <Label htmlFor="medan_magnet">Medan magnet (T)</Label>
            <Input disabled={loading} id="medan_magnet" placeholder="Medan magnet" defaultValue={spec?.medan_magnet? spec.medan_magnet : ""} />
            </div>
            <div>
            <Label htmlFor="berat_magnet">Berat magnet (Kg/Oz)</Label>
            <Input disabled={loading} id="berat_magnet" placeholder="Berat magnet" defaultValue={spec?.berat_magnet? spec.berat_magnet : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_diameter">Voice coil diameter (mm)</Label>
            <Input disabled={loading} id="voice_coil_diameter" placeholder="Voice coil diameter" defaultValue={spec?.voice_coil_diameter? spec.voice_coil_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="impedansi">Impedansi (Ω)</Label>
            <Input disabled={loading} id="impedansi" placeholder="Impedansi" defaultValue={spec?.impedansi? spec.impedansi : ""} />
            </div>
            <div>
            <Label htmlFor="nominal_power_handling">Nominal power handling (Watt)</Label>
            <Input disabled={loading} id="nominal_power_handling" placeholder="Nominal power handling" defaultValue={spec?.nominal_power_handling? spec.nominal_power_handling : ""} />
            </div>
            <div>
            <Label htmlFor="program_power">Program power (Watt)</Label>
            <Input disabled={loading} id="program_power" placeholder="Program power" defaultValue={spec?.program_power? spec.program_power : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_material">Voice coil material</Label>
            <Input disabled={loading} id="voice_coil_material" placeholder="Voice coil material" defaultValue={spec?.voice_coil_material? spec.voice_coil_material : ""} />
            </div>
            <div>
            <Label htmlFor="berat_speaker">Berat speaker (system) (Kg)</Label>
            <Input disabled={loading} id="berat_speaker" placeholder="Berat speaker" defaultValue={spec?.berat_speaker? spec.berat_speaker : ""} />
            </div>
            <div>
            <Label htmlFor="custom_note">Custom Note (akan ditampilkan dibawah tabel)</Label>
            <Input disabled={loading} id="custom_note" placeholder="custom note" defaultValue={spec?.custom_note? spec.custom_note : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
    </>
  );
};
