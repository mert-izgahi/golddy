import { StockForm } from '@/components/forms/stock-form'
import React from 'react'

interface Props {
    storeId: string,
    stockId: string
}

function EditStockPage({ storeId, stockId }: Props) {
    return (
        <StockForm mode="edit" storeId={storeId} stockId={stockId} />
    )
}

export default EditStockPage