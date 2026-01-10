
import CreateStockPage from './client'
interface Props {
    params: Promise<{ storeId: string }>
}
async function page({ params }: Props) {
    const { storeId } = await params
    return (
        <CreateStockPage storeId={storeId} />
    )
}

export default page