"use client"

import { ComparisonProductData } from '@/app/(legacy)/types';
import { useEffect, useState, use } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/app/(legacy)/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import getComparisonProduct from '@/app/(legacy)/actions/get-comparison-product';
import { LazyImage } from '@/app/(legacy)/components/lazyImage';
import FullScreenLoader from '@/app/(legacy)/components/loadingNoScroll';

function createData(
    name: string,
    attribute: string,
    unit: string,
) {
    return { name, attribute, unit };
}

const ProductBySubCategoryPage = (
    props: {
      params: Promise<{ productSlugs: string }>
    }
) => {
    const params = use(props.params);
    const [finalFetchedProducts, setFinalFetchedProducts] = useState<ComparisonProductData[]>([])
    const router = useRouter()
    const [allNote, setAllNote] = useState<string[]>([])
    const [allDriversName, setAllDriversName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)


    useEffect( () => {
        async function fetchData(){
            let fetchedProducts: ComparisonProductData[] = []
            let tempallNote: string[] = []
            let tempAllName: string = ''
            const decodedSlugs = decodeURIComponent(params.productSlugs);
            const slugArray = decodedSlugs.split(',');
            slugArray.pop()
            await Promise.all(
                slugArray.map(async (value) => {
                    let temp: ComparisonProductData = await getComparisonProduct(value);
                    fetchedProducts.push(temp);
                    tempAllName = tempAllName === "" ? temp.name : `${tempAllName}, ${temp.name}`;
                    const customNoteArray = temp.specification.custom_note.split('- ').map(note => note.trim()).filter(note => note !== '');
                    customNoteArray.map((value) => {
                        if(!tempallNote.includes(value)) {
                            tempallNote.push(value)
                        }
                    })
                })
            );
            setFinalFetchedProducts(fetchedProducts)
            setAllNote(tempallNote)
            setAllDriversName(tempAllName);
            setLoading(false)
        }

        fetchData()
    }, [params.productSlugs]);

    const rows = [
        createData('Seri Speaker', 'name', ""),
        createData('Tipe Speaker', 'subCategory', ""),
        createData('Diameter Speaker', 'diameter_speaker', ""),
        createData('Daya Maksimum', 'daya_maksimum', ""),
        createData('Lebar Daerah Frekuensi', 'lebar_daerah_frekuensi', ""),
        createData('Sensitivity', 'spl', "dB"),
        createData('Medan Magnet', 'medan_magnet', "T"),
        createData('Berat Magnet', 'berat_magnet', ""),
        createData('Diameter Voice Coil', 'voice_coil_diameter', "mm"),
        createData('Impedansi', 'impedansi', "Ω"),
        createData('Nominal Power Handling¹', 'nominal_power_handling', "Watt"),
        createData('Program Power²', 'program_power', "Watt"),
        createData('Material Voice Coil', 'voice_coil_material', ""),
        createData('Respon Frekuensi', 'frequency_url', ""),
        createData('Impedansi', 'impedance_url', ""),
      ];

    function resetComparison() {
      router.push('/drivers?reset=true');
  }


    return (<>
        {loading?
            <FullScreenLoader isVisible={loading} />
        :
        <div className='bg-white -z-10'>
        <div className="container mx-auto xl:px-36 lg:px-20 px-10 xl:py-8 lg:py-6 md:px-40 sm:px-32 py-4">
            <div className='w-full text-center'>
                <div className='text-3xl font-bold text-black pb-4 md:pt-0 pt-16'>
                    KOMPARASI PRODUK
                </div>
                <Separator className='bg-foreground w-56 h-2 mx-auto'/>
                <div className='py-2 text-black'>
                    {allDriversName}
                </div>
                <div className="w-full flex justify-center pb-4">
                    <div className='pr-4'>
                        <Button
                            onClick={resetComparison}
                            variant="outline"
                            className="bg-transparent border-foreground border-4 w-40"
                        >
                            <b>CLEAR</b>
                        </Button>
                    </div>
                    <Button
                        variant="default"
                        className="bg-secondary border-foreground border-2"
                        asChild
                    >
                    <Link href={`/drivers`}> 
                        <Plus size={25} className="pr-2" strokeWidth={3}/>
                        <b>TAMBAH PRODUK</b>
                    </Link>
                    </Button>
                </div>
            </div>
            {finalFetchedProducts.length>0 &&
           <div className="flex justify-center">
           <ScrollArea className="w-full whitespace-nowrap border-2">
                <Table className="border">
                    <TableHeader className='border-2 border-black'>
                        <TableRow className='hover:bg-white'>
                            <TableHead className='font-bold text-black bg-gray-200 border-2 border-black w-40'>Visual Speaker</TableHead>
                            {finalFetchedProducts.map((product) => (
                                <TableHead key={product.name} className="items-center text-black border-2 border-black min-w-40 p-1">
                                    <div className='h-36 w-36 mx-auto'>
                                        <LazyImage
                                            src={product.coverUrl} 
                                            alt={product.coverAlt} 
                                            width={144}
                                            height={144} 
                                        />
                                    </div>
                                    {/* <Image 
                                        src={product.coverUrl} 
                                        alt={product.coverAlt} 
                                        width={144}
                                        height={144} 
                                        className=" h-fit w-36 mx-auto"
                                    /> */}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className=' border-2 border-black'>
                        {rows.map((row,index)=> {
                            if (row.attribute === 'name') {
                                //@ts-ignore
                                const hasValue = finalFetchedProducts.some(product => product.name != "");
                                return hasValue && (
                                    <TableRow key={index} className='hover:bg-secondary text-black border-2 border-black'>
                                        <TableCell className='font-bold bg-gray-200 border-2 border-black p-2'>{row.name}</TableCell>
                                        {finalFetchedProducts.map((product) => (
                                            //@ts-ignore
                                            (<TableCell key={product.name} className='text-center border-2 border-black'>{product.name !== ''? `${product.name}`: '-'
                                                    }
                                            </TableCell>)
                                        ))}
                                    </TableRow>
                                );
                            }
                            else if (row.attribute === 'subCategory') {
                                //@ts-ignore
                                const hasValue = finalFetchedProducts.some(product => product.sub_sub_categories.length>0);
                                return hasValue && (
                                    <TableRow key={index} className='hover:bg-secondary text-black border-2 border-black'>
                                        <TableCell className='font-bold bg-gray-200 border-2 border-black p-2'>{row.name}</TableCell>
                                        {finalFetchedProducts.map((product) => (
                                            //@ts-ignore
                                            (<TableCell key={product.name} className='text-center border-2 border-black p-2'>{product.sub_sub_categories.length > 0? `${product.sub_sub_categories[0].name}`: '-'
                                                    }
                                            </TableCell>)
                                        ))}
                                    </TableRow>
                                );
                            }
                            else if (row.attribute === 'frequency_url') {
                                //@ts-ignore
                                const hasValue = finalFetchedProducts.some(product => product.graph_Url.length>0);
                                return hasValue && (
                                    <TableRow key={index} className='hover:bg-secondary text-black border-2 border-black'>
                                        <TableCell className='font-bold bg-gray-200 border-2 border-black p-2'>{row.name}</TableCell>
                                        {finalFetchedProducts.map((product) => (
                                            //@ts-ignore
                                            (<TableCell key={product.name} className="justify-center items-center border-2 border-black p-2">
                                                {product.graph_Url.length > 0 && (
                                                    (<div className='h-full w-56 mx-auto'>
                                                        <LazyImage
                                                            src={product.graph_Url[0]}
                                                            alt={product.name}
                                                            width={300}
                                                            height={300} 
                                                        />
                                                    </div>)
                                                    // <Image
                                                    //     src={product.graph_Url[0]}
                                                    //     alt={product.name}
                                                    //     width={384}
                                                    //     height={216} 
                                                    //     className="w-96 h-fit"
                                                    // />
                                                    )}
                                            </TableCell>)
                                        ))}
                                    </TableRow>
                                );
                            }
                            else if (row.attribute === 'impedance_url') {
                                //@ts-ignore
                                const hasValue = finalFetchedProducts.some(product => product.impedance_Url.length>0);
                                return hasValue && (
                                    <TableRow key={index} className='hover:bg-secondary text-black border-2 border-black'>
                                        <TableCell className='font-bold bg-gray-200 border-2 border-black p-2'>{row.name}</TableCell>
                                        {finalFetchedProducts.map((product) => (
                                            //@ts-ignore
                                            (<TableCell key={product.name} className="justify-center items-center border-2 border-black p-2">
                                                {product.impedance_Url.length > 0 && (
                                                    (<div className='h-full w-56 mx-auto'>
                                                        <LazyImage
                                                            src={product.impedance_Url[0]}
                                                            alt={product.name}
                                                            width={300}
                                                            height={300}  
                                                        />
                                                    </div>)
                                                    // <Image
                                                    //     src={product.impedance_Url[0]}
                                                    //     alt={product.name}
                                                    //     width={384}
                                                    //     height={216} 
                                                    //     className="w-96 h-fit"
                                                    // />
                                                    )}
                                            </TableCell>)
                                        ))}
                                    </TableRow>
                                );
                            }
                            else{
                                //@ts-ignore
                                const hasValue = finalFetchedProducts.some(product => product.specification[row.attribute] !== '');
                                return hasValue && (
                                    <TableRow key={index} className='hover:bg-secondary text-black border-2 border-black'>
                                        <TableCell className='font-bold bg-gray-200 border-2 border-black p-2'>{row.name}</TableCell>
                                        {finalFetchedProducts.map((product) => (
                                            //@ts-ignore
                                            (<TableCell key={product.name} className='text-center border-2 border-black p-2'>{product.specification[row.attribute] !== ''? `${product.specification[row.attribute]} ${row.unit}`
                                                        : '-'
                                                    }
                                            </TableCell>)
                                        ))}
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            }
            <div className='text-black pt-8 text-center'>
                {allNote.map((value, index) => 
                    <div key={index}>
                        - {value}
                    </div>
                )}
            </div>
        </div>
        </div>
        }
    </>);
}

export default ProductBySubCategoryPage;
