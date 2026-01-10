import React from 'react'
import StoreDashboardPage from './client';
interface Props {
  params: Promise<{ storeId: string }>
}

async function page({ params }: Props) {
  const { storeId } = await params;
  return (
    <StoreDashboardPage storeId={storeId} />
  )
}

export default page