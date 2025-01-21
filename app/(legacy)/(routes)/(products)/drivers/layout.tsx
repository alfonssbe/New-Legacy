import { Metadata } from "next"

 
export const metadata: Metadata = {
  title: 'All Drivers',
  description: 'All Drivers Provided by Legacy',
}

export default function DriversLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
        <div className="container mx-auto xl:px-36 lg:px-20 px-10">
          {children}
        </div>
    )
}