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
import { ThieleSmallParameters2Ohm, ThieleSmallParameters4Ohm } from "@prisma/client"
import { Switch } from "@/app/admin/components/ui/switch"


interface ThieleSpecFormProps {
  thiele2: ThieleSmallParameters2Ohm,
  thiele4: ThieleSmallParameters4Ohm,
  product_name: string
};

export const ThieleSpecForm: React.FC<ThieleSpecFormProps> = ({
  thiele2, thiele4, product_name
}) => {
  const [spec2, setSpec2] = useState<ThieleSmallParameters2Ohm>();
  const [spec4, setSpec4] = useState<ThieleSmallParameters4Ohm>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [need4Ohm, setneed4Ohm] = useState(false);

  const title = thiele2 ? 'Edit Thiele Small Parameters' : 'Create Thiele Small Parameters';
  const description = `For ${product_name}`;
  const toastMessage = thiele2 ? 'Thiele Small Parameters updated.' : 'Thiele Small Parameters created.';
  const action = thiele2 ? 'Save changes' : 'Create';


  useEffect(() => {
    async function fetchData() {
      try {
        if(thiele2){
          setSpec2(thiele2)
        }
        
        if(thiele4){
          setSpec4(thiele4)
          setneed4Ohm(true)
        }

      } catch (error) {
        console.error('Error fetching thiele:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
   } , [thiele2, thiele4]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      
    const tempThieleSmallParameters2 : ThieleSmallParameters2Ohm = {
      // @ts-ignore
      fs: event.target[0].value,
      // @ts-ignore
      dcr: event.target[1].value,
      // @ts-ignore
      qts: event.target[2].value,
      // @ts-ignore
      qes: event.target[3].value,
      // @ts-ignore
      qms: event.target[4].value,
      // @ts-ignore
      mms: event.target[5].value,
      // @ts-ignore
      cms: event.target[6].value,
      // @ts-ignore
      bl_product: event.target[7].value,
      // @ts-ignore
      vas: event.target[8].value,
      // @ts-ignore
      no: event.target[9].value,
      // @ts-ignore
      sd: event.target[10].value,
      // @ts-ignore
      xmax: event.target[11].value,
       productId: "",
       createdAt:new Date(),
       updatedAt:new Date(),
       id:"",
     }
     
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (thiele2) {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_THIELE_2}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        const API_EDITED3 = API_EDITED2.replace('{id}', thiele2.id)
        response = await axios.patch(API_EDITED3, tempThieleSmallParameters2);
      } else {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_ADD_THIELE_2}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        response = await axios.post(API_EDITED2, tempThieleSmallParameters2);
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
        if(need4Ohm){
          const tempThieleSmallParameters4 : ThieleSmallParameters4Ohm = {
            // @ts-ignore
            fs: event.target[14].value,
            // @ts-ignore
            dcr: event.target[15].value,
            // @ts-ignore
            qts: event.target[16].value,
            // @ts-ignore
            qes: event.target[17].value,
            // @ts-ignore
            qms: event.target[18].value,
            // @ts-ignore
            mms: event.target[19].value,
            // @ts-ignore
            cms: event.target[20].value,
            // @ts-ignore
            bl_product: event.target[21].value,
            // @ts-ignore
            vas: event.target[22].value,
            // @ts-ignore
            no: event.target[23].value,
            // @ts-ignore
            sd: event.target[24].value,
            // @ts-ignore
            xmax: event.target[25].value,
             productId: "",
             createdAt:new Date(),
             updatedAt:new Date(),
             id:"",
           }
           let response2: AxiosResponse;
            if (thiele4) {
              const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_THIELE_4}`;
              //@ts-ignore
              const API_EDITED = API.replace('{brandId}', params.brandId)
              //@ts-ignore
              const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
              const API_EDITED3 = API_EDITED2.replace('{id}', thiele4.id)
              response2 = await axios.patch(API_EDITED3, tempThieleSmallParameters4);
            } else {
              const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_ADD_THIELE_4}`;
              //@ts-ignore
              const API_EDITED = API.replace('{brandId}', params.brandId)
              //@ts-ignore
              const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
              response2 = await axios.post(API_EDITED2, tempThieleSmallParameters4);
            }
            if(response2.data === 'expired_session'){
              router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
              router.refresh();
              toast.error("Session expired, please login again");
            }
            else if(response2.data === 'invalid_token'){
              router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
              router.refresh();
              toast.error("API Token Invalid, please login again");
            }
            else if(response2.data === 'unauthorized'){
              router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
              router.refresh();
              toast.error("Unauthorized!");
            }
        }
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
          <div>
            {need4Ohm? <div className="text-3xl pb-4">Thiele Small Parameters 2 Ω</div>: <></>}
          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
            <Label htmlFor="fs">Frekuensi Resonansi / Fs (Hz)</Label>
            <Input disabled={loading} id="fs" placeholder="fs value" defaultValue={thiele2?.fs? thiele2.fs : ""} />
            </div>
            <div>
            <Label htmlFor="dcr">DCR (Ω)</Label>
            <Input disabled={loading} id="dcr" placeholder="dcr value" defaultValue={thiele2?.dcr? thiele2.dcr : ""} />
            </div>
            <div>
            <Label htmlFor="qts">Qts</Label>
            <Input disabled={loading} id="qts" placeholder="qts value" defaultValue={thiele2?.qts? thiele2.qts : ""} />
            </div>
            <div>
            <Label htmlFor="qes">Qes</Label>
            <Input disabled={loading} id="qes" placeholder="qes value" defaultValue={thiele2?.qes? thiele2.qes : ""} />
            </div>
            <div>
            <Label htmlFor="qms">Qms</Label>
            <Input disabled={loading} id="qms" placeholder="qms value" defaultValue={thiele2?.qms? thiele2.qms : ""} />
            </div>
            <div>
            <Label htmlFor="mms">Mms (g)</Label>
            <Input disabled={loading} id="mms" placeholder="mms value" defaultValue={thiele2?.mms? thiele2.mms : ""} />
            </div>
            <div>
            <Label htmlFor="cms">Cms (mm/N)</Label>
            <Input disabled={loading} id="cms" placeholder="cms value" defaultValue={thiele2?.cms? thiele2.cms : ""} />
            </div>
            <div>
            <Label htmlFor="bl_product">BL Product (Tm)</Label>
            <Input disabled={loading} id="bl_product" placeholder="bl_product value" defaultValue={thiele2?.bl_product? thiele2.bl_product : ""} />
            </div>
            <div>
            <Label htmlFor="vas">Vas (liters)</Label>
            <Input disabled={loading} id="vas" placeholder="vas value" defaultValue={thiele2?.vas? thiele2.vas : ""} />
            </div>
            <div>
            <Label htmlFor="no">No (%)</Label>
            <Input disabled={loading} id="no" placeholder="no value" defaultValue={thiele2?.no? thiele2.no : ""} />
            </div>
            <div>
            <Label htmlFor="sd">Sd (cm2)</Label>
            <Input disabled={loading} id="sd" placeholder="sd value" defaultValue={thiele2?.sd? thiele2.sd : ""} />
            </div>
            <div>
            <Label htmlFor="xmax">Xmax (mm)</Label>
            <Input disabled={loading} id="xmax" placeholder="xmax value" defaultValue={thiele2?.xmax? thiele2.xmax : ""} />
            </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="need_4_ohm" onClick={() => need4Ohm? setneed4Ohm(false): setneed4Ohm(true)} checked={need4Ohm? true: false}/>
            <Label htmlFor="need_4_ohm">Need 4 Ω?</Label>
          </div>
          <div className={`${need4Ohm ? 'block' : 'hidden'}`}>
            <div>
              <div className="text-3xl pb-4">Thiele Small Parameters 4 Ω</div>
            <div className="md:grid md:grid-cols-3 gap-8">
              <div>
              <Label htmlFor="fs">Frekuensi Resonansi / Fs (Hz)</Label>
              <Input disabled={loading} id="fs" placeholder="fs value" defaultValue={thiele4?.fs? thiele4.fs : ""} />
              </div>
              <div>
              <Label htmlFor="dcr">DCR (Ω)</Label>
              <Input disabled={loading} id="dcr" placeholder="dcr value" defaultValue={thiele4?.dcr? thiele4.dcr : ""} />
              </div>
              <div>
              <Label htmlFor="qts">Qts</Label>
              <Input disabled={loading} id="qts" placeholder="qts value" defaultValue={thiele4?.qts? thiele4.qts : ""} />
              </div>
              <div>
              <Label htmlFor="qes">Qes</Label>
              <Input disabled={loading} id="qes" placeholder="qes value" defaultValue={thiele4?.qes? thiele4.qes : ""} />
              </div>
              <div>
              <Label htmlFor="qms">Qms</Label>
              <Input disabled={loading} id="qms" placeholder="qms value" defaultValue={thiele4?.qms? thiele4.qms : ""} />
              </div>
              <div>
              <Label htmlFor="mms">Mms (g)</Label>
              <Input disabled={loading} id="mms" placeholder="mms value" defaultValue={thiele4?.mms? thiele4.mms : ""} />
              </div>
              <div>
              <Label htmlFor="cms">Cms (mm/N)</Label>
              <Input disabled={loading} id="cms" placeholder="cms value" defaultValue={thiele4?.cms? thiele4.cms : ""} />
              </div>
              <div>
              <Label htmlFor="bl_product">BL Product (Tm)</Label>
              <Input disabled={loading} id="bl_product" placeholder="bl_product value" defaultValue={thiele4?.bl_product? thiele4.bl_product : ""} />
              </div>
              <div>
              <Label htmlFor="vas">Vas (liters)</Label>
              <Input disabled={loading} id="vas" placeholder="vas value" defaultValue={thiele4?.vas? thiele4.vas : ""} />
              </div>
              <div>
              <Label htmlFor="no">No (%)</Label>
              <Input disabled={loading} id="no" placeholder="no value" defaultValue={thiele4?.no? thiele4.no : ""} />
              </div>
              <div>
              <Label htmlFor="sd">Sd (cm2)</Label>
              <Input disabled={loading} id="sd" placeholder="sd value" defaultValue={thiele4?.sd? thiele4.sd : ""} />
              </div>
              <div>
              <Label htmlFor="xmax">Xmax (mm)</Label>
              <Input disabled={loading} id="xmax" placeholder="xmax value" defaultValue={thiele4?.xmax? thiele4.xmax : ""} />
              </div>
              </div>
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
    </>
  );
};
