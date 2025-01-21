// "use client"

import LogoutButtonNoBrands from '@/app/admin/components/logout-no-brands';
import Navbar from '@/app/admin/components/navbar';
// import dynamic from 'next/dynamic';
// import Loading from '../../loading';

// const DynamicNavbarLoad = dynamic(() => import('@/app/admin/components/navbar'), {
//   ssr: false,
//   loading: () => <Loading />
// });

// Dynamically load children
// const DynamicChildren = dynamic(
//   async () => {
//     const DynamicComponent = (props: { children: React.ReactNode }) => <>{props.children}</>;
//     DynamicComponent.displayName = 'DynamicComponent';
//     return DynamicComponent;
//   }, 
//   {
//     ssr: false, // Skip server-side rendering for dynamic imports
//     loading: () => <Loading /> // Optional loading indicator
//   }
// );

export default async function DashboardLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ brandId: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <>
      {params.brandId === 'undefined' ? (
        <div className="flex flex-col items-center justify-center h-screen w-full text-center">
          <p>You have not been assigned to any brands. Please contact the administrator.</p>
          <div className="pt-5">
            <LogoutButtonNoBrands />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}
