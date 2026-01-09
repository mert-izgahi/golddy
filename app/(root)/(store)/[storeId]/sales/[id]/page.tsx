import React from 'react'
import UpdateSalePage from './client'

interface Props {
  params: Promise<{
    storeId: string,
    id: string
  }>
}

async function page({ params }: Props) {
  const { storeId, id } = await params;
  return (
    <UpdateSalePage storeId={storeId} saleId={id} />
  )
}

export default page