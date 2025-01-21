import Link from "next/link";
import { Products } from "../../types";
import { LazyImageClickable } from "../lazyImageClickable";

interface ReviewCard {
  data: Products
}

const ProductCard: React.FC<ReviewCard> = ({
  data
}) => {
  return ( 
    <Link href={{
      pathname: `/products/${data?.slug}`,
      // query: { name : data.name },
    }} 
    className="bg-white group cursor-pointer"
    >
      <div className="relative flex content-center justify-center h-[150px] w-full">
      <div className="w-full h-auto px-12">
        <LazyImageClickable
          src={data.coverUrl} 
          alt={data.name} 
          width={500}
          height={500}
        />
      </div>
    </div>


      <div className="flex flex-col items-center pt-4">
      <div className="text-sm text-gray-400 lg:text-lg font-semibold text-center">{data.sub_sub_categories[0].name}</div>
        <div className="text-lg lg:text-2xl font-bold text-center pb-2 text-black">{data.name}</div>
      </div>
      {/* </div> */}
    </Link>
  );
}

export default ProductCard;
