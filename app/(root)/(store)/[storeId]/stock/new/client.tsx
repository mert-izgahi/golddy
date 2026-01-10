import { StockForm } from '@/components/forms/stock-form'

interface Props {
    storeId: string
}

function CreateStockPage({ storeId }: Props) {
    return (
        <div>
            <StockForm mode="create" storeId={storeId}/>
        </div>
    )
}

export default CreateStockPage