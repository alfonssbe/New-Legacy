"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet';
import { ChevronRight, Loader, Menu, Search } from 'lucide-react';
import { NavbarProducts } from '../types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordionmobilemenu';
import { Button } from '@/components/ui/button';
import FullScreenLoader from './loadingNoScroll';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
// import { useMediaQuery } from 'react-responsive';
import getAllNavbarContent from '../actions/get-all-navbar-content';

const DynamicSearchboxLoad = dynamic(() => import('./searchbox'), {
  ssr: false,
  loading: () => <><Loader size={20} className='animate-spin' /></>
})

interface NavbarComponents{
  title: string,
  href: string,
  parent: string,
  url: string
}

const styledDropdown = "text-sm px-1 py-2 text-foreground"

//MENU
const DriversMenu: NavbarComponents[] = [
  {
    title: "Legacy",
    href: "/drivers/legacy",
    parent: "Drivers",
    url: ""
  },
  {
    title: "Energy",
    href: "/drivers/energy",
    parent: "Drivers",
    url: ""
  },
  {
    title: "Sparta",
    href: "/drivers/sparta",
    parent: "Drivers",
    url: ""
  },
  {
    title: "Prestige",
    href: "/drivers/prestige",
    parent: "Drivers",
    url: ""
  }
]

//SUB MENU
const LegacySubMenu: NavbarComponents[] = [
  {
    title: "Subwoofer",
    href: "/drivers/legacy/subwoofer",
    parent: "Legacy",
    url: ""
  },
  {
    title: "Coaxial",
    href: "/drivers/legacy/coaxial",
    parent: "Legacy",
    url: ""
  },
  {
    title: "Tweeter",
    href: "/drivers/legacy/tweeter",
    parent: "Legacy",
    url: ""
  },
]
const EnergySubMenu: NavbarComponents[] = [
  {
    title: "Subwoofer",
    href: "/drivers/energy/subwoofer",
    parent: "Energy",
    url: ""
  }
]
const SpartaSubMenu: NavbarComponents[] = [
  {
    title: "Subwoofer",
    href: "/drivers/sparta/subwoofer",
    parent: "Sparta",
    url: ""
  }
]
const PrestigeSubMenu: NavbarComponents[] = [
  {
    title: "Subwoofer",
    href: "/drivers/prestige/subwoofer",
    parent: "Prestige",
    url: ""
  },
  {
    title: "Woofer",
    href: "/drivers/prestige/woofer",
    parent: "Prestige",
    url: ""
  },
  {
    title: "Full Range",
    href: "/drivers/prestige/full-range",
    parent: "Prestige",
    url: ""
  },
  {
    title: "Tweeter",
    href: "/drivers/prestige/tweeter",
    parent: "Prestige",
    url: ""
  },
  {
    title: "Coaxial",
    href: "/drivers/prestige/coaxial",
    parent: "Prestige",
    url: ""
  },
]
//EMPTY MENU
const EmptyMenu: NavbarComponents[] = [
  {
    title: "",
    href: "",
    parent: "",
    url: ""
  },
]




let tempLegacySubwoofer: NavbarComponents[] = []
let tempLegacyCoaxial: NavbarComponents[] = []
let tempLegacyTweeter: NavbarComponents[] = []

let tempPrestigeSubwoofer: NavbarComponents[] = []
let tempPrestigeWoofer: NavbarComponents[] = []
let tempPrestigeFullRange: NavbarComponents[] = []
let tempPrestigeTweeter: NavbarComponents[] = []
let tempPrestigeCoaxial: NavbarComponents[] = []

let tempEnergySubwoofer: NavbarComponents[] = []

let tempSpartaSubwoofer: NavbarComponents[] = []

//CONDITIONS
const LegacySubwooferConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Legacy' },
  { type: 'Sub Sub Category', name: 'Subwoofer' }
];
const LegacyCoaxialConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Legacy' },
  { type: 'Sub Sub Category', name: 'Coaxial' }
];
const LegacyTweeterConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Legacy' },
  { type: 'Sub Sub Category', name: 'Tweeter' }
];


const PrestigeSubwooferConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Prestige' },
  { type: 'Sub Sub Category', name: 'Subwoofer' }
];
const PrestigeWooferConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Prestige' },
  { type: 'Sub Sub Category', name: 'Woofer' }
];
const PrestigeFullRangeConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Prestige' },
  { type: 'Sub Sub Category', name: 'Full Range' }
];
const PrestigeTweeterConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Prestige' },
  { type: 'Sub Sub Category', name: 'Tweeter' }
];
const PrestigeCoaxialConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Prestige' },
  { type: 'Sub Sub Category', name: 'Coaxial' }
];


const EnergySubwooferConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Energy' },
  { type: 'Sub Sub Category', name: 'Subwoofer' }
];


const SpartaSubwooferConditions = [
  { type: 'Category', name: 'Drivers' },
  { type: 'Sub Category', name: 'Sparta' },
  { type: 'Sub Sub Category', name: 'Subwoofer' }
];



const conditionsAndTemps = [
  { conditions: LegacySubwooferConditions, tempArray: tempLegacySubwoofer },
  { conditions: LegacyCoaxialConditions, tempArray: tempLegacyCoaxial },
  { conditions: LegacyTweeterConditions, tempArray: tempLegacyTweeter },

  { conditions: PrestigeSubwooferConditions, tempArray: tempPrestigeSubwoofer },
  { conditions: PrestigeWooferConditions, tempArray: tempPrestigeWoofer },
  { conditions: PrestigeFullRangeConditions, tempArray: tempPrestigeFullRange },
  { conditions: PrestigeTweeterConditions, tempArray: tempPrestigeTweeter },
  { conditions: PrestigeCoaxialConditions, tempArray: tempPrestigeCoaxial },
  
  { conditions: EnergySubwooferConditions, tempArray: tempEnergySubwoofer },

  { conditions: SpartaSubwooferConditions, tempArray: tempSpartaSubwoofer },
];


function Navbar() {
  const [driverMenu, setDriversMenu] = useState<NavbarComponents[]>(EmptyMenu)
  const [driversubMenu, setDriversSubMenu] = useState<NavbarComponents[]>(EmptyMenu)
  const [driversubsubMenu, setDriversSubSubMenu] = useState<NavbarComponents[]>(EmptyMenu)
  const [loading, setLoading] = useState(true);
  // const inputRef = useRef<HTMLInputElement>(null);

  //LEGACY
  const [LegacySubwooferSubSubMenu, setLegacySubwooferSubSubMenu] = useState<NavbarComponents[]>([])
  const [LegacyCoaxialSubSubMenu, setLegacyCoaxialSubSubMenu] = useState<NavbarComponents[]>([])
  const [LegacyTweeterSubSubMenu, setLegacyTweeterSubSubMenu] = useState<NavbarComponents[]>([])

  //PRESTIGE
  const [PrestigeSubwooferSubSubMenu, setPrestigeSubwooferSubSubMenu] = useState<NavbarComponents[]>([])
  const [PrestigeWooferSubSubMenu, setPrestigeWooferSubSubMenu] = useState<NavbarComponents[]>([])
  const [PrestigeFullRangeSubSubMenu, setPrestigeFullRangeSubSubMenu] = useState<NavbarComponents[]>([])
  const [PrestigeTweeterSubSubMenu, setPrestigeTweeterSubSubMenu] = useState<NavbarComponents[]>([])
  const [PrestigeCoaxialSubSubMenu, setPrestigeCoaxialSubSubMenu] = useState<NavbarComponents[]>([])
  
  //ENERGY
  const [EnergySubwooferSubSubMenu, setEnergySubwooferSubSubMenu] = useState<NavbarComponents[]>([])
  
  //SPARTA
  const [SpartaSubwooferSubSubMenu, setSpartaSubwooferSubSubMenu] = useState<NavbarComponents[]>([])


  //OTHER
  const pathname = usePathname()
  const [hoveredDriverMenu, setHoveredDriverMenu] = useState("");
  const [hoveredDriverSubMenu, setHoveredDriverSubMenu] = useState("");
  const [hoveredDriverSubMenuIndex, setHoveredDriverSubMenuIndex] = useState(0);
  const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(false)
  const [navbarBg, setNavbarBg] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const navbarData: NavbarProducts[] = await getAllNavbarContent();
        // setValue(navbarData);
        setDriversSubMenu(EmptyMenu)    
    
        navbarData.forEach((product) => {
          conditionsAndTemps.forEach(({ conditions, tempArray }) => {
            const meetsConditions = conditions.every(condition =>
              product.categories.some(cat => cat.type === condition.type && cat.name === condition.name)
            );
            if (meetsConditions) {
              tempArray.push({
                title: product.name,
                href: product.href,
                parent: "",
                url: product.url
              });

              tempArray.sort((a, b) => a.title.localeCompare(b.title));
            }
          });
        });

        setLegacySubwooferSubSubMenu(tempLegacySubwoofer)
        setLegacyCoaxialSubSubMenu(tempLegacyCoaxial)
        setLegacyTweeterSubSubMenu(tempLegacyTweeter)
        

        setPrestigeSubwooferSubSubMenu(tempPrestigeSubwoofer)
        setPrestigeWooferSubSubMenu(tempPrestigeWoofer)
        setPrestigeFullRangeSubSubMenu(tempPrestigeFullRange)
        setPrestigeTweeterSubSubMenu(tempPrestigeTweeter)
        setPrestigeCoaxialSubSubMenu(tempPrestigeCoaxial)
        
        setEnergySubwooferSubSubMenu(tempEnergySubwoofer)

        setSpartaSubwooferSubSubMenu(tempSpartaSubwoofer)
      } catch (error) {
        console.error('Error fetching navbar products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) { // Change this value based on when you want the background to change
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    handleScroll()

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  function searchSubMenu(name: string, parent: string){
    name === "Legacy" && parent === "Drivers"? 
    ((setDriversSubMenu(LegacySubMenu))):
    name === "Prestige" && parent === "Drivers"? 
    ((setDriversSubMenu(PrestigeSubMenu))):
    name === "Energy" && parent === "Drivers"? 
    ((setDriversSubMenu(EnergySubMenu))):
    name === "Sparta" && parent === "Drivers"? 
    ((setDriversSubMenu(SpartaSubMenu))):''
  }
  function searchSubSubMenu(name: string, parent: string){
    name === "Subwoofer" && parent === "Legacy"? 
    ((setDriversSubSubMenu(LegacySubwooferSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    name === "Coaxial" && parent === "Legacy"? 
    ((setDriversSubSubMenu(LegacyCoaxialSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    name === "Tweeter" && parent === "Legacy"? 
    ((setDriversSubSubMenu(LegacyTweeterSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):

    name === "Subwoofer" && parent === "Prestige"?
    ((setDriversSubSubMenu(PrestigeSubwooferSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    name === "Woofer" && parent === "Prestige"?
    ((setDriversSubSubMenu(PrestigeWooferSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    name === "Full Range" && parent === "Prestige"?
    ((setDriversSubSubMenu(PrestigeFullRangeSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    name === "Tweeter" && parent === "Prestige"?
    ((setDriversSubSubMenu(PrestigeTweeterSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    name === "Coaxial" && parent === "Prestige"?
    ((setDriversSubSubMenu(PrestigeCoaxialSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    
    name === "Subwoofer" && parent === "Energy"?
    ((setDriversSubSubMenu(EnergySubwooferSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):
    
    name === "Subwoofer" && parent === "Sparta"?
    ((setDriversSubSubMenu(SpartaSubwooferSubSubMenu), 
    setHoveredDriverSubMenu(name)
    )):''
  }

  
  // Detect if the device is mobile or desktop
  // const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  // const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });

  return ( 
    // loading?
    //   <FullScreenLoader isVisible={loading} />
    // :
    <div className={`${navbarBg ? 'bg-white shadow-lg' : ''} transition-all duration-300 ease-in-out`}>
    <nav className="container mx-auto xl:px-36 lg:px-20 px-10 py-4 h-fit">
    <div className="flex items-center justify-between">
      <div className="w-3/4 flex">
        <Link
          href={'/'}
          className="flex items-center"
        >
          <Image
            src={`${navbarBg ? '/images/legacy/legacy-black.png' :'/images/legacy/logo_legacy.webp'}`}
            className='cursor-pointer max-w-[150px] h-8'
            alt="logo of Legacy Audio"
            width={1000}
            height={1000}            
            priority
            // fill
          />
        </Link>
        {/* {isDesktop && */}
          <div className="hidden lg:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className=" flex items-center">
                <NavigationMenuItem>
                    <div className='p-0 pl-8'>
                    <Link href={'/drivers'} legacyBehavior passHref>
                    <NavigationMenuTrigger className={navigationMenuTriggerStyle().concat(` bg-transparent ${pathname.includes('legacy') || pathname.includes('prestige') || pathname.includes('products')?'text-foreground' :navbarBg ? 'text-black' : ''}`)} onMouseEnter={() => {
                      setHoveredDriverMenu("");
                      setHoveredDriverSubMenu("");
                      setDriversSubMenu(EmptyMenu);
                      setDriversSubSubMenu(EmptyMenu);
                    }}>
                      PRODUCTS
                    </NavigationMenuTrigger>
                    </Link>
                    </div>
                  <NavigationMenuContent className='bg-transparent pr-20'>
                    <div className='grid grid-cols-3 w-[580px] bg-transparent'>
                      <div className='overflow-y-auto w-[190px] bg-background rounded-lg h-fit z-40'>
                        <ul className="gap-1 p-1">
                        <Link href={'/drivers'} legacyBehavior passHref>
                        <NavigationMenuLink>
                        <div
                          onMouseEnter={() => {
                            setHoveredDriverMenu("");
                            setHoveredDriverSubMenu("");
                            setDriversSubMenu(EmptyMenu);
                            setDriversSubSubMenu(EmptyMenu);
                          }}
                          className='px-2'
                        >
                          <div className={`${styledDropdown} flex justify-between items-center align-middle hover:text-secondary text-white `}>
                            View All Products
                          </div>
                        </div>
                        </NavigationMenuLink>
                        </Link>
                        <Link href={'/drivers/legacy'} legacyBehavior passHref>
                        <NavigationMenuLink>
                        <div
                          onMouseEnter={() => {
                            setHoveredDriverMenu("Legacy");
                            setHoveredDriverSubMenu("");
                            setDriversSubMenu(LegacySubMenu);
                            setDriversSubSubMenu(EmptyMenu);
                          }}
                          className='px-2'
                        >
                          <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Legacy" ? 'text-background' : 'text-white'}`}>Legacy
                          <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Legacy" ? ' text-foreground' : 'text-white'}`}/></div>

                        </div>
                        </NavigationMenuLink>
                        </Link>
                        <Link href={"/drivers/prestige"} legacyBehavior passHref>
                        <NavigationMenuLink>
                        <div
                          onMouseEnter={() => {
                            setHoveredDriverMenu("Prestige");
                            setHoveredDriverSubMenu("");
                            setDriversSubMenu(PrestigeSubMenu);
                            setDriversSubSubMenu(EmptyMenu);
                          }}
                          className='px-2'
                        >
                          <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Prestige" ? 'text-background' : 'text-white'}`}>Prestige
                          <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Prestige" ? ' text-foreground' : 'text-white'}`}/></div>
                        </div>
                        </NavigationMenuLink>
                        </Link>
                            <Link href={'/drivers/energy'} legacyBehavior passHref>
                            <NavigationMenuLink>
                            <div
                              onMouseEnter={() => {
                                setHoveredDriverMenu("Energy");
                                setHoveredDriverSubMenu("");
                                setDriversSubMenu(EnergySubMenu);
                                setDriversSubSubMenu(EmptyMenu);
                              }}
                              className='px-2'
                            >
                              <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Energy" ? 'text-background' : 'text-white'}`}>Energy
                              <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Energy" ? ' text-foreground' : 'text-white'}`}/></div>
        
                            </div>
                            </NavigationMenuLink>
                            </Link>
                                <Link href={'/drivers/sparta'} legacyBehavior passHref>
                                <NavigationMenuLink>
                                <div
                                  onMouseEnter={() => {
                                    setHoveredDriverMenu("Sparta");
                                    setHoveredDriverSubMenu("");
                                    setDriversSubMenu(SpartaSubMenu);
                                    setDriversSubSubMenu(EmptyMenu);
                                  }}
                                  className='px-2'
                                >
                                  <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverMenu==="Sparta" ? 'text-background' : 'text-white'}`}>Sparta
                                  <ChevronRight size={15} className={`pb-1 ${hoveredDriverMenu==="Sparta" ? ' text-foreground' : 'text-white'}`}/></div>
            
                                </div>
                                </NavigationMenuLink>
                                </Link>
                        </ul>
                      </div>
                      <div className={`${hoveredDriverMenu === 'Legacy' ? 'pt-[36px]' : hoveredDriverMenu === 'Prestige' ? 'pt-[72px]' : hoveredDriverMenu === 'Energy' ? 'pt-[108px]' : hoveredDriverMenu === 'Sparta' ? 'pt-[144px]' : 'pt-0'} overflow-hidden whitespace-nowrap inline-block z-30`}>
                        <div className={`w-[190px] overflow-y-auto rounded-lg h-fit transform transition-all z-30 ${driversubMenu[0].title === '' ? '-translate-x-1/2 bg-transparent' : 'translate-x-0 bg-background shadow-md'}`}>
                          <ul className="gap-1 p-1">
                            {/* SUB MENU */}
                            {driversubMenu.map((products, index) => (
                              <div key={index} onMouseEnter={() => {searchSubSubMenu(products.title, products.parent), setHoveredDriverSubMenuIndex(index)}} //DISINII 
                            className='px-2'
                              >
                                {products.parent!=="" && 
                                <Link href={products.href} legacyBehavior passHref>
                                  <NavigationMenuLink>
                                  <div className={`${styledDropdown} flex justify-between items-center align-middle ${hoveredDriverSubMenu===products.title ? 'text-background' : 'text-white'}`}>{products.title}
                                    <ChevronRight size={15} className={`pb-1 ${hoveredDriverSubMenu===products.title ? 'text-foreground' : 'text-white'}`}/>
                                  </div>
                                  </NavigationMenuLink>
                                </Link>}
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* <Suspense fallback={<><Loader size={20} className='animate-spin' /></>}> */}
                      {driversubsubMenu.length!=0 &&
                        <div className={`${hoveredDriverMenu === 'Legacy' ? 'pt-[36px]' : hoveredDriverMenu === 'Prestige' ? 'pt-[72px]' : hoveredDriverMenu === 'Energy' ? 'pt-[108px]' : hoveredDriverMenu === 'Sparta' ? 'pt-[144px]' : 'pt-0'} z-20`}>
                        <div style={{ paddingTop: `calc(${hoveredDriverSubMenuIndex} * 36px)` }}>
                        <div className={`w-[190px] overflow-y-auto max-h-[400px] h-fit rounded-lg transform transition-all z-20 ${driversubsubMenu[0].title === ''? '-translate-x-1/2 bg-transparent' : 'translate-x-0 bg-background shadow-md'}`}>
                        <ul className="gap-1 p-1">
                          {/* SUB MENU */}
                          {driversubsubMenu[0].title != '' && driversubsubMenu.map((products, index) => (
                            <div key={index} onMouseEnter={() => searchSubSubMenu(products.title, products.parent)} 
                          className='px-2'
                            >
                              {products.parent==="" &&
                              <Link href={products.href} legacyBehavior passHref>
                                <NavigationMenuLink>
                                <div className={`${styledDropdown} hover:text-foreground text-white`} >{products.title}</div>
                                </NavigationMenuLink>
                              </Link>
                              }
                            </div>
                          ))}
                        </ul>
                        </div>
                      </div> 
                      </div>}
                      {/* </Suspense> */}
                    
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                
                <NavigationMenuItem>
                  <Link href="/news" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                      <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('news') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                        NEWS
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about-us" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                      <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('about-us') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                        ABOUT US
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/catalog" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                      <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('catalog') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                        CATALOGUE
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link href="/distributors" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                    <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('distributors') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                      DISTRIBUTORS
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
                <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                    <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('contact') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                      CONTACT US
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        {/* } */}
      </div>  
      {/* {isDesktop && */}
        <div className="w-1/4 hidden lg:flex items-center justify-end">
          <div className={`flex items-center justify-end font-bold ${navbarBg ? 'text-black' : 'text-white'} hover:text-[rgba(19,82,219,1)] hover:cursor-pointer`} onMouseEnter={() => setSearchBoxOpen(false)} onClick={() => searchBoxOpen? setSearchBoxOpen(false): setSearchBoxOpen(true)}>
          <a className='xl:block hidden'>Search</a> 
            <Search size={25} className="m-2 hover:cursor-pointer" />
          </div>
        </div>
      {/* } */}


      {searchBoxOpen && <DynamicSearchboxLoad/>}


      {/* MAIN MENU TABLET & MOBILE VIEW */}
      {/* {isMobile &&  */}
        <div className='flex lg:hidden'>
        <Button variant={null} asChild className='px-2'>
          <div className={`w-full text-base hover:text-[rgba(19,82,219,1)] ${navbarBg ? 'text-black' : 'text-white'}`}
              onMouseDown={() => setSearchBoxOpen(false)}
              onClick={() => searchBoxOpen ? setSearchBoxOpen(false) : setSearchBoxOpen(true)} >
            <div 
              className='flex items-center text-base'
            >
              <Search size={25} className="ml-2 hover:cursor-pointer" />
              {/* <SearchBox mobile={true}/> */}
            </div>
          </div>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={null} className={`w-fit p-0 ${navbarBg ? 'text-black' : 'text-white'} hover:text-[rgba(19,82,219,1)] hover:cursor-pointer`}>
                <Menu size={30} className="" />
              </Button>
          </SheetTrigger>
          <SheetContent className="w-screen h-auto p-0 overflow-y-auto bg-black">
            <SheetTitle/>
            <SheetDescription/>
            <div className='pl-6 pt-6'>
              <Link href={'/'}>
              <SheetClose>
                <Image
                  src={`${navbarBg ? '/images/legacy/logo_legacy.webp' :'/images/legacy/logo_legacy.webp'}`}
                  className='cursor-pointer max-w-[150px] h-8'
                  alt="logo of Legacy Audio"
                  width={10000}
                  height={10000}            
                  priority
                  // fill
                />
                </SheetClose>
              </Link>
            </div>
            <div className="grid pt-12">


            <Accordion type="single" collapsible className="w-full px-6">
              <AccordionItem value="item-1">
                <AccordionTrigger onClick={() =>{
                  setDriversMenu(DriversMenu)
                }} className='hover:text-[rgba(19,82,219,1)] text-white justify-center'>
                  <div className='pr-1'>PRODUCTS</div>
                </AccordionTrigger>
                <AccordionContent>
                <Accordion type="single" collapsible className="w-full rounded-lg border-2 border-foreground px-2">
                  {driverMenu.map((menu, indexdriver) => 
                      <AccordionItem key={menu.title} value={"item-".concat(indexdriver.toString())}>
                        {indexdriver === 0 && 
                          <Link href={'/drivers'} key='All Drivers'>
                            <SheetClose className='w-full hover:text-[rgba(19,82,219,1)] text-white text-center py-2'>
                              View All Products
                            </SheetClose>
                          </Link>
                          }
                        {menu.parent===""? 
                            <Link href={menu.href} key={menu.title}>
                          <SheetClose className='w-full hover:text-[rgba(19,82,219,1)] text-white text-left'>{menu.title}
                            </SheetClose></Link>
                          :
                          <AccordionTrigger value={menu.title} onClick={() =>{
                            searchSubMenu(menu.title, menu.parent)
                          }} className='hover:text-[rgba(19,82,219,1)] text-white justify-center'><div className='pr-1'>{menu.title}</div></AccordionTrigger>
                        }
                        <AccordionContent>
                        <Accordion type="single" collapsible className="w-full rounded-lg border-2 border-foreground px-2">
                          {driversubMenu.map((submenu, index) => 
                              <AccordionItem key={submenu.title} value={submenu.title}>
                                {submenu.parent===""? 
                                    <Link key={submenu.title} href={submenu.href}>
                                  <SheetClose className='w-full hover:text-[rgba(19,82,219,1)] text-white text-left'>{submenu.title}
                                    </SheetClose></Link>
                                  :
                                  <AccordionTrigger value={submenu.title} onClick={() =>{
                                    searchSubSubMenu(submenu.title, submenu.parent)
                                  }} className='hover:text-[rgba(19,82,219,1)] px-2 text-white justify-center'><div className='pr-1'>{submenu.title}</div></AccordionTrigger>
                                }
                                <AccordionContent>
                                <Accordion type="single" collapsible className="w-full rounded-lg border-2 border-foreground px-2"> 
                                  {driversubsubMenu.map((subsubmenu, index) =>
                                      <AccordionItem key={subsubmenu.title} value={subsubmenu.title}>
                                          <Link key={subsubmenu.title} href={subsubmenu.href}>
                                        <SheetClose className='p-2 w-full hover:text-[rgba(19,82,219,1)] text-white text-left'>{subsubmenu.title}
                                          </SheetClose></Link>
                                      </AccordionItem>
                                  )}
                                  </Accordion>
                                </AccordionContent>
                              </AccordionItem>
                          )}
                            </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                  )}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

              <Button variant={null} asChild className='px-6'>
                  <Link href="/news">
                  <SheetClose className='w-full text-base hover:text-[rgba(19,82,219,1)] text-white'>
                      NEWS
                    </SheetClose>
                  </Link>
              </Button>
              <Button variant={null} asChild className='px-6'>
                  <Link href="/about-us">
                  <SheetClose className='w-full text-base hover:text-[rgba(19,82,219,1)] text-white'>
                    ABOUT US
                    </SheetClose>
                  </Link>
              </Button>
              <Button variant={null} asChild className='px-6'>
                  <Link href="/catalog">
                  <SheetClose className='w-full text-base hover:text-[rgba(19,82,219,1)] text-white'>
                      CATALOGUE
                    </SheetClose>
                  </Link>
              </Button>
              <Button variant={null} asChild className='px-6'>
                  <Link href="/distributors">
                  <SheetClose className='w-full text-base hover:text-[rgba(19,82,219,1)] text-white'>
                      DISTRIBUTORS
                    </SheetClose>
                  </Link>
              </Button>
              <Button variant={null} asChild className='px-6'>
                  <Link href="/contact">
                  <SheetClose className='w-full text-base hover:text-[rgba(19,82,219,1)] text-white'>
                      CONTACT US
                    </SheetClose>
                  </Link>
              </Button>
            </div>
            
            
          </SheetContent>
        </Sheet>
        </div>
      {/* } */}
      </div>
    </nav>
  </div>
  );
}

export default Navbar;