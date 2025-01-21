"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { LazyImage } from "./lazyImage";
import { useEffect, useRef, useState } from "react";
import { Searchbox } from "../types";
import getProductsForSearchbox from "../actions/get-product-for-searchbox";
import { X } from "lucide-react";

export default function SearchBoxMain() {
    const [activeSearch, setactiveSearch] = useState<string>('');
    const [foundProducts, setfoundProducts] = useState<Searchbox[]>([]);
    const [finalProductSearchbox, setFinalProductSearchbox] = useState<Searchbox[]>([]);
    const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(true)
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data : Searchbox[] = await getProductsForSearchbox();
                data.sort((a, b) => a.value.localeCompare(b.value))
                setFinalProductSearchbox(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


  function searchData(val: string){
    let select : Searchbox[] = []
    
    const updatedVal = val.replace(/["“”‟″‶〃״˝ʺ˶ˮײ']/g, ' inch');
    const trimmedValue = updatedVal.trimStart().toLowerCase();
    finalProductSearchbox.map((value)=>{
      value.value.toLowerCase().includes(trimmedValue)?
        select.push(value)
        :
        ''
    })
    setfoundProducts(select)
  }
  

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSearchBoxOpen(false)
      setactiveSearch('')
    }
  };

  // Adding event listeners on mount and cleaning up on unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
      useEffect(() => {
      if (searchBoxOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [searchBoxOpen]);
  
    return(
        searchBoxOpen && 
        <div className="fixed top-0 left-0 w-screen h-screen bg-background/80 backdrop-blur-sm z-[101] p-8">
        <Button
            onClick={() => {setSearchBoxOpen(false), setactiveSearch('')}}
            className="absolute right-0 top-0 p-2 text-foreground/60 hover:text-foreground transition-colors bg-transparent hover:bg-transparent pr-8 pt-12"
          >
            <X size={40} />
            <span className="sr-only">Close</span>
          </Button>
        <div className="relative w-full max-w-3xl mx-auto mt-16">
        <Link
        href={'/'}
        onClick={() => {setSearchBoxOpen(false), setactiveSearch('')}}
        className="flex items-center justify-center"
      >
        <Image
          src={'/images/legacy/logo_legacy.webp'}
          className='cursor-pointer max-w-[150px] h-8'
          alt="logo of Legacy Audio"
          width={1000}
          height={1000}            
          priority
          // fill
        />
      </Link>
          <Input type="text" placeholder="Search a Product" className="w-full mt-8" ref={inputRef} onChange={(event) =>
              (
                setactiveSearch(event.target.value),
                searchData(event.target.value)
              )
            }
            value={activeSearch}/>
        </div>
        
        <div className={`${activeSearch.trim() === "" ? 'hidden' : 'block relative z-50 bg-transparent w-full max-w-3xl mx-auto overflow-y-scroll max-h-[400px] p-2'}`}>
          <div>
            <div className={`overflow-y-auto`}> 
              {foundProducts.length!=0?
                foundProducts.map((value) => (
                  <Link 
                    key={value.label} 
                    href={`/products/${value.slug}`} 
                    onClick={() => {
                      setactiveSearch("");
                      setSearchBoxOpen(false)
                    }}
                    className="border-0 block cursor-pointer"
                    >                 
                      <div className="p-2 flex border-b-2 hover:text-[rgba(19,82,219,1)] hover:font-bold">
                        <div className="pr-4 w-[100px] h-auto">
                          <LazyImage
                            src={value.url} 
                            alt={value.label} 
                            width={100} 
                            height={100} 
                          />
                        </div>
                        <div className="flex flex-col justify-center text-sm">
                          <div className="font-bold">{value.label}</div>
                        </div>
                        
                      </div>
                  </Link>
                ))
                :
                <div>                          
                  <div className="p-4 flex justify-center items-center border-b-2 border-gray-100">
                    <div className="text-sm">
                      No products found.
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
}