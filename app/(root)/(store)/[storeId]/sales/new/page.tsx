// app/(root)/(store)/[storeId]/sales/new/page.tsx
import NewSalePage from './client'

interface Props {
  params: Promise<{ storeId: string }>
}

async function page({ params }: Props) {
  const { storeId } = await params;
  return (
    <NewSalePage storeId={storeId} />
  )
}

export default page