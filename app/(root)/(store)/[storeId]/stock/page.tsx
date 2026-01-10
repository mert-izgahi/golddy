// app/(root)/(store)/[storeId]/stock/page.tsx
import StockPage from './client'

interface Props {
  params: Promise<{ storeId: string }>
}

async function page({ params }: Props) {
  const { storeId } = await params

  return (
    <StockPage storeId={storeId} />
  )
}

export default page