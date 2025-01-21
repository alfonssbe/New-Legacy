import Footer from './components/footer'
import Navbar from './components/navbar'
import NextTopLoader from "nextjs-toploader";


export default function RootlegacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen'>
      <NextTopLoader color='#f0ad4e' showSpinner={false}/>
      <div className="sticky top-0 z-50 bg-transparent bg-cover bg-center">
        <Navbar />
      </div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
