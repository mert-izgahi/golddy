import EditStockPage from './client'


interface Props {
  params: Promise<{
    storeId: string,
    id: string
  }>
}

async function page({ params }: Props) {
  const { storeId, id } = await params;
  return (
    <EditStockPage storeId={storeId} stockId={id} />
  )
}

export default page