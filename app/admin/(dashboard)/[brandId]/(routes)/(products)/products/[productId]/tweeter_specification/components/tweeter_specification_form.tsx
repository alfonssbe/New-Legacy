"use client"

import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Label } from "@/app/admin/components/ui/label"
import { TweeterSpecification } from "@prisma/client"


interface TweeterSpecFormProps {
  initialData: TweeterSpecification,
  product_name: string
};

export const TweeterSpecForm: React.FC<TweeterSpecFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<TweeterSpecification>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Tweeter specification' : 'Create Tweeter specification';
  const description = `For ${product_name}`;
  const toastMessage = initialData ? 'Tweeter Specification updated.' : 'Tweeter Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const tempTweeterSpec : TweeterSpecification = {
      // @ts-ignore
      nominal_impedance: event.target[0].value,
      // @ts-ignore
      dc_resistance: event.target[1].value,
      // @ts-ignore
      voice_coil_diameter: event.target[2].value,
      // @ts-ignore
      voice_coil_height: event.target[3].value,
      // @ts-ignore
      air_gap_height: event.target[4].value,
      // @ts-ignore
      sensitivity: event.target[5].value,
      // @ts-ignore
      magnetic_flux_density: event.target[6].value,
      // @ts-ignore
      magnet_weight: event.target[7].value,
       productId: "",
       createdAt:new Date(),
       updatedAt:new Date(),
       id:"",
     }
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_TWEETER_SPECIFICATION}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        const API_EDITED3 = API_EDITED2.replace('{id}', initialData.id)
        response = await axios.patch(API_EDITED3, tempTweeterSpec);
      } else {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_ADD_TWEETER_SPECIFICATION}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        response = await axios.post(API_EDITED2, tempTweeterSpec);
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
            <Label htmlFor="nominal_impedance">Nominal Impedance (Ω)</Label>
            <Input disabled={loading} id="nominal_impedance" placeholder="nominal_impedance value" defaultValue={spec?.nominal_impedance? spec.nominal_impedance : ""} />
            </div>
            <div>
            <Label htmlFor="dc_resistance">DC resistance, Re (Ω)</Label>
            <Input disabled={loading} id="dc_resistance" placeholder="dc_resistance value" defaultValue={spec?.dc_resistance? spec.dc_resistance : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_diameter">Voice coil diameter (mm)</Label>
            <Input disabled={loading} id="voice_coil_diameter" placeholder="voice_coil_diameter value" defaultValue={spec?.voice_coil_diameter? spec.voice_coil_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_height">Voice coil height (mm)</Label>
            <Input disabled={loading} id="voice_coil_height" placeholder="voice_coil_height value" defaultValue={spec?.voice_coil_height? spec.voice_coil_height : ""} />
            </div>
            <div>
            <Label htmlFor="air_gap_height">Air gap height (mm)</Label>
            <Input disabled={loading} id="air_gap_height" placeholder="air_gap_height value" defaultValue={spec?.air_gap_height? spec.air_gap_height : ""} />
            </div>
            <div>
            <Label htmlFor="sensitivity">Sensitivity (2.83V/1m) (dB)</Label>
            <Input disabled={loading} id="sensitivity" placeholder="sensitivity value" defaultValue={spec?.sensitivity? spec.sensitivity : ""} />
            </div>
            <div>
            <Label htmlFor="magnetic_flux_density">Magnetic flux density (T)</Label>
            <Input disabled={loading} id="magnetic_flux_density" placeholder="magnetic_flux_density value" defaultValue={spec?.magnetic_flux_density? spec.magnetic_flux_density : ""} />
            </div>
            <div>
            <Label htmlFor="magnet_weight">Magnet weight (Kg)</Label>
            <Input disabled={loading} id="magnet_weight" placeholder="magnet_weight value" defaultValue={spec?.magnet_weight? spec.magnet_weight : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
    </>
  );
};
