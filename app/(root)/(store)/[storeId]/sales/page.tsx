// app/(root)/(store)/[storeId]/sales/page.tsx
import SalesPage from './client'

interface Props {
  params: Promise<{ storeId: string }>
}

async function page({ params }: Props) {
  const { storeId } = await params

  return (
    <SalesPage storeId={storeId} />
  )
}

export default page