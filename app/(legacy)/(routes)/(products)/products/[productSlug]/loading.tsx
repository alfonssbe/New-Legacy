import { Loader } from "@/app/(legacy)/components/ui/loader";

const Loading = () => {
  return ( 
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black z-50">
    <Loader />
  </div>
  );
}

export default Loading;