import prisma from '@/lib/prisma'
import React from 'react'
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