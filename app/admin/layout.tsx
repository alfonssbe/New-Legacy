import { ModalProvider } from '@/app/admin/providers/modal-provider'
import { ToastProvider } from '@/app/admin/providers/toast-provider'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'All Admin Dashboard',
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      {children}
    </>
  )
}
