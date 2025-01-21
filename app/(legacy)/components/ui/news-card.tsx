import Link from "next/link";
import { NewsType } from "../../types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NewsCardProps {
  data: NewsType;
}

const NewsCard: React.FC<NewsCardProps> =  ({ data }) => {
  const eventDate = new Date(data.event_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',  // Full month name
    day: '2-digit'  // Day with leading zero if necessary
  });
  return ( 
    <div className="py-4">
      <div className="md:flex block items-center">     
        <Image
          src={data.news_img_url} 
          alt={data.title} 
          width={1000}
          height={1000}
          className="md:w-[300px] w-[250px] h-full justify-center"
        />
        <div className="md:px-12">
          <div className="text-lg lg:text-xl font-bold text-black pb-2 md:pt-0 pt-4">
            {data.title}
          </div>
          <div className="text-sm py-2 text-black">
            {eventDate}
          </div>
          <div className="text-base py-2 text-black"  dangerouslySetInnerHTML={{ __html: data.description.length > 150
              ? `${data.description.slice(0, 150)}...`
              : data.description}}>
          </div>
          <div className="text-base py-2 text-black">
            <Button asChild size={'lg'} variant={'secondary'} className="sm:w-fit w-full">
              <Link href={`/news/${data.slug}`} className='text-white font-bold'>READ MORE</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
