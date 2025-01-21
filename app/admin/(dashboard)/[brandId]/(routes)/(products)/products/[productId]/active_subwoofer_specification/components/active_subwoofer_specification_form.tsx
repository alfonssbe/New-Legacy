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
import { ActiveSubwooferSpecification } from "@prisma/client"


interface ActiveSubwooferSpecFormProps {
  initialData: ActiveSubwooferSpecification,
  product_name: string
};

export const ActiveSubwooferSpecForm: React.FC<ActiveSubwooferSpecFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<ActiveSubwooferSpecification>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData? 'Edit Active Subwoofer specification' : 'Create Active Subwoofer specification';
  const description = `For ${product_name}`;
  const toastMessage = initialData ? 'Active Subwoofer Specification updated.' : 'Active Subwoofer Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tempSpecActiveSubwoofer : ActiveSubwooferSpecification = {
     // @ts-ignore
     speaker: event.target[0].value,
     // @ts-ignore
     subwoofer: event.target[1].value,
     // @ts-ignore
     daya_amplifier: event.target[2].value,
     // @ts-ignore
     filter_lpf_variabel: event.target[3].value,
     // @ts-ignore
     input_level: event.target[4].value,
     // @ts-ignore
     power_input: event.target[5].value,
     // @ts-ignore
     box_type: event.target[6].value,
      productId: "",
      createdAt:new Date(),
      updatedAt:new Date(),
      id:"",
    }
    
   
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_ACTIVE_SUBWOOFER}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        const API_EDITED3 = API_EDITED2.replace('{id}', initialData.id)
        response = await axios.patch(API_EDITED3, tempSpecActiveSubwoofer);
      } else {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_ADD_ACTIVE_SUBWOOFER}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        response = await axios.post(API_EDITED2, tempSpecActiveSubwoofer);
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
            <Label htmlFor="speaker">Speaker </Label>
            <Input disabled={loading} id="speaker" placeholder="speaker value" defaultValue={spec?.speaker? spec.speaker : ""} />
            </div>
            <div>
            <Label htmlFor="subwoofer">Subwoofer</Label>
            <Input disabled={loading} id="subwoofer" placeholder="subwoofer value" defaultValue={spec?.subwoofer? spec.subwoofer : ""} />
            </div>
            <div>
            <Label htmlFor="daya_amplifier">Daya amplifier</Label>
            <Input disabled={loading} id="daya_amplifier" placeholder="daya_amplifier value" defaultValue={spec?.daya_amplifier? spec.daya_amplifier : ""} />
            </div>
            <div>
            <Label htmlFor="filter_lpf_variabel">Filter LPF variabel</Label>
            <Input disabled={loading} id="filter_lpf_variabel" placeholder="filter_lpf_variabel value" defaultValue={spec?.filter_lpf_variabel? spec.filter_lpf_variabel : ""} />
            </div>
            <div>
            <Label htmlFor="input_level">Input Level</Label>
            <Input disabled={loading} id="input_level" placeholder="input_level value" defaultValue={spec?.input_level? spec.input_level : ""} />
            </div>
            <div>
            <Label htmlFor="power_input">Power Input</Label>
            <Input disabled={loading} id="power_input" placeholder="power_input value" defaultValue={spec?.power_input? spec.power_input : ""} />
            </div>
            <div>
            <Label htmlFor="box_type">Box Type</Label>
            <Input disabled={loading} id="box_type" placeholder="box_type value" defaultValue={spec?.box_type? spec.box_type : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
    </>
  );
};
